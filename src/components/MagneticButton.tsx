"use client";

import { useRef, useEffect, forwardRef } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // 0-1, default 0.3
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
  const btnRef = useRef<HTMLButtonElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const wrap = wrapRef.current;
    if (!btn || !wrap) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Set CSS variables for the radial gradient
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      btn.style.setProperty('--mouse-x', `${mouseX}%`);
      btn.style.setProperty('--mouse-y', `${mouseY}%`);

      gsap.to(btn, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onMouseLeaveInternal = () => {
      // Reset CSS variables
      btn.style.setProperty('--mouse-x', '50%');
      btn.style.setProperty('--mouse-y', '50%');

      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.5)",
      });
      
      if (onMouseLeave) onMouseLeave();
    };

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeaveInternal);
    return () => {
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeaveInternal);
    };
  }, [strength, onMouseLeave]);

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
      onMouseEnter={onMouseEnter}
    >
      <button ref={btnRef} className="magnetic-button">
        {children}
      </button>
    </div>
  );
});

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
