
import React from 'react';
import { SearchBar } from './search/SearchBar';
import { SearchContainer } from './search/SearchContainer';
import { SearchSectionHeader } from './search/SearchSectionHeader';
import { SearchResults } from './search/SearchResults';
import { useCreatorSearch } from '@/hooks/use-creator-search';

const PreviewSearch = () => {
  const {
    selectedLocation,
    isSearching,
    filteredCreators,
    loadedImages,
    handleLocationSelect,
    handleImageLoad,
    handleSort,
    imageRef
  } = useCreatorSearch();

  return (
    <div className="max-w-7xl mx-auto relative z-10 py-10 sm:py-16 lg:py-20">
      <SearchSectionHeader
        title="Find Your Perfect Creator"
        subtitle="Connect with skilled professionals who can showcase your property in its best light"
      />
      
      <SearchContainer>
        <div className="w-full px-2 sm:px-3 md:px-6 py-2 sm:py-3 md:py-5">
          <SearchBar value={selectedLocation} onLocationSelect={handleLocationSelect} />
        </div>
        
        <SearchResults
          selectedLocation={selectedLocation}
          isSearching={isSearching}
          filteredCreators={filteredCreators}
          loadedImages={loadedImages}
          handleImageLoad={handleImageLoad}
          handleSort={handleSort}
          imageRef={imageRef}
        />
      </SearchContainer>
    </div>
  );
};

export default PreviewSearch;
