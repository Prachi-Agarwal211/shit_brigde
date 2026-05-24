"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if already visited this session (with privacy mode safety)
    let alreadyLoaded = false;
    try {
      alreadyLoaded = sessionStorage.getItem("shipbridge-loaded") === "true";
    } catch {
      // sessionStorage unavailable (e.g. private/incognito mode)
    }
    if (alreadyLoaded) {
      setLoading(false);
      return;
    }

    const ctx = gsap.context(() => {
      // Master timeline for the preloader
      const tl = gsap.timeline();

      // 1. Stagger entrance of brand text
      const textChildren = textRef.current?.children;
      if (textChildren) {
        tl.fromTo(
          textChildren,
          { y: 50, opacity: 0, rotateX: 15 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
        );
      }

      // 2. Tagline fade in
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        "-=0.2"
      );

      // 3. Animated dots
      const dotChildren = dotsRef.current?.children;
      if (dotChildren) {
        tl.fromTo(
          dotChildren,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: "back.out(2)" },
          "-=0.1"
        );
      }

      // 4. Progress bar fill animation
      tl.to(
        barRef.current,
        { 
          width: "100%", 
          duration: 1.2, 
          ease: "power4.inOut",
          onUpdate: () => {
            if (progressRef.current && barRef.current) {
              const progress = barRef.current.offsetWidth / barRef.current.parentElement!.offsetWidth;
              progressRef.current.textContent = `${Math.round(progress * 100)}%`;
            }
          }
        },
        "-=0.3"
      );

      // 5. Hold briefly
      tl.to({}, { duration: 0.6 });

      // 6. Exit sequence
      tl.to(
        textRef.current,
        { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" }
      );
      tl.to(
        taglineRef.current,
        { opacity: 0, y: -20, duration: 0.3, ease: "power2.in" },
        "<"
      );
      tl.to(
        dotsRef.current,
        { opacity: 0, scale: 0.5, duration: 0.3, ease: "power2.in" },
        "<"
      );
      tl.to(
        ".preloader-loader",
        { opacity: 0, duration: 0.3 },
        "<"
      );
      tl.to(
        ".preloader-bg",
        { 
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          duration: 0.9, 
          ease: "power4.inOut",
          onComplete: () => {
            sessionStorage.setItem("shipbridge-loaded", "true");
            setLoading(false);
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!loading) return null;

  return (
    <div ref={containerRef} className="preloader-bg fixed inset-0 z-[10000] bg-[#020203] flex items-center justify-center overflow-hidden">
      {/* Logistics grid overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 153, 51, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 153, 51, 0.04) 1px, transparent 1px)`,
          backgroundSize: "40px 40px"
        }}
      />

      {/* Scanning line animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 right-0 h-px animate-preloader-scan"
          style={{
            background: "linear-gradient(90deg, transparent, #FF9933, #138808, transparent)",
            boxShadow: "0 0 20px rgba(255, 153, 51, 0.15), 0 0 40px rgba(19, 136, 8, 0.1)"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Brand name */}
        <div ref={textRef} className="text-center mb-2">
          <div className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
            <span className="text-white">Ship</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-white to-[#138808] ml-3">
              Bridge
            </span>
          </div>
        </div>

        {/* Tricolor decorative dots */}
        <div ref={dotsRef} className="flex items-center gap-2.5 mb-5 mt-1">
          <span className="w-2 h-2 rounded-full bg-[#FF9933] shadow-[0_0_8px_rgba(255,153,51,0.5)]" />
          <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
          <span className="w-2 h-2 rounded-full bg-[#138808] shadow-[0_0_8px_rgba(19,136,8,0.5)]" />
        </div>

        {/* Tagline */}
        <div ref={taglineRef} className="opacity-0 mb-8">
          <p className="text-xs md:text-sm text-white/40 tracking-[0.25em] uppercase font-light">
            <span className="text-[#FF9933]">India</span>
            <span className="text-white/20 mx-2">·</span>
            <span className="text-white/60">AI Logistics</span>
            <span className="text-white/20 mx-2">·</span>
            <span className="text-[#138808]">OS</span>
          </p>
        </div>

        {/* Loading indicator */}
        <div className="preloader-loader w-56 md:w-72">
          {/* Progress bar track */}
          <div className="relative h-px w-full bg-white/5 overflow-hidden rounded-full mb-2">
            <div
              ref={barRef}
              className="absolute inset-y-0 left-0 w-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #FF9933, #ffffff, #138808)",
                boxShadow: "0 0 12px rgba(255,153,51,0.3), 0 0 24px rgba(19,136,8,0.15)"
              }}
            />
          </div>
          {/* Percentage */}
          <div className="flex justify-between items-center">
            <span className="text-[8px] text-white/20 tracking-[0.3em] uppercase font-mono">
              booting
            </span>
            <span
              ref={progressRef}
              className="text-[10px] text-white/40 font-mono tabular-nums"
            >
              0%
            </span>
          </div>
        </div>
      </div>


    </div>
  );
}
