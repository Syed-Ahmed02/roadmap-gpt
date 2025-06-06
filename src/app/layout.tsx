import { BlurHeader } from "@/components/sections/Header";
import { GoogleTagManager } from "@next/third-parties/google";
import "@xyflow/react/dist/style.css";
import { ReactFlow, Position, useNodesState, Node } from "@xyflow/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/themeprovider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roadmap GPT",
  description: "Learn your next skill with Ai for free",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    
        <html lang="en">
          <GoogleTagManager gtmId="G-4LVE7YDYB8" />
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <BlurHeader />

              {children}

            </ThemeProvider>
            <Toaster />
          </body>
        </html>
    </ClerkProvider>
  );
}
