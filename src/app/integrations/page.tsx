"use client";

import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

const integrations = [
  {
    name: "Shopify",
    desc: "Native integration. Sync orders, generate labels, and track shipments directly from your Shopify dashboard.",
    tag: "Available",
  },
  {
    name: "WooCommerce",
    desc: "Full-featured WordPress plugin with order sync, label generation, and real-time tracking updates.",
    tag: "Available",
  },
  {
    name: "Magento",
    desc: "Seamless integration with Adobe Commerce / Magento stores. Supports multi-store setups.",
    tag: "Available",
  },
  {
    name: "Custom API",
    desc: "RESTful API with webhook support. Integrate ShipBridge with any platform or custom application.",
    tag: "Available",
  },
];

const couriers = [
  "Delhivery", "Blue Dart", "DTDC", "XpressBees",
  "Ecom Express", "India Post", "Shadowfax", "Amazon Shipping",
  "Ekart", "Maruti Courier",
];

export default function IntegrationsPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden text-center">
        <SectionAurora variant="dual" className="opacity-40" />
        <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block relative z-10">
          Integrations
        </span>
        <TextReveal
          text="Works with your stack"
          elementType="h1"
          className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display relative z-10"
        />
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
          ShipBridge connects with leading ecommerce platforms and all major Indian courier partners — one integration, every carrier.
        </p>
      </section>

      {/* Ecommerce Platforms */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 bg-transparent overflow-hidden">
        <SectionAurora variant="ember" className="opacity-20" />
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 font-display text-center">
            Ecommerce Platform Integrations
          </h2>
          <p className="text-white/50 text-center mb-16 max-w-lg mx-auto font-light">
            Connect your store in minutes and start shipping with AI-powered courier selection.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((item, idx) => (
              <div key={idx} className="bento-card p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-white font-display">{item.name}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-[#00ff87] bg-[#00ff87]/10 px-3 py-1 rounded-full font-medium">
                    {item.tag}
                  </span>
                </div>
                <p className="text-white/60 text-sm leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courier Partners */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 overflow-hidden">
        <SectionAurora variant="subtle" className="opacity-20" />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 font-display">
            Courier Partner Network
          </h2>
          <p className="text-white/50 mb-16 max-w-lg mx-auto font-light">
            ShipBridge connects you to every major courier in India from one dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {couriers.map((courier, idx) => (
              <div
                key={idx}
                className="px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-lg text-white/70 text-sm font-medium hover:border-[#00ff87]/20 hover:text-[#00ff87] transition-all"
              >
                {courier}
              </div>
            ))}
          </div>
          <p className="text-white/30 text-sm mt-8 font-light">And more — we&apos;re constantly adding new courier partners.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center p-12 md:p-16 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 font-display">
            Connect your store today
          </h2>
          <p className="text-white/60 font-light mb-8 max-w-lg mx-auto">
            Our team will help you integrate in under 15 minutes.
          </p>
          <div className="button-wrap mx-auto inline-flex">
            <Link href="/contact" className="uiverse-button group">
              <span>Get Started →</span>
            </Link>
            <div className="button-shadow" />
          </div>
        </div>
      </section>
    </main>
  );
}
