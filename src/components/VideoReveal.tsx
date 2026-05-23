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
      // Entry Animation
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      
      tl.fromTo(".hero-data-node", 
        { opacity: 0, x: -20 }, 
        { opacity: 1, x: 0, stagger: 0.1, duration: 1 }, 0.5
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

      // Scroll Parallax
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
      
      {/* Loading overlay */}
      <div className={`absolute inset-0 z-50 bg-black transition-opacity duration-1000 ${videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

      {/* Background Video */}
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

      {/* Overlays - more subtle to see background mesh */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] z-10" />

      {/* Main Content */}
      <div ref={contentRef} className="relative z-20 h-full flex flex-col items-center justify-center px-6">
        
        {/* Terminal Data Header */}
        <div className="absolute top-32 left-6 md:left-12 flex flex-col gap-2">
          {[
            "STATUS: OPERATIONAL",
            "LATENCY: 14MS",
            "NODES: 19,402",
            "LOC: 28.6139° N, 77.2090° E"
          ].map((text, i) => (
            <div key={i} className="hero-data-node flex items-center gap-3">
              <div className="w-1 h-1 bg-[#00ff87] shadow-[0_0_8px_#00ff87]" />
              <span className="text-[10px] text-terminal font-bold tracking-[0.2em]">{text}</span>
            </div>
          ))}
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-6xl">
          <h1 className="hero-main-title heading-huge mb-6">
            SHIP BRIDGE
          </h1>
          <p className="hero-description text-xl md:text-2xl text-white/60 font-light tracking-tight max-w-2xl mx-auto mb-12">
            The intelligent operating system for <span className="text-white font-medium">Pan-India logistics</span>. Precision delivery, automated at scale.
          </p>
          
          <div className="hero-cta-group flex flex-col sm:flex-row gap-6 justify-center">
            <button className="btn-precision">Initialize Shipping</button>
            <button className="btn-outline">View Node Map</button>
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-12 w-full px-6 md:px-12 flex justify-between items-end border-t border-white/5 pt-8">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-white/30 uppercase tracking-[0.3em]">AI Engine v2.4</span>
            <div className="flex gap-4">
              <span className="text-xs font-bold text-[#00ff87]">29k+ PINCODES</span>
              <span className="text-xs font-bold text-white/60">24/7 MONITORING</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className="scroll-mouse" />
            <span className="text-[9px] text-white/20 uppercase tracking-[0.4em]">Scroll to Explore</span>
          </div>
        </div>
      </div>
    </section>
  );
}
