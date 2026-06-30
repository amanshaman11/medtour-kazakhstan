import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { LOGO_SRC } from "@/lib/constants/media";

const FAVICON_VERSION = "3";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://medtour.kz";
const siteName = "MedTour Kazakhstan";
const description =
  "One platform for international patients seeking medical treatment in Kazakhstan. Compare accredited hospitals, explore treatments, book accommodation, and get 24/7 personalized assistance.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MedTour Kazakhstan — Medical Tourism Platform",
    template: "%s | MedTour Kazakhstan",
  },
  description,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "health",
  keywords: [
    "medical tourism Kazakhstan",
    "Kazakhstan hospitals",
    "international patients",
    "hospital search Almaty",
    "medical travel packages",
    "IVF Kazakhstan",
    "cardiology Astana",
    "dental treatment Shymkent",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ru: "/",
      kk: "/",
      ar: "/",
      zh: "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName,
    title: "MedTour Kazakhstan — World-Class Medical Care",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "MedTour Kazakhstan — World-Class Medical Care",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  icons: {
    icon: [
      { url: `/favicon.ico?v=${FAVICON_VERSION}`, sizes: "48x48", type: "image/x-icon" },
      { url: LOGO_SRC, type: "image/jpeg" },
    ],
    apple: [{ url: `/apple-icon.png?v=${FAVICON_VERSION}`, type: "image/png", sizes: "180x180" }],
    shortcut: `/favicon.ico?v=${FAVICON_VERSION}`,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0b1a2e" },
    { media: "(prefers-color-scheme: dark)", color: "#060f1e" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <head>
        <link rel="icon" href={`/favicon.ico?v=${FAVICON_VERSION}`} sizes="any" />
        <link rel="icon" type="image/jpeg" href={LOGO_SRC} />
        <link rel="apple-touch-icon" href={`/apple-icon.png?v=${FAVICON_VERSION}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `if("scrollRestoration" in history){history.scrollRestoration="manual";}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <I18nProvider>
          <MotionProvider>
            <AuthProvider>{children}</AuthProvider>
          </MotionProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
