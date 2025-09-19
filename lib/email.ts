import { Resend } from 'resend';

// Check if Resend is properly configured
const isResendConfigured = () => {
  return process.env.RESEND_API_KEY && 
         !process.env.RESEND_API_KEY.includes('your_') &&
         process.env.RESEND_API_KEY.startsWith('re_');
};

// Only initialize Resend if properly configured
const resend = isResendConfigured() 
  ? new Resend(process.env.RESEND_API_KEY!)
  : null;

export interface EmailVerificationData {
  email: string;
  variant: string;
  verificationToken: string;
  appUrl: string;
}

export async function sendVerificationEmail(data: EmailVerificationData) {
  const { email, variant, verificationToken, appUrl } = data;
  
  // Check if Resend is configured
  if (!resend) {
    console.warn('⚠️ Resend not configured - Email not sent');
    console.warn('To enable email sending, add RESEND_API_KEY to .env.local');
    // Return success to allow testing without email service
    return { 
      success: true, 
      emailId: 'test-mode-no-email-sent',
      warning: 'Email service not configured - running in test mode'
    };
  }
  
  // Variant-specific email content
  const variantContent = {
    "timezone-freedom": {
      subject: "Verify your email - Join the LocalSphere Timezone Freedom Beta",
      headline: "Ready to work your own hours?",
      description: "You're one step away from joining teams who've reclaimed their schedules with LocalSphere."
    },
    "information-findability": {
      subject: "Verify your email - Get instant access to any information",
      headline: "Never search through Slack again",
      description: "You're about to join teams who find any decision, update, or file in seconds with LocalSphere."
    },
    "unified-productivity": {
      subject: "Verify your email - Unify your team's workflow",
      headline: "One inbox for everything",
      description: "You're joining teams who've eliminated app chaos and streamlined their workflow with LocalSphere."
    }
  };

  const content = variantContent[variant as keyof typeof variantContent];
  const verificationUrl = `${appUrl}/verify/${verificationToken}`;

  try {
    const { data: emailResult, error } = await resend.emails.send({
      from: 'LocalSphere <onboarding@resend.dev>',
      to: [email],
      subject: content.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email - LocalSphere</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; margin-top: 40px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
            
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600;">LocalSphere</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Remote Team Communication Platform</p>
            </div>

            <!-- Content -->
            <div style="padding: 40px;">
              <h2 style="color: #1f2937; margin: 0 0 16px 0; font-size: 24px; font-weight: 600;">${content.headline}</h2>
              
              <p style="color: #4b5563; margin: 0 0 24px 0; font-size: 16px; line-height: 1.6;">
                ${content.description}
              </p>

              <p style="color: #6b7280; margin: 0 0 32px 0; font-size: 14px;">
                Please click the button below to verify your email address and complete your registration:
              </p>

              <!-- CTA Button -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${verificationUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                  Verify My Email Address
                </a>
              </div>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
                <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.5;">
                  If the button doesn't work, you can copy and paste this link into your browser:<br>
                  <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
                </p>
                
                <p style="color: #9ca3af; margin: 16px 0 0 0; font-size: 12px;">
                  This verification link will expire in 24 hours. If you didn't request this email, you can safely ignore it.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="background: #f9fafb; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; margin: 0; font-size: 14px;">
                © 2025 LocalSphere. Building the future of remote team communication.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        ${content.headline}
        
        ${content.description}
        
        Please verify your email address by visiting this link:
        ${verificationUrl}
        
        This link will expire in 24 hours. If you didn't request this email, you can safely ignore it.
        
        © 2025 LocalSphere
      `
    });

    if (error) {
      console.error('Resend email error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }

    return { success: true, emailId: emailResult?.id };
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
}