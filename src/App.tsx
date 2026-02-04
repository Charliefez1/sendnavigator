import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WhereWeAreNow from "./pages/WhereWeAreNow";
import WhatIsChanging from "./pages/WhatIsChanging";
import WhatTheLeaksAreSaying from "./pages/WhatTheLeaksAreSaying";
import WhatThisCouldMean from "./pages/WhatThisCouldMean";
import Timeline from "./pages/Timeline";
import QuestionsAndAnswers from "./pages/QuestionsAndAnswers";
import Sources from "./pages/Sources";
import About from "./pages/About";
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
          <Route path="/where-we-are-now" element={<WhereWeAreNow />} />
          <Route path="/what-is-changing" element={<WhatIsChanging />} />
          <Route path="/what-the-leaks-are-saying" element={<WhatTheLeaksAreSaying />} />
          <Route path="/what-this-could-mean" element={<WhatThisCouldMean />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/questions-and-answers" element={<QuestionsAndAnswers />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
