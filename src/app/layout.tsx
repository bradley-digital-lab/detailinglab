import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://detailinglab.vercel.app'),
  title: "Detailing Lab | Elite Mobile Detailing & Ceramic Coating Yorkshire",
  description: "Yorkshire's premier mobile detailing unit. High-end paint correction, 9H ceramic coating, and interior restoration delivered perfectly to your door.",
  openGraph: {
    title: 'Detailing Lab | Elite Mobile Detailing',
    description: "Yorkshire's premier mobile detailing unit. Expert paint correction and true ceramic coating.",
    url: 'https://detailinglab.vercel.app',
    siteName: 'Detailing Lab',
    images: [
      {
        url: '/hero_outdoor_new.png', // Fallback high-res OG image using existing valid asset structure
        width: 1200,
        height: 630,
        alt: 'Detailing Lab Yorkshire Mobile Unit',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Detailing Lab | Mobile Detailing',
    description: "Flawless mobile paint correction & ceramic coatings in Yorkshire.",
    images: ['/hero_outdoor_new.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import { FooterWrapper } from "@/components/FooterWrapper";
import { CookieBanner } from "@/components/CookieBanner";
import { ThemeProvider } from "@/components/theme-provider";
import GeofenceSchema from "@/components/seo/GeofenceSchema";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-black selection:bg-cyan-500/30" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex-1 relative z-0">
             {children}
          </div>
          <FooterWrapper />
          <CookieBanner />
          <GeofenceSchema />
        </ThemeProvider>
      </body>
    </html>
  );
}
