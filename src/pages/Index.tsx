
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Hero } from '../components/hero/Hero';
import CallToActionSection from '../components/CallToActionSection';
import Footer from '../components/Footer';
import OptimizedHowItWorks from '../components/how-it-works/OptimizedHowItWorks';
import { BottomNav } from '../components/navigation/BottomNav';
import { GlowDialog } from '@/components/ui/glow-dialog';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { FeaturesSectionWithHoverEffects } from '@/components/features/Features';
import Pricing from '@/components/Pricing';
import { Waves } from '@/components/ui/waves';
import PreviewSearch from '@/components/PreviewSearch';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { BackgroundEffects } from '@/components/features/BackgroundEffects';

/**
 * Main landing page component with performance optimizations
 */
const Index = () => {
  const [showGlowDialog, setShowGlowDialog] = useState(false);
  const isMobile = useIsMobile();

  // Initialize local storage and dialog state
  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    setShowGlowDialog(!hasVisited);
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);
  
  const handleTryNowClick = () => {
    setShowGlowDialog(true);
  };
  
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      <Header />

      <main className="flex-1 pb-16 sm:pb-0 w-full overflow-x-hidden">
        <BackgroundEffects 
          blobColors={{
            first: "bg-purple-100",
            second: "bg-indigo-100",
            third: "bg-violet-100"
          }}
          blobOpacity={0.15}
          withSpotlight={true}
          spotlightClassName="from-purple-500/5 via-violet-500/5 to-blue-500/5"
          baseColor="bg-white/80" 
          pattern="none"
          className="py-0"
          animationSpeed="slow"
        >
          <div className="space-y-0 w-full">
            {/* Hero Section */}
            <Hero />
            
            {/* How It Works Section */}
            <section id="how-it-works" className="relative w-full">
              <div className="relative z-10">
                <OptimizedHowItWorks />
              </div>
            </section>
            
            {/* Search Section */}
            <section id="find-creators" className="relative w-full">
              <div className="max-w-7xl mx-auto relative z-10 py-10 sm:py-16 lg:py-20">
                <div className="text-center mb-8 sm:mb-10 px-4 sm:px-6 lg:px-8">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-jakarta tracking-tight">
                    Find Your Perfect Creator
                  </h2>
                  <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter">
                    Connect with skilled professionals who can showcase your property in its best light
                  </p>
                </div>
                <PreviewSearch />
              </div>
            </section>
            
            {/* Professional Content Creation Services */}
            <section className="w-full">
              <FeaturesSectionWithHoverEffects />
            </section>

            {/* Pricing Section */}
            <section className="w-full">
              <Pricing />
            </section>

            {/* Final CTA Section */}
            <div className="relative w-full">
              <div className="relative z-10 max-w-7xl mx-auto py-14 sm:py-20 lg:py-24">
                <CallToActionSection />
              </div>
            </div>
          </div>
          
          <Footer />
        </BackgroundEffects>
      </main>
      <BottomNav />
      <GlowDialog open={showGlowDialog} onOpenChange={setShowGlowDialog} />
    </div>
  );
};
export default Index;
