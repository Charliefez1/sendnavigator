import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

const journeySteps = [
  { path: "/state-of-send-2026/where-we-are-now", label: "What we know right now", shortLabel: "Right now", color: "confirmed" },
  { path: "/state-of-send-2026/what-is-changing", label: "What is now in motion", shortLabel: "In motion", color: "confirmed" },
  { path: "/state-of-send-2026/what-has-not-changed", label: "What remains protected", shortLabel: "Protected", color: "confirmed" },
  { path: "/state-of-send-2026/what-is-being-discussed", label: "What is actively being shaped", shortLabel: "Being shaped", color: "discussed" },
  { path: "/state-of-send-2026/what-we-do-not-know", label: "What is genuinely unknown", shortLabel: "Unknown", color: "discussed" },
  { path: "/state-of-send-2026/what-the-leaks-are-saying", label: "What has been reported", shortLabel: "Reported", color: "unconfirmed" },
  { path: "/state-of-send-2026/what-the-leaks-do-not-mean", label: "What is often misunderstood", shortLabel: "Misunderstood", color: "unconfirmed" },
  { path: "/state-of-send-2026/timeline", label: "What happens next", shortLabel: "Next", color: "next" },
];

const dotColors: Record<string, string> = {
  confirmed: "bg-journey-confirmed",
  discussed: "bg-journey-discussed",
  unconfirmed: "bg-journey-unconfirmed",
  next: "bg-journey-next",
};

const activeDotColors: Record<string, string> = {
  confirmed: "ring-journey-confirmed",
  discussed: "ring-journey-discussed",
  unconfirmed: "ring-journey-unconfirmed",
  next: "ring-journey-next",
};

const accentBorderColors: Record<string, string> = {
  confirmed: "border-t-journey-confirmed",
  discussed: "border-t-journey-discussed",
  unconfirmed: "border-t-journey-unconfirmed",
  next: "border-t-journey-next",
};

export function JourneyNavBar() {
  const location = useLocation();
  const currentIndex = journeySteps.findIndex((s) => s.path === location.pathname);
  const currentStep = journeySteps[currentIndex];
  const prevStep = currentIndex > 0 ? journeySteps[currentIndex - 1] : null;
  const nextStep = currentIndex < journeySteps.length - 1 ? journeySteps[currentIndex + 1] : null;

  // Navigation is handled by JourneyNavigation component
  if (currentIndex === -1) return null;
  return null;
}

export { journeySteps, dotColors };
