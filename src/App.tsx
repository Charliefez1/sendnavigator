import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageViewTracker } from "@/components/PageViewTracker";

// Lazy-loaded pages
const Start = lazy(() => import("./pages/Start"));
const Index = lazy(() => import("./pages/Index"));
const HowToUse = lazy(() => import("./pages/HowToUse"));
const WhereWeAreNow = lazy(() => import("./pages/WhereWeAreNow"));
const WhatIsChanging = lazy(() => import("./pages/WhatIsChanging"));
const WhatHasNotChanged = lazy(() => import("./pages/WhatHasNotChanged"));
const WhatWeKnowSoFar = lazy(() => import("./pages/WhatWeKnowSoFar"));
const WhatIsBeingDiscussed = lazy(() => import("./pages/WhatIsBeingDiscussed"));
const WhatWeDoNotKnow = lazy(() => import("./pages/WhatWeDoNotKnow"));
const WhatTheLeaksAreSaying = lazy(() => import("./pages/WhatTheLeaksAreSaying"));
const WhatTheLeaksDoNotMean = lazy(() => import("./pages/WhatTheLeaksDoNotMean"));
const WhatThisCouldMean = lazy(() => import("./pages/WhatThisCouldMean"));
const Timeline = lazy(() => import("./pages/Timeline"));
const QuestionsAndAnswers = lazy(() => import("./pages/QuestionsAndAnswers"));
const Sources = lazy(() => import("./pages/Sources"));
const StatisticsAndData = lazy(() => import("./pages/StatisticsAndData"));
const About = lazy(() => import("./pages/About"));
const NeurodiversityGlobal = lazy(() => import("./pages/NeurodiversityGlobal"));
const RichFerriman = lazy(() => import("./pages/RichFerriman"));
const WhyIBuiltThis = lazy(() => import("./pages/WhyIBuiltThis"));
const CommunityQuestions = lazy(() => import("./pages/CommunityQuestions"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-muted-foreground text-sm">Loading…</div>
    </div>
  );
}

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageViewTracker />
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/welcome" element={<Index />} />
                <Route path="/how-to-use" element={<HowToUse />} />
                <Route path="/where-we-are-now" element={<WhereWeAreNow />} />
                <Route path="/what-is-changing" element={<WhatIsChanging />} />
                <Route path="/what-has-not-changed" element={<WhatHasNotChanged />} />
                <Route path="/what-we-know-so-far" element={<WhatWeKnowSoFar />} />
                <Route path="/what-is-being-discussed" element={<WhatIsBeingDiscussed />} />
                <Route path="/what-we-do-not-know" element={<WhatWeDoNotKnow />} />
                <Route path="/what-the-leaks-are-saying" element={<WhatTheLeaksAreSaying />} />
                <Route path="/what-the-leaks-do-not-mean" element={<WhatTheLeaksDoNotMean />} />
                <Route path="/what-this-could-mean" element={<WhatThisCouldMean />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/questions-and-answers" element={<QuestionsAndAnswers />} />
                <Route path="/community-questions" element={<CommunityQuestions />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/sources" element={<Sources />} />
                <Route path="/statistics-and-data" element={<StatisticsAndData />} />
                <Route path="/about" element={<About />} />
                <Route path="/neurodiversity-global" element={<NeurodiversityGlobal />} />
                <Route path="/rich-ferriman" element={<RichFerriman />} />
                <Route path="/why-i-built-this" element={<WhyIBuiltThis />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
