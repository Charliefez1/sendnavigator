import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { ReportLayout } from "./ReportLayout";
import { JourneyFloatingBar } from "./JourneyFloatingBar";
import { Footer } from "./Footer";
import { PreFooter } from "./PreFooter";
import { SkipLink } from "./SkipLink";
import { AskQuestionCompact } from "./AskQuestionCompact";
import { ListenModePlayer } from "./ListenModePlayer";
import { ScanModeBanner } from "./ScanModeBanner";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { CookieConsent } from "./CookieConsent";
import { AskSendFloating } from "./AskSendFloating";
import { AnnouncementBanner } from "./AnnouncementBanner";


interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isReportPage = location.pathname.startsWith("/state-of-send-2026/");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AnnouncementBanner />
      <SkipLink />
      <Header />
      <ScanModeBanner />

      {isReportPage ? (
        // Report pages get sidebar layout
        <ReportLayout>
          <div className="content-section pt-3 pb-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-confirmed flex-shrink-0" />
              <span><strong className="text-foreground">Last updated:</strong> 23rd February 2026</span>
            </p>
          </div>
          <main id="main-content" className="flex-1 pb-8" role="main" tabIndex={-1}>
            {children}
            <div className="content-section py-6 space-y-4">
              <AskQuestionCompact />
            </div>
          </main>
        </ReportLayout>
      ) : (
        // Non-report pages get standard layout
        <>
          <div className="content-section pt-3 pb-1">
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-status-confirmed flex-shrink-0" />
              <span><strong className="text-foreground">Last updated:</strong> 23rd February 2026</span>
            </p>
          </div>
          <main id="main-content" className="flex-1 pb-24" role="main" tabIndex={-1}>
            {children}
            <div className="content-section py-6 space-y-4">
              <AskQuestionCompact />
            </div>
            
          </main>
        </>
      )}

      <PreFooter />
      <Footer />
      {!isReportPage && <JourneyFloatingBar />}
      <AskSendFloating />
      <ListenModePlayer />
      <ExitIntentPopup />
      <CookieConsent />
    </div>
  );
}
