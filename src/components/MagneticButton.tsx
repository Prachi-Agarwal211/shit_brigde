"use client";

import { useRef, forwardRef } from "react";

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
  onMouseEnter,
  onMouseLeave
}, ref) => {
  const wrapRef = useRef<HTMLDivElement>(null);

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
      onMouseLeave={onMouseLeave}
    >
      <button className="magnetic-button">
        {children}
      </button>
    </div>
  );
});

MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
