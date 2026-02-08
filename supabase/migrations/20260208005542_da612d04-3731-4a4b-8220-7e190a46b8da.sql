
-- User-submitted questions
CREATE TABLE public.user_questions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT,
  page_submitted_from TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_questions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a question
CREATE POLICY "Anyone can submit questions"
  ON public.user_questions FOR INSERT
  WITH CHECK (true);

-- Only approved questions visible publicly
CREATE POLICY "Public can view approved questions"
  ON public.user_questions FOR SELECT
  USING (status = 'approved');

-- User feedback/comments
CREATE TABLE public.user_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  feedback TEXT NOT NULL,
  feedback_type TEXT NOT NULL DEFAULT 'comment' CHECK (feedback_type IN ('comment', 'suggestion', 'issue')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.user_feedback ENABLE ROW LEVEL SECURITY;

-- Anyone can submit feedback
CREATE POLICY "Anyone can submit feedback"
  ON public.user_feedback FOR INSERT
  WITH CHECK (true);

-- Only approved feedback visible publicly
CREATE POLICY "Public can view approved feedback"
  ON public.user_feedback FOR SELECT
  USING (status = 'approved');
