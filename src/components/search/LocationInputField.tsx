
import React, { ChangeEvent, KeyboardEvent, forwardRef } from 'react';
import { MapPin, X, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationInputFieldProps {
  value: string;
  isLoading: boolean;
  isFocused: boolean;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
}

export const LocationInputField = forwardRef<HTMLInputElement, LocationInputFieldProps>(
  ({ value, isLoading, isFocused, onChange, onKeyDown, onFocus, onBlur, onClear }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
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
          ref={ref}
          type="text"
          placeholder="Enter city or zip code"
          value={value}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onBlur={onBlur}
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
          aria-expanded={isFocused}
          role="combobox"
          aria-controls="location-suggestions"
        />
        
        {value && (
          <button
            onClick={onClear}
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
    );
  }
);

LocationInputField.displayName = "LocationInputField";
