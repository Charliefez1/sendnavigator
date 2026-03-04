ALTER TABLE saved_profiles
  ADD COLUMN IF NOT EXISTS consent_given_at timestamptz,
  ADD COLUMN IF NOT EXISTS report_mode text NOT NULL DEFAULT 'full',
  ADD COLUMN IF NOT EXISTS ai_report jsonb;