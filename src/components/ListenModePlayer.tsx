import { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, Square, Volume2, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import { useExperienceMode } from "@/contexts/ExperienceModeContext";

export function ListenModePlayer() {
  const { mode } = useExperienceMode();
  const [state, setState] = useState<"idle" | "playing" | "paused">("idle");
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const getPageText = useCallback(() => {
    const main = document.querySelector("main");
    if (!main) return "";
    // Get text from main content, skip nav/buttons
    const clone = main.cloneNode(true) as HTMLElement;
    clone.querySelectorAll("button, nav, [aria-hidden='true'], script, style, .listen-player").forEach(el => el.remove());
    return clone.textContent?.replace(/\s+/g, " ").trim() || "";
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
    setState("idle");
  }, []);

  const play = useCallback(() => {
    if (state === "paused") {
      window.speechSynthesis.resume();
      setState("playing");
      return;
    }

    stop();
    const text = getPageText();
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.lang = "en-GB";

    const voices = window.speechSynthesis.getVoices();
    const ukVoice = voices.find(v => v.lang === "en-GB" || v.lang.startsWith("en-GB"));
    if (ukVoice) utterance.voice = ukVoice;

    utterance.onend = () => setState("idle");
    utterance.onerror = () => setState("idle");

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setState("playing");
  }, [state, stop, getPageText]);

  const pause = useCallback(() => {
    window.speechSynthesis.pause();
    setState("paused");
  }, []);

  // Stop on mode change or unmount
  useEffect(() => {
    if (mode !== "listen") {
      stop();
    }
    return () => { window.speechSynthesis.cancel(); };
  }, [mode, stop]);

  // Stop on navigation
  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
  }, []);

  if (mode !== "listen") return null;

  return (
    <div className="listen-player fixed bottom-0 left-0 right-0 z-50 bg-navy text-navy-foreground border-t border-white/10 shadow-2xl">
      <div className="content-wide flex items-center justify-between py-3 gap-4">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-white/60" />
          <span className="text-xs font-medium text-white/80">
            {state === "idle" && "Press play to listen to this page"}
            {state === "playing" && "Reading page aloud..."}
            {state === "paused" && "Paused"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {state === "playing" ? (
            <button
              onClick={pause}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label="Pause"
            >
              <Pause className="w-3.5 h-3.5" />
              Pause
            </button>
          ) : (
            <button
              onClick={play}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/20 text-white hover:bg-white/30 transition-colors"
              aria-label={state === "paused" ? "Resume" : "Play"}
            >
              <Play className="w-3.5 h-3.5" />
              {state === "paused" ? "Resume" : "Play"}
            </button>
          )}
          {state !== "idle" && (
            <button
              onClick={stop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Stop"
            >
              <Square className="w-3.5 h-3.5" />
              Stop
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
