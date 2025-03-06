
import React from 'react';
import { CreatorsList } from './CreatorsList';
import { Loader2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

interface SearchResultsProps {
  selectedLocation: string;
  isSearching: boolean;
  filteredCreators: Creator[];
  loadedImages: Set<string>;
  handleImageLoad: (imageSrc: string) => void;
  handleSort: (value: string) => void;
  imageRef: (node: HTMLImageElement | null) => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  selectedLocation,
  isSearching,
  filteredCreators,
  loadedImages,
  handleImageLoad,
  handleSort,
  imageRef
}) => {
  return (
    <div className="w-full px-2 sm:px-3 md:px-6 py-3 sm:py-4 md:py-6 bg-gradient-to-b from-transparent to-purple-50/20 sm:to-purple-50/30">
      <AnimatePresence mode="wait">
        {selectedLocation && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mb-4 px-3 py-2.5 bg-purple-50 rounded-md border border-purple-100 flex items-center"
          >
            <MapPin className="w-4 h-4 text-purple-500 mr-2" />
            <p className="text-sm text-purple-700">
              Showing results for: <span className="font-semibold">{selectedLocation}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      
      {isSearching ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-10 h-10 text-purple-500 animate-spin mb-4" />
          <p className="text-purple-700 font-medium">Finding creators in {selectedLocation}...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <CreatorsList 
            creators={filteredCreators}
            sortBy="rating" 
            onSort={handleSort} 
            onImageLoad={handleImageLoad} 
            loadedImages={loadedImages}
            imageRef={imageRef}
          />
          
          {filteredCreators.length === 0 && selectedLocation && (
            <div className="text-center py-10">
              <p className="text-gray-500 mb-2">No creators found in this location</p>
              <p className="text-sm text-purple-600">Try another location or clear your search</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
