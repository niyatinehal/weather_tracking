import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { ArrowLeft, Thermometer, Wind, Eye, CloudRain, Sun, Gauge, Droplets, Badge } from 'lucide-react';
import { useParams, useNavigate, useNavigation } from 'react-router-dom';
import { Card } from './UI/Card';
import { HourlyForecast } from './HourlyForecast';
import {fetchWeather} from "../utils/weatherUtil"
import ForecastChart from './Charts/TempTrendChart';

export const DetailedWeatherView = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
    const {city}=useParams();
    useEffect(() => {
      if (city) {
        dispatch(fetchWeather(city));
      }
    }, [city, dispatch]);
    const handleBack=()=>{
      navigate('/')
    }
    //geting value from store
    const weather = useSelector((state) => state?.weather?.data);
    const forecast=useSelector((state)=>state?.weather?.forecast)
    const weatherData = weather?.weather;
    const forecastData = forecast?.forecast?.forecastday;
    console.log(forecastData)
  return (
    <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <button 
            variant="ghost" 
            onClick={handleBack}
            className="mr-4 glass-panel border-0 text-black flex items-center px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{city}</h1>
            <p className="text-gray-600">Detailed Weather Analytics</p>
          </div>
          </div>
          {/**Main body */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-panel p-6 lg:col-span-1">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 mb-2">
                {weatherData?.temp}°C
              </div>
              <div variant="secondary" className="mb-4 flex justify-center gap-4">
              <Badge variant="secondary" className="mb-4 font-bold text-gray-800"></Badge>
                {weatherData?.desc}
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="text-center">
                  <Wind className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-600">Wind Speed</div>
                  <div className="font-semibold">{weatherData?.wind} km/h</div>
                </div>
                <div className="text-center">
                  <Eye className="w-6 h-6 mx-auto mb-2 text-green-500" />
                  <div className="text-sm text-gray-600">Humidity</div>
                  <div className="font-semibold">{weatherData?.humidity}%</div>
                </div>
                <div className="text-center">
                  <Gauge className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                  <div className="text-sm text-gray-600">Pressure</div>
                  <div className="font-semibold">{weatherData?.pressure} hPa</div>
                </div>
                <div className="text-center">
                  <Droplets className="w-6 h-6 mx-auto mb-2 text-cyan-500" />
                  <div className="text-sm text-gray-600">Feels Like</div>
                  <div className="font-semibold">{weatherData?.temp + 2}°C</div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-panel p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">7-Day Temperature Trend</h3>
            {forecastData ? (
              <ForecastChart data={forecastData}  temperatureUnit="°C" />
            ) : (
              <div className="h-64 flex items-center justify-center text-gray-500">
                Loading forecast data...
              </div>
            )}
          </Card>
          </div>
        {/* Hourly Forecast */}
        <Card className="glass-panel p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">24-Hour Forecast</h3>
        <HourlyForecast city={city}/>
        </Card>
        </div>
    </div>
  )
}
