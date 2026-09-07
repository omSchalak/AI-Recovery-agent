'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

const data = [
  { name: 'Smart Retry Engine', value: 84500, color: '#06B6D4' },
  { name: 'Email Dunning', value: 32400, color: '#6366F1' },
  { name: 'In-App Prompts', value: 18200, color: '#10B981' },
  { name: 'Exec Retention', value: 7750, color: '#F59E0B' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="glass-panel p-3 rounded-xl border border-gray-800 shadow-xl text-xs font-mono">
        <p className="text-white font-bold">{item.name}</p>
        <p className="text-cyan-400 font-extrabold text-sm">{formatCurrency(item.value)}</p>
      </div>
    );
  }
  return null;
};

export const CategoryPieChart: React.FC = () => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#0B0F17" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            formatter={(value) => <span className="text-xs text-gray-300 font-medium">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
