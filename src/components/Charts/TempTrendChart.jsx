import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  defs,
} from 'recharts';

const ForecastChart = ({ data, temperatureUnit = '°C' }) => {
  const transformedData = data.map((item) => ({
    day: new Date(item.date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }),
    temp: item.day.avgtemp_c,
  }));

  return (
    <div className="w-full h-64 bg-blue-50 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">7-Day Temperature Trend</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={transformedData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 12 }} />
          <YAxis stroke="#6b7280" unit={temperatureUnit} tick={{ fontSize: 12 }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}
            formatter={(value) => [`${value}${temperatureUnit}`, 'Temp']}
          />
          <Area
            type="monotone"
            dataKey="temp"
            stroke="#3b82f6"
            fill="url(#tempGradient)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
