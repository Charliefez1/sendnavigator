import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, CheckCircle, XCircle, Trash2, MessageCircleQuestion, MessageSquare, Eye, BookOpen } from "lucide-react";
import { KnowledgeBaseManager } from "@/components/admin/KnowledgeBaseManager";

interface QuestionItem {
  id: string;
  question: string;
  answer: string | null;
  status: string;
  page_submitted_from: string | null;
  created_at: string;
}

interface FeedbackItem {
  id: string;
  name: string | null;
  feedback: string;
  feedback_type: string;
  status: string;
  created_at: string;
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: "bg-status-discussed-bg text-status-discussed border border-status-discussed/30",
    approved: "bg-status-confirmed-bg text-status-confirmed border border-status-confirmed/30",
    rejected: "bg-destructive/10 text-destructive border border-destructive/30",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
}

export default function Admin() {
  const [pin, setPin] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<"questions" | "feedback" | "knowledge">("questions");
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const callAdmin = useCallback(
    async (body: Record<string, unknown>) => {
      const { data, error } = await supabase.functions.invoke("admin-moderate", {
        body: { pin, ...body },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      return data;
    },
    [pin]
  );

  const handleLogin = async () => {
    setLoading(true);
    setPinError(false);
    try {
      const result = await callAdmin({ action: "list", table: "user_questions" });
      setQuestions(result.data || []);
      const fb = await callAdmin({ action: "list", table: "user_feedback" });
      setFeedbackItems(fb.data || []);
      setAuthenticated(true);
    } catch {
      setPinError(true);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      const [q, f] = await Promise.all([
        callAdmin({ action: "list", table: "user_questions" }),
        callAdmin({ action: "list", table: "user_feedback" }),
      ]);
      setQuestions(q.data || []);
      setFeedbackItems(f.data || []);
    } catch {
      toast({ title: "Failed to refresh data", variant: "destructive" });
    }
  };

  const handleAction = async (table: string, action: string, id: string) => {
    try {
      await callAdmin({ action, table, id });
      toast({ title: `Item ${action}d successfully` });
      await refreshData();
    } catch {
      toast({ title: `Failed to ${action} item`, variant: "destructive" });
    }
  };

  if (!authenticated) {
    return (
      <Layout>
        <div className="content-section py-16">
          <div className="max-w-sm mx-auto text-center space-y-6">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto" />
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="text-sm text-muted-foreground">Enter your PIN to access the admin dashboard.</p>
            <div className="space-y-3">
              <Input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                maxLength={10}
                className="text-center text-lg tracking-widest"
              />
              {pinError && <p className="text-sm text-destructive">Invalid PIN. Please try again.</p>}
              <Button onClick={handleLogin} disabled={loading || pin.length < 4} className="w-full rounded-full">
                {loading ? "Verifying..." : "Access Dashboard"}
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const pendingQuestions = questions.filter((q) => q.status === "pending").length;
  const pendingFeedback = feedbackItems.filter((f) => f.status === "pending").length;

  return (
    <Layout>
      <div className="content-wide py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" size="sm" onClick={refreshData} className="rounded-full">
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{questions.length}</p>
            <p className="text-xs text-muted-foreground">Total Questions</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-status-discussed">{pendingQuestions}</p>
            <p className="text-xs text-muted-foreground">Pending Questions</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{feedbackItems.length}</p>
            <p className="text-xs text-muted-foreground">Total Feedback</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-status-discussed">{pendingFeedback}</p>
            <p className="text-xs text-muted-foreground">Pending Feedback</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("questions")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "questions"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <MessageCircleQuestion className="h-4 w-4" />
            Questions {pendingQuestions > 0 && `(${pendingQuestions})`}
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "feedback"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <MessageSquare className="h-4 w-4" />
            Feedback {pendingFeedback > 0 && `(${pendingFeedback})`}
          </button>
          <button
            onClick={() => setActiveTab("knowledge")}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeTab === "knowledge"
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            Knowledge Base
          </button>
        </div>

        {/* Content */}
        {activeTab === "knowledge" ? (
          <KnowledgeBaseManager pin={pin} />
        ) : activeTab === "questions" ? (
          <div className="space-y-3">
            {questions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No questions yet.</p>
            ) : (
              questions.map((q) => (
                <div key={q.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={q.status} />
                        {q.page_submitted_from && (
                          <span className="text-xs text-muted-foreground">from {q.page_submitted_from}</span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(q.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{q.question}</p>
                      {q.answer && <p className="text-sm text-muted-foreground bg-muted rounded-lg p-2">{q.answer}</p>}
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {q.status !== "approved" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction("user_questions", "approve", q.id)}
                          className="h-8 w-8 p-0 text-status-confirmed hover:bg-status-confirmed-bg"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {q.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction("user_questions", "reject", q.id)}
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("user_questions", "delete", q.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {feedbackItems.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No feedback yet.</p>
            ) : (
              feedbackItems.map((f) => (
                <div key={f.id} className="bg-card border border-border rounded-xl p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <StatusBadge status={f.status} />
                        <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                          {f.feedback_type}
                        </span>
                        {f.name && <span className="text-xs font-semibold">{f.name}</span>}
                        <span className="text-xs text-muted-foreground">
                          {new Date(f.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{f.feedback}</p>
                    </div>
                    <div className="flex gap-1 shrink-0">
                      {f.status !== "approved" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction("user_feedback", "approve", f.id)}
                          className="h-8 w-8 p-0 text-status-confirmed hover:bg-status-confirmed-bg"
                          title="Approve"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                      {f.status !== "rejected" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleAction("user_feedback", "reject", f.id)}
                          className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10"
                          title="Reject"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleAction("user_feedback", "delete", f.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
