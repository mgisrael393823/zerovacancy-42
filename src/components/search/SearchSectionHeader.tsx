
import React from 'react';

interface SearchSectionHeaderProps {
  title: string;
  subtitle: string;
}

export const SearchSectionHeader: React.FC<SearchSectionHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8 sm:mb-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 font-jakarta tracking-tight">
        {title}
      </h2>
      <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-600 font-inter">
        {subtitle}
      </p>
    </div>
  );
};
