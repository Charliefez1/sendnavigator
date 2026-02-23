
-- Page review checklist: tracks when each page was last manually reviewed
CREATE TABLE public.page_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL UNIQUE,
  page_name text NOT NULL,
  last_reviewed_at timestamp with time zone,
  reviewed_by text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.page_reviews ENABLE ROW LEVEL SECURITY;

-- No public access - admin only via service role
CREATE POLICY "No public access to page_reviews"
  ON public.page_reviews FOR SELECT
  USING (false);

-- Pre-populate with every page on the site
INSERT INTO public.page_reviews (page_path, page_name) VALUES
  ('/', 'Start / Home'),
  ('/landing', 'Landing Page'),
  ('/about', 'About'),
  ('/sources', 'Sources & Evidence Base'),
  ('/statistics-and-data', 'Statistics & Data'),
  ('/how-to-use', 'How to Use This Site'),
  ('/why-i-built-this', 'Why I Built This'),
  ('/rich-ferriman', 'Rich Ferriman'),
  ('/neurodiversity-global', 'Neurodiversity Global'),
  ('/feedback', 'Feedback'),
  ('/sendiass', 'SENDIASS'),
  ('/have-your-say', 'Have Your Say'),
  ('/what-we-owe-our-children', 'What We Owe Our Children'),
  ('/understanding-your-child', 'Understanding Your Child'),
  ('/understanding-your-child/autism', 'Understanding Autism'),
  ('/understanding-your-child/adhd', 'Understanding ADHD'),
  ('/for-parents', 'For Parents'),
  ('/exclusions', 'Exclusions'),
  ('/ehcp-health', 'EHCP Health'),
  ('/alternative-provision', 'Alternative Provision'),
  ('/local-variation', 'Local Variation'),
  ('/devolved-nations', 'Devolved Nations'),
  ('/my-child-profile', 'My Child Profile'),
  ('/quick-read', 'Quick Read'),
  ('/ehcps', 'EHCPs'),
  ('/post-16-and-transition', 'Post-16 & Transition'),
  ('/what-to-do-right-now', 'What To Do Right Now'),
  ('/state-of-send-2026', 'State of SEND 2026'),
  ('/state-of-send-2026/where-we-are-now', 'Where We Are Now'),
  ('/state-of-send-2026/what-is-changing', 'What Is Changing'),
  ('/state-of-send-2026/what-has-not-changed', 'What Has Not Changed'),
  ('/state-of-send-2026/what-is-being-discussed', 'What Is Being Discussed'),
  ('/state-of-send-2026/what-we-do-not-know', 'What We Do Not Know'),
  ('/state-of-send-2026/what-the-leaks-are-saying', 'What The Leaks Are Saying'),
  ('/state-of-send-2026/what-the-leaks-do-not-mean', 'What The Leaks Do Not Mean'),
  ('/state-of-send-2026/timeline', 'Timeline'),
  ('/questions-and-answers', 'Questions & Answers'),
  ('/community-questions', 'Community Questions');
