
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { iconColors, featureIcons } from "./feature-colors";

interface FeatureItemProps {
  title: string;
  description: string;
  icon: string;
  index: number;
}

export const FeatureItem = ({ title, description, icon, index }: FeatureItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMobile = useIsMobile();
  
  const handleClick = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };
  
  // Get the color scheme for this icon
  const colorScheme = iconColors[icon as keyof typeof iconColors] || { bg: "bg-indigo-50", text: "text-indigo-600" };
  
  // Get the icon component
  const Icon = featureIcons[icon as keyof typeof featureIcons];
  
  return (
    <motion.button
      className={cn(
        "relative w-full text-left group h-full flex flex-col",
        "rounded-lg transition-all duration-300",
        "bg-white hover:bg-white",
        "border border-gray-200/60 hover:border-gray-300/80",
        "p-4 sm:p-5",
        "focus:outline-none focus:ring-2 focus:ring-primary/20",
        !isMobile && "hover:shadow-md hover:-translate-y-0.5"
      )}
      onClick={handleClick}
      aria-expanded={isMobile ? isExpanded : undefined}
      whileHover={!isMobile ? { scale: 1.01 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          delay: index * 0.05 + 0.1
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="flex flex-col items-start gap-3 h-full">
        {/* Icon container with refined styling */}
        <motion.div 
          className={cn(
            "flex items-center justify-center",
            "w-12 h-12",
            "rounded-lg",
            "transition-all duration-300",
            colorScheme.bg,
            "group-hover:shadow-sm",
            "border border-opacity-10",
            `border-${colorScheme.text.split('-')[1]}-100`,
          )}
          whileHover={{ scale: 1.05 }}
        >
          <Icon className={cn(
            "w-6 h-6",
            colorScheme.text,
            "transition-all duration-300",
            "group-hover:scale-105",
            isMobile && isExpanded && "transform rotate-90"
          )} />
        </motion.div>
        
        <div className="text-left w-full flex-grow flex flex-col">
          <h3 className={cn(
            "text-base font-semibold leading-tight font-space mb-2",
            "text-gray-900 group-hover:text-indigo-600",
            "transition-colors duration-300"
          )}>
            {title}
          </h3>
          <div className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-300",
            isMobile && !isExpanded ? "max-h-0 opacity-0" : "max-h-40 opacity-100",
            "flex-grow"
          )}>
            <p className="text-xs sm:text-sm text-gray-600 font-anek group-hover:text-gray-700">
              {description}
            </p>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default FeatureItem;
