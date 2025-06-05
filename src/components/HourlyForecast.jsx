import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWeatherforecast } from '../api/forecastAPI';
import {fetchWeather} from "../utils/weatherUtil"
import { Sun, Cloud, CloudRain } from 'lucide-react';

export const HourlyForecast = ({city}) => {
    const dispatch = useDispatch();

    useEffect(() => {
      if (city) {
        dispatch(fetchWeather(city));
      }
    }, [city, dispatch]);
  
    const forecast = useSelector((state) => state?.weather?.forecast);
    const hourlyData=forecast?.forecast?.forecastday[0]?.hour
  
    console.log(forecast?.forecast?.forecastday[0]?.hour); // You’ll see data if city is valid

    const getWeatherIcon = (conditionText) => {
        const condition = conditionText.toLowerCase();
        if (condition.includes('cloud')) return <Cloud className="w-6 h-6 text-gray-500" />;
        if (condition.includes('rain')) return <CloudRain className="w-6 h-6 text-blue-500" />;
        if (condition.includes('fog') || condition.includes('mist')) return <Cloud className="w-6 h-6 text-slate-400" />;
        return <Sun className="w-6 h-6 text-yellow-500" />;
      };
    
      return (
        <div className="overflow-x-auto">
          <div className="flex gap-4 pb-4" style={{ minWidth: '800px' }}>
            {hourlyData?.map((hour, index) => (
              <div key={index} className="flex-shrink-0 text-center">
                <div className="glass-panel p-4 rounded-lg min-w-[80px]">
                  <div className="text-sm text-gray-600 mb-2">
                    {new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                  </div>
                  <div className="flex justify-center mb-2">
                    {getWeatherIcon(hour.condition.text)}
                  </div>
                  {/* <div className="font-semibold text-lg">
                    {temperatureUnit === 'celsius' ? Math.round(hour.temp_c) : Math.round(hour.temp_f)}°
                  </div> */}
                  <div className="text-xs text-gray-500 mt-1">
                    {hour.condition.text}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };
