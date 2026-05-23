"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function WhatsAppFloating() {
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(buttonRef.current, 
        { opacity: 0, scale: 0.5, y: 20 }, 
        { opacity: 1, scale: 1, y: 0, duration: 1, delay: 2, ease: "back.out(1.7)" }
      );
      
      // Infinite subtle pulse
      gsap.to(".wa-pulse", {
        scale: 1.4,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: "sine.out"
      });
    }, buttonRef);
    return () => ctx.revert();
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/91XXXXXXXXXX", "_blank");
  };

  return (
    <div 
      ref={buttonRef} 
      className="fixed bottom-8 right-6 md:right-12 z-[200] group cursor-pointer"
      onClick={handleWhatsApp}
    >
      <div className="relative flex items-center gap-4">
        {/* Label - slide in on hover */}
        <div className="bg-black/80 backdrop-blur-md border border-[#00ff87]/30 px-4 py-2 rounded-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <span className="text-terminal text-[9px] font-bold whitespace-nowrap">PRIORITY_WA_NODE</span>
        </div>
        
        {/* WhatsApp Icon */}
        <div className="relative w-14 h-14 bg-[#00ff87] rounded-xl flex items-center justify-center shadow-[0_0_30px_rgba(0,255,135,0.4)] transition-transform duration-300 group-hover:scale-110">
          <div className="wa-pulse absolute inset-0 bg-[#00ff87] rounded-xl -z-10" />
          <svg className="w-7 h-7 text-black" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.123.57-.081 1.758-.705 2.006-1.388.248-.683.248-1.265.173-1.388-.075-.124-.272-.198-.57-.347m-4.821 4.991l-.006.005h-.008c-2.33 0-4.524-.626-6.422-1.81l-.46-.285-4.773 1.25 1.272-4.655-.313-.497c-1.308-2.081-2.001-4.499-2.001-6.992 0-7.391 6.012-13.404 13.405-13.404 3.582 0 6.947 1.393 9.477 3.924 2.53 2.531 3.923 5.897 3.923 9.479 0 7.392-6.012 13.404-13.405 13.404m0-26.809c-7.409 0-13.41 6.012-13.41 13.405 0 2.33.593 4.596 1.725 6.623l-1.83 6.691 6.845-1.794c1.93 1.052 4.108 1.604 6.326 1.604 7.411 0 13.412-6.013 13.412-13.405 0-3.582-1.393-6.949-3.925-9.48-2.53-2.531-5.897-3.924-9.479-3.924" />
          </svg>
        </div>
      </div>
    </div>
  );
}
