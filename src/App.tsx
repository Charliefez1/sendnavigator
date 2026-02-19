import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ExperienceModeProvider } from "@/contexts/ExperienceModeContext";
import { PageSectionsProvider } from "@/contexts/PageSectionsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ExperienceSelector } from "@/components/ExperienceSelector";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Lazy-loaded pages
const Landing = lazy(() => import("./pages/Landing"));
const Start = lazy(() => import("./pages/Start"));
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
const WhatHappensNext = lazy(() => import("./pages/WhatHappensNext"));
const Timeline = lazy(() => import("./pages/Timeline"));
const QuestionsAndAnswers = lazy(() => import("./pages/QuestionsAndAnswers"));
const Sources = lazy(() => import("./pages/Sources"));
const StatisticsAndData = lazy(() => import("./pages/StatisticsAndData"));
const About = lazy(() => import("./pages/About"));
const WhatToDoRightNow = lazy(() => import("./pages/WhatToDoRightNow"));
const NeurodiversityGlobal = lazy(() => import("./pages/NeurodiversityGlobal"));
const RichFerriman = lazy(() => import("./pages/RichFerriman"));
const WhyIBuiltThis = lazy(() => import("./pages/WhyIBuiltThis"));
const CommunityQuestions = lazy(() => import("./pages/CommunityQuestions"));
const Feedback = lazy(() => import("./pages/Feedback"));
const Admin = lazy(() => import("./pages/Admin"));
const QuickRead = lazy(() => import("./pages/QuickRead"));
const EHCPs = lazy(() => import("./pages/EHCPs"));
const Post16AndTransition = lazy(() => import("./pages/Post16AndTransition"));
const Sendiass = lazy(() => import("./pages/Sendiass"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-muted-foreground text-sm">Loading...</div>
    </div>
  );
}

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <ExperienceModeProvider>
              <PageSectionsProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <ExperienceSelector />
                  <PageViewTracker />
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      {/* Public routes */}
                      <Route path="/landing" element={<Landing />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/sources" element={<Sources />} />
                      <Route path="/statistics-and-data" element={<Sources />} />
                      <Route path="/how-to-use" element={<HowToUse />} />
                      <Route path="/why-i-built-this" element={<WhyIBuiltThis />} />
                      <Route path="/rich-ferriman" element={<RichFerriman />} />
                      <Route path="/neurodiversity-global" element={<NeurodiversityGlobal />} />
                      <Route path="/feedback" element={<Feedback />} />
                      <Route path="/sendiass" element={<Sendiass />} />

                      {/* Protected routes */}
                      <Route path="/" element={<ProtectedRoute><Start /></ProtectedRoute>} />
                      <Route path="/quick-read" element={<ProtectedRoute><QuickRead /></ProtectedRoute>} />
                      <Route path="/ehcps" element={<ProtectedRoute><EHCPs /></ProtectedRoute>} />
                      <Route path="/post-16-and-transition" element={<ProtectedRoute><Post16AndTransition /></ProtectedRoute>} />
                      <Route path="/what-to-do-right-now" element={<ProtectedRoute><WhatToDoRightNow /></ProtectedRoute>} />
                      <Route path="/where-we-are-now" element={<ProtectedRoute><WhereWeAreNow /></ProtectedRoute>} />
                      <Route path="/what-is-changing" element={<ProtectedRoute><WhatIsChanging /></ProtectedRoute>} />
                      <Route path="/what-has-not-changed" element={<ProtectedRoute><WhatHasNotChanged /></ProtectedRoute>} />
                      <Route path="/what-we-know-so-far" element={<ProtectedRoute><WhatWeKnowSoFar /></ProtectedRoute>} />
                      <Route path="/what-is-being-discussed" element={<ProtectedRoute><WhatIsBeingDiscussed /></ProtectedRoute>} />
                      <Route path="/what-we-do-not-know" element={<ProtectedRoute><WhatWeDoNotKnow /></ProtectedRoute>} />
                      <Route path="/what-the-leaks-are-saying" element={<ProtectedRoute><WhatTheLeaksAreSaying /></ProtectedRoute>} />
                      <Route path="/what-the-leaks-do-not-mean" element={<ProtectedRoute><WhatTheLeaksDoNotMean /></ProtectedRoute>} />
                      <Route path="/what-this-could-mean" element={<ProtectedRoute><WhatThisCouldMean /></ProtectedRoute>} />
                      <Route path="/what-happens-next" element={<ProtectedRoute><WhatHappensNext /></ProtectedRoute>} />
                      <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
                      <Route path="/questions-and-answers" element={<ProtectedRoute><QuestionsAndAnswers /></ProtectedRoute>} />
                      <Route path="/community-questions" element={<ProtectedRoute><CommunityQuestions /></ProtectedRoute>} />
                      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />

                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </Suspense>
                </BrowserRouter>
              </PageSectionsProvider>
            </ExperienceModeProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
