
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";

// Animation titles using CSS instead of heavy Framer Motion instances
const TITLES = ["Converts", "Engages", "Drives Leads"];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (!isInView) return;
    
    const timeout = isMobile ? 2500 : 2000;
    const timeoutId = setTimeout(() => {
      setTitleIndex((prev) => (prev === TITLES.length - 1 ? 0 : prev + 1));
    }, timeout);
    
    return () => clearTimeout(timeoutId);
  }, [titleIndex, isMobile, isInView]);
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "flex items-center justify-center flex-col", 
        "px-4 sm:px-6", 
        "py-[24px] sm:py-[40px]", 
        "my-[16px] sm:my-[24px]", 
        "min-h-fit sm:min-h-[50vh]", 
        "relative z-10", 
        "gap-3 sm:gap-4",
        "touch-manipulation",
        isInView ? "animate-fade-in" : "opacity-0"
      )} 
    >
      <div 
        className={cn(
          "flex gap-4 sm:gap-5 flex-col max-w-6xl mx-auto w-full px-[3px]",
          isInView ? "animate-fade-in delay-100" : "opacity-0"
        )}
      >
        <h1 className="tracking-tight leading-[1.1] text-center font-bold font-jakarta">
          <span 
            className={cn(
              "text-primary inline font-light", 
              "text-3xl sm:text-4xl lg:text-5xl", 
              "tracking-[-0.02em]", 
              "text-brand-purple-dark", 
              "block sm:inline-block mb-1 sm:mb-0 font-jakarta"
            )}
          >
            Property Content that
          </span>
          
          <div 
            role="text" 
            aria-label={`Property Content that ${TITLES[titleIndex]}`} 
            className="relative flex w-full justify-center h-[1.4em] sm:h-[1.5em] md:h-[1.4em] lg:h-[1.2em] overflow-hidden mt-1 sm:mt-2"
          >
            {TITLES.map((title, index) => (
              <span 
                key={index} 
                className={cn(
                  "absolute font-jakarta tracking-[-0.02em] text-transparent", 
                  "bg-clip-text bg-gradient-to-r from-purple-700 via-blue-700 to-cyan-700 transition-all duration-500", 
                  "text-4xl sm:text-5xl lg:text-6xl",
                  "font-bold",
                  titleIndex === index ? "opacity-100 transform-none" : "opacity-0 translate-y-8"
                )} 
              >
                {title}
              </span>
            ))}
          </div>
        </h1>

        <div 
          className={cn(
            "text-sm sm:text-base lg:text-lg", 
            "leading-[1.5]", 
            "tracking-wide", 
            "text-brand-text-primary", 
            "text-center", 
            "max-w-[550px]", 
            "mx-auto", 
            "px-2 sm:px-4", 
            "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
            "relative z-10", 
            "mt-1 mb-0",
            "font-inter"
          )}
        >
          Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
        </div>
      </div>
      
      <div 
        className={cn(
          "w-full", 
          "mt-5 sm:mt-6", 
          "px-3 sm:px-4",
          isInView ? "animate-fade-in delay-200" : "opacity-0" 
        )}
      >
        <WaitlistCTA className="mb-4" />
      </div>
    </section>
  );
}

export default Hero;
