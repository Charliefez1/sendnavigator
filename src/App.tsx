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
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { CopyStandardsEnforcer } from "@/components/CopyStandardsEnforcer";
import { ScrollToTop } from "@/components/ScrollToTop";

// Lazy-loaded pages
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
const MyChildProfile = lazy(() => import("./pages/MyChildProfile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
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
                  <CopyStandardsEnforcer />
                  <ExperienceSelector />
                  <PageViewTracker />
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      {/* Public routes */}
                      <Route path="/landing" element={<Landing />} />
                      <Route path="/feature/send-reform" element={<FeatureSendReform />} />
                      <Route path="/feature/ehcp-guide" element={<FeatureEHCPGuide />} />
                      <Route path="/feature/my-child-profile" element={<FeatureMyChildProfile />} />
                      <Route path="/feature/what-to-do-now" element={<FeatureWhatToDoNow />} />
                      <Route path="/feature/ask-rich" element={<FeatureAskRich />} />
                      <Route path="/feature/sources" element={<FeatureSources />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/sources" element={<Sources />} />
                      <Route path="/statistics-and-data" element={<StatisticsAndData />} />
                      <Route path="/how-to-use" element={<HowToUse />} />
                      <Route path="/why-i-built-this" element={<WhyIBuiltThis />} />
                      <Route path="/rich-ferriman" element={<RichFerriman />} />
                      <Route path="/richs-take" element={<RichsTake />} />
                      <Route path="/neurodiversity-global" element={<NeurodiversityGlobal />} />
                      <Route path="/feedback" element={<Feedback />} />
                      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/sendiass" element={<Sendiass />} />
                      <Route path="/have-your-say" element={<HaveYourSay />} />
                      <Route path="/what-we-owe-our-children" element={<WhatWeOweOurChildren />} />
                      <Route path="/understanding-your-child" element={<UnderstandingYourChild />} />
                      <Route path="/understanding-your-child/autism" element={<UnderstandingAutism />} />
                      <Route path="/understanding-your-child/adhd" element={<UnderstandingADHD />} />
                      <Route path="/for-parents" element={<ForParents />} />
                      <Route path="/exclusions" element={<Exclusions />} />
                      <Route path="/ehcp-health" element={<EHCPHealth />} />
                      <Route path="/alternative-provision" element={<AlternativeProvision />} />
                      <Route path="/local-variation" element={<LocalVariation />} />
                      <Route path="/devolved-nations" element={<DevolvedNations />} />
                      <Route path="/my-child-profile" element={<ProtectedRoute><MyChildProfile /></ProtectedRoute>} />
                      <Route path="/reset-password" element={<ResetPassword />} />

                      {/* Protected routes */}
                      <Route path="/" element={<ProtectedRoute><Start /></ProtectedRoute>} />
                      <Route path="/quick-read" element={<ProtectedRoute><QuickRead /></ProtectedRoute>} />
                      <Route path="/ehcps" element={<ProtectedRoute><EHCPs /></ProtectedRoute>} />
                      <Route path="/post-16-and-transition" element={<ProtectedRoute><Post16AndTransition /></ProtectedRoute>} />
                      <Route path="/what-to-do-right-now" element={<ProtectedRoute><WhatToDoRightNow /></ProtectedRoute>} />

                      {/* State of SEND 2026 — report hub and sections */}
                      <Route path="/state-of-send-2026" element={<ProtectedRoute><StateOfSend2026 /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/where-we-are-now" element={<ProtectedRoute><WhereWeAreNow /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/what-is-changing" element={<ProtectedRoute><WhatIsChanging /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/what-has-not-changed" element={<ProtectedRoute><WhatHasNotChanged /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/what-is-being-discussed" element={<ProtectedRoute><WhatIsBeingDiscussed /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/what-we-do-not-know" element={<ProtectedRoute><WhatWeDoNotKnow /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/what-the-leaks-are-saying" element={<ProtectedRoute><WhatTheLeaksAreSaying /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/what-the-leaks-do-not-mean" element={<ProtectedRoute><WhatTheLeaksDoNotMean /></ProtectedRoute>} />
                      <Route path="/state-of-send-2026/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />

                      {/* Redirects from old paths */}
                      <Route path="/where-we-are-now" element={<Navigate to="/state-of-send-2026/where-we-are-now" replace />} />
                      <Route path="/what-is-changing" element={<Navigate to="/state-of-send-2026/what-is-changing" replace />} />
                      <Route path="/what-has-not-changed" element={<Navigate to="/state-of-send-2026/what-has-not-changed" replace />} />
                      <Route path="/what-we-know-so-far" element={<Navigate to="/state-of-send-2026/where-we-are-now" replace />} />
                      <Route path="/what-is-being-discussed" element={<Navigate to="/state-of-send-2026/what-is-being-discussed" replace />} />
                      <Route path="/what-we-do-not-know" element={<Navigate to="/state-of-send-2026/what-we-do-not-know" replace />} />
                      <Route path="/what-the-leaks-are-saying" element={<Navigate to="/state-of-send-2026/what-the-leaks-are-saying" replace />} />
                      <Route path="/what-the-leaks-do-not-mean" element={<Navigate to="/state-of-send-2026/what-the-leaks-do-not-mean" replace />} />
                      <Route path="/what-this-could-mean" element={<Navigate to="/state-of-send-2026/what-is-being-discussed" replace />} />
                      <Route path="/what-happens-next" element={<Navigate to="/state-of-send-2026/timeline" replace />} />
                      <Route path="/timeline" element={<Navigate to="/state-of-send-2026/timeline" replace />} />

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
