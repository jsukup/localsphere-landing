import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    // Verify email by token using Supabase service
    const result = await emailService.verifyEmailByToken(token);

    if (!result.success) {
      if (result.error === 'Email already verified') {
        return NextResponse.json({
          success: true,
          message: 'Email already verified',
          data: {
            email: result.data?.email,
            variant: result.data?.variant,
            verified_at: result.data?.verified_at,
            already_verified: true
          }
        });
      }

      const status = result.error?.includes('expired') ? 410 : 404;
      return NextResponse.json(
        { error: result.error },
        { status }
      );
    }

    const verifiedEmail = result.data!

    console.log(`Email verified successfully: ${verifiedEmail.email} (${verifiedEmail.variant})`);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
      data: {
        email: verifiedEmail.email,
        variant: verifiedEmail.variant,
        verified_at: verifiedEmail.verified_at,
        section: verifiedEmail.section
      }
    });

  } catch (error) {
    console.error('Email verification API error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle non-GET requests
export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts GET requests.' },
    { status: 405 }
  );
}