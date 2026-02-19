import { Link } from "react-router-dom";
import { MessageCircleQuestion } from "lucide-react";
import richPhoto from "@/assets/rich-ferriman-bio.png";

interface WordFromRichProps {
  children: React.ReactNode;
}

export function WordFromRich({ children }: WordFromRichProps) {
  return (
    <div className="content-section py-4">
      <div className="rounded-xl bg-muted/40 border border-border/60 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={richPhoto}
              alt="Rich Ferriman"
              className="w-12 h-12 rounded-full object-cover object-top"
            />
            <p className="text-[10px] text-muted-foreground text-center mt-1 font-medium">Rich</p>
          </div>
          <div className="flex-1 min-w-0 space-y-3">
            <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
              {children}
            </div>
            <p className="text-sm text-muted-foreground pt-1">
              Got a question?{" "}
              <Link to="/questions-and-answers" className="text-primary font-medium hover:underline">
                Ask Rich
              </Link>
              . Or{" "}
              <Link to="/feedback" className="text-primary font-medium hover:underline">
                leave a comment or feedback
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
