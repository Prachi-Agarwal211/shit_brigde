"use client";

import Image from "next/image";
import TextReveal from "@/components/TextReveal";

export default function AboutPage() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden bg-[#050505]">
      {/* Subtle background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      {/* Subtle background gradient glow (highly attenuated to prevent "smoky" or messy overlay) */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#00ff87]/[0.02] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#f97316]/[0.01] blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-5 md:pt-48 md:pb-24 md:px-12 max-w-7xl mx-auto z-10">
        <div className="w-full">
          <span className="text-[#00ff87] text-[10px] tracking-[0.35em] uppercase font-bold mb-4 block animate-fade-in font-mono">
            ESTABLISHED 1998
          </span>
          <TextReveal 
            text="Foot Care Jaipur" 
            elementType="h1"
            className="text-[clamp(3rem,7vw,6.5rem)] font-black leading-[0.95] tracking-tighter mb-4 font-display bg-clip-text text-transparent bg-gradient-to-b from-white to-white/30" 
          />
          <p className="text-xl md:text-2xl text-white/50 tracking-tight font-light font-display max-w-3xl mb-12">
            Artificial Limb Clinic Since 1998
          </p>
          
          <div className="p-8 md:p-12 rounded-3xl border border-white/5 bg-white/[0.01] backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden group hover:border-[#00ff87]/20 transition-all duration-500">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00ff87]/30 to-transparent" />
            <h2 className="text-2xl md:text-3xl font-medium font-display leading-tight text-white/90">
              Rajasthan&apos;s First Private Artificial Limb & Prosthetics Clinic — Trusted by Patients Worldwide.
            </h2>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-12 px-5 md:px-12 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { value: "1,998", label: "Founded" },
            { value: "25+", label: "Years of Excellence" },
            { value: "50,000+", label: "Patients Served" },
            { value: "12+", label: "Countries Served" }
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
              Our Journey
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold font-display leading-tight">
              Restoring Mobility, Confidence, and Quality of Life.
            </h3>
            
            <div className="w-12 h-1 bg-[#00ff87] rounded-full" />
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light font-sans">
              Founded in 1998, Foot Care Jaipur is Rajasthan&apos;s first private Artificial Limb Clinic and one of the world&apos;s leading centers for prosthetics, orthotics, and rehabilitation services. For over 25 years, we have been restoring mobility, confidence, and quality of life for patients from across India and around the world.
            </p>
            
            <p className="text-base md:text-lg text-white/60 leading-relaxed font-light font-sans">
              Our clinic specializes in the design, fitting, and customization of artificial limbs, braces, and orthotic supports — providing world-class care under one roof. We integrate cutting-edge diagnostics with meticulous craftsmanship to ensure a perfect fit and long-term comfort.
            </p>
          </div>
          
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full relative aspect-[4/3] rounded-[2rem] bg-gradient-to-br from-white/[0.02] to-transparent border border-white/10 overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.5)] group hover:border-[#00ff87]/20 transition-all duration-500">
              <Image 
                src="/clinic-showcase.png" 
                alt="Foot Care Jaipur modern clinic interior" 
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#00ff87] font-bold block mb-1 font-mono">
                  State of the Art
                </span>
                <span className="text-sm font-semibold font-display text-white">
                  Advanced Prosthetics Lab, Jaipur
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
            CLINICAL SPECIALTIES
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
            Our Specialized Services
          </h2>
          <p className="text-xs md:text-sm text-white/40 mt-4 max-w-2xl mx-auto font-light font-sans">
            Providing comprehensive custom solutions for orthotic bracing, artificial limbs, and posture correction under professional supervision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "🦿",
              title: "Prosthetics (Artificial Limbs)",
              desc: "Complete design, custom fitting, and training for amputees.",
              items: [
                "Above Knee Prosthesis (AK)",
                "Below Knee Prosthesis (BK)",
                "Upper Limb / Hand Prosthesis",
                "Mastectomy Lymphedema Care",
                "Breast Prosthesis Solutions"
              ]
            },
            {
              icon: "👣",
              title: "Conservative Foot Care",
              desc: "Non-surgical clinical management for foot pain and complex conditions.",
              items: [
                "Flat Foot Correction",
                "Diabetic Foot Management",
                "Heel & Arch Pain Relief",
                "Bunions, Corns & Calluses",
                "Charcot Foot & Foot Ulcer Care"
              ]
            },
            {
              icon: "🩹",
              title: "Custom Orthotics & Insoles",
              desc: "Handcrafted corrective inserts designed for weight-redistribution.",
              items: [
                "Custom Orthotic Insoles",
                "Pain-Relief Gel & Foam Insoles",
                "Posture Correction Support",
                "Sports Biomechanical Insoles",
                "Gait Cycle Alignments"
              ]
            },
            {
              icon: "🧍",
              title: "Spinal & Orthopedic Bracing",
              desc: "Anatomically molded structural orthoses for spinal and joint stabilization.",
              items: [
                "Scoliosis Correction Braces",
                "Kyphosis Supports",
                "Cervical Spondylosis Collars",
                "Knee, Hip & Back Pain Braces",
                "Osteoarthritis Offloader Bracing"
              ]
            },
            {
              icon: "🚶",
              title: "Neurological & Gait Care",
              desc: "Rehabilitative orthoses for neurological and neuromuscular disorders.",
              items: [
                "Polio Calipers & Braces",
                "Hemiplegia & Paraplegia Splints",
                "Foot Drop Splinting / AFOs",
                "Posture & Gait Rehabilitation",
                "Spasticity Control Orthotics"
              ]
            },
            {
              icon: "⚕️",
              title: "Vascular & Specialty Rehab",
              desc: "Specialized post-burn, vascular, and congenital rehabilitation therapy.",
              items: [
                "Varicose Veins & DVT Compression",
                "Lymphedema Pressure Sleeves",
                "Post-burn Pressure Garments",
                "Cosmetic Silicone Restorations",
                "Club Foot (CTEV) Management"
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

      {/* Accreditations & Recognitions */}
      <section className="relative py-16 md:py-24 px-5 md:px-12 max-w-7xl mx-auto z-10 border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[#00ff87] text-[10px] tracking-[0.35em] uppercase font-bold mb-4 block font-mono">
            TRUST & ACCREDITATION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight">
            Accreditations & Recognitions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "ALIMCO Fabricating Partner",
              desc: "Empaneled as Fabricating Agency for ALIMCO (Government of India) for prestigious rehabilitation camps.",
              tag: "GOVERNMENT EMPANELMENT"
            },
            {
              title: "Rajasthan's Pioneer",
              desc: "Rajasthan's First private artificial limb center — built with a strong legacy of clinical innovation and deep patient compassion.",
              tag: "HISTORIC FIRST"
            },
            {
              title: "Globally Trusted",
              desc: "Trusted by celebrities, professional athletes, and international patients worldwide for personalized, professional prosthetic care.",
              tag: "GLOBAL PRESTIGE"
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
            &ldquo;At Foot Care Jaipur, we blend medical expertise with compassion, ensuring each patient receives individualized assessment, advanced technology, and lifelong support. We continue to lead in artificial limb innovation, foot orthotics, and rehabilitation care — helping people rediscover the freedom to move, live, and smile again.&rdquo;
          </p>
        </div>
      </section>
    </main>
  );
}
