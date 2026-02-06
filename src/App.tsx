import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Start from "./pages/Start";
import WhereWeAreNow from "./pages/WhereWeAreNow";
import WhatIsChanging from "./pages/WhatIsChanging";
import WhatHasNotChanged from "./pages/WhatHasNotChanged";
import WhatWeKnowSoFar from "./pages/WhatWeKnowSoFar";
import WhatIsBeingDiscussed from "./pages/WhatIsBeingDiscussed";
import WhatWeDoNotKnow from "./pages/WhatWeDoNotKnow";
import WhatTheLeaksAreSaying from "./pages/WhatTheLeaksAreSaying";
import WhatTheLeaksDoNotMean from "./pages/WhatTheLeaksDoNotMean";
import WhatThisCouldMean from "./pages/WhatThisCouldMean";
import Timeline from "./pages/Timeline";
import QuestionsAndAnswers from "./pages/QuestionsAndAnswers";
import Sources from "./pages/Sources";
import StatisticsAndData from "./pages/StatisticsAndData";
import About from "./pages/About";
import NeurodiversityGlobal from "./pages/NeurodiversityGlobal";
import RichFerriman from "./pages/RichFerriman";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/start" element={<Start />} />
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
          <Route path="/sources" element={<Sources />} />
          <Route path="/statistics-and-data" element={<StatisticsAndData />} />
          <Route path="/about" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/neurodiversity-global" element={<NeurodiversityGlobal />} />
          <Route path="/rich-ferriman" element={<RichFerriman />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
