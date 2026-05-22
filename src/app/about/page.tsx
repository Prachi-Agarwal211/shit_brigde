"use client";

import Image from "next/image";
import TextReveal from "@/components/TextReveal";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-[#050505]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Subtle background gradient glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00ff87]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#f97316]/[0.01] blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-5 md:pt-48 md:pb-24 md:px-12 max-w-7xl mx-auto z-10">
        <div className="w-full">
          <span className="text-[#00ff87] text-[10px] tracking-[0.35em] uppercase font-bold mb-4 block animate-fade-in font-mono">
            ESTABLISHED 2024
          </span>
          <TextReveal 
            text="ShipBridge" 
            elementType="h1"
            className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.95] tracking-tighter mb-4 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30" 
          />
          <p className="text-xl md:text-2xl text-white/50 tracking-tight font-light font-display max-w-3xl mb-12">
            AI-Powered Shipping & Logistics for India
          </p>
          
          <div className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-[#00ff87]/20 transition-all duration-500">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/30 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-medium font-display leading-tight text-white/90">
              India&apos;s most intelligent multi-courier shipping platform — helping D2C brands, SMEs, and marketplace sellers grow faster.
            </h2>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 px-5 md:px-12 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "19,000+", label: "Pincodes Covered" },
            { value: "20+", label: "Courier Partners" },
            { value: "500+", label: "Brands Served" },
            { value: "99.8%", label: "Platform Uptime" }
          ].map((stat, idx) => (
            <div 
              key={idx} 
              className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:bg-white/[0.03] hover:border-white/10 transition-all duration-300 text-center group"
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-black text-[#00ff87] font-display mb-2 drop-shadow-[0_0_15px_rgba(0,255,135,0.15)] group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-[10px] md:text-xs uppercase tracking-widest text-white/40 font-bold font-mono">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story & Visual Section */}
      <section className="relative py-16 md:py-24 px-5 md:px-12 max-w-7xl mx-auto z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00ff87]/10 bg-[#00ff87]/5 text-[#00ff87] text-[10px] uppercase tracking-wider font-semibold font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
              Our Mission
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight">
              Simplifying the Complexity of Indian Logistics.
            </h3>
            
            <div className="w-12 h-1 bg-[#00ff87] rounded-full" />
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light font-sans">
              Founded with the vision to bridge the gap between Indian brands and their customers, ShipBridge is an AI-powered logistics platform built specifically for the unique challenges of the Indian market. We understand that shipping in India isn&apos;t just about distance — it&apos;s about navigating 19,000+ pincodes, managing COD cycles, and reducing RTO.
            </p>
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light font-sans">
              Our platform integrates with over 20 leading courier partners to provide real-time rate comparisons, automated courier selection, and end-to-end tracking. By leveraging advanced machine learning, we help brands predict RTO risks and optimize delivery routes, ensuring every package reaches its destination faster and more reliably.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full relative aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] group hover:border-[#00ff87]/20 transition-all duration-500">
              <Image 
                src="/og-image.svg" 
                alt="ShipBridge Platform Dashboard" 
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-full object-contain p-8 opacity-80 group-hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#00ff87] font-bold block mb-1 font-mono">
                  The Platform
                </span>
                <span className="text-sm font-semibold font-display text-white">
                  AI-Powered Shipping Console
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="relative py-16 md:py-24 px-5 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[#00ff87] text-[10px] tracking-[0.35em] uppercase font-bold mb-4 block font-mono">
            CORE CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
            Our AI-Powered Services
          </h2>
          <p className="text-xs md:text-sm text-white/40 mt-4 max-w-2xl mx-auto font-light font-sans">
            Providing comprehensive technology solutions to automate your entire shipping workflow and improve delivery performance across India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🤖",
              title: "AI Courier Selection",
              desc: "Smart allocation engine that chooses the best courier for every order.",
              items: [
                "Real-time rate comparison",
                "Serviceable pincode verification",
                "Performance-based routing",
                "Automated weight reconciliation",
                "Carrier-specific rule engine"
              ]
            },
            {
              icon: "📊",
              title: "Unified Tracking & NDR",
              desc: "Real-time visibility for both brands and customers with automated NDR handling.",
              items: [
                "White-labeled tracking pages",
                "WhatsApp/SMS notifications",
                "Automated NDR resolution",
                "Exception alerts & monitoring",
                "POD (Proof of Delivery) sync"
              ]
            },
            {
              icon: "💸",
              title: "COD & Remittance",
              desc: "Comprehensive management of Cash on Delivery orders and fund reconciliation.",
              items: [
                "Early COD remittance",
                "Automated payment tracking",
                "Remittance cycle visibility",
                "Payment gateway integration",
                "COD order verification (IVR/WA)"
              ]
            },
            {
              icon: "🔄",
              title: "Returns & RTO Mgmt",
              desc: "Intelligent systems to predict, reduce, and manage returns effectively.",
              items: [
                "RTO prediction models",
                "Reverse pickup automation",
                "Quality check at doorstep",
                "Warehouse return logging",
                "Customer return portal"
              ]
            },
            {
              icon: "🚛",
              title: "B2B & LTL Shipping",
              desc: "Scaling your logistics beyond D2C with bulk and heavy cargo solutions.",
              items: [
                "Surface & Air LTL shipping",
                "Multi-location pickup",
                "Bulk manifest generation",
                "E-way bill automation",
                "Docket-level tracking"
              ]
            },
            {
              icon: "🔌",
              title: "Ecosystem Integrations",
              desc: "Seamlessly connect with your existing store and inventory systems.",
              items: [
                "Shopify, WooCommerce, Magento",
                "Amazon, Flipkart, Myntra",
                "WMS & ERP connectors",
                "Custom API access",
                "Inventory sync in real-time"
              ]
            }
          ].map((service, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 hover:shadow-[0_0_30px_rgba(0,255,135,0.03)] transition-all duration-300 flex flex-col group relative"
            >
              <div className="text-3xl mb-6 bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-[#00ff87]/10 group-hover:border-[#00ff87]/20 transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold font-display text-white mb-2">{service.title}</h3>
              <p className="text-xs text-white/50 mb-6 font-light leading-relaxed">{service.desc}</p>
              
              <div className="mt-auto pt-4 border-t border-white/5">
                <ul className="space-y-2">
                  {service.items.map((item, iIdx) => (
                    <li key={iIdx} className="text-xs text-white/70 font-light flex items-start gap-2">
                      <span className="text-[#00ff87] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Accreditations */}
      <section className="relative py-16 md:py-24 px-5 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[#00ff87] text-[10px] tracking-[0.35em] uppercase font-bold mb-4 block font-mono">
            TECHNOLOGY & PARTNERSHIP
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
            Trust & Infrastructure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "ISO 27001 Certified",
              desc: "Ensuring the highest standards of data security and privacy for your brand and customer information.",
              tag: "SECURITY STANDARDS"
            },
            {
              title: "Tier-1 Cloud Infra",
              desc: "Built on high-availability cloud architecture to ensure 99.9% uptime for your shipping operations.",
              tag: "RELIABILITY"
            },
            {
              title: "Strategic Partnerships",
              desc: "Deep API integrations with BlueDart, Delhivery, Ecom Express, XpressBees, and 20+ other carriers.",
              tag: "CARRIER NETWORK"
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-md hover:bg-white/[0.02] hover:border-white/10 transition-all duration-300 relative flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <span className="text-[9px] tracking-widest uppercase font-mono font-bold text-[#00ff87] block">
                  {item.tag}
                </span>
                <h3 className="text-xl font-bold font-display text-white">{item.title}</h3>
                <p className="text-sm text-white/50 font-light leading-relaxed font-sans">{item.desc}</p>
              </div>
              <div className="text-2xl text-[#00ff87] opacity-25 mt-8 group-hover:opacity-100 transition-opacity duration-300 font-mono">
                ✦
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Statement Call-to-Action */}
      <section className="relative py-20 px-5 md:px-12 max-w-5xl mx-auto z-10 text-center">
        <div className="p-8 md:p-16 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent backdrop-blur-3xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/25 to-transparent" />
          <p className="text-lg md:text-2xl leading-relaxed font-light font-display text-white/90">
            &ldquo;At ShipBridge, we blend advanced AI technology with deep operational expertise, ensuring every Indian brand can compete at scale. We continue to lead in shipping innovation, RTO reduction, and logistics automation — helping businesses rediscover the freedom to grow.&rdquo;
          </p>
        </div>
      </section>
    </main>
  );
}
