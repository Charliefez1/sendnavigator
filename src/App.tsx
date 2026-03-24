import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PageViewTracker } from "@/components/PageViewTracker";
import { ExperienceModeProvider } from "@/contexts/ExperienceModeContext";
import { PageSectionsProvider } from "@/contexts/PageSectionsContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ExperienceSelector } from "@/components/ExperienceSelector";


import { ScrollToTop } from "@/components/ScrollToTop";

// Lazy-loaded pages
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const Landing = lazy(() => import("./pages/Landing"));
const Start = lazy(() => import("./pages/Start"));
const HowToUse = lazy(() => import("./pages/HowToUse"));
const WhereWeAreNow = lazy(() => import("./pages/WhereWeAreNow"));
const WhatIsChanging = lazy(() => import("./pages/WhatIsChanging"));
const WhatHasNotChanged = lazy(() => import("./pages/WhatHasNotChanged"));

const WhatIsBeingDiscussed = lazy(() => import("./pages/WhatIsBeingDiscussed"));
const WhatWeDoNotKnow = lazy(() => import("./pages/WhatWeDoNotKnow"));
const WhatTheLeaksAreSaying = lazy(() => import("./pages/WhatTheLeaksAreSaying"));
const WhatTheLeaksDoNotMean = lazy(() => import("./pages/WhatTheLeaksDoNotMean"));
const Timeline = lazy(() => import("./pages/Timeline"));
const QuestionsAndAnswers = lazy(() => import("./pages/QuestionsAndAnswers"));
const Sources = lazy(() => import("./pages/Sources"));
const StatisticsAndData = lazy(() => import("./pages/StatisticsAndData"));
const About = lazy(() => import("./pages/About"));
const WhatToDoRightNow = lazy(() => import("./pages/WhatToDoRightNow"));
const NeurodiversityGlobal = lazy(() => import("./pages/NeurodiversityGlobal"));
const RichFerriman = lazy(() => import("./pages/RichFerriman"));
const RichsTake = lazy(() => import("./pages/RichsTake"));
const WhyIBuiltThis = lazy(() => import("./pages/WhyIBuiltThis"));
const CommunityQuestions = lazy(() => import("./pages/CommunityQuestions"));
const Feedback = lazy(() => import("./pages/Feedback"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Admin = lazy(() => import("./pages/Admin"));
const QuickRead = lazy(() => import("./pages/QuickRead"));
const EHCPs = lazy(() => import("./pages/EHCPs"));
const Post16AndTransition = lazy(() => import("./pages/Post16AndTransition"));
const Sendiass = lazy(() => import("./pages/Sendiass"));
const HaveYourSay = lazy(() => import("./pages/HaveYourSay"));
const WhatWeOweOurChildren = lazy(() => import("./pages/WhatWeOweOurChildren"));
const StateOfSend2026 = lazy(() => import("./pages/StateOfSend2026"));
const UnderstandingYourChild = lazy(() => import("./pages/UnderstandingYourChild"));
const UnderstandingAutism = lazy(() => import("./pages/UnderstandingAutism"));
const UnderstandingADHD = lazy(() => import("./pages/UnderstandingADHD"));
const ForParents = lazy(() => import("./pages/ForParents"));
const Exclusions = lazy(() => import("./pages/Exclusions"));
const EHCPHealth = lazy(() => import("./pages/EHCPHealth"));
const AlternativeProvision = lazy(() => import("./pages/AlternativeProvision"));
const LocalVariation = lazy(() => import("./pages/LocalVariation"));
const DevolvedNations = lazy(() => import("./pages/DevolvedNations"));
const HowThisSiteWorks = lazy(() => import("./pages/HowThisSiteWorks"));
const MyChildProfile = lazy(() => import("./pages/MyChildProfile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HomeTest = lazy(() => import("./pages/HomeTest"));
const FeatureSendReform = lazy(() => import("./pages/landing/FeatureSendReform"));
const FeatureEHCPGuide = lazy(() => import("./pages/landing/FeatureEHCPGuide"));
const FeatureMyChildProfile = lazy(() => import("./pages/landing/FeatureMyChildProfile"));
const FeatureWhatToDoNow = lazy(() => import("./pages/landing/FeatureWhatToDoNow"));
const FeatureAskRich = lazy(() => import("./pages/landing/FeatureAskRich"));
const FeatureSources = lazy(() => import("./pages/landing/FeatureSources"));

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
                  <ScrollToTop />
                  
                  <ExperienceSelector />
                  <PageViewTracker />
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      {/* Coming soon gate — blocks all access */}
                      <Route path="*" element={<ComingSoon />} />
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
