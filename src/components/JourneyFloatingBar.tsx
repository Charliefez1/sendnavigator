import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Map, X, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const journeySteps = [
  { path: "/state-of-send-2026/where-we-are-now", label: "Current situation", description: "What the system looks like today", group: "confirmed" },
  { path: "/state-of-send-2026/what-is-changing", label: "Confirmed changes", description: "Changes that have been announced", group: "confirmed" },
  { path: "/state-of-send-2026/what-has-not-changed", label: "What has not changed", description: "Parts of the system that remain the same", group: "confirmed" },
  { path: "/state-of-send-2026/what-is-being-discussed", label: "Under discussion", description: "Proposals still being debated", group: "discussed" },
  { path: "/state-of-send-2026/what-we-do-not-know", label: "What we do not know", description: "Questions without clear answers yet", group: "discussed" },
  { path: "/state-of-send-2026/what-the-leaks-are-saying", label: "Unconfirmed reports", description: "Leaked information not yet verified", group: "unconfirmed" },
  { path: "/state-of-send-2026/what-the-leaks-do-not-mean", label: "What leaks do not mean", description: "Context and common misunderstandings", group: "unconfirmed" },
  { path: "/state-of-send-2026/timeline", label: "What is next", description: "Key dates and upcoming milestones", group: "next" },
];

const groupMeta: Record<string, { label: string; colour: string; bgColour: string; dotColour: string }> = {
  confirmed: { label: "Confirmed", colour: "text-journey-confirmed", bgColour: "bg-journey-confirmed/10", dotColour: "bg-journey-confirmed" },
  discussed: { label: "Under discussion", colour: "text-journey-discussed", bgColour: "bg-journey-discussed/10", dotColour: "bg-journey-discussed" },
  unconfirmed: { label: "Unconfirmed", colour: "text-journey-unconfirmed", bgColour: "bg-journey-unconfirmed/10", dotColour: "bg-journey-unconfirmed" },
  next: { label: "Next steps", colour: "text-journey-next", bgColour: "bg-journey-next/10", dotColour: "bg-journey-next" },
};

export function JourneyFloatingBar() {
  // Sidebar handles navigation for report pages now — this component is disabled
  return null;
}

export { journeySteps };
