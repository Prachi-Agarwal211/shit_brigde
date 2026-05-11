"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
  elementType?: React.ElementType;
}

export default function TextReveal({ text, className = "", elementType: Component = "h2" }: TextRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current.querySelectorAll('.word-inner'),
        { y: "110%" },
        {
          y: "0%",
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const words = text.split(" ");
  const Tag = Component as any;

  return (
    <Tag ref={containerRef} className={`text-reveal-char ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="char inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="word-inner inline-block transform translate-y-[110%] pb-1">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
