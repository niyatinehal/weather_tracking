import axios from 'axios';

// const API_KEY = process.env.VITE_WEATHER_API_KEY;
const API_KEY = "e9fdad8bd33b4ddea02115902250506";
const BASE_URL = 'https://api.weatherapi.com/v1';
export const getWeatherByCity = async (city) => {
  const res = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${city}&units=metric`);
  return {
    city,
    temp_c: res.data.current.temp_c,
    temp_f:res.data.current.temp_f,
    icon: res.data.current.condition.icon,
    desc: res.data.current.condition.text,
    wind: res.data.current.wind_kph,
    humidity: res.data.current.humidity,
    pressure: res.data.current.pressure_in,
  };
};