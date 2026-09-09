import Navbar from "@/components/navbar";
import { ClientLayout } from "@/components/client-layout";

import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  keywords: [
    "Rohit Manvar",
    "Portfolio",
    "AI Engineer",
    "Data Engineer",
    "Software Developer",
    "FastAPI Developer",
    "PostgreSQL Developer",
    "RAG Developer",
    "SaaS Developer",
    "Data Engineering",
    "AI/ML",
    "Data Scientist",
    "Software Engineer",
    "Next.js Portfolio",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  alternates: {
    canonical: DATA.url,
  },
  openGraph: {
    title: `${DATA.name} | Data Engineering & AI/ML Portfolio`,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${DATA.name} — Portfolio`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name} | Data Engineering & AI/ML Portfolio`,
    description: DATA.description,
    card: "summary_large_image",
    images: ["/og.png"],
  },
  verification: {
    google: "",
    yandex: "",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  url: DATA.url,
  jobTitle: "Software Developer",
  worksFor: {
    "@type": "Organization",
    name: "Faber Infinite",
    url: "https://faberinfinite.com/",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: DATA.location,
    addressCountry: "IN",
  },
  sameAs: Object.values(DATA.contact.social)
    .filter((s) => s.navbar)
    .map((s) => s.url),
  knowsAbout: [
    "AI Engineering",
    "Data Engineering",
    "FastAPI",
    "PostgreSQL",
    "RAG",
    "SaaS Development",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider delayDuration={0}>
            <div className="max-w-2xl mx-auto px-container-padding">
              <ClientLayout>{children}</ClientLayout>
            </div>

            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
