"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

// Inline arrow SVGs
const ArrowLeft = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

const ArrowRight = ({ color }: { color: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default function CircularTestimonials({
  testimonials,
  autoplay = true,
}: CircularTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(activeIndex);

  // Keep ref in sync
  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials],
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 5000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Animate quote text with GSAP when activeIndex changes
  useEffect(() => {
    if (!quoteRef.current) return;

    const words = quoteRef.current.querySelectorAll('.quote-word');
    gsap.fromTo(words,
      { filter: "blur(10px)", opacity: 0, y: 5 },
      {
        filter: "blur(0px)", opacity: 1, y: 0,
        duration: 0.25,
        stagger: 0.025,
        ease: "power2.out",
      }
    );
  }, [activeIndex]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Keyboard navigation — use ref to avoid stale closures
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      }
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [testimonialsLength]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto" as const,
        transform: "translateX(0px) translateY(0px) scale(1) rotateY(0deg)",
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto" as const,
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto" as const,
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none" as const,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        {/* Image carousel */}
        <div ref={imageContainerRef} className="relative w-full h-[20rem] md:h-[26rem]">
          {testimonials.map((testimonial, index) => (
            <Image
              key={testimonial.src}
              src={testimonial.src}
              alt={testimonial.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
              className="absolute w-full h-full object-cover rounded-2xl shadow-xl"
              data-index={index}
              style={getImageStyle(index)}
            />
          ))}
        </div>

        {/* Text content */}
        <div className="flex flex-col justify-between min-h-[16rem]">
          <div>
            <h3
              className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text mb-1"
              style={{
                backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))',
              }}
            >
              {activeTestimonial.name}
            </h3>
            <p className="text-sm text-[#00ff87] tracking-wider uppercase font-medium mb-6">
              {activeTestimonial.designation}
            </p>
            <div
              ref={quoteRef}
              className="text-white/40 leading-relaxed text-base md:text-lg font-light"
            >
              {activeTestimonial.quote.split(" ").map((word, i) => (
                <span
                  key={`${activeIndex}-${i}`}
                  className="quote-word inline-block"
                >
                  {word}&nbsp;
                </span>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <div className="flex gap-5 pt-8">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 border-none"
              style={{ backgroundColor: hoverPrev ? "#00ff87" : "rgba(255,255,255,0.08)" }}
              onMouseEnter={() => setHoverPrev(true)}
              onMouseLeave={() => setHoverPrev(false)}
              aria-label="Previous"
            >
              <ArrowLeft color={hoverPrev ? "#050505" : "rgba(255,255,255,0.6)"} />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 border-none"
              style={{ backgroundColor: hoverNext ? "#00ff87" : "rgba(255,255,255,0.08)" }}
              onMouseEnter={() => setHoverNext(true)}
              onMouseLeave={() => setHoverNext(false)}
              aria-label="Next"
            >
              <ArrowRight color={hoverNext ? "#050505" : "rgba(255,255,255,0.6)"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
