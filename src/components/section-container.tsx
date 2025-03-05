import React from 'react';
import { cn } from '@/lib/utils';

export const SectionContainer = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
    {...props}
  >
    {children}
  </div>
);
