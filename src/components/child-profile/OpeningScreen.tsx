import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface OpeningScreenProps {
  onStart: () => void;
}

export function OpeningScreen({ onStart }: OpeningScreenProps) {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-display font-semibold text-foreground mb-8">
        My Child: A Profile
      </h1>

      <div className="space-y-5 text-sm text-foreground leading-relaxed">
        <p className="font-medium text-base text-foreground">Before we start, I want to say something.</p>

        <p>
          You know your child better than any professional ever will. The problem is that the system does not always make space for that knowledge.
        </p>

        <p>
          This tool will help you put into words what you already know. At the end, it will give you a document you can bring into any room and say: this is my child. All of it.
        </p>

        <p>
          Take your time. Skip anything that does not apply. There is no right answer. There is only what is true for your child.
        </p>

        <p>
          One important thing to know before you begin. Nothing you write here is stored anywhere. It lives only in your browser. When you close this page, it is gone. You cannot come back and pick up where you left off. Complete it in one session and download your PDF at the end.
        </p>

        <p>If you are ready, let's begin.</p>
      </div>

      <div className="mt-10">
        <Button onClick={onStart} size="lg" className="gap-2">
          Start the profile
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
