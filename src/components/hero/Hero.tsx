"use client"

import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { WaitlistCTA } from "@/components/ui/waitlist-cta"; // Fixed import path
import { TextRotate } from "../ui/text-rotate";
import Floating, { FloatingElement } from "@/components/ui/parallax-floating";

// You can replace these with your own images
const propertyImages = [
  {
    url: "/api/placeholder/600/400", // Replace with your image URL
    title: "Modern Living Room",
  },
  {
    url: "/api/placeholder/600/400", // Replace with your image URL
    title: "Luxury Kitchen",
  },
  {
    url: "/api/placeholder/600/400", // Replace with your image URL
    title: "Spacious Bedroom",
  },
  {
    url: "/api/placeholder/600/400", // Replace with your image URL
    title: "Elegant Bathroom",
  },
  {
    url: "/api/placeholder/600/400", // Replace with your image URL
    title: "Outdoor Pool Area",
  },
  // Add more images as needed
];

export function Hero() {
  const rotatingWords = ["Converts", "Engages", "Captivates", "Drives Leads"];
  
  return (
    <section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
      {/* Floating Background Images */}
      <Floating sensitivity={-0.5} className="h-full">
        <FloatingElement
          depth={0.5}
          className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
        >
          <motion.img
            src={propertyImages[0].url}
            alt={propertyImages[0].title}
            className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
        >
          <motion.img
            src={propertyImages[1].url}
            alt={propertyImages[1].title}
            className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={4}
          className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
        >
          <motion.img
            src={propertyImages[2].url}
            alt={propertyImages[2].title}
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={2}
          className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
        >
          <motion.img
            src={propertyImages[3].url}
            alt={propertyImages[3].title}
            className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          />
        </FloatingElement>

        <FloatingElement
          depth={1}
          className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
        >
          <motion.img
            src={propertyImages[4].url}
            alt={propertyImages[4].title}
            className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          />
        </FloatingElement>
      </Floating>

      {/* Content Area - Keeping your original content */}
      <div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
        <motion.h1
          className="text-center"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.3 }}
        >
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-inter tracking-tight leading-tight block text-[#4A2DD9] px-0 mx-0">
            PROPERTY CONTENT THAT{" "}
            <LayoutGroup>
              <motion.span layout className="inline-block">
                <TextRotate 
                  texts={rotatingWords}
                  className="inline-block"
                  highlightClassName="text-[#4A2DD9]"
                  mainClassName="overflow-hidden text-[#4A2DD9] rounded-xl"
                  staggerDuration={0.03}
                  staggerFrom="last"
                  rotationInterval={2000}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                />
              </motion.span>
            </LayoutGroup>
          </span>
        </motion.h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-center text-brand-text-primary max-w-2xl mx-auto px-2 mt-6"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.5 }}
        >
          Connect with creators who see beyond square footage to capture the soul of your spaces. Our curated network transforms properties into visual narratives that intrigue, inspire, and ultimately convert.
        </motion.p>

        {/* Keep your WaitlistCTA with added animation */}
        <motion.div 
          className="w-full max-w-xl mx-auto mt-10 sm:mt-12"
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.7 }}
        >
          <WaitlistCTA />
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
