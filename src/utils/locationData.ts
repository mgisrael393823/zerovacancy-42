
// src/utils/locationData.ts
export interface LocationSuggestion {
  city?: string;
  state?: string;
  zip?: string;
}

export interface GroupedSuggestions {
  cities: LocationSuggestion[];
  zipCodes: LocationSuggestion[];
}

// Sample location data for demonstration
const US_CITIES: LocationSuggestion[] = [
  { city: "New York", state: "NY" },
  { city: "Los Angeles", state: "CA" },
  { city: "Chicago", state: "IL" },
  { city: "Houston", state: "TX" },
  { city: "Phoenix", state: "AZ" },
  { city: "Philadelphia", state: "PA" },
  { city: "San Antonio", state: "TX" },
  { city: "San Diego", state: "CA" },
  { city: "Dallas", state: "TX" },
  { city: "San Jose", state: "CA" },
  { city: "Austin", state: "TX" },
  { city: "Jacksonville", state: "FL" },
  { city: "San Francisco", state: "CA" },
  { city: "Columbus", state: "OH" },
  { city: "Indianapolis", state: "IN" },
  { city: "Fort Worth", state: "TX" },
  { city: "Charlotte", state: "NC" },
  { city: "Seattle", state: "WA" },
  { city: "Denver", state: "CO" },
  { city: "Washington", state: "DC" }
];

const ZIP_CODES: LocationSuggestion[] = [
  { zip: "10001", city: "New York", state: "NY" },
  { zip: "90001", city: "Los Angeles", state: "CA" },
  { zip: "60601", city: "Chicago", state: "IL" },
  { zip: "77001", city: "Houston", state: "TX" },
  { zip: "85001", city: "Phoenix", state: "AZ" },
  { zip: "19019", city: "Philadelphia", state: "PA" },
  { zip: "78201", city: "San Antonio", state: "TX" },
  { zip: "92101", city: "San Diego", state: "CA" },
  { zip: "75201", city: "Dallas", state: "TX" },
  { zip: "95101", city: "San Jose", state: "CA" }
];

/**
 * Filter locations based on a search term with improved matching
 * @param searchTerm The term to search for in cities, states, or zip codes
 * @returns Grouped suggestions for cities and zip codes
 */
export const filterLocations = (searchTerm: string): GroupedSuggestions => {
  if (!searchTerm || searchTerm.length < 2) {
    console.log("Search term too short:", searchTerm);
    return { cities: [], zipCodes: [] };
  }

  const term = searchTerm.toLowerCase().trim();
  console.log(`Filtering locations for: "${term}"`);
  
  // Filter cities with improved fuzzy matching
  const filteredCities = US_CITIES.filter(loc => {
    if (!loc.city || !loc.state) return false;
    
    const cityLower = loc.city.toLowerCase();
    const stateLower = loc.state.toLowerCase();
    
    // Complete matching
    const cityMatch = cityLower.includes(term);
    const stateMatch = stateLower.includes(term);
    
    // Partial word matching (for city)
    const cityWords = cityLower.split(' ');
    const partialCityMatch = cityWords.some(word => word.startsWith(term));
    
    // State matching - more permissive for short terms
    const stateStartsMatch = term.length >= 1 && stateLower.startsWith(term);
    
    return cityMatch || stateMatch || partialCityMatch || stateStartsMatch;
  }).slice(0, 5); // Limit to 5 results
  
  // Filter zip codes with enhanced matching
  const filteredZips = ZIP_CODES.filter(loc => {
    if (!loc.zip) return false;
    
    // Zip match - prioritize start matching
    const zipMatch = loc.zip.startsWith(term);
    
    // For longer search terms, also check city/state matches
    const locationMatch = term.length >= 2 && 
      ((loc.city && loc.city.toLowerCase().includes(term)) || 
       (loc.state && loc.state.toLowerCase().includes(term)));
    
    return zipMatch || locationMatch;
  }).slice(0, 3); // Limit to 3 results
  
  console.log(`Found ${filteredCities.length} cities and ${filteredZips.length} zip codes`);
  
  // Log matches for debugging
  if (filteredCities.length > 0) {
    console.log("Matching cities:", filteredCities.map(c => `${c.city}, ${c.state}`));
  }
  if (filteredZips.length > 0) {
    console.log("Matching zip codes:", filteredZips.map(z => `${z.zip} - ${z.city}, ${z.state}`));
  }
  
  return {
    cities: filteredCities,
    zipCodes: filteredZips
  };
};
