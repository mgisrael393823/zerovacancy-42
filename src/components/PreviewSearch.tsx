
import React, { useState } from 'react';
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
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  // Handler for location selection
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    console.log(`Selected location: ${location}`);
    // Here you would typically filter creators or fetch data based on location
  };

  return (
    <div className="w-full px-2 sm:px-3 md:px-6 lg:px-8">
      <div className="mx-auto relative group">
        <div className="absolute -inset-0.5 sm:-inset-0.5 rounded-lg sm:rounded-xl bg-gradient-to-r from-purple-800/30 via-indigo-700/30 to-purple-900/30 opacity-60 sm:opacity-75 blur-[2px] sm:blur-sm group-hover:opacity-100 transition duration-500"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1]
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-lg sm:rounded-xl overflow-hidden shadow-[0_6px_20px_-10px_rgba(120,80,200,0.2)] sm:shadow-[0_10px_40px_-12px_rgba(120,80,200,0.25)] border border-zinc-200/60 bg-white/90"
        >
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-lg sm:rounded-xl">
            <BorderBeam 
              colorFrom="#9370DB" 
              colorTo="#C19EF9" 
              duration={isMobile ? 30 : 20}
              borderWidth={isMobile ? 0.5 : 1.5}
            />
            <GlowingEffect 
              variant="default" 
              blur={isMobile ? 3 : 8} 
              glow={!isMobile} 
              inactiveZone={isMobile ? 0.7 : 0.6}
              spread={isMobile ? 8 : 15}
              borderWidth={isMobile ? 0.5 : 1}
              className={isMobile ? "opacity-10" : "opacity-20"}
            />
            <AnimatedGrid className={isMobile ? "opacity-2" : "opacity-5"} />
          </div>
          <GradientBlobBackground 
            className="min-h-0 w-full" 
            baseColor="bg-white/90"
            pattern="none"
            blobColors={{
              first: "bg-purple-200",
              second: "bg-indigo-200",
              third: "bg-blue-200"
            }}
            blobOpacity={0.2}
            withSpotlight={!isMobile}
            spotlightClassName="from-purple-500/10 via-indigo-500/10 to-blue-500/10"
          >
            <div className="flex flex-col w-full relative z-10">
              <div className="w-full px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-5">
                {/* Pass the selectedLocation and the handleLocationSelect function */}
                <SearchBar value={selectedLocation} onLocationSelect={handleLocationSelect} />
              </div>
            
              <div className="w-full px-2 sm:px-3 md:px-6 py-3 sm:py-4 md:py-6 bg-gradient-to-b from-transparent to-purple-50/20 sm:to-purple-50/30">
                {/* Show selected location if any */}
                {selectedLocation && (
                  <div className="mb-4 px-2 py-2 bg-purple-50 rounded-md">
                    <p className="text-sm text-purple-700">
                      Showing results for: <span className="font-medium">{selectedLocation}</span>
                    </p>
                  </div>
                )}
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
