"use client";

import { useRef, forwardRef, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const MagneticButton = forwardRef<HTMLDivElement, MagneticButtonProps>(({
  children,
  className = "",
  strength = 0.3,
  onMouseEnter,
  onMouseLeave
}, ref) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const button = buttonRef.current;
    if (!wrap || !button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: relX * strength,
        y: relY * strength,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1.1, 0.4)"
      });
      if (onMouseLeave) onMouseLeave();
    };

    const handleMouseEnter = () => {
      if (onMouseEnter) onMouseEnter();
    };

    wrap.addEventListener("mousemove", handleMouseMove);
    wrap.addEventListener("mouseleave", handleMouseLeave);
    wrap.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      wrap.removeEventListener("mousemove", handleMouseMove);
      wrap.removeEventListener("mouseleave", handleMouseLeave);
      wrap.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [strength, onMouseEnter, onMouseLeave]);

  return (
    <div
      ref={(node) => {
        wrapRef.current = node;
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else ref.current = node;
        }
      }}
      className={`magnetic-wrap ${className}`}
    >
      <button ref={buttonRef} className="magnetic-button">
        {children}
      </button>
    </div>
  );
});

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
