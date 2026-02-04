import { ReactNode } from "react";
import { Header } from "./Header";
import { Navigation } from "./Navigation";
import { Breadcrumb } from "./Breadcrumb";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <Navigation />
      <Breadcrumb />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
