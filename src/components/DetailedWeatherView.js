import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, Thermometer, Wind, Eye, CloudRain, Sun, Gauge, Droplets, Badge } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from './UI/Card';
import { HourlyForecast } from './Charts/HourlyForecast';
import { fetchWeather } from "../utils/weatherUtil";
import ForecastChart from './Charts/TempTrendChart';
import { Loader2 } from 'lucide-react';
import { PrecipitationChart } from './Charts/PrecipitationChart';
import { WindDirectionChart } from './Charts/WindDirectionChart';

export const DetailedWeatherView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { city } = useParams();

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch]);

  const handleBack = () => {
    navigate('/');
  };

  const weather = useSelector((state) => state?.weather?.data);
  const forecast = useSelector((state) => state?.weather?.forecast);
  const loading = useSelector((state) => state?.weather?.loading);
  const weatherData = weather?.weather;
  const forecastData = forecast?.forecast?.forecastday;

  const isLoading = !weather || !weatherData || !forecastData;

  return (
    <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center mb-6 md:mb-8">
          <button
            onClick={handleBack}
            className="glass-panel border-0 text-black flex items-center px-3 py-2 sm:px-4 sm:py-2 mb-4 sm:mb-0 sm:mr-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span className="text-sm sm:text-base">Back to Dashboard</span>
          </button>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 break-words">
              {city}
            </h1>
            <p className="text-sm sm:text-base text-gray-600">Detailed Weather Analytics</p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-[50vh] sm:h-[60vh]">
            <Loader2 className="animate-spin w-8 h-8 sm:w-10 sm:h-10 text-gray-600" />
          </div>
        ) : (
          <>
            {/* Main Weather Info - Responsive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8 text-black">
              {/* Current Weather Card */}
              <Card className="glass-panel p-4 sm:p-6 lg:col-span-1 order-1">
                <div className="text-center">
                  {/* Temperature Display - Responsive */}
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 mb-2">
                    {weatherData?.temp_c}°C
                  </div>
                  
                  {/* Weather Description */}
                  <div className="mb-4 flex justify-center gap-2 sm:gap-4 text-gray-800 font-bold">
                    <Badge variant="secondary" className="mb-2 sm:mb-4" />
                    <span className="text-sm sm:text-base text-center">{weatherData?.desc}</span>
                  </div>

                  {/* Weather Details Grid - Responsive */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6">
                    <div className="text-center">
                      <Wind className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-blue-500" />
                      <div className="text-xs sm:text-sm text-gray-600">Wind Speed</div>
                      <div className="font-semibold text-sm sm:text-base">{weatherData?.wind} km/h</div>
                    </div>
                    <div className="text-center">
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-green-500" />
                      <div className="text-xs sm:text-sm text-gray-600">Humidity</div>
                      <div className="font-semibold text-sm sm:text-base">{weatherData?.humidity}%</div>
                    </div>
                    <div className="text-center">
                      <Gauge className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-purple-500" />
                      <div className="text-xs sm:text-sm text-gray-600">Pressure</div>
                      <div className="font-semibold text-sm sm:text-base">{weatherData?.pressure} hPa</div>
                    </div>
                    <div className="text-center">
                      <Droplets className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-cyan-500" />
                      <div className="text-xs sm:text-sm text-gray-600">Feels Like</div>
                      <div className="font-semibold text-sm sm:text-base">{weatherData?.temp_c + 2}°C</div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Temperature Trend Chart */}
              <Card className="glass-panel p-4 sm:p-6 lg:col-span-2 order-2">
                <div className="h-64 sm:h-80 lg:h-96">
                  <ForecastChart data={forecastData} temperatureUnit="°C" />
                </div>
              </Card>
            </div>

            {/* Charts Section - Responsive Stack */}
            <div className="space-y-4 sm:space-y-6">

            <div className="flex flex-col sm:flex-row justify-center gap-8 min-w-[300px]">
              {/* Precipitation Forecast */}
              <Card className="glass-panel p-4 sm:p-6">
                <div className="h-64 sm:h-80 lg:h-96">
                  <PrecipitationChart city={city} />
                </div>
              </Card>

              {/* Wind Direction Chart */}
              <Card className="glass-panel p-4 sm:p-6">
                <div className="h-64 sm:h-80 lg:h-96">
                  <WindDirectionChart city={city} />
                </div>
              </Card>
            </div>


              {/* Hourly Forecast */}
              <Card className="glass-panel p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold mb-4 text-black">24-Hour Forecast</h3>
                <div className="overflow-x-auto">
                  <HourlyForecast city={city} />
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};