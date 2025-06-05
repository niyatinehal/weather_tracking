import React from 'react';
import { RefreshCw, Thermometer, Heart, MapPin } from 'lucide-react';

const CityCard = ({ weather, onClick,isFavorite,onToggleFavorite }) => {

  const getWeatherGradient = (condition) => {
    const lowerCondition = condition?.toLowerCase();
    if (lowerCondition?.includes('sun') || lowerCondition?.includes('clear')) {
      return 'sunny-gradient';
    } else if (lowerCondition?.includes('rain') || lowerCondition?.includes('storm')) {
      return 'rainy-gradient';
    } else if (lowerCondition?.includes('cloud')) {
      return 'cloudy-gradient';
    }
    return 'weather-gradient';
  };

  const temp = weather?.weather?.temp;

  // return (
  //   <div onClick={onClick} className="cursor-pointer rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 shadow-lg transition hover:scale-105">
  //     <h2 className="text-xl font-bold">{weather.city}</h2>
  //     <div className="flex items-center space-x-4">
  //       <img src={`${weather.icon}`} alt="icon" />
  //       <div>
  //         <p className="text-3xl">{weather.temp}&deg;C</p>
  //         <p className="capitalize text-sm">{weather.desc}</p>
  //       </div>
  //     </div>
  //     <div className="mt-2 text-xs">Humidity: {weather.humidity}% | Wind: {weather.wind} m/s</div>
  //   </div>
  // );
  return (
    <div 
      className="weather-card cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 opacity-10 ${getWeatherGradient(weather?.desc)}`}></div>
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-gray-900">
              {weather?.city}
            </h3>
            <p className="text-sm text-gray-600 flex items-center">
              {/* <MapPin className="w-3 h-3 mr-1" /> */}
              {weather?.city}
            </p>
          </div>
          <button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite();
            }}
            className="p-2 hover:bg-white/50"
          > 
            <Heart 
              className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} 
            />
           </button>
        </div>

        {/* Main Weather Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* {getWeatherIcon(weather.condition)} */}
            <div className="ml-3">
              <div className="text-3xl font-bold text-gray-800">
                {weather?.temp}°C
              </div>
              <div className="text-sm text-gray-600">{weather?.condition}</div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center text-gray-600">
            {/* <Wind className="w-4 h-4 mr-2" /> */}
            <span>{Math.round(weather?.wind)} km/h</span>
          </div>
          <div className="flex items-center text-gray-600">
            {/* <Eye className="w-4 h-4 mr-2" /> */}
            <span>{weather?.humidity}%</span>
          </div>
        </div>

        {/* Last Updated */}
        {/* <div className="mt-4 pt-3 border-t border-gray-200/50">
          <p className="text-xs text-gray-500">
            Updated: {new Date(weather.lastUpdated).toLocaleTimeString()}
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default CityCard;