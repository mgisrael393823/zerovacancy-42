
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export const MobileSearchButton: React.FC = () => {
  return (
    <div className="sm:hidden">
      <Button 
        className={cn(
          "w-full h-11",
          "bg-primary hover:bg-primary/90 text-white",
          "shadow-sm hover:shadow-md transition-all duration-200",
          "text-sm rounded-lg",
          "flex items-center justify-center"
        )}
      >
        <Search className="w-5 h-5" />
      </Button>
    </div>
  );
};
