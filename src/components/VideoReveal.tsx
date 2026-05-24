"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.readyState >= 2) { setVideoReady(true); return; }
    const onReady = () => setVideoReady(true);
    vid.addEventListener("loadeddata", onReady);
    return () => vid.removeEventListener("loadeddata", onReady);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      
      tl.fromTo(".hero-data-node", 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, stagger: 0.1, duration: 1 }, 0.5
      )
      .fromTo(".hero-pill", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1 }, 0.7
      )
      .fromTo(".hero-main-title", 
        { filter: "blur(20px)", opacity: 0, y: 40 }, 
        { filter: "blur(0px)", opacity: 1, y: 0, duration: 1.5 }, 0.8
      )
      .fromTo(".hero-description", 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1 }, 1.2
      )
      .fromTo(".hero-cta-group", 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 0.8 }, 1.4
      );

      gsap.to(".hero-main-title", {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom center",
          scrub: 1.5,
        }
      });

      gsap.to(".video-bg", {
        scale: 1.05,
        filter: "brightness(0.4)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-transparent">
      <div className="logistics-grid absolute inset-0 opacity-50" />
      <div className="scanning-line" />
      
      <div className={`absolute inset-0 z-50 bg-black transition-opacity duration-1000 ${videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="video-bg absolute inset-0 w-full h-full object-cover opacity-40"
        poster="/video-poster.svg"
      >
        <source src="/km_20260506_1080p_30f_20260506_205259.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] z-10" />

      <div ref={contentRef} className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-12 mt-12 md:mt-0">
        
        {/* Top Left Stats (Hidden on small mobile to save space) */}
        <div className="hidden md:flex absolute top-32 left-12 flex-col gap-2">
          {[
            "COVERAGE: PAN-INDIA",
            "FOCUS: D2C · SME · B2B",
            "CORE: COD & RETURNS",
            "LOC: BHARAT_NODE"
          ].map((text, i) => (
            <div key={i} className="hero-data-node flex items-center gap-3">
              <div className="w-1 h-1 bg-[#FF9933] shadow-[0_0_8px_#FF9933]" />
              <span className="text-[10px] text-terminal font-bold tracking-[0.2em]">{text}</span>
            </div>
          ))}
        </div>

        {/* Main Content Group */}
        <div className="text-center max-w-5xl w-full">
          
          {/* New India-First Pill */}
          <div className="hero-pill inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#FF9933]/30 bg-[#FF9933]/5 backdrop-blur-md mb-8">
            <div className="w-2 h-2 rounded-full bg-[#FF9933] animate-pulse shadow-[0_0_10px_#FF9933]" />
            <span className="text-[10px] md:text-xs text-[#FF9933] font-mono tracking-widest uppercase">Shipping Software · Pan-India · D2C · SME · COD</span>
          </div>

          <h1 className="hero-main-title heading-huge mb-12 text-[clamp(3rem,8vw,8rem)] leading-[0.9]">
            SHIP BRIDGE
          </h1>
          
          <div className="hero-cta-group flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto">
            <button className="btn-precision w-full sm:w-auto px-8 py-4">Book a Demo</button>
            <button className="btn-outline w-full sm:w-auto px-8 py-4">Explore Features</button>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-8 md:bottom-12 w-full px-6 md:px-12 flex justify-between items-end border-t border-white/5 pt-6 md:pt-8">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-white/30 uppercase tracking-[0.3em]">Platform Capabilities</span>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-1">
              <span className="text-xs font-bold text-[#138808]">29k+ PINCODES</span>
              <span className="hidden sm:block text-xs font-bold text-white/40">|</span>
              <span className="text-xs font-bold text-white/60 uppercase">COD & RTO AUTOMATION</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="scroll-mouse" />
            <span className="text-[8px] md:text-[9px] text-white/20 uppercase tracking-[0.4em] hidden md:block">Scroll to Explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
