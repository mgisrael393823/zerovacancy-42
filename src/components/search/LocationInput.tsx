
import React, { useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { LocationSuggestions } from './LocationSuggestions';
import { LocationInputField } from './LocationInputField';
import { useLocationSearch } from '@/hooks/use-location-search';
import { LocationSuggestion } from '@/utils/locationData';

interface LocationInputProps {
  value: string;
  onLocationSelect: (location: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ value, onLocationSelect }) => {
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const {
    suggestions,
    activeIndex,
    inputValue,
    isLoading,
    isFocused,
    shouldShowSuggestions,
    setActiveIndex,
    handleLocationChange,
    handleSuggestionSelect,
    handleFocus,
    handleBlur,
    handleClear,
    handleClickOutside
  } = useLocationSearch({
    initialValue: value,
    onLocationSelect: (location) => {
      onLocationSelect(location);
      
      // Show toast for selection confirmation
      if (location) {
        toast({
          title: "Location selected",
          description: `You selected ${location}`,
          duration: 3000,
        });
      }
    }
  });

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const totalSuggestions = [...suggestions.cities, ...suggestions.zipCodes];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex(prev => 
          prev < totalSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (activeIndex >= 0 && totalSuggestions[activeIndex]) {
          handleSuggestionSelect(totalSuggestions[activeIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        handleClickOutside();
        inputRef.current?.blur();
        break;
    }
  };

  // Set up click outside handler
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      // Check if the click was outside both the input and suggestions
      const clickedOutsideSuggestions = suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node);
      const clickedOutsideInput = inputRef.current && !inputRef.current.contains(event.target as Node);
      
      if (clickedOutsideSuggestions && clickedOutsideInput) {
        handleClickOutside();
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("LocationInput state:", { 
      shouldShowSuggestions,
      isLoading, 
      isFocused,
      inputLength: inputValue.length,
      citiesCount: suggestions.cities.length,
      zipCodesCount: suggestions.zipCodes.length,
    });
  }, [shouldShowSuggestions, isLoading, isFocused, inputValue, suggestions]);

  return (
    <div className="w-full sm:w-[40%] relative">
      <LocationInputField
        ref={inputRef}
        value={inputValue}
        isLoading={isLoading}
        isFocused={isFocused}
        onChange={handleLocationChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClear={handleClear}
      />

      {shouldShowSuggestions && (
        <LocationSuggestions
          suggestions={suggestions}
          searchTerm={inputValue}
          activeIndex={activeIndex}
          onSelect={handleSuggestionSelect}
          suggestionsRef={suggestionsRef}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
