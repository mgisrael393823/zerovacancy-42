import React from 'react';
import { cn } from '@/lib/utils';

export const Badge = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      'inline-flex items-center gap-2 rounded-full bg-brand-500 px-3 py-1 text-sm font-medium text-white',
      className
    )}
    {...props}
  >
    {children}
  </span>
);
