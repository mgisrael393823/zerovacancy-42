import React from 'react';
import { CreatorCard } from '../creator/CreatorCard';
import { SortMenu } from '../sorting/SortMenu';

interface Creator {
  name: string;
  services: string[];
  price: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
  workExamples: string[];
}

interface CreatorsListProps {
  creators: Creator[];
  sortBy: string;
  onSort: (value: string) => void;
  onImageLoad: (imageSrc: string) => void;
  loadedImages: Set<string>;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const CreatorsList: React.FC<CreatorsListProps> = ({
  creators,
  sortBy,
  onSort,
  onImageLoad,
  loadedImages,
  imageRef,
}) => {
  const sortOptions = [
    { label: 'Rating', value: 'rating' },
    { label: 'Price: Low to High', value: 'price_asc' },
    { label: 'Price: High to Low', value: 'price_desc' },
    { label: 'Distance', value: 'distance' }
  ];

  console.log('Number of creators:', creators.length); // Debug log

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center w-full gap-4 bg-gray-50/50 p-4 rounded-lg border border-gray-100/80">
        <div className="w-full sm:w-auto">
          <SortMenu 
            options={sortOptions}
            onSort={onSort}
            defaultValue={sortBy}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {creators.map((creator) => (
          <CreatorCard
            key={creator.name}
            creator={creator}
            onImageLoad={onImageLoad}
            loadedImages={loadedImages}
            imageRef={imageRef}
          />
        ))}
      </div>
    </div>
  );
};
