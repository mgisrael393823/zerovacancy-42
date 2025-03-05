
import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  children?: React.ReactNode;
}

export const Badge = ({ 
  className, 
  text,
  children,
  ...props 
}: BadgeProps) => {
  return (
    <span 
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand-500 px-3 py-1 text-sm font-medium text-white",
        className
      )} 
      {...props}
    >
      {text || children}
    </span>
  );
};

export default Badge;
