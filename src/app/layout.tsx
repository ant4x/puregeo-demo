import type { Metadata } from "next";
import { Golos_Text, Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Wildflower Retreats — slow travel on the Georgian coast",
    template: "%s — Wildflower Retreats",
  },
  description:
    "Wildflower Retreats is a fictional demo site: small-group slow travel weeks on the Black Sea coast of Georgia.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "./",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Wildflower Retreats",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${golos.variable} ${lora.variable} h-full antialiased motion-safe:scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-[var(--font-body)]">
        <Header />
        {children}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
