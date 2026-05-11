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
  const pillRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const descriptorRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
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
      const wordmark = wordmarkRef.current;
      const descriptor = descriptorRef.current;
      const video = videoRef.current;
      const pill = pillRef.current;
      const stats = statsRef.current;
      const scrollInd = scrollIndicatorRef.current;

      // Entry timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (pill) {
        tl.fromTo(pill, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.3);
      }

      if (wordmark) {
        tl.fromTo(wordmark, { filter: "blur(12px)", opacity: 0 }, { filter: "blur(0px)", opacity: 1, duration: 1.4 }, 0.6);
      }

      if (descriptor) {
        tl.fromTo(descriptor, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 1.2);
      }

      if (stats) {
        tl.fromTo(stats, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.4);
      }

      if (scrollInd) {
        tl.fromTo(scrollInd, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.6);
      }

      // Scroll parallax
      if (wordmark) {
        gsap.to(wordmark, {
          y: -80,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          }
        });
      }

      if (descriptor) {
        gsap.to(descriptor, {
          y: -120,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400",
            scrub: 1.5,
          }
        });
      }

      if (video) {
        gsap.to(video, {
          scale: 1.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          }
        });
      }

      if (pill) {
        gsap.to(pill, {
          y: -40,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=200",
            scrub: 1.5,
          }
        });
      }

      if (scrollInd) {
        gsap.to(scrollInd, {
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top +=100",
            end: "+=200",
            scrub: 1.5,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden bg-[#030303]">
      {/* Loading overlay */}
      <div
        className={`absolute inset-0 z-20 bg-[#030303] transition-opacity duration-700 ${videoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      />

      {/* Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        poster="/video-poster.svg"
      >
        <source src="/km_20260506_1080p_30f_20260506_205259.mp4" type="video/mp4" />
      </video>

      {/* Subtle vignette on edges only — keeps center clean */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-10" />

      {/* Bottom gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-[#030303] to-transparent pointer-events-none z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
        {/* Top pill */}
        <div ref={pillRef} className="mb-10 opacity-0">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] text-[9px] tracking-[0.25em] uppercase text-white/50 font-medium backdrop-blur-xl shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            AI · Logistics · Platform · 2026
          </span>
        </div>

        {/* Premium wordmark — glass white aesthetic */}
        <h1
          ref={wordmarkRef}
          className="select-none text-center opacity-0 relative"
          style={{
            fontSize: 'clamp(3.5rem, 14vw, 12rem)',
            letterSpacing: '-0.04em',
            fontWeight: 200,
            lineHeight: 0.9,
          }}
        >
          <span
            className="relative block"
            style={{
              whiteSpace: 'nowrap',
              color: '#ffffff',
              opacity: 0.85,
              textShadow: '0 0 80px rgba(0,0,0,0.6), 0 4px 32px rgba(0,0,0,0.3)',
            }}
          >
            SHIP BRIDGE
          </span>
        </h1>
      </div>

      {/* Bottom-left descriptor — glass */}
      <div
        ref={descriptorRef}
        className="absolute bottom-12 left-6 md:left-12 z-20 opacity-0"
      >
        <div className="inline-block px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-lg">
          <p className="italic text-lg md:text-2xl text-white/60 leading-tight">
            // AI-Powered
          </p>
          <p className="text-xl md:text-3xl font-bold text-white/90 leading-tight -mt-1">
            Global Logistics
          </p>
        </div>
      </div>

      {/* Bottom-right stats */}
      <div
        ref={statsRef}
        className="absolute bottom-12 right-6 md:right-12 z-20 text-right opacity-0 hidden md:block"
      >
        <div className="inline-block px-6 py-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-lg">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-medium mb-2">Scope</p>
          <p className="text-sm font-bold text-white/80">50+ Countries</p>
          <p className="text-sm text-white/50">AI-Native Platform</p>
        </div>
      </div>

      {/* Scroll mouse indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-0"
      >
        <div className="scroll-mouse" />
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/20 font-medium">Scroll</span>
      </div>
    </section>
  );
}
