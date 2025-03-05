import React from 'react';
import { Grainify } from '@/components/grainify';
import { Gradient } from '@/components/gradient';
import { Badge } from '@/components/badge';
import { SectionContainer } from '@/components/section-container';

export const ModernTheme = () => (
  <div className="relative min-h-screen overflow-hidden bg-white">
    <Grainify />
    <Gradient className="absolute inset-0 z-0" />
    <SectionContainer className="relative z-10 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <Badge className="mb-8">New</Badge>
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
          Modern Theme
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          A modern theme for your application.
        </p>
      </div>
    </SectionContainer>
  </div>
);
