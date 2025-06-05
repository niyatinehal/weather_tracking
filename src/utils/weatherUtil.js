import { getWeatherforecast } from '../api/forecastAPI';
import { getWeatherByCity } from '../api/weatherAPI';
import { setWeatherData,setHourlyForecast, setLoading, setError } from '../features/weatherSlice';

export const fetchWeather = (city) => async (dispatch) => {
  try {
    // dispatch(setLoading(true));
    const weather = await getWeatherByCity(city);
    dispatch(setWeatherData({ city, weather }));

    //forecast
    const weatherForecast=await getWeatherforecast(city);
    dispatch(setHourlyForecast(weatherForecast));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
