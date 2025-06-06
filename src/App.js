import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './utils/weatherUtil';
import CityCard from './components/CityCard';
import { setWeatherData } from './features/weatherSlice';
import { getWeatherByCity } from './api/weatherAPI';
import { useNavigate } from 'react-router-dom';
import WeatherChart from './components/Charts/weatherDataChart';
import SearchBar from './components/SearchBar';
import { RefreshCw, Thermometer, Heart, MapPin } from 'lucide-react';

const defaultCities = ['Delhi', 'Mumbai', 'London', 'New York', 'Tokyo'];

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const weather = useSelector((state) => state.weather.data);
  const [cities, setCities] = useState(defaultCities);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [temperatureUnit, setTemperatureUnit] = useState('celsius');

  const fetchAllCitiesWeather = async () => {
    const allData = {};
    for (const city of cities) {
      try {
        const data = await getWeatherByCity(city);
        allData[city] = data;
      } catch (error) {
        console.error(`Failed to fetch weather for ${city}`, error);
      }
    }
    dispatch(setWeatherData(allData));
  };

  const handleSearch = (query) => {
    const city = query.trim();
    if (city && !cities.includes(city)) {
      setCities((prev) => [...prev, city]);
    }
  };

  const handleToggleFavorite = (cityName) => {
    let updatedFavorites;
    if (favorites.includes(cityName)) {
      updatedFavorites = favorites.filter((c) => c !== cityName);
    } else {
      updatedFavorites = [...favorites, cityName];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };
  const handleRefresh = () => {
    fetchAllCitiesWeather();
  };

  const toggleTempUnit = () => {
    setTemperatureUnit((prev) => (prev === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  useEffect(() => {
    fetchAllCitiesWeather();
    const interval = setInterval(fetchAllCitiesWeather, 60000);
    return () => clearInterval(interval);
  }, [cities]);
  
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);
  

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto mb-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Weather Analytics
            </h1>
            <p className="text-gray-600 mt-2">Real-time weather insights and forecasts</p>
          </div>

          <div className="flex gap-3 text-black">
            <button variant="outline" size="sm" onClick={handleRefresh} className="glass-panel border-0 flex items-center px-4 ">
              <RefreshCw className="w-4 h-4 mr-2 " />
              <p>Refresh</p>
            </button>
            <button variant="outline" size="sm" onClick={toggleTempUnit} className="glass-panel border-0 flex items-center px-1 ">
              <Thermometer className="w-4 h-4 mr-2" />
              {temperatureUnit === 'celsius' ? '°F' : '°C'}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8 w-10">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Favorites */}
        {favorites.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Favorites
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {favorites.map((city) => (
                <CityCard
                  key={`fav-${city}`}
                  weather={weather[city]}
                  onClick={() => navigate(`/details/${city}`)}
                  isFavorite={true}
                  onToggleFavorite={() => handleToggleFavorite(city)}
                  temperatureUnit={temperatureUnit}
                />
              ))}
            </div>
          </div>
        )}

        {/* All Locations */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center text-black">
            <MapPin className="w-5 h-5 mr-2 text-blue-500" />
            All Locations ({cities.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {cities.map((city) => (
              <CityCard
                key={city}
                weather={weather[city]}
                onClick={() => navigate(`/details/${city}`)}
                isFavorite={favorites?.includes(city)}
                onToggleFavorite={() => handleToggleFavorite(city)}
                temperatureUnit={temperatureUnit}
              />
            ))}
          </div>
        </div>

        {/* Global Weather Overview */}
        {Object.keys(weather).length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-6 text-black">Global Weather Overview</h2>
            <div className="glass-panel p-6">
              <WeatherChart cities={Object.values(weather)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
