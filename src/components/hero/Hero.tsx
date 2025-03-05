
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
        <LayoutGroup>
          <h1 className="tracking-tight leading-[1.1] font-bold font-jakarta text-center">
            <motion.span 
              className={cn(
                "text-primary inline font-light", 
                "text-3xl sm:text-4xl lg:text-5xl", 
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
                  "text-4xl sm:text-5xl lg:text-6xl",
                  "font-bold font-jakarta tracking-[-0.02em]",
                  "bg-brand-purple px-2 sm:px-3 text-white",
                  "rounded-lg py-0.5 sm:py-1 md:py-2 overflow-hidden"
                )}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
                elementLevelClassName="transform-gpu"
              />
            </div>
          </h1>
        </LayoutGroup>

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
