"use client";

import { useState } from "react";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

const faqs = [
  {
    q: "What is ShipBridge?",
    a: "ShipBridge is an AI-powered shipping and logistics platform built for Indian businesses. We help D2C brands, SMEs, and marketplace sellers automate multi-courier shipping, manage COD orders, track shipments in real time, and reduce RTO — all from a single dashboard.",
  },
  {
    q: "Which courier partners does ShipBridge integrate with?",
    a: "ShipBridge integrates with all major Indian courier partners including Delhivery, Blue Dart, DTDC, XpressBees, Ecom Express, India Post, and more. Our AI engine automatically selects the best courier based on pincode, weight, dimensions, and delivery speed requirements.",
  },
  {
    q: "Is ShipBridge suitable for small businesses?",
    a: "Absolutely. ShipBridge is built for businesses of all sizes — from individual D2C sellers on Shopify to large enterprises processing thousands of orders daily. Our platform scales with your business, and our pricing is designed to be accessible for SMEs.",
  },
  {
    q: "Does ShipBridge support COD (Cash on Delivery) orders?",
    a: "Yes, COD management is a core feature. ShipBridge handles COD order processing, remittance tracking, and reconciliation automatically. You get real-time visibility into your COD collections and settlement status across all courier partners.",
  },
  {
    q: "How does ShipBridge reduce RTO (Return to Origin)?",
    a: "ShipBridge uses AI to predict RTO risk before shipment. Our system analyzes pincode-level delivery data, customer history, and order patterns to flag high-risk orders. We also automate NDR (Non-Delivery Report) resolution by retrying deliveries and notifying customers via WhatsApp and SMS.",
  },
  {
    q: "Can I use ShipBridge with my Shopify store?",
    a: "Yes. ShipBridge offers a native Shopify integration. Connect your store in minutes and start syncing orders, generating labels, tracking shipments, and managing returns directly from your dashboard. We also support WooCommerce, Magento, and custom API integrations.",
  },
  {
    q: "Does ShipBridge provide real-time tracking?",
    a: "Yes, every shipment processed through ShipBridge includes real-time tracking updates. Your customers receive tracking links via SMS and email, and you can monitor all shipments from a unified dashboard with live status updates.",
  },
  {
    q: "How does ShipBridge handle returns and reverse pickups?",
    a: "ShipBridge automates the entire returns workflow. Customers can initiate returns through your store, our system schedules a reverse pickup with the appropriate courier, and you get real-time status on returned items. RTO reconciliation is handled automatically.",
  },
  {
    q: "Is ShipBridge pan-India? Can I ship to tier-2 and tier-3 cities?",
    a: "Yes, ShipBridge is built for pan-India shipping. Our multi-courier network covers 29,000+ pincodes across India including metro cities, tier-2, tier-3 towns, and rural areas. Our AI automatically selects couriers with the best pincode-level serviceability.",
  },
  {
    q: "What is NDR management and how does ShipBridge help?",
    a: "NDR (Non-Delivery Report) is generated when a courier cannot deliver a package — due to customer unavailability, incorrect address, or other reasons. ShipBridge automates NDR resolution by sending automated notifications to customers, rescheduling delivery attempts, and providing actionable insights to reduce failed deliveries.",
  },
  {
    q: "Does ShipBridge offer label generation and batch printing?",
    a: "Yes. Generate shipping labels for all courier partners from one interface. ShipBridge supports batch label printing, manifest generation, and order forwarding — saving hours of manual work every day.",
  },
  {
    q: "How does pricing work?",
    a: "ShipBridge offers transparent, per-shipment pricing with no hidden fees. You only pay for what you use. Contact our team at contact@shipbridge.com for a personalised quote based on your shipping volume and requirements.",
  },
  {
    q: "Do you offer a demo?",
    a: "Yes, we offer free personalised demos for businesses of all sizes. Book a demo through our website and our team will walk you through the platform, answer your questions, and help you get started.",
  },
  {
    q: "Is my data safe with ShipBridge?",
    a: "Absolutely. ShipBridge follows industry-standard security practices including data encryption, secure APIs, and role-based access control. We comply with Indian data protection regulations, including the DPDP Act, 2023. Read our Privacy Policy for more details.",
  },
  {
    q: "How do I get started?",
    a: "Getting started is simple. Click 'Book a Demo' on our website, or reach out to us at contact@shipbridge.com. Our team will set up your account, help you integrate your store, and ensure you're shipping within days.",
  },
];

function FAQItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`bento-card overflow-hidden transition-all duration-300 ${open ? 'border-[#00ff87]/20' : ''}`}>
      <button
        className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
        onClick={onToggle}
      >
        <span className="text-white/90 font-medium text-sm md:text-base pr-4">{question}</span>
        <div className={`w-6 h-6 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-all duration-300 ${open ? 'bg-[#00ff87] border-[#00ff87]' : ''}`}>
          <svg
            className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-45' : ''} ${open ? 'text-[#0a0a0a]' : 'text-white/40'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out-expo ${
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8 text-white/60 text-sm leading-relaxed font-light border-t border-white/5 pt-4">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-transparent">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-5 md:pt-52 md:pb-32 md:px-12 overflow-hidden">
        <SectionAurora variant="dual" className="opacity-40" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <span className="text-[#00ff87] text-[10px] tracking-[0.3em] uppercase font-bold mb-6 block">
            Got Questions?
          </span>
          <TextReveal
            text="Frequently Asked Questions"
            elementType="h1"
            className="text-[clamp(3rem,7vw,6rem)] font-black leading-[0.95] tracking-tighter mb-8 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/10"
          />
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about ShipBridge. Can&apos;t find what you&apos;re looking for? <a href="/contact" className="text-[#00ff87] hover:underline underline-offset-4">Reach out to us</a>.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <SectionAurora variant="subtle" className="opacity-20" />
        <div className="max-w-3xl mx-auto relative z-10 space-y-3">
          {faqs.map((faq, idx) => (
            <FAQItem
              key={idx}
              question={faq.q}
              answer={faq.a}
              open={openIndex === idx}
              onToggle={() => toggleFAQ(idx)}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative pb-32 px-5 md:px-12 overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10 text-center p-12 md:p-16 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 font-display">
            Still have questions?
          </h2>
          <p className="text-white/60 font-light mb-8 max-w-lg mx-auto">
            Our team is happy to help. Reach out and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="button-wrap mx-auto inline-flex">
            <a href="/contact" className="uiverse-button group">
              <span>Contact Us →</span>
            </a>
            <div className="button-shadow" />
          </div>
        </div>
      </section>
    </main>
  );
}
