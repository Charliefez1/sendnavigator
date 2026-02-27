import { ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { ReportLayout } from "./ReportLayout";
import { JourneyNavigation } from "./JourneyNavigation";
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
import { PersistentNewsTicker } from "./PersistentNewsTicker";


interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isReportPage = location.pathname.startsWith("/state-of-send-2026/");
  const isStartPage = location.pathname === "/" || location.pathname === "/start";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <Header />
      <AnnouncementBanner />
      <JourneyNavigation />
      <ScanModeBanner />

      {isReportPage ? (
        // Report pages get sidebar layout
        <ReportLayout>
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
          <main id="main-content" className={`flex-1 ${isStartPage ? 'pb-0' : 'pb-32'}`} role="main" tabIndex={-1}>
            {children}
            {!isStartPage && (
              <div className="content-section py-6 space-y-4">
                <AskQuestionCompact />
              </div>
            )}
            
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
      <PersistentNewsTicker />
    </div>
  );
}
