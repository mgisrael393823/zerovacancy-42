
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: 'blue' | 'purple' | 'mixed';
}

export const Gradient = ({ 
  className, 
  color = 'mixed',
  ...props 
}: GradientProps) => {
  const gradientClasses = {
    blue: "bg-gradient-to-br from-blue-500/30 via-cyan-400/20 to-blue-600/10",
    purple: "bg-gradient-to-br from-purple-500/30 via-indigo-400/20 to-violet-600/10",
    mixed: "bg-gradient-to-br from-purple-500/20 via-indigo-500/15 to-blue-500/10"
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className={cn(
        "absolute -z-20 rounded-full blur-3xl",
        "h-[30rem] w-[30rem]",
        gradientClasses[color],
        className
      )} 
      {...props}
    />
  );
};

export default Gradient;
