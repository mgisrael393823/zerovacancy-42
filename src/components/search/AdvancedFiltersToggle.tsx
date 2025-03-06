
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdvancedFiltersToggleProps {
  showMoreFilters: boolean;
  onToggleFilters: () => void;
}

export const AdvancedFiltersToggle: React.FC<AdvancedFiltersToggleProps> = ({
  showMoreFilters,
  onToggleFilters,
}) => {
  return (
    <button
      onClick={onToggleFilters}
      className="
        inline-flex items-center gap-1.5 
        px-2 py-1 -ml-2
        text-sm font-medium
        text-gray-700 hover:text-gray-900 
        hover:bg-gray-50 rounded-md
        transition-colors duration-200
      "
    >
      Advanced Filters
      <ChevronDown className={cn(
        "w-3.5 h-3.5 text-gray-500",
        showMoreFilters ? "rotate-180" : ""
      )} />
    </button>
  );
};
