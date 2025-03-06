
import React, { useState } from 'react';
import { SearchFilters } from './SearchFilters';
import { PrimarySearchContainer } from './PrimarySearchContainer';
import { MobileSearchButton } from './MobileSearchButton';
import { AdvancedFiltersToggle } from './AdvancedFiltersToggle';

interface SearchBarProps {
  value?: string;
  onLocationSelect: (location: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value = '', onLocationSelect }) => {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col gap-3">
        <PrimarySearchContainer 
          value={value} 
          onLocationSelect={onLocationSelect} 
        />
        
        <MobileSearchButton />

        <div className="flex items-center justify-between px-0.5">
          <AdvancedFiltersToggle 
            showMoreFilters={showMoreFilters}
            onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
          />
        </div>

        <SearchFilters
          showMoreFilters={showMoreFilters}
          onToggleFilters={() => setShowMoreFilters(!showMoreFilters)}
        />
      </div>
    </div>
  );
};
