
import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Gradient = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'absolute inset-0 -z-20 bg-gradient-to-r from-brand-400 to-brand-600 opacity-30 blur-3xl',
      className
    )}
    {...props}
  />
);

export const AnimatedGradient = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & Partial<MotionProps>) => (
  <motion.div
    className={cn(
      'absolute inset-0 -z-20 bg-gradient-to-r from-brand-400 to-brand-600 opacity-30 blur-3xl',
      className
    )}
    animate={{
      scale: [1, 1.2, 1],
      rotate: [0, 360, 0],
    }}
    transition={{ duration: 10, repeat: Infinity }}
    {...props}
  />
);
