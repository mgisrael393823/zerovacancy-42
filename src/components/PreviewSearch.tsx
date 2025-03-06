
import React, { useState, useEffect } from 'react';
import { SearchBar } from './search/SearchBar';
import { CreatorsList } from './search/CreatorsList';
import { BorderBeam } from './ui/border-beam';
import { GlowingEffect } from './ui/glowing-effect';
import { AnimatedGrid } from './ui/animated-grid';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { GradientBlobBackground } from '@/components/ui/gradient-blob-background';
import { Loader2, MapPin } from 'lucide-react';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
}

const PreviewSearch = () => {
  const isMobile = useIsMobile();
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  
  const defaultCreators: Creator[] = [
    {
      name: "Emily Johnson",
      services: ["Photography", "Virtual Staging"],
      price: 150,
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      image: "/newemilyprofile.jpg",
      workExamples: ["/1-d2e3f802.jpg"]
    }, 
    {
      name: "Jane Cooper",
      services: ["Video Tours", "Drone Footage"],
      price: 200,
      rating: 4.8,
      reviews: 98,
      location: "Los Angeles, CA",
      image: "/janeprofile.png",
      workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
    }, 
    {
      name: "Michael Brown",
      services: ["3D Tours", "Floor Plans"],
      price: 175,
      rating: 4.7,
      reviews: 82,
      location: "Chicago, IL",
      image: "/emily profile.jpeg",
      workExamples: ["/1-d2e3f802.jpg"]
    }
  ];
  
  // Set initial creators
  useEffect(() => {
    setFilteredCreators(defaultCreators);
  }, []);

  // Handler for location selection
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    
    // Simulate search with loading state
    if (location) {
      setIsSearching(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Filter creators based on location
        const locationLower = location.toLowerCase();
        const filtered = defaultCreators.filter(
          creator => creator.location.toLowerCase().includes(locationLower)
        );
        
        setFilteredCreators(filtered.length > 0 ? filtered : defaultCreators);
        setIsSearching(false);
      }, 800);
    } else {
      // Reset to all creators if location is cleared
      setFilteredCreators(defaultCreators);
    }
  };

  const imageRef = (node: HTMLImageElement | null) => {
    // Empty implementation for now
  };

  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(imageSrc);
      return newSet;
    });
  };

  const handleSort = (value: string) => {
    // Create a copy to avoid mutating the original array
    const sortedCreators = [...filteredCreators];
    
    switch (value) {
      case 'rating':
        sortedCreators.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        sortedCreators.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedCreators.sort((a, b) => b.price - a.price);
        break;
      // Add more sorting options as needed
      default:
        break;
    }
    
    setFilteredCreators(sortedCreators);
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
                <SearchBar value={selectedLocation} onLocationSelect={handleLocationSelect} />
              </div>
            
              <div className="w-full px-2 sm:px-3 md:px-6 py-3 sm:py-4 md:py-6 bg-gradient-to-b from-transparent to-purple-50/20 sm:to-purple-50/30">
                <AnimatePresence mode="wait">
                  {selectedLocation && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="mb-4 px-3 py-2.5 bg-purple-50 rounded-md border border-purple-100 flex items-center"
                    >
                      <MapPin className="w-4 h-4 text-purple-500 mr-2" />
                      <p className="text-sm text-purple-700">
                        Showing results for: <span className="font-semibold">{selectedLocation}</span>
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
                    <p className="text-purple-700 font-medium">Finding creators in {selectedLocation}...</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CreatorsList 
                      creators={filteredCreators}
                      sortBy="rating" 
                      onSort={handleSort} 
                      onImageLoad={handleImageLoad} 
                      loadedImages={loadedImages}
                      imageRef={imageRef}
                    />
                    
                    {filteredCreators.length === 0 && selectedLocation && (
                      <div className="text-center py-10">
                        <p className="text-gray-500 mb-2">No creators found in this location</p>
                        <p className="text-sm text-purple-600">Try another location or clear your search</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </GradientBlobBackground>
        </motion.div>
      </div>
    </div>
  );
};

export default PreviewSearch;
