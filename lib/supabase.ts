import { createClient } from '@supabase/supabase-js';

// Database types
export interface EmailVerification {
  id?: string;
  email: string;
  variant: string;
  section: string;
  verified: boolean;
  verification_token: string;
  created_at?: string;
  verified_at?: string;
  cta_text: string;
  email_domain: string;
}

export interface VerificationToken {
  id?: string;
  email: string;
  token: string;
  expires_at: string;
  used: boolean;
  created_at?: string;
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl && 
         supabaseAnonKey && 
         !supabaseUrl.includes('your-project') &&
         !supabaseAnonKey.includes('your-anon-key');
};

if (!isSupabaseConfigured()) {
  console.warn('⚠️ Supabase credentials not configured. Email storage will run in test mode.');
}

// Public client for browser
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Service client for server-side operations (with elevated permissions)
export const supabaseAdmin = isSupabaseConfigured() && supabaseServiceKey
  ? createClient(supabaseUrl!, supabaseServiceKey)
  : null;

// Email verification operations
export const emailService = {
  async addEmailCapture(data: Omit<EmailVerification, 'id' | 'created_at'>): Promise<{ success: boolean; data?: EmailVerification; error?: string }> {
    if (!supabase) {
      console.warn('⚠️ Supabase not configured - Using test mode');
      return { 
        success: true, 
        data: { 
          id: Date.now().toString(),
          ...data, 
          created_at: new Date().toISOString(),
          warning: 'Test mode - data not persisted'
        } as EmailVerification
      };
    }

    try {
      // Check if email already exists for this variant
      const { data: existing } = await supabase
        .from('email_verification')
        .select('*')
        .eq('email', data.email)
        .eq('variant', data.variant)
        .single();

      if (existing) {
        return { success: false, error: 'Email already registered for this variant' };
      }

      // Add new email capture
      const { data: capture, error } = await supabase
        .from('email_verification')
        .insert([data])
        .select()
        .single();

      if (error) throw error;

      return { success: true, data: capture };
    } catch (error) {
      console.error('Error adding email capture:', error);
      return { success: false, error: 'Failed to capture email' };
    }
  },

  async verifyEmailByToken(token: string): Promise<{ success: boolean; data?: EmailVerification; error?: string }> {
    if (!supabaseAdmin) {
      console.warn('⚠️ Supabase admin not configured - Using test mode');
      return { 
        success: true, 
        data: {
          id: 'test-id',
          email: 'test@example.com',
          variant: 'test',
          section: 'test',
          verified: true,
          verification_token: token,
          verified_at: new Date().toISOString(),
          cta_text: 'Test',
          email_domain: 'example.com',
          warning: 'Test mode - verification not persisted'
        } as EmailVerification
      };
    }

    try {
      // Find the email record by token
      const { data: emailRecord, error: fetchError } = await supabaseAdmin
        .from('email_verification')
        .select('*')
        .eq('verification_token', token)
        .single();

      if (fetchError || !emailRecord) {
        return { success: false, error: 'Invalid or expired verification token' };
      }

      // Check if already verified
      if (emailRecord.verified) {
        return { 
          success: true, 
          data: emailRecord,
          error: 'Email already verified'
        };
      }

      // Check if token is expired (24 hours)
      const tokenAge = Date.now() - new Date(emailRecord.created_at!).getTime();
      const twentyFourHours = 24 * 60 * 60 * 1000;
      
      if (tokenAge > twentyFourHours) {
        return { success: false, error: 'Verification token has expired' };
      }

      // Mark as verified
      const { data: verifiedRecord, error: updateError } = await supabaseAdmin
        .from('email_verification')
        .update({ 
          verified: true,
          verified_at: new Date().toISOString()
        })
        .eq('verification_token', token)
        .select()
        .single();

      if (updateError) throw updateError;

      return { success: true, data: verifiedRecord };
    } catch (error) {
      console.error('Error verifying email:', error);
      return { success: false, error: 'Failed to verify email' };
    }
  },

  async getEmailStats(): Promise<{ total: number; verified: number; variants: Record<string, number> }> {
    if (!supabase) {
      return { total: 0, verified: 0, variants: {} };
    }

    try {
      const { data, error } = await supabase
        .from('email_verification')
        .select('*');

      if (error) throw error;

      const stats = {
        total: data?.length || 0,
        verified: data?.filter(s => s.verified).length || 0,
        variants: {} as Record<string, number>
      };

      // Count by variant
      data?.forEach(email => {
        stats.variants[email.variant] = (stats.variants[email.variant] || 0) + 1;
      });

      return stats;
    } catch (error) {
      console.error('Error getting email stats:', error);
      return { total: 0, verified: 0, variants: {} };
    }
  }
};

// Database setup functions
export const setupSupabaseSchema = async (): Promise<{ success: boolean; error?: string }> => {
  if (!supabaseAdmin) {
    console.warn('⚠️ Supabase admin not configured - Schema setup skipped');
    return { success: true };
  }

  try {
    // Note: In production, these would be run as SQL migrations in Supabase dashboard
    // This is a check/verification function
    const { data, error } = await supabaseAdmin
      .from('email_verification')
      .select('count(*)')
      .limit(1);

    if (error && error.message.includes('relation "email_verification" does not exist')) {
      return { 
        success: false, 
        error: 'Email verification table does not exist. Please run the migration SQL in your Supabase dashboard.' 
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error checking Supabase schema:', error);
    return { success: false, error: 'Failed to verify database schema' };
  }
};

// SQL Migration for Supabase (to be run in Supabase dashboard)
export const supabaseMigrationSQL = `
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
`;