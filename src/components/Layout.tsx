import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { ReportLayout } from "./ReportLayout";
import { JourneyFloatingBar } from "./JourneyFloatingBar";
import { Footer } from "./Footer";

import { MoreResources } from "./MoreResources";
import { NeurodiversityGlobalCTA } from "./NeurodiversityGlobalCTA";
import { NewsletterSignup } from "./NewsletterSignup";
import { SkipLink } from "./SkipLink";
import { AskQuestionCompact } from "./AskQuestionCompact";
import { ListenModePlayer } from "./ListenModePlayer";
import { ScanModeBanner } from "./ScanModeBanner";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { CookieConsent } from "./CookieConsent";
import { AskSendFloating } from "./AskSendFloating";
import { NeurodiversityGlobalAd } from "./NeurodiversityGlobalAd";

interface LayoutProps {
  children: ReactNode;
  hideGlobalCTA?: boolean;
}

export function Layout({ children, hideGlobalCTA }: LayoutProps) {
  const location = useLocation();
  const isReportPage = location.pathname.startsWith("/state-of-send-2026/");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <Header />
      <ScanModeBanner />

      {isReportPage ? (
        // Report pages get sidebar layout
        <ReportLayout>
          <div className="content-section pt-3 pb-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-confirmed flex-shrink-0" />
              <span><strong className="text-foreground">Last updated:</strong> 20th February 2026</span>
            </p>
          </div>
          <main id="main-content" className="flex-1 pb-8" role="main" tabIndex={-1}>
            {children}
            <div className="content-section py-6 space-y-4">
              <AskQuestionCompact />
            </div>
            <NeurodiversityGlobalAd />
          </main>
        </ReportLayout>
      ) : (
        // Non-report pages get standard layout
        <>
          <div className="content-section pt-3 pb-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-confirmed flex-shrink-0" />
              <span><strong className="text-foreground">Last updated:</strong> 20th February 2026</span>
            </p>
          </div>
          <main id="main-content" className="flex-1 pb-24" role="main" tabIndex={-1}>
            {children}
            <div className="content-section py-6 space-y-4">
              <AskQuestionCompact />
            </div>
            <NeurodiversityGlobalAd />
          </main>
        </>
      )}

      <MoreResources />
      <div className="content-section py-8">
        <NewsletterSignup />
      </div>
      {!hideGlobalCTA && <NeurodiversityGlobalCTA />}
      <Footer />
      {!isReportPage && <JourneyFloatingBar />}
      <AskSendFloating />
      <ListenModePlayer />
      <ExitIntentPopup />
      <CookieConsent />
    </div>
  );
}
