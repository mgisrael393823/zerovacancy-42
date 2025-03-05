
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { LayoutGroup, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";
import { TextRotate } from "../ui/text-rotate";

// Animation titles using TextRotate component
const TITLES = ["Converts", "Engages", "Drives Leads"];

export function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  return (
    <section 
      ref={sectionRef}
      className={cn(
        "flex items-center justify-center flex-col", 
        "px-4 sm:px-6", 
        "py-[32px] sm:py-[48px]", 
        "my-[20px] sm:my-[32px]", 
        "min-h-fit sm:min-h-[56vh]", 
        "relative z-10", 
        "gap-5 sm:gap-7",
        "touch-manipulation",
        "bg-gradient-to-b from-white to-purple-50/30",
        isInView ? "animate-fade-in" : "opacity-0"
      )} 
    >
      <div 
        className={cn(
          "flex gap-6 sm:gap-7 flex-col max-w-6xl mx-auto w-full px-[3px]",
          isInView ? "animate-fade-in delay-100" : "opacity-0"
        )}
      >
        <LayoutGroup>
          <h1 className="tracking-tight leading-[1.1] font-bold font-jakarta text-center">
            <motion.span 
              className={cn(
                "text-primary inline font-bold", 
                "text-4xl sm:text-5xl lg:text-6xl", 
                "tracking-[-0.02em]", 
                "text-brand-purple-dark", 
                "block sm:inline-block mb-1 sm:mb-0 font-jakarta"
              )}
              layout
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              Property Content that{" "}
            </motion.span>
            
            <div 
              role="text" 
              aria-label={`Property Content that ${TITLES[0]}`} 
              className="relative flex w-full justify-center h-[1.4em] sm:h-[1.5em] md:h-[1.4em] lg:h-[1.2em] overflow-hidden mt-1 sm:mt-2"
            >
              <TextRotate
                texts={TITLES}
                rotationInterval={2000}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30
                }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                splitBy="characters"
                staggerDuration={0.025}
                staggerFrom="last"
                mainClassName={cn(
                  "text-3xl sm:text-4xl lg:text-5xl", 
                  "font-bold font-jakarta tracking-[-0.02em]",
                  "bg-gradient-to-r from-purple-600 to-indigo-600 px-2.5 sm:px-3 text-white",
                  "rounded-lg py-0.5 sm:py-1 overflow-hidden shadow-md"
                )}
                splitLevelClassName="overflow-hidden pb-0.5"
                elementLevelClassName="transform-gpu"
              />
            </div>
          </h1>
        </LayoutGroup>

        <div 
          className={cn(
            "text-base sm:text-lg lg:text-xl", 
            "leading-[1.5]", 
            "tracking-wide", 
            "text-brand-purple-medium", 
            "text-center", 
            "max-w-[520px]", 
            "mx-auto", 
            "px-2 sm:px-4", 
            "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
            "relative z-10", 
            "mt-2 mb-1",
            "font-inter"
          )}
        >
          Connect with expert creators to showcase your properties at their best.
        </div>
      </div>
      
      <div 
        className={cn(
          "w-full", 
          "mt-6 sm:mt-8", 
          "px-3 sm:px-4",
          "relative",
          isInView ? "animate-fade-in delay-200" : "opacity-0" 
        )}
      >
        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-purple-100/50 rounded-full blur-xl z-0"></div>
        <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-indigo-100/50 rounded-full blur-xl z-0"></div>
        
        <WaitlistCTA className="mb-4 relative z-10" />
      </div>
    </section>
  );
}

export default Hero;
