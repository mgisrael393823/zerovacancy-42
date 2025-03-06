
import React, { useRef, useEffect } from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { AnimatedGrid } from './ui/animated-grid';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === containerRef.current) {
            if (entry.isIntersecting) {
              entry.target.classList.add('content-visible');
            } else {
              entry.target.classList.remove('content-visible');
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '100px' }
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full px-3 sm:px-3 md:px-6 lg:px-8 content-visibility-auto" ref={containerRef}>
      <div className="mx-auto relative group">
        {/* Simplified gradient background for mobile */}
        <div className={cn(
          "absolute -inset-0.5 sm:-inset-0.5 rounded-lg sm:rounded-xl bg-gradient-to-r",
          isMobile 
            ? "from-purple-800/20 to-indigo-700/20 opacity-50 blur-[1px]" 
            : "from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100"
        )}></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: isMobile ? 0.5 : 0.7,  // Faster animation on mobile
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
          className={cn(
            "relative rounded-lg sm:rounded-xl overflow-hidden border bg-white/95 will-change-transform",
            isMobile 
              ? "shadow-md border-zinc-200/80" 
              : "shadow-[0_8px_25px_-10px_rgba(120,80,200,0.3)] sm:shadow-[0_15px_45px_-12px_rgba(120,80,200,0.35)] border-zinc-200/70"
          )}
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
            {/* Conditional rendering of heavy effects for mobile */}
            {!isMobile && (
              <BorderBeam 
                colorFrom="#9370DB" 
                colorTo="#C19EF9" 
                duration={20}
                borderWidth={1.5}
              />
            )}
            
            {/* Simplified glowing effect for mobile */}
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 2 : 8} 
              glow={!isMobile} 
              inactiveZone={isMobile ? 0.8 : 0.6}
              spread={isMobile ? 5 : 15}
              borderWidth={isMobile ? 0.5 : 1}
              className={isMobile ? "opacity-10" : "opacity-25"}
            />
            
            {/* Conditionally render AnimatedGrid based on device */}
            {!isMobile && <AnimatedGrid className="opacity-7" />}
          </div>
          
          <GradientBlobBackground 
            className="min-h-0 w-full" 
            baseColor="bg-white/95"
            pattern="none"
            blobColors={{
              first: "bg-purple-200",
              second: "bg-indigo-200",
              third: "bg-blue-200"
            }}
            blobOpacity={isMobile ? 0.15 : 0.25}
            withSpotlight={!isMobile}
            spotlightClassName="from-purple-500/15 via-indigo-500/15 to-blue-500/15"
          >
            <div className="flex flex-col w-full relative z-10 scroll-container-optimized">
              {/* Header section with optimized mobile spacing */}
              <div className={cn(
                "text-left px-4 sm:px-6 lg:px-8",
                isMobile ? "pt-5 pb-3" : "pt-4 sm:pt-9 pb-1 sm:pb-6"
              )}>
                <h2 className={cn(
                  "font-bold text-gray-900 font-jakarta tracking-tight",
                  isMobile ? "text-2xl mb-2" : "text-xl sm:text-3xl md:text-4xl mb-1.5 sm:mb-4"
                )}>
                  Find Your Perfect Creator
                </h2>
                
                {/* Better spacing around the underline */}
                <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500 rounded-full mb-2 sm:mb-3"></div>
                
                <p className={cn(
                  "text-gray-600 font-inter max-w-xl",
                  isMobile ? "text-sm leading-snug" : "text-sm sm:text-base md:text-lg mt-1"
                )}>
                  Connect with professionals who showcase your property perfectly
                </p>
              </div>
            
              {/* SearchBar with mobile-optimized spacing */}
              <div className={cn(
                "w-full px-3 sm:px-4 md:px-7",
                isMobile ? "py-2" : "py-1 sm:py-4 md:py-6"
              )}>
                <SearchBar onLocationSelect={() => {}} />
              </div>
            
              {/* CreatorsList with mobile optimizations */}
              <div className={cn(
                "w-full px-3 sm:px-4 md:px-7 bg-gradient-to-b from-transparent",
                isMobile 
                  ? "to-purple-50/20 py-3 pb-5" 
                  : "to-purple-50/30 sm:to-purple-50/40 py-1 sm:py-5 md:py-7 pb-6 sm:pb-7"
              )}>
                <CreatorsList 
                  creators={[{
                    name: "Emily Johnson",
                    services: ["Photography", "Virtual Staging"],
                    price: 150,
                    rating: 4.9,
                    reviews: 127,
                    location: "New York, NY",
                    image: "/newemilyprofile.jpg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }, {
                    name: "Jane Cooper",
                    services: ["Video Tours", "Drone Footage"],
                    price: 200,
                    rating: 4.8,
                    reviews: 98,
                    location: "Los Angeles, CA",
                    image: "/janeprofile.png",
                    workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
                  }, {
                    name: "Michael Brown",
                    services: ["3D Tours", "Floor Plans"],
                    price: 175,
                    rating: 4.7,
                    reviews: 82,
                    location: "Chicago, IL",
                    image: "/emily profile.jpeg",
                    workExamples: ["/1-d2e3f802.jpg"]
                  }]} 
                  sortBy="rating" 
                  onSort={() => {}} 
                  onImageLoad={() => {}} 
                  loadedImages={new Set()}
                  imageRef={() => {}}
                />
              </div>
            </div>
          </GradientBlobBackground>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
