import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from 'recharts';

const PredictionChart = ({ energyTrend = [], futureCarbon = [] }) => {
  // Merge energyTrend and futureCarbon data arrays by day
  const combinedData = energyTrend.map((item, index) => ({
    day: item.day,
    Energy: item.energy,
    Carbon: futureCarbon[index]?.carbon || Math.round(item.energy * 0.42 * 10) / 10,
  }));

  // Danger threshold line (e.g. 18 kWh daily base threshold)
  const dangerThreshold = 18;

  return (
    <div className="h-72 w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="neonEnergyGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3EDC81" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <linearGradient id="neonCarbonGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          <XAxis dataKey="day" stroke="#6ee7b7" fontSize={11} tickLine={false} />
          <YAxis stroke="#6ee7b7" fontSize={11} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0d1811',
              borderColor: 'rgba(62, 220, 129, 0.3)',
              borderRadius: '12px',
              color: '#ecfdf5',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#ecfdf5' }} />

          <ReferenceLine
            y={dangerThreshold}
            label={{ value: 'Peak Danger Zone', fill: '#ef4444', fontSize: 10, position: 'insideTopRight' }}
            stroke="#ef4444"
            strokeDasharray="3 3"
          />

          <Line
            type="monotone"
            dataKey="Energy"
            name="Projected Energy (kWh)"
            stroke="url(#neonEnergyGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: '#3EDC81' }}
            activeDot={{ r: 7, stroke: '#3EDC81', strokeWidth: 2 }}
          />

          <Line
            type="monotone"
            dataKey="Carbon"
            name="Projected Carbon (kg CO2e)"
            stroke="url(#neonCarbonGradient)"
            strokeWidth={3}
            dot={{ r: 4, fill: '#06b6d4' }}
            activeDot={{ r: 7, stroke: '#06b6d4', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
