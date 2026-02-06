import { ReactNode } from "react";
import { Header } from "./Header";
import { JourneyNavigation } from "./JourneyNavigation";
import { Footer } from "./Footer";
import { ContactBanner } from "./ContactBanner";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ContactBanner />
      <Header />
      <JourneyNavigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
