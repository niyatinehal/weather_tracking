import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../utils/weatherUtil';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';

export const PrecipitationChart  = ({ city }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch]);

  const forecast = useSelector((state) => state?.weather?.forecast);
  const hourlyData = forecast?.forecast?.forecastday[0]?.hour;

  const formattedData = hourlyData?.map((hour) => ({
    time: new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
    precip_mm: hour.precip_mm,
  }));

  return (
    <div className="w-full h-60 md:h-80 p-4 text-black">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">24-Hour Precipitation Forecast</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="time" tick={{ fill: '#4b5563' }} />
          <YAxis tick={{ fill: '#4b5563' }} unit="mm" />
          <Tooltip />
          <Bar dataKey="precip_mm" fill="url(#colorBlue)" radius={[4, 4, 0, 0]} />
          <defs>
            <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.2} />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
