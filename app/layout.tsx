import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ADNU MAGIS TBI | Innovation Hub",
  description: "ADNU MAGIS TBI landing page for innovation programs, spaces, alumni, events, and support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth antialiased">
      <body className="min-h-full bg-background font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
