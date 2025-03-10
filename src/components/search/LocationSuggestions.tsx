
import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LocationSuggestion, GroupedSuggestions } from '@/utils/locationData';

interface HighlightedTextProps {
  text: string;
  highlight: string;
}

const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlight }) => {
  if (!highlight.trim()) return <span>{text}</span>;

  try {
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, i) => (
          regex.test(part) ? (
            <span key={i} className="text-[#3182CE] font-medium">{part}</span>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </span>
    );
  } catch (error) {
    // Fallback in case of regex issues
    console.error("Error in highlighting text:", error);
    return <span>{text}</span>;
  }
};

interface LocationSuggestionsProps {
  suggestions: GroupedSuggestions;
  searchTerm: string;
  activeIndex: number;
  onSelect: (suggestion: LocationSuggestion) => void;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  isLoading?: boolean;
}

export const LocationSuggestions: React.FC<LocationSuggestionsProps> = ({
  suggestions,
  searchTerm,
  activeIndex,
  onSelect,
  suggestionsRef,
  isLoading = false,
}) => {
  const totalSuggestions = [...suggestions.cities, ...suggestions.zipCodes];
  const hasResults = totalSuggestions.length > 0;

  console.log("Rendering LocationSuggestions:", { 
    isLoading, 
    hasResults, 
    suggestionsCount: totalSuggestions.length,
    cities: suggestions.cities.map(c => `${c.city}, ${c.state}`),
    zipCodes: suggestions.zipCodes.map(z => z.zip)
  });

  // If loading, show skeleton loaders
  if (isLoading) {
    return (
      <div
        ref={suggestionsRef}
        className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] py-2"
        style={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} className="px-4 py-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={suggestionsRef}
      className={cn(
        "absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-[100]",
        "transition-all duration-200 ease-in-out",
        "animate-in fade-in-0 zoom-in-95"
      )}
      style={{ maxHeight: '300px', overflowY: 'auto' }}
      role="listbox"
      id="location-suggestions"
      data-state={hasResults ? "open" : "closed"}
    >
      {hasResults ? (
        <div className="py-1">
          {suggestions.cities.length > 0 && (
            <div>
              <div className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-50">
                Cities
              </div>
              {suggestions.cities.map((suggestion, index) => (
                <button
                  key={`${suggestion.city}-${suggestion.state}`}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm",
                    "flex items-center gap-2",
                    "transition-colors duration-150",
                    activeIndex === index ? "bg-gray-100" : "hover:bg-gray-50",
                    "focus:outline-none focus:bg-gray-100"
                  )}
                  onClick={() => onSelect(suggestion)}
                  role="option"
                  aria-selected={activeIndex === index}
                  id={`suggestion-${index}`}
                >
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>
                    <HighlightedText 
                      text={`${suggestion.city}, ${suggestion.state}`}
                      highlight={searchTerm}
                    />
                  </span>
                </button>
              ))}
            </div>
          )}

          {suggestions.zipCodes.length > 0 && (
            <div>
              <div className="px-4 py-1 text-xs font-medium text-gray-500 bg-gray-50">
                ZIP Codes
              </div>
              {suggestions.zipCodes.map((suggestion, index) => (
                <button
                  key={suggestion.zip}
                  className={cn(
                    "w-full text-left px-4 py-2 text-sm",
                    "flex items-center gap-2",
                    "transition-colors duration-150",
                    activeIndex === index + suggestions.cities.length ? "bg-gray-100" : "hover:bg-gray-50",
                    "focus:outline-none focus:bg-gray-100"
                  )}
                  onClick={() => onSelect(suggestion)}
                  role="option"
                  aria-selected={activeIndex === index + suggestions.cities.length}
                  id={`suggestion-${index + suggestions.cities.length}`}
                >
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span>
                    <HighlightedText 
                      text={`${suggestion.zip} - ${suggestion.city}, ${suggestion.state}`}
                      highlight={searchTerm}
                    />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="px-4 py-2 text-sm text-gray-500">
          No matches found
        </div>
      )}
    </div>
  );
};
