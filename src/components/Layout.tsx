import { ReactNode } from "react";
import { Header } from "./Header";
import { JourneyNavigation } from "./JourneyNavigation";
import { Footer } from "./Footer";
import { ContactBanner } from "./ContactBanner";
import { NewsletterSignup } from "./NewsletterSignup";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <JourneyNavigation />
      <main className="flex-1">{children}</main>
      <div className="content-section py-8">
        <NewsletterSignup />
      </div>
      <ContactBanner />
      <Footer />
    </div>
  );
}
