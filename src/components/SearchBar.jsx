
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const popularCities = [
    'New York', 'London', 'Tokyo', 'Paris', 'Sydney', 'Dubai', 'Singapore',
    'Los Angeles', 'Berlin', 'Rome', 'Mumbai', 'Toronto', 'Amsterdam'
  ];

  const handleInputChange = (value) => {
    setQuery(value);
    
    if (value.length > 0) {
      const filtered = popularCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    onSearch(city);
    setQuery('');
    setSuggestions([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative w-[100vw] max-w-2xl mx-auto">

      <div className="relative">
        <input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          className="glass-panel border-0 pl-12 pr-20 py-6 text-lg"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-panel border-0 shadow-lg rounded-lg z-50">
          {suggestions.map((city) => (
            <button
              key={city}
              onClick={() => handleSuggestionClick(city)}
              className="w-full text-left px-4 py-3 hover:bg-white/50 flex items-center transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <MapPin className="w-4 h-4 mr-3 text-gray-500" />
              <span>{city}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
