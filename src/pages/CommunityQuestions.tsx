import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { AskQuestionCompact } from "@/components/AskQuestionCompact";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { MessageCircleQuestion, Calendar } from "lucide-react";
import { format } from "date-fns";

interface Question {
  id: string;
  question: string;
  answer: string | null;
  created_at: string;
  page_submitted_from: string | null;
}

export default function CommunityQuestions() {
  const { data: questions, isLoading } = useQuery({
    queryKey: ["approved-questions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_questions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Question[];
    },
  });

  return (
    <Layout>
      <div className="content-section py-8 space-y-8">
        <PageHeader
          title="Community Questions"
          description="Questions asked by families and professionals about SEND reform. Have a question? Ask below and it may be added to this page."
        />

        <AskQuestionCompact />

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : questions && questions.length > 0 ? (
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="bg-card border border-border rounded-2xl p-5 space-y-3">
                <div className="flex items-start gap-3">
                  <MessageCircleQuestion className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div className="space-y-2 flex-1">
                    <p className="font-semibold text-foreground leading-snug">{q.question}</p>
                    {q.answer && (
                      <div className="bg-accent/30 rounded-xl p-3 text-sm text-foreground leading-relaxed">
                        {q.answer}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{format(new Date(q.created_at), "d MMM yyyy")}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <MessageCircleQuestion className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="font-semibold">No questions yet</p>
            <p className="text-sm mt-1">Be the first to ask a question about SEND reform!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
