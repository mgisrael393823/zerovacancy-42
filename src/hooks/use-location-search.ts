
import { useState, useRef, useEffect } from 'react';
import { filterLocations, GroupedSuggestions, LocationSuggestion } from '@/utils/locationData';

interface UseLocationSearchProps {
  initialValue: string;
  onLocationSelect: (location: string) => void;
}

export function useLocationSearch({ initialValue, onLocationSelect }: UseLocationSearchProps) {
  const [suggestions, setSuggestions] = useState<GroupedSuggestions>({ cities: [], zipCodes: [] });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const searchDebounceRef = useRef<NodeJS.Timeout>();
  const clickOutsideTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize suggestions if value is already set
  useEffect(() => {
    if (initialValue && initialValue.length >= 2) {
      const filtered = filterLocations(initialValue);
      setSuggestions(filtered);
      console.log("Initial suggestions:", filtered);
    }
  }, [initialValue]);

  // Update input value when initialValue changes
  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleLocationChange = (value: string) => {
    setInputValue(value);
    setActiveIndex(-1);
    
    // Set loading when typing and length is sufficient
    if (value.length >= 2) {
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
      if (value.length >= 2) {
        console.log("Searching for:", value);
        const filtered = filterLocations(value);
        setSuggestions(filtered);
        
        // Show suggestions if we have any or if the input is still focused
        const hasSuggestions = filtered.cities.length > 0 || filtered.zipCodes.length > 0;
        setShowSuggestions(hasSuggestions || isFocused);
        
        console.log(`Search results for "${value}":`, {
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

  const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
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

  const handleFocus = () => {
    setIsFocused(true);
    
    // Clear any pending timeout to hide suggestions
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
    // Blur handling will be managed by click outside handler
  };

  const handleClear = () => {
    setInputValue('');
    onLocationSelect('');
    setSuggestions({ cities: [], zipCodes: [] });
    setShowSuggestions(false);
  };

  // Function to handle clicks outside the component
  const handleClickOutside = () => {
    // Use timeout to allow click events on suggestions to complete first
    clickOutsideTimeoutRef.current = setTimeout(() => {
      setShowSuggestions(false);
      console.log("Click outside detected - hiding suggestions");
    }, 200);
  };

  // Cleanup on unmount
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

  // Determine when to show suggestions
  const shouldShowSuggestions = showSuggestions && (
    isLoading || 
    suggestions.cities.length > 0 || 
    suggestions.zipCodes.length > 0 ||
    (isFocused && inputValue.length >= 2)
  );

  return {
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
  };
}
