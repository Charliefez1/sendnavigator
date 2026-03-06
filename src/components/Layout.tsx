import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { ReportLayout } from "./ReportLayout";
import { JourneyNavigation } from "./JourneyNavigation";
import { JourneyFloatingBar } from "./JourneyFloatingBar";
import { Footer } from "./Footer";
import { PreFooter } from "./PreFooter";
import { SkipLink } from "./SkipLink";
import { AskQuestionCompact } from "./AskQuestionCompact";
import { ExitIntentPopup } from "./ExitIntentPopup";
import { CookieConsent } from "./CookieConsent";
import { AskSendFloating } from "./AskSendFloating";
import { AnnouncementBanner } from "./AnnouncementBanner";
import { PersistentNewsTicker } from "./PersistentNewsTicker";
import { OrientationBar } from "./OrientationBar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isReportPage = location.pathname.startsWith("/state-of-send-2026/");
  const isStartPage = location.pathname === "/" || location.pathname === "/start";
  const isProfilePage = location.pathname === "/my-child-profile";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <Header />
      <AnnouncementBanner />
      <JourneyNavigation />
      <OrientationBar />

      {isReportPage ? (
        <ReportLayout>
          <main id="main-content" className="flex-1 pb-8" role="main" tabIndex={-1}>
            {children}
            <div className="content-section py-6 space-y-4">
              <AskQuestionCompact />
            </div>
          </main>
        </ReportLayout>
      ) : (
        <>
          <main id="main-content" className={`flex-1 ${isStartPage ? 'pb-0' : 'pb-32'}`} role="main" tabIndex={-1}>
            {children}
            {!isStartPage && !isProfilePage && (
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
      <ExitIntentPopup />
      <CookieConsent />
      <PersistentNewsTicker />
    </div>
  );
}
