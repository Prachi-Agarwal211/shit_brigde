"use client";

import Link from "next/link";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

export default function PricingPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden text-center">
        <SectionAurora variant="dual" className="opacity-40" />
        <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block relative z-10">
          Pricing
        </span>
        <TextReveal
          text="Simple, transparent pricing"
          elementType="h1"
          className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display relative z-10"
        />
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed relative z-10">
          Pay only for what you ship. No hidden fees, no long-term contracts. Per-shipment pricing designed for Indian businesses of all sizes.
        </p>
      </section>

      {/* Pricing cards */}
      <section className="relative py-24 md:py-32 px-5 md:px-12 bg-transparent overflow-hidden">
        <SectionAurora variant="ember" className="opacity-20" />
        <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Starter",
              price: "Pay per ship",
              desc: "For small businesses and individual sellers getting started with online shipping.",
              features: ["Up to 500 shipments/month", "Multi-courier access", "Basic tracking", "Label generation", "Email support"],
              cta: "Get Started",
              highlight: false,
            },
            {
              name: "Growth",
              price: "Custom pricing",
              desc: "For growing D2C brands and SMEs shipping across India every day.",
              features: ["Up to 5,000 shipments/month", "AI courier selection", "COD management", "NDR automation", "Returns management", "Shopify/WooCommerce integration", "Priority support"],
              cta: "Book a Demo",
              highlight: true,
            },
            {
              name: "Enterprise",
              price: "Volume pricing",
              desc: "For large businesses and marketplace sellers with high-volume shipping needs.",
              features: ["Unlimited shipments", "Dedicated account manager", "Custom API integration", "Advanced analytics", "RTO prediction AI", "SLA guarantees", "24/7 priority support"],
              cta: "Contact Sales",
              highlight: false,
            },
          ].map((plan, idx) => (
            <div key={idx} className={`bento-card p-8 md:p-10 flex flex-col relative overflow-hidden ${plan.highlight ? 'border-[#00ff87]/30' : ''}`}>
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00ff87] to-[#00ff87]/20" />
              )}
              {plan.highlight && (
                <span className="text-[10px] uppercase tracking-widest text-[#00ff87] bg-[#00ff87]/10 px-3 py-1 rounded-full font-medium absolute top-6 right-6">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-white mb-2 font-display">{plan.name}</h3>
              <div className="text-3xl font-black text-white mb-4 font-display">{plan.price}</div>
              <p className="text-white/50 text-sm mb-8 font-light">{plan.desc}</p>
              <ul className="space-y-3 mb-10 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/60 text-sm">
                    <svg className="w-4 h-4 text-[#00ff87] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="button-wrap w-full">
                <Link href="/contact" className="uiverse-button w-full group">
                  <span>{plan.cta} →</span>
                </Link>
                <div className="button-shadow" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-sm text-center mt-10 font-light">
          All plans include access to 10+ courier partners covering 29,000+ pincodes across India. GST and courier charges apply separately.
        </p>
      </section>

      {/* FAQ tease */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center p-12 md:p-16 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 font-display">
            Questions about pricing?
          </h2>
          <p className="text-white/60 font-light mb-8 max-w-lg mx-auto">
            Check our FAQ or talk to our team for a personalised quote based on your shipping volume.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="button-wrap inline-flex">
              <Link href="/faq" className="uiverse-button group">
                <span>View FAQ</span>
              </Link>
              <div className="button-shadow" />
            </div>
            <Link href="/contact" className="text-white/50 hover:text-white transition-colors text-sm">
              Contact Sales →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
