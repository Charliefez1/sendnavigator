import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import neurodiversityLogo from "@/assets/neurodiversity-global-logo.jpeg";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header with logo */}
      <header className="py-6 sm:py-8 border-b border-border bg-card">
        <div className="content-wide flex justify-center">
          <Link to="/neurodiversity-global">
            <img 
              src={neurodiversityLogo} 
              alt="Neurodiversity Global - Neuroinclusive Performance" 
              className="h-12 sm:h-16 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center">
        <section className="content-section py-12 sm:py-16">
          {/* Site title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-foreground mb-4">
              SEND Reform Navigator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A guide to help you understand what is happening with SEND reform in England.
            </p>
          </div>

          {/* What this site is */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-10 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">What this site is</h2>
            <div className="prose-calm space-y-3 text-muted-foreground">
              <p>
                This is an independent public resource. It explains what is confirmed, what is being discussed, 
                and what is still unknown about SEND reform.
              </p>
              <p>
                We do not give advice or tell you what to do. We help you understand what is actually happening 
                so you can make your own decisions.
              </p>
            </div>
          </div>

          {/* Who this is for */}
          <div className="bg-card border border-border rounded-xl p-6 sm:p-8 mb-10 max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4">Who this is for</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>Parents and carers of children with SEND</li>
              <li>Teachers, SENCOs, and school leaders</li>
              <li>Professionals working with children and young people</li>
              <li>Anyone trying to understand what SEND reform means</li>
            </ul>
          </div>

          {/* Key navigation */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
              Where would you like to start?
            </h2>
            <div className="space-y-3">
              <Link 
                to="/start" 
                className="journey-card flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">Enter the guide</h3>
                  <p className="text-sm text-muted-foreground">Start with reassurance and an overview</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link 
                to="/what-is-changing" 
                className="journey-card flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">What is actually changing</h3>
                  <p className="text-sm text-muted-foreground">Confirmed reforms and official plans</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link 
                to="/what-has-not-changed" 
                className="journey-card flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">What has not changed</h3>
                  <p className="text-sm text-muted-foreground">Your rights and protections today</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </Link>

              <Link 
                to="/questions-and-answers" 
                className="journey-card flex items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground">Questions and answers</h3>
                  <p className="text-sm text-muted-foreground">Ask about SEND reform</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-border bg-card">
        <div className="content-wide text-center text-sm text-muted-foreground">
          <p>
            This is an independent public resource. Information applies to England only.
          </p>
        </div>
      </footer>
    </div>
  );
}
