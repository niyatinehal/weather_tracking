import axios from 'axios';

// const API_KEY = process.env.VITE_WEATHER_API_KEY;
const API_KEY = "e9fdad8bd33b4ddea02115902250506";
const BASE_URL = 'http://api.weatherapi.com/v1';
export const getWeatherforecast = async (city) => {
  const res = await axios.get(`${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no&units=metric`);
  return res.data;
};