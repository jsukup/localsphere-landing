import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/lib/analytics/posthog-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LocalSphere - AI-Powered Async Communication for Remote Teams",
  description: "We help remote-first businesses achieve heightened productivity asynchronously by consolidating internal and external communications into a cohesive platform orchestrated by AI.",
  keywords: "remote work, async communication, AI, team productivity, timezone coordination",
  openGraph: {
    title: "LocalSphere - Never Wake Up at 5 AM for Another Meeting",
    description: "Finally work in your timezone while staying perfectly synced with global teams.",
    type: "website",
    url: "https://localsphere.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "LocalSphere - AI-Powered Async Communication", 
    description: "Work your hours. Stay connected. Stop juggling 10 different apps.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PostHog Analytics initialized via PostHogProvider */}
      </head>
      <body className={inter.className}>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
