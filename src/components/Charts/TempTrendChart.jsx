import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

 const ForecastChart = ({ data, temperatureUnit = "°C" }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" stroke="#6b7280" />
          <YAxis stroke="#6b7280" unit={temperatureUnit} />
          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}
            formatter={(value) => [`${value}${temperatureUnit}`, 'Temp']}
          />
          <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default ForecastChart;
