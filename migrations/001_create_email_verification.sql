-- Create email_verification table
CREATE TABLE IF NOT EXISTS email_verification (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  variant VARCHAR(100) NOT NULL,
  section VARCHAR(50) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP WITH TIME ZONE,
  cta_text VARCHAR(100),
  email_domain VARCHAR(100)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_email_verification_email ON email_verification(email);
CREATE INDEX IF NOT EXISTS idx_email_verification_variant ON email_verification(variant);
CREATE INDEX IF NOT EXISTS idx_email_verification_token ON email_verification(verification_token);
CREATE INDEX IF NOT EXISTS idx_email_verification_verified ON email_verification(verified);

-- Enable Row Level Security
ALTER TABLE email_verification ENABLE ROW LEVEL SECURITY;

-- Create policies for email verification
CREATE POLICY "Allow public to insert email verifications" ON email_verification
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public to read own email verifications" ON email_verification
  FOR SELECT USING (true);

CREATE POLICY "Allow service role to update email verifications" ON email_verification
  FOR UPDATE USING (true);