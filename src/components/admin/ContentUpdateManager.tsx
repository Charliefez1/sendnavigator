import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2, CheckCircle, XCircle, Clock, RefreshCw, AlertTriangle, FileText, X, File } from "lucide-react";

interface ContentUpdate {
  id: string;
  source: string;
  source_name: string | null;
  raw_content: string;
  status: string;
  submitted_at: string;
  processed_at: string | null;
  result_summary: string | null;
}

const ACCEPT_STRING = ".txt,.md,.csv,.json,.xml,.html,.pdf,.doc,.docx,.pptx,.xlsx";

export function ContentUpdateManager({ pin }: { pin: string }) {
  const [updates, setUpdates] = useState<ContentUpdate[]>([]);
  const [sourceName, setSourceName] = useState("");
  const [rawContent, setRawContent] = useState("");
  const [breakingNews, setBreakingNews] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileProcessing, setFileProcessing] = useState(false);
  const [fileProgress, setFileProgress] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchUpdates = useCallback(async () => {
    const { data, error } = await supabase.functions.invoke("admin-moderate", {
      body: { pin, action: "list", table: "content_updates" },
    });
    if (!error && data?.data) {
      setUpdates(data.data);
    }
  }, [pin]);

  useEffect(() => {
    fetchUpdates();
  }, [fetchUpdates]);

  const addFiles = (newFiles: FileList | File[]) => {
    const files = Array.from(newFiles);
    const valid: File[] = [];
    for (const f of files) {
      if (f.size > 10 * 1024 * 1024) {
        toast({ title: `${f.name} is too large`, description: "Max 10MB per file", variant: "destructive" });
        continue;
      }
      valid.push(f);
    }
    if (valid.length) {
      setUploadedFiles(prev => [...prev, ...valid]);
      if (!sourceName.trim() && valid.length === 1) {
        setSourceName(valid[0].name);
      } else if (!sourceName.trim() && valid.length > 1) {
        setSourceName(`${valid.length} documents`);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processOneFile = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const isText = ["txt", "md", "csv", "json", "xml", "html"].includes(ext);

    if (isText) {
      return await file.text();
    }

    // Binary: upload to storage then parse via edge function
    const { data: urlData, error: urlError } = await supabase.functions.invoke("admin-moderate", {
      body: { pin, action: "upload_signed_url", id: { file_name: file.name } },
    });
    if (urlError || !urlData?.data) throw new Error(urlData?.error || "Failed to get upload URL");

    const { path } = urlData.data;

    const { error: uploadError } = await supabase.storage
      .from("admin-uploads")
      .uploadToSignedUrl(path, urlData.data.token, file);
    if (uploadError) throw uploadError;

    const { data: parseData, error: parseError } = await supabase.functions.invoke("parse-document", {
      body: { pin, file_path: path, file_name: file.name },
    });
    if (parseError) throw parseError;
    if (parseData?.error) throw new Error(parseData.error);

    return parseData.text || "";
  };

  const handleSubmit = async () => {
    if (!rawContent.trim() && uploadedFiles.length === 0) return;
    setSubmitting(true);
    setFileProcessing(uploadedFiles.length > 0);
    try {
      let contentToSubmit = rawContent.trim();

      // Process all uploaded files sequentially
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        setFileProgress(`Extracting text from ${file.name} (${i + 1}/${uploadedFiles.length})...`);
        try {
          const fileText = await processOneFile(file);
          if (fileText) {
            contentToSubmit = contentToSubmit
              ? `${contentToSubmit}\n\n--- Extracted from: ${file.name} ---\n\n${fileText}`
              : `--- Extracted from: ${file.name} ---\n\n${fileText}`;
          }
        } catch (err: any) {
          toast({ title: `Failed to process ${file.name}`, description: err.message, variant: "destructive" });
        }
      }

      setFileProcessing(false);
      setFileProgress("");

      if (!contentToSubmit) {
        toast({ title: "No content to submit", variant: "destructive" });
        setSubmitting(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: {
          pin,
          action: "insert_content_update",
          id: { source_name: sourceName.trim() || "Manual submission", raw_content: contentToSubmit },
        },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: "Content submitted for processing" });

      if (breakingNews) {
        await supabase.functions.invoke("admin-moderate", {
          body: {
            pin,
            action: "flag_all_pages",
            id: { reason: `Breaking news: ${sourceName.trim() || "Manual submission"}`, content_update_id: data?.data?.id },
          },
        });
        toast({ title: "All pages flagged for review" });
      }

      setSourceName("");
      setRawContent("");
      setBreakingNews(false);
      setUploadedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await fetchUpdates();
    } catch (err: any) {
      toast({ title: "Failed to submit", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
      setFileProcessing(false);
      setFileProgress("");
    }
  };

  const handleProcess = async (updateId: string) => {
    setProcessingId(updateId);
    try {
      const { data, error } = await supabase.functions.invoke("process-update", {
        body: { content_update_id: updateId, pin },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      toast({ title: "Processing complete", description: data.summary });
      await fetchUpdates();
    } catch (err: any) {
      toast({ title: "Processing failed", description: err.message, variant: "destructive" });
    } finally {
      setProcessingId(null);
    }
  };

  const statusIcon = (status: string) => {
    switch (status) {
      case "processed": return <CheckCircle className="h-4 w-4 text-status-confirmed" />;
      case "failed": return <XCircle className="h-4 w-4 text-destructive" />;
      case "processing": return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Submit new content */}
      <div className="bg-card border border-border rounded-xl p-5 space-y-4">
        <h3 className="font-display text-lg font-bold">Submit New Information</h3>
        <p className="text-sm text-muted-foreground">
          Paste raw text or upload documents (PDF, Word, text files). You can upload multiple files at once. The AI will extract facts, update the knowledge base, and flag affected pages.
        </p>
        <Input
          placeholder="Source name (e.g. 'GOV.UK announcement 23 Feb 2026')"
          value={sourceName}
          onChange={(e) => setSourceName(e.target.value)}
        />

        {/* File upload zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors cursor-pointer ${
            dragOver
              ? "border-primary bg-primary/5"
              : uploadedFiles.length > 0
              ? "border-status-confirmed/40 bg-status-confirmed-bg"
              : "border-border hover:border-primary/40"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPT_STRING}
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
          {uploadedFiles.length > 0 ? (
            <div className="space-y-2">
              {uploadedFiles.map((file, i) => (
                <div key={`${file.name}-${i}`} className="flex items-center justify-center gap-3">
                  <File className="h-4 w-4 text-status-confirmed flex-shrink-0" />
                  <span className="text-sm font-medium truncate max-w-[200px]">{file.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
              <p className="text-xs text-muted-foreground mt-2">Click or drag to add more files</p>
            </div>
          ) : (
            <div className="space-y-2">
              <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, Word, PowerPoint, Excel, or plain text (max 10MB each, multiple files supported)
              </p>
            </div>
          )}
        </div>

        {uploadedFiles.length > 0 && rawContent.trim() === "" ? null : (
          <>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="font-medium">OR</span>
              <div className="flex-1 h-px bg-border" />
              <span>paste text below</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <Textarea
              placeholder="Paste the raw content here..."
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              className="min-h-[200px]"
            />
          </>
        )}

        <div className="flex items-center gap-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
          <Checkbox
            id="breaking-news"
            checked={breakingNews}
            onCheckedChange={(checked) => setBreakingNews(checked === true)}
          />
          <label htmlFor="breaking-news" className="flex items-center gap-2 text-sm font-semibold cursor-pointer">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            Breaking news: flag all pages for review
          </label>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={submitting || fileProcessing || (!rawContent.trim() && uploadedFiles.length === 0)}
          className="rounded-full gap-2"
        >
          {submitting || fileProcessing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {fileProcessing ? fileProgress : `Submit${uploadedFiles.length > 1 ? ` (${uploadedFiles.length} files)` : ""} for Processing`}
        </Button>
      </div>

      {/* Recent updates */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Recent Updates</h3>
          <Button variant="ghost" size="sm" onClick={fetchUpdates} className="gap-1.5">
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>

        {updates.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No content updates yet.</p>
        ) : (
          updates.map((u) => (
            <div key={u.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {statusIcon(u.status)}
                    <span className="text-sm font-semibold">{u.source_name || u.source}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(u.submitted_at).toLocaleDateString()} {new Date(u.submitted_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {u.raw_content.substring(0, 200)}{u.raw_content.length > 200 ? "..." : ""}
                  </p>
                  {u.result_summary && (
                    <p className="text-xs bg-status-confirmed-bg text-status-confirmed rounded-lg px-3 py-1.5 mt-1">
                      {u.result_summary}
                    </p>
                  )}
                </div>
                {u.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => handleProcess(u.id)}
                    disabled={processingId === u.id}
                    className="rounded-full gap-1.5 shrink-0"
                  >
                    {processingId === u.id ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Upload className="h-3.5 w-3.5" />
                    )}
                    Process
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
