import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import BackgroundPaperShaders from "@/components/BackgroundPaperShaders";

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
  title: "ShipBridge — Global Logistics Solutions",
  description: "Bridging the gap in global logistics with seamless, reliable, and efficient shipping solutions. Express delivery, warehousing, and customs clearance.",
  // Open Graph for social sharing
  openGraph: {
    title: "ShipBridge — Global Logistics Solutions",
    description: "Bridging the gap in global logistics with seamless, reliable, and efficient shipping solutions.",
    type: "website",
    url: "https://shipbridge.com",
    siteName: "ShipBridge",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "ShipBridge Logistics",
      },
    ],
  },
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ShipBridge — Global Logistics Solutions",
    description: "Bridging the gap in global logistics with seamless, reliable, and efficient shipping solutions.",
    images: ["/og-image.svg"],
  },
  // Icons (optional)
  icons: {
    icon: "/og-image.svg",
    shortcut: "/og-image.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interTight.variable}`}>
      <body className="antialiased bg-[#030303] min-h-screen font-sans">
        <BackgroundPaperShaders />
        <Preloader />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}