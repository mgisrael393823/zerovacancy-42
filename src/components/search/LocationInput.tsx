
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocationSuggestions } from './LocationSuggestions';
import { filterLocations } from '@/utils/locationData';
import { useIsMobile } from '@/hooks/use-mobile';

interface LocationInputProps {
  value: string;
  onLocationSelect: (location: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ value, onLocationSelect }) => {
  const [suggestions, setSuggestions] = useState({ cities: [], zipCodes: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Initial load of suggestions if value is already set
  useEffect(() => {
    if (value && value.length >= 2) {
      const filtered = filterLocations(value);
      setSuggestions(filtered);
    }
  }, []);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setActiveIndex(-1);
    setIsLoading(true);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    // Show immediately if input has something
    if (newValue.length >= 2) {
      setShowSuggestions(true);
    } else {
      setSuggestions({ cities: [], zipCodes: [] });
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    searchDebounceRef.current = setTimeout(() => {
      if (newValue.length >= 2) {
        const filtered = filterLocations(newValue);
        setSuggestions(filtered);
        setShowSuggestions(true);
        console.log("Suggestions updated:", filtered);
      } else {
        setSuggestions({ cities: [], zipCodes: [] });
        setShowSuggestions(false);
      }
      setIsLoading(false);
    }, 200); // Reduced debounce time for faster response
  };

  const handleSuggestionClick = (suggestion: { city?: string; state?: string; zip?: string }) => {
    let newValue = '';
    if (suggestion.zip) {
      newValue = `${suggestion.zip} - ${suggestion.city}, ${suggestion.state}`;
    } else {
      newValue = `${suggestion.city}, ${suggestion.state}`;
    }
    
    setInputValue(newValue);
    onLocationSelect(newValue);
    setSuggestions({ cities: [], zipCodes: [] });
    setShowSuggestions(false);
  };

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
          handleSuggestionClick(totalSuggestions[activeIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
    }
  };

  const clearLocation = () => {
    setInputValue('');
    onLocationSelect('');
    setSuggestions({ cities: [], zipCodes: [] });
    setShowSuggestions(false);
  };

  // Focus handler to show suggestions on click/focus
  const handleFocus = () => {
    if (inputValue.length >= 2) {
      const filtered = filterLocations(inputValue);
      setSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full sm:w-[40%] relative group">
      <div className="relative">
        <MapPin className={cn(
          "w-4 h-4 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2",
          "transition-all duration-200",
          "group-hover:text-indigo-500"
        )} />
        {isLoading && (
          <Loader2 className="w-4 h-4 absolute right-10 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter city or zip code"
          value={inputValue}
          onChange={handleLocationChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className={cn(
            "w-full h-11 sm:h-12 pl-9 sm:pl-11 pr-8 sm:pr-10",
            "bg-white text-sm text-gray-700",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500/30 group-hover:bg-gray-50/80",
            "border-0",
            "placeholder:text-gray-400",
            "font-medium"
          )}
          aria-label="Location search"
          aria-expanded={showSuggestions}
          role="combobox"
          aria-controls="location-suggestions"
          aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
        />
        {inputValue && (
          <button
            onClick={clearLocation}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600",
              "transition-all duration-200",
              "rounded-full p-1 hover:bg-gray-100"
            )}
            aria-label="Clear location"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showSuggestions && (
        <LocationSuggestions
          suggestions={suggestions}
          searchTerm={inputValue}
          activeIndex={activeIndex}
          onSelect={handleSuggestionClick}
          suggestionsRef={suggestionsRef}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
