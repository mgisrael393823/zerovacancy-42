
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

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

export const useCreatorSearch = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [filteredCreators, setFilteredCreators] = useState<Creator[]>([]);
  
  const defaultCreators: Creator[] = [
    {
      name: "Emily Johnson",
      services: ["Photography", "Virtual Staging"],
      price: 150,
      rating: 4.9,
      reviews: 127,
      location: "New York, NY",
      image: "/newemilyprofile.jpg",
      workExamples: ["/1-d2e3f802.jpg"]
    }, 
    {
      name: "Jane Cooper",
      services: ["Video Tours", "Drone Footage"],
      price: 200,
      rating: 4.8,
      reviews: 98,
      location: "Los Angeles, CA",
      image: "/janeprofile.png",
      workExamples: ["/janesub.jpg", "/janesub2.png", "/janesub3.webp"]
    }, 
    {
      name: "Michael Brown",
      services: ["3D Tours", "Floor Plans"],
      price: 175,
      rating: 4.7,
      reviews: 82,
      location: "Chicago, IL",
      image: "/emily profile.jpeg",
      workExamples: ["/1-d2e3f802.jpg"]
    }
  ];
  
  // Set initial creators
  useEffect(() => {
    setFilteredCreators(defaultCreators);
  }, []);

  // Handler for location selection
  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    
    // Simulate search with loading state
    if (location) {
      setIsSearching(true);
      
      // Simulate API call with timeout
      setTimeout(() => {
        // Filter creators based on location
        const locationLower = location.toLowerCase();
        const filtered = defaultCreators.filter(
          creator => creator.location.toLowerCase().includes(locationLower)
        );
        
        setFilteredCreators(filtered.length > 0 ? filtered : defaultCreators);
        setIsSearching(false);
      }, 800);
    } else {
      // Reset to all creators if location is cleared
      setFilteredCreators(defaultCreators);
    }
  };

  const handleImageLoad = (imageSrc: string) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev);
      newSet.add(imageSrc);
      return newSet;
    });
  };

  const handleSort = (value: string) => {
    // Create a copy to avoid mutating the original array
    const sortedCreators = [...filteredCreators];
    
    switch (value) {
      case 'rating':
        sortedCreators.sort((a, b) => b.rating - a.rating);
        break;
      case 'price_asc':
        sortedCreators.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        sortedCreators.sort((a, b) => b.price - a.price);
        break;
      // Add more sorting options as needed
      default:
        break;
    }
    
    setFilteredCreators(sortedCreators);
  };

  // Empty image ref implementation
  const imageRef = (node: HTMLImageElement | null) => {
    // Empty implementation for now
  };

  return {
    selectedLocation,
    isSearching,
    filteredCreators,
    loadedImages,
    handleLocationSelect,
    handleImageLoad,
    handleSort,
    imageRef
  };
};
