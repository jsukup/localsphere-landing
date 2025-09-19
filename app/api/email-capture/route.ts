import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { emailService, setupSupabaseSchema } from '@/lib/supabase';
import { sendVerificationEmail } from '@/lib/email';

// Ensure required environment variables
const requiredEnvVars = ['RESEND_API_KEY', 'NEXT_PUBLIC_APP_URL'];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
}

export async function POST(request: NextRequest) {
  try {
    // Validate environment variables
    if (missingEnvVars.length > 0) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing required environment variables', missingEnvVars },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { email, variant, section, cta_text } = body;

    // Validate required fields
    if (!email || !variant || !section || !cta_text) {
      return NextResponse.json(
        { error: 'Missing required fields: email, variant, section, cta_text' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate variant
    const validVariants = ['timezone-freedom', 'information-findability', 'unified-productivity'];
    if (!validVariants.includes(variant)) {
      return NextResponse.json(
        { error: 'Invalid variant. Must be one of: ' + validVariants.join(', ') },
        { status: 400 }
      );
    }

    // Ensure database schema exists
    await setupSupabaseSchema();

    // Generate secure verification token
    const tokenData = `${email}-${variant}-${Date.now()}-${Math.random()}`;
    const verificationToken = await bcrypt.hash(tokenData, 10);
    // Make token URL-safe
    const urlSafeToken = verificationToken.replace(/[^a-zA-Z0-9]/g, '').substring(0, 32);

    // Extract email domain
    const email_domain = email.split('@')[1];

    // Store email in database
    const result = await emailService.addEmailCapture({
      email,
      variant,
      section,
      verification_token: urlSafeToken,
      verified: false,
      cta_text,
      email_domain
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to store email' },
        { status: 400 }
      );
    }

    // Send verification email
    await sendVerificationEmail({
      email,
      variant,
      verificationToken: urlSafeToken,
      appUrl: process.env.NEXT_PUBLIC_APP_URL!
    });

    // Track successful email capture (PostHog will be handled on frontend)
    console.log(`Email captured successfully: ${email} (${variant}/${section})`);

    return NextResponse.json({
      success: true,
      message: 'Verification email sent successfully',
      data: {
        email,
        variant,
        section,
        verificationRequired: true
      }
    });

  } catch (error) {
    console.error('Email capture API error:', error);
    
    // Return appropriate error response
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Email capture failed', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle non-POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts POST requests.' },
    { status: 405 }
  );
}