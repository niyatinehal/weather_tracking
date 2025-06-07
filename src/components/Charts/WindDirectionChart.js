import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../utils/weatherUtil';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip, ResponsiveContainer
} from 'recharts';

export const WindDirectionChart = ({ city }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (city) {
      dispatch(fetchWeather(city));
    }
  }, [city, dispatch]);

  const forecast = useSelector((state) => state?.weather?.forecast);
  const hourlyData = forecast?.forecast?.forecastday[0]?.hour;

  const formattedData = hourlyData?.map((hour) => ({
    direction: hour.wind_dir, // like "N", "NE", etc.
    speed: hour.wind_kph,
  }));

  // Aggregate speed by direction (average)
  const directionMap = {};
  formattedData?.forEach(({ direction, speed }) => {
    if (!directionMap[direction]) directionMap[direction] = [];
    directionMap[direction].push(speed);
  });

  const aggregatedData = Object.entries(directionMap).map(([dir, speeds]) => ({
    direction: dir,
    speed: +(speeds.reduce((a, b) => a + b, 0) / speeds.length).toFixed(1),
  }));

  return (
    <div className="w-full h-60 md:h-80 p-4 text-black">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Wind Direction & Speed</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={aggregatedData}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="direction" stroke="#4b5563" />
          <PolarRadiusAxis angle={30} domain={[0, 'auto']} stroke="#d1d5db" />
          <Tooltip />
          <Radar name="Wind Speed (kph)" dataKey="speed" stroke="#ef4444" fill="#ef4444" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};
