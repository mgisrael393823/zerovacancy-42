
import React from 'react';
import { cn } from '@/lib/utils';
import { OptimizedSpotlight } from './optimized-spotlight';

interface GradientBlobBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  dotOpacity?: number;
  pattern?: 'dots' | 'grid' | 'none';
  withSpotlight?: boolean;
  spotlightClassName?: string;
  spotlightSize?: number;
  blobColors?: {
    first?: string;
    second?: string;
    third?: string;
  };
  blobOpacity?: number;
  blobSize?: 'small' | 'medium' | 'large';
  baseColor?: string;
  animationSpeed?: 'slow' | 'medium' | 'fast';
}

export const GradientBlobBackground: React.FC<GradientBlobBackgroundProps> = ({
  className = '',
  children,
  dotOpacity = 0.4,
  pattern = 'dots',
  withSpotlight = false,
  spotlightClassName = 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
  spotlightSize = 350,
  blobColors = {
    first: 'bg-purple-100',
    second: 'bg-indigo-100',
    third: 'bg-blue-100'
  },
  blobOpacity = 0.15,
  blobSize = 'medium',
  baseColor = 'bg-white/80',
  animationSpeed = 'medium'
}) => {
  // Determine blob sizes based on the blobSize prop
  const getBlobSizeClass = (position: 'first' | 'second' | 'third') => {
    const sizes = {
      small: {
        first: 'w-64 h-64',
        second: 'w-64 h-64',
        third: 'w-64 h-64'
      },
      medium: {
        first: 'w-96 h-96',
        second: 'w-96 h-96',
        third: 'w-96 h-96'
      },
      large: {
        first: 'w-[45rem] h-[45rem]',
        second: 'w-[42rem] h-[42rem]',
        third: 'w-[48rem] h-[48rem]'
      }
    };
    
    return sizes[blobSize][position];
  };

  // Animation duration based on speed
  const getAnimationDuration = (base: number) => {
    const multipliers = {
      fast: 0.7,
      medium: 1,
      slow: 2.2 // Even slower animation for more subtlety
    };
    
    return `${base * multipliers[animationSpeed]}s`;
  };

  return (
    <div className={cn(`relative w-full overflow-hidden ${baseColor}`, className)}>
      {/* Pattern background */}
      {pattern === 'dots' && (
        <div className={`absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-${dotOpacity * 100}`}></div>
      )}
      
      {pattern === 'grid' && (
        <div className={`absolute inset-0 opacity-${dotOpacity * 10}`}>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-300" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
      )}
      
      {/* Gradient blobs with modified positioning to avoid unwanted visual patterns */}
      <div 
        className={cn(
          `absolute -top-10 -left-20 ${getBlobSizeClass('first')} ${blobColors.first} rounded-full mix-blend-multiply filter blur-3xl opacity-${blobOpacity * 100}`
        )}
        style={{ animation: `blob ${getAnimationDuration(45)} infinite` }}
      ></div>
      <div 
        className={cn(
          `absolute top-[40%] -right-20 ${getBlobSizeClass('second')} ${blobColors.second} rounded-full mix-blend-multiply filter blur-3xl opacity-${blobOpacity * 100}`
        )}
        style={{ animation: `blob ${getAnimationDuration(50)} infinite`, animationDelay: `${getAnimationDuration(8)}` }}
      ></div>
      <div 
        className={cn(
          `absolute -bottom-40 left-[20%] ${getBlobSizeClass('third')} ${blobColors.third} rounded-full mix-blend-multiply filter blur-3xl opacity-${blobOpacity * 100}`
        )}
        style={{ animation: `blob ${getAnimationDuration(40)} infinite`, animationDelay: `${getAnimationDuration(15)}` }}
      ></div>
      
      {/* Additional blobs for better coverage throughout the site - repositioned */}
      <div 
        className={cn(
          `absolute top-[15%] right-[25%] ${getBlobSizeClass('second')} ${blobColors.first} rounded-full mix-blend-multiply filter blur-3xl opacity-${blobOpacity * 100}`
        )}
        style={{ animation: `blob ${getAnimationDuration(55)} infinite`, animationDelay: `${getAnimationDuration(12)}` }}
      ></div>
      <div 
        className={cn(
          `absolute top-[70%] -left-40 ${getBlobSizeClass('first')} ${blobColors.third} rounded-full mix-blend-multiply filter blur-3xl opacity-${blobOpacity * 100}`
        )}
        style={{ animation: `blob ${getAnimationDuration(48)} infinite`, animationDelay: `${getAnimationDuration(20)}` }}
      ></div>
      
      {/* Spotlight effect */}
      {withSpotlight && (
        <OptimizedSpotlight className={spotlightClassName} size={spotlightSize} />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
