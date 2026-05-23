import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import BackgroundPaperShaders from "@/components/BackgroundPaperShaders";
import WhatsAppFloating from "@/components/WhatsAppFloating";

// Google Fonts - Clean Sans
import { Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shipbridge.com"),
  title: "ShipBridge — Pan-India AI Shipping & Logistics Platform",
  description: "ShipBridge helps Indian D2C brands, SMEs and marketplace sellers ship smarter with AI-powered multi-courier automation, COD management, real-time tracking, returns, and NDR handling. Built for India.",
  keywords: [
    "logistics software India",
    "AI shipping platform India",
    "pan-India shipping",
    "courier aggregator India",
    "D2C shipping India",
    "COD shipping India",
    "ecommerce shipping platform",
    "multi-courier shipping software",
    "Shopify shipping India",
    "shipment tracking India",
    "logistics platform for SMEs",
    "RTO management India",
    "NDR management ecommerce",
  ],
  robots: {
    index: true,
    follow: true,
  },
  // Open Graph for social sharing
  openGraph: {
    title: "ShipBridge — Pan-India AI Shipping & Logistics Platform",
    description: "AI-powered shipping platform for Indian D2C brands, SMEs and marketplace sellers. Multi-courier automation, COD, real-time tracking, returns management.",
    type: "website",
    url: "https://shipbridge.com",
    siteName: "ShipBridge",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ShipBridge — AI Shipping Platform for India",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ShipBridge — Pan-India AI Shipping & Logistics Platform",
    description: "AI-powered shipping platform for Indian D2C brands, SMEs and marketplace sellers. Multi-courier automation, COD, real-time tracking, returns management.",
    images: ["/og-image.svg"],
  },
  // Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ShipBridge",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI-powered shipping and logistics platform for Indian D2C brands, SMEs, and marketplace sellers. Multi-courier automation, COD management, real-time tracking, and returns management.",
  url: "https://shipbridge.com",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
  author: {
    "@type": "Organization",
    name: "ShipBridge Technologies Pvt Ltd",
    url: "https://shipbridge.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased bg-[#030303] min-h-screen font-sans">
        <BackgroundPaperShaders />
        <Preloader />
        <Header />
        <WhatsAppFloating />
        {children}
      </body>
    </html>
  );
}