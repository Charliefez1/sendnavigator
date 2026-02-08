import { ReactNode } from "react";
import { Header } from "./Header";
import { SiteNavigation } from "./SiteNavigation";
import { JourneyNavigation } from "./JourneyNavigation";
import { Footer } from "./Footer";
import { ContactBanner } from "./ContactBanner";
import { NewsletterSignup } from "./NewsletterSignup";
import { SkipLink } from "./SkipLink";
import { AskAICompact } from "./AskAICompact";
import { AskQuestionCompact } from "./AskQuestionCompact";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <Header />
      <SiteNavigation />
      <JourneyNavigation />
      <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
        {children}
        <div className="content-section py-6 space-y-4">
          <AskAICompact />
          <AskQuestionCompact />
        </div>
      </main>
      <div className="content-section py-8">
        <NewsletterSignup />
      </div>
      <ContactBanner />
      <Footer />
    </div>
  );
}
