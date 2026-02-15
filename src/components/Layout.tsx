import { ReactNode } from "react";
import { Header } from "./Header";
import { JourneyNavBar } from "./JourneyNavBar";
import { JourneyFloatingBar } from "./JourneyFloatingBar";
import { Footer } from "./Footer";

import { MoreResources } from "./MoreResources";
import { NeurodiversityGlobalCTA } from "./NeurodiversityGlobalCTA";
import { NewsletterSignup } from "./NewsletterSignup";
import { SkipLink } from "./SkipLink";
import { AskAICompact } from "./AskAICompact";
import { AskQuestionCompact } from "./AskQuestionCompact";
import { ListenModePlayer } from "./ListenModePlayer";
import { ScanModeBanner } from "./ScanModeBanner";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { CookieConsent } from "./CookieConsent";

interface LayoutProps {
  children: ReactNode;
  hideGlobalCTA?: boolean;
}

export function Layout({ children, hideGlobalCTA }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <Header />
      <JourneyNavBar />
      <ScanModeBanner />
      <main id="main-content" className="flex-1 pb-24" role="main" tabIndex={-1}>
        {children}
        <div className="content-section py-6 space-y-4">
          <AskQuestionCompact />
        </div>
      </main>
      <MoreResources />
      <div className="content-section py-8">
        <NewsletterSignup />
      </div>
      {!hideGlobalCTA && <NeurodiversityGlobalCTA />}
      <Footer />
      <JourneyFloatingBar />
      <ListenModePlayer />
      <ExitIntentPopup />
      <CookieConsent />
    </div>
  );
}
