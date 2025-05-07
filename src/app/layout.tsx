import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from 'next/headers';
import "@/app/globals.css";
import Providers from "@/components/providers";
import { supaServerAppReadOnly } from "@/lib/supabase/server-app";
import LayoutClientStructure from "@/components/LayoutClientStructure";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Dentalysis - AI Dental Practice Analytics",
  description: "Analyze your practice data with AI insights.",
  generator: "v0.dev",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const supabase = supaServerAppReadOnly(cookieStore);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers session={session}>
          <LayoutClientStructure user={user ?? null}>
            {children}
          </LayoutClientStructure>
        </Providers>
      </body>
    </html>
  );
}
