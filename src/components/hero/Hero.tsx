
import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { WaitlistCTA } from "../ui/waitlist-cta";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog-new";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

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
        "flex items-center justify-between",
        "px-4 sm:px-6 lg:px-8", 
        "py-[24px] sm:py-[40px]", 
        "my-[16px] sm:my-[24px]",
        "min-h-fit sm:min-h-[60vh]", 
        "relative z-10", 
        "gap-3 sm:gap-6",
        "touch-manipulation",
        "max-w-7xl mx-auto",
        isInView ? "animate-fade-in" : "opacity-0"
      )} 
    >
      {/* Left aligned content */}
      <div 
        className={cn(
          "flex flex-col gap-6 max-w-[600px] w-full",
          "text-left",
          isInView ? "animate-fade-in delay-100" : "opacity-0"
        )}
      >
        <h1 className="tracking-tight leading-[1.1] font-bold font-jakarta">
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
            className="relative flex h-[1.4em] sm:h-[1.5em] md:h-[1.4em] lg:h-[1.2em] overflow-hidden mt-1 sm:mt-2"
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
            "text-left", 
            "max-w-[500px]",
            "[word-spacing:0.12em] sm:[word-spacing:0.16em]", 
            "relative z-10", 
            "mt-1 mb-0",
            "font-inter"
          )}
        >
          Connect with expert content creators for your next project. Our AI-powered platform matches you with the perfect professional for your needs and budget.
        </div>
        
        <div 
          className={cn(
            "w-full", 
            "mt-2 sm:mt-4", 
            isInView ? "animate-fade-in delay-200" : "opacity-0" 
          )}
        >
          <WaitlistCTA className="mb-4" />
        </div>
      </div>
      
      {/* Right aligned dialog component */}
      <div className={cn(
        "hidden md:block max-w-[400px]",
        isInView ? "animate-fade-in delay-300" : "opacity-0"
      )}>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="rounded-lg border-gray-200 hover:bg-gray-50">
              View Demo
              <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Discover Property Content</h2>
              <p className="text-gray-600 mb-6">
                Our platform helps you connect with expert content creators who can showcase your property in its best light.
              </p>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-gray-500">Demo Video</span>
              </div>
              <Button className="w-full">Get Started</Button>
            </div>
          </DialogContent>
        </Dialog>
        
        <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <span className="text-purple-600 font-bold">AI</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Smart Matching</h3>
                <p className="text-sm text-gray-500">Find your perfect creator</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 text-sm">
                "Our AI matched us with a photographer who perfectly captured our vision."
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 mr-2"></div>
                  <span className="text-xs font-medium">Kate W.</span>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
