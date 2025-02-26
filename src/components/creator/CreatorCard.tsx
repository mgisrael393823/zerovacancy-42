
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Star, Image, CheckCircle, Sparkle, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { CreatorRating } from './CreatorRating';
import { GlowDialog } from '../ui/glow-dialog';
import { ShimmerButton } from '../ui/shimmer-button';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
  tags?: string[];
}

interface CreatorCardProps {
  creator: Creator;
  onImageLoad?: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const CreatorCard: React.FC<CreatorCardProps> = ({ 
  creator, 
  onImageLoad, 
  loadedImages, 
  imageRef 
}) => {
  const isMobile = useIsMobile();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    if (onImageLoad) {
      onImageLoad(creator.image);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getDefaultTags = (name: string, services: string[]) => {
    if (name === 'John Smith' && services.includes('Photography')) {
      return ['#RealEstate', '#Aerial', '#IndoorDroneTour'];
    }
    if (name === 'Jane Cooper') {
      return ['#Interior', '#Design', '#Staging'];
    }
    if (name === 'Emily Johnson') {
      return ['#POV', '#TikTok', '#ComeTourWithMe'];
    }
    return ['#Professional', '#Creative', '#Expert'];
  };

  const getTagStyle = (tag: string) => {
    if (['#RealEstate', '#Aerial', '#IndoorDroneTour', '#Portrait', '#Wedding', '#Editorial', '#Interior', '#Design', '#Staging', '#POV', '#TikTok', '#ComeTourWithMe'].includes(tag)) {
      return "bg-[#E5DEFF] text-[#4F46E5] hover:bg-[#D6BCFA] hover:text-[#3730A3]";
    }
    if (['#Professional', '#Creative', '#Expert'].includes(tag)) {
      return "bg-[#F2FCE2] text-[#3B823E] hover:bg-[#DCF5DC] hover:text-[#2E6A31]";
    }
    return "bg-[#FDE1D3] text-[#C4704F] hover:bg-[#FECDA7] hover:text-[#9D5B3F]";
  };
  
  const tags = creator.tags || getDefaultTags(creator.name, creator.services);

  const getImageSource = () => {
    if (creator.name === 'Emily Johnson') {
      return '/newemilyprofile.jpg';
    }
    if (creator.name === 'Jane Cooper') return '/janeprofile.png';
    return creator.image;
  };
  
  return (
    <article className="group select-text">
      <Card className={cn(
        "overflow-hidden h-full",
        "will-change-transform transition-all duration-300",
        "hover:translate-y-[-4px]",
        "bg-white border border-gray-200/80",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        "hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]",
        "rounded-xl"
      )}>
        <div className="relative">
          <div className="absolute top-3 right-3 z-10">
            <span className={cn(
              "px-2.5 py-1.5",
              "text-sm font-medium",
              "bg-white/95 backdrop-blur-sm",
              "text-gray-900 rounded-full",
              "shadow-sm border border-white/40",
              "transition-all duration-200",
              "group-hover:shadow-md",
              "group-hover:bg-white"
            )}>
              From ${creator.price}
            </span>
          </div>

          <div className="relative aspect-[4/3]">
            <img 
              ref={imageRef}
              src={getImageSource()}
              alt={`${creator.name} - ${creator.services.join(", ")} specialist in ${creator.location}`}
              className={cn(
                "w-full h-full object-cover object-center transition-all duration-300",
                "group-hover:scale-105",
                !loadedImages.has(creator.image) && "opacity-0"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" 
              aria-hidden="true"
            />
            
            <div className="absolute bottom-3 left-3 text-white select-text">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-xl">{creator.name}</h3>
                <CheckCircle 
                  className="w-5 h-5 text-blue-400 animate-pulse" 
                  aria-label="Verified Creator"
                />
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <MapPin 
                  className="w-4 h-4 text-white/90" 
                  aria-hidden="true"
                />
                <span className="text-sm text-white/90">{creator.location}</span>
              </div>
              <p className="text-sm text-white/90 mt-1">
                {creator.services.join(" • ")}
              </p>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-4">
              <div 
                className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                role="list"
                aria-label="Creator specialties"
              >
                <div className="flex flex-nowrap gap-2 pb-1">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className={cn(
                        "text-xs px-2.5 py-1 rounded-full transition-colors duration-200 whitespace-nowrap",
                        "hover:shadow-sm",
                        getTagStyle(tag)
                      )}
                      role="listitem"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <CreatorRating rating={creator.rating} reviews={creator.reviews} name={creator.name} />
              
              <div className="flex justify-center px-3">
                <ShimmerButton 
                  onClick={() => setShowEmailDialog(true)}
                  aria-label={`Join waitlist to work with ${creator.name}`}
                  className="w-full h-12 text-base"
                >
                  <span>Join Waitlist</span>
                  <ArrowRight className="w-5 h-5 text-white/90" aria-hidden="true" />
                </ShimmerButton>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <GlowDialog open={showEmailDialog} onOpenChange={setShowEmailDialog} />
    </article>
  );
};
