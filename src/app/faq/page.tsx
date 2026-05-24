"use client";

import { useState } from "react";
import TextReveal from "@/components/TextReveal";
import SectionAurora from "@/components/SectionAurora";

const faqs = [
  {
    q: "SYSTEM_DEFINITION: WHAT IS SHIPBRIDGE?",
    a: "ShipBridge is an AI-powered logistics operating system designed for the high-frequency Indian commerce market. We provide the intelligence layer that automates carrier selection, RTO mitigation, and real-time node tracking.",
  },
  {
    q: "CARRIER_MESH: WHICH PARTNERS ARE INTEGRATED?",
    a: "The network integrates BlueDart, Delhivery, Ecom Express, XpressBees, and 20+ other major carriers via unified API nodes. Our AI engine orchestrates these partners based on real-time performance telemetry.",
  },
  {
    q: "RTO_MITIGATION: HOW IS RETURN RISK REDUCED?",
    a: "We utilize predictive neural models that analyze pincode-level delivery patterns and customer historical data to flag high-risk COD orders before they enter the shipping cycle, reducing RTO by up to 40%.",
  },
  {
    q: "API_CAPABILITY: SCALE AND LIMITS?",
    a: "Our infrastructure is built for enterprise scale, capable of processing 100k+ shipments daily with <15ms API latency and 99.9% terminal uptime.",
  }
];

function FAQItem({ question, answer, open, onToggle }: { question: string; answer: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`holo-glass rounded-xl overflow-hidden transition-all duration-300 ${open ? 'border-[#FF9933]/30 bg-[#FF9933]/5' : 'border-white/5'}`}>
      <button
        className="w-full flex items-center justify-between gap-4 p-6 text-left"
        onClick={onToggle}
      >
        <span className={`font-mono text-xs md:text-sm tracking-widest ${open ? 'text-[#FF9933]' : 'text-white/60'}`}>{question}</span>
        <div className={`w-6 h-6 border flex items-center justify-center shrink-0 transition-all duration-300 ${open ? 'bg-[#FF9933] border-[#FF9933] rotate-45' : 'border-white/20'}`}>
          <span className={`text-lg font-mono leading-none ${open ? 'text-black' : 'text-white/40'}`}>+</span>
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-out-expo ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="px-6 pb-6 text-white/50 text-sm leading-relaxed font-light border-t border-white/5 pt-4 italic">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="relative min-h-screen text-white bg-black logistics-grid">
      <div className="scanning-line" />
      
      <section className="relative pt-48 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="text-terminal text-[10px] font-bold tracking-[0.4em] mb-4 block uppercase">Central Terminal</span>
          <h1 className="heading-huge mb-12">Knowledge Base</h1>
          
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.q}
                answer={faq.a}
                open={openIndex === idx}
                onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto holo-glass p-12 rounded-3xl text-center border-white/10">
          <h2 className="text-2xl font-bold mb-4 font-mono tracking-tighter">UNRESOLVED_QUERY?</h2>
          <p className="text-white/40 text-sm mb-8">Access human-level support nodes via our priority channel.</p>
          <a href="/contact" className="btn-precision inline-block">Initialize Contact</a>
        </div>
      </section>
    </main>
  );
}
