import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Save, X, BookOpen } from "lucide-react";

interface KBEntry {
  id: string;
  topic: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface KnowledgeBaseManagerProps {
  pin: string;
}

export function KnowledgeBaseManager({ pin }: KnowledgeBaseManagerProps) {
  const [entries, setEntries] = useState<KBEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTopic, setEditTopic] = useState("");
  const [editContent, setEditContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newTopic, setNewTopic] = useState("");
  const [newContent, setNewContent] = useState("");
  const { toast } = useToast();

  const callAdmin = async (body: Record<string, unknown>) => {
    const { data, error } = await supabase.functions.invoke("admin-moderate", {
      body: { pin, ...body },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  };

  const fetchEntries = async () => {
    try {
      const result = await callAdmin({ action: "kb_list", table: "knowledge_base" });
      setEntries(result.data || []);
    } catch {
      toast({ title: "Failed to load knowledge base", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  const handleCreate = async () => {
    if (!newTopic.trim() || !newContent.trim()) return;
    try {
      await callAdmin({ action: "kb_create", table: "knowledge_base", id: { topic: newTopic, content: newContent } });
      toast({ title: "Entry added" });
      setIsAdding(false);
      setNewTopic("");
      setNewContent("");
      await fetchEntries();
    } catch {
      toast({ title: "Failed to add entry", variant: "destructive" });
    }
  };

  const handleUpdate = async (entryId: string) => {
    try {
      await callAdmin({ action: "kb_update", table: "knowledge_base", id: { entryId, topic: editTopic, content: editContent, status: "active" } });
      toast({ title: "Entry updated" });
      setEditingId(null);
      await fetchEntries();
    } catch {
      toast({ title: "Failed to update entry", variant: "destructive" });
    }
  };

  const handleDelete = async (entryId: string) => {
    try {
      await callAdmin({ action: "kb_delete", table: "knowledge_base", id: entryId });
      toast({ title: "Entry deleted" });
      await fetchEntries();
    } catch {
      toast({ title: "Failed to delete entry", variant: "destructive" });
    }
  };

  const startEdit = (entry: KBEntry) => {
    setEditingId(entry.id);
    setEditTopic(entry.topic);
    setEditContent(entry.content);
  };

  if (loading) {
    return <p className="text-muted-foreground text-center py-8">Loading knowledge base...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{entries.length} entries — these drive ADHDi answers</p>
        <Button size="sm" onClick={() => setIsAdding(true)} disabled={isAdding} className="rounded-full gap-1.5">
          <Plus className="h-4 w-4" /> Add Entry
        </Button>
      </div>

      {isAdding && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <Input placeholder="Topic (e.g. 'EHCPs and Rights')" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} />
          <Textarea placeholder="Content — plain text the AI will use as its source" value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={6} />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleCreate} className="rounded-full gap-1.5"><Save className="h-4 w-4" /> Save</Button>
            <Button size="sm" variant="ghost" onClick={() => { setIsAdding(false); setNewTopic(""); setNewContent(""); }} className="rounded-full gap-1.5"><X className="h-4 w-4" /> Cancel</Button>
          </div>
        </div>
      )}

      {entries.map((entry) => (
        <div key={entry.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
          {editingId === entry.id ? (
            <div className="space-y-3">
              <Input value={editTopic} onChange={(e) => setEditTopic(e.target.value)} />
              <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} rows={8} />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleUpdate(entry.id)} className="rounded-full gap-1.5"><Save className="h-4 w-4" /> Save</Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="rounded-full gap-1.5"><X className="h-4 w-4" /> Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">{entry.topic}</h3>
                  <span className="text-xs text-muted-foreground">
                    Updated {new Date(entry.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-3">{entry.content}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <Button size="sm" variant="ghost" onClick={() => startEdit(entry)} className="h-8 w-8 p-0" title="Edit">
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => handleDelete(entry.id)} className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
