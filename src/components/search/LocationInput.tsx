
import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocationSuggestions } from './LocationSuggestions';
import { filterLocations, GroupedSuggestions, LocationSuggestion } from '@/utils/locationData';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from '@/hooks/use-toast';

interface LocationInputProps {
  value: string;
  onLocationSelect: (location: string) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({ value, onLocationSelect }) => {
  const [suggestions, setSuggestions] = useState<GroupedSuggestions>({ cities: [], zipCodes: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout>();
  const isMobile = useIsMobile();
  const clickOutsideTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Initial load of suggestions if value is already set
  useEffect(() => {
    if (value && value.length >= 2) {
      const filtered = filterLocations(value);
      setSuggestions(filtered);
      console.log("Initial suggestions:", filtered);
    }
  }, []);

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setActiveIndex(-1);
    
    // Always set loading when typing
    if (newValue.length >= 2) {
      setIsLoading(true);
      setShowSuggestions(true);
    } else {
      setSuggestions({ cities: [], zipCodes: [] });
      setShowSuggestions(false);
      setIsLoading(false);
      return;
    }

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      if (newValue.length >= 2) {
        console.log("Searching for:", newValue);
        const filtered = filterLocations(newValue);
        setSuggestions(filtered);
        
        // Important: Always show suggestions if we have any or if the input is still focused
        const hasSuggestions = filtered.cities.length > 0 || filtered.zipCodes.length > 0;
        setShowSuggestions(hasSuggestions || isFocused);
        
        // Debug information
        console.log(`Search results for "${newValue}":`, {
          totalCities: filtered.cities.length,
          totalZips: filtered.zipCodes.length,
          showSuggestions: hasSuggestions || isFocused
        });
      } else {
        setSuggestions({ cities: [], zipCodes: [] });
        setShowSuggestions(false);
      }
      setIsLoading(false);
    }, 200);
  };

  const handleSuggestionClick = (suggestion: LocationSuggestion) => {
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
    
    // Show toast for selection confirmation
    toast({
      title: "Location selected",
      description: `You selected ${newValue}`,
      duration: 3000,
    });
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
        e.preventDefault();
        setShowSuggestions(false);
        inputRef.current?.blur();
        break;
    }
  };

  const clearLocation = () => {
    setInputValue('');
    onLocationSelect('');
    setSuggestions({ cities: [], zipCodes: [] });
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Improved focus handling
  const handleFocus = () => {
    setIsFocused(true);
    
    // If there's a timeout to hide suggestions, clear it
    if (clickOutsideTimeoutRef.current) {
      clearTimeout(clickOutsideTimeoutRef.current);
    }
    
    // Show suggestions if we have input
    if (inputValue.length >= 2) {
      const filtered = filterLocations(inputValue);
      setSuggestions(filtered);
      setShowSuggestions(true);
      console.log("Focus triggered suggestion display:", {
        inputLength: inputValue.length,
        hasSuggestions: filtered.cities.length > 0 || filtered.zipCodes.length > 0
      });
    }
  };
  
  const handleBlur = () => {
    setIsFocused(false);
    // Let the click handler manage hiding the suggestions
  };

  // Improved click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click was outside both the input and suggestions
      const clickedOutsideSuggestions = suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node);
      const clickedOutsideInput = inputRef.current && !inputRef.current.contains(event.target as Node);
      
      if (clickedOutsideSuggestions && clickedOutsideInput) {
        // Use timeout to allow click events on suggestions to complete first
        clickOutsideTimeoutRef.current = setTimeout(() => {
          setShowSuggestions(false);
          console.log("Click outside detected - hiding suggestions");
        }, 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (clickOutsideTimeoutRef.current) {
        clearTimeout(clickOutsideTimeoutRef.current);
      }
    };
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
      if (clickOutsideTimeoutRef.current) {
        clearTimeout(clickOutsideTimeoutRef.current);
      }
    };
  }, []);

  // Determine when to show suggestions - improved logic
  const shouldShowSuggestions = showSuggestions && (
    isLoading || 
    suggestions.cities.length > 0 || 
    suggestions.zipCodes.length > 0 ||
    (isFocused && inputValue.length >= 2)
  );

  // Debug effect to monitor state changes
  useEffect(() => {
    console.log("LocationInput state updated:", { 
      showSuggestions, 
      shouldShowSuggestions,
      isLoading, 
      isFocused,
      inputLength: inputValue.length,
      citiesCount: suggestions.cities.length,
      zipCodesCount: suggestions.zipCodes.length
    });
  }, [showSuggestions, shouldShowSuggestions, isLoading, isFocused, inputValue, suggestions]);

  return (
    <div className="w-full sm:w-[40%] relative">
      <div className="relative">
        <MapPin className={cn(
          "w-4 h-4 text-gray-400 absolute left-3 sm:left-4 top-1/2 -translate-y-1/2",
          "transition-all duration-200",
          isFocused ? "text-indigo-500" : "text-gray-400"
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
          onBlur={handleBlur}
          className={cn(
            "w-full h-11 sm:h-12 pl-9 sm:pl-11 pr-8 sm:pr-10",
            "bg-white text-sm text-gray-700",
            "transition-colors duration-200",
            "focus:outline-none focus:ring-2 focus:ring-indigo-500/30",
            isFocused ? "bg-white ring-2 ring-indigo-500/30" : "hover:bg-gray-50/80",
            "border-0",
            "placeholder:text-gray-400",
            "font-medium",
            "rounded-md"
          )}
          aria-label="Location search"
          aria-expanded={shouldShowSuggestions}
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

      {shouldShowSuggestions && (
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
