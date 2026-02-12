import { useState, useEffect, useCallback } from "react";
import { Volume2, Square, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionAudioProps {
  sectionText: string;
  label?: string;
  className?: string;
}

export function SectionAudio({ sectionText, label = "Listen to this section", className }: SectionAudioProps) {
  const [state, setState] = useState<"idle" | "loading" | "playing">("idle");

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setState("idle");
  }, []);

  const play = useCallback(() => {
    stop();
    setState("loading");

    const utterance = new SpeechSynthesisUtterance(sectionText);
    utterance.rate = 0.95;
    utterance.lang = "en-GB";

    // Try to find a UK English voice
    const voices = window.speechSynthesis.getVoices();
    const ukVoice = voices.find(
      (v) => v.lang === "en-GB" || v.lang.startsWith("en-GB")
    );
    if (ukVoice) utterance.voice = ukVoice;

    utterance.onstart = () => setState("playing");
    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");

    window.speechSynthesis.speak(utterance);
  }, [sectionText, stop]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleClick = () => {
    if (state === "playing") {
      stop();
    } else {
      play();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all",
        state === "playing"
          ? "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20"
          : "bg-accent text-accent-foreground border border-accent hover:opacity-90",
        className
      )}
      aria-label={state === "playing" ? "Stop audio" : label}
    >
      {state === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
      {state === "playing" && <Square className="w-4 h-4" />}
      {state === "idle" && <Volume2 className="w-4 h-4" />}
      {state === "playing" ? "Stop" : label}
    </button>
  );
}
