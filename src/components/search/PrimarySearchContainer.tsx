
import React from 'react';
import { cn } from '@/lib/utils';
import { ContentTypeSelect } from './ContentTypeSelect';
import { LocationInput } from './LocationInput';
import { SearchButton } from './SearchButton';

interface PrimarySearchContainerProps {
  value: string;
  onLocationSelect: (location: string) => void;
}

export const PrimarySearchContainer: React.FC<PrimarySearchContainerProps> = ({ 
  value, 
  onLocationSelect 
}) => {
  return (
    <div className={cn(
      "relative flex flex-col sm:flex-row w-full rounded-lg sm:rounded-xl overflow-hidden",
      "sm:shadow-[0_3px_16px_rgba(0,0,0,0.08)]",
      "border border-gray-300 sm:border-gray-200",
      "bg-white divide-y sm:divide-y-0 sm:divide-x divide-gray-200",
      "transition-all duration-300",
      "hover:shadow-[0_5px_20px_rgba(0,0,0,0.1)]"
    )}>
      <ContentTypeSelect />
      <LocationInput value={value} onLocationSelect={onLocationSelect} />
      <SearchButton />
    </div>
  );
};
