
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { BorderBeam } from '../ui/border-beam';
import { GlowingEffect } from '../ui/glowing-effect';
import { AnimatedGrid } from '../ui/animated-grid';
import { GradientBlobBackground } from '../ui/gradient-blob-background';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SearchContainerProps {
  children: ReactNode;
}

export const SearchContainer: React.FC<SearchContainerProps> = ({ children }) => {
  const isMobile = useIsMobile();

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
              {children}
            </div>
          </GradientBlobBackground>
        </motion.div>
      </div>
    </div>
  );
};
