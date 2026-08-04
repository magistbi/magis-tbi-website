import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { magisIdentity } from "@/lib/magis-content";
import { getSiteMetadataBase } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: getSiteMetadataBase(),
  title: {
    default: "Innovation Hub",
    template: "%s | ADNU MAGIS TBI",
  },
  description:
    "ADNU MAGIS TBI is the Ateneo de Naga University technology business incubator for startup growth, mentorship, spaces, and community impact.",
  keywords: [
    "ADNU MAGIS TBI",
    "Ateneo de Naga University",
    "technology business incubator",
    "startup incubator",
    "innovation hub",
  ],
  icons: {
    icon: "/icon.png",
  },
  openGraph: {
    siteName: "ADNU MAGIS TBI",
    title: "Innovation Hub",
    description: magisIdentity.intro,
    type: "website",
    images: [
      {
        url: "/home-of-magis.jpg",
        width: 1600,
        height: 900,
        alt: "ADNU MAGIS TBI home of MAGIS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Innovation Hub",
    description: magisIdentity.intro,
    images: ["/home-of-magis.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-screen bg-background font-sans text-foreground">
        <MotionProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
