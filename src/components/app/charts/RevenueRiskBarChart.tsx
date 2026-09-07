'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

const data = [
  { name: 'Payment Recovery', value: 113800, color: '#06B6D4' },
  { name: 'Churn Risk', value: 79600, color: '#6366F1' },
  { name: 'Checkout Conversion', value: 51200, color: '#10B981' },
  { name: 'Expansion Opp', value: 40000, color: '#F59E0B' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="glass-panel p-3 rounded-xl border border-gray-800 shadow-xl text-xs font-mono">
        <p className="text-white font-bold">{item.name}</p>
        <p className="text-cyan-400 font-extrabold text-sm">{formatCurrency(item.value)}</p>
      </div>
    );
  }
  return null;
};

export const RevenueRiskBarChart: React.FC = () => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
          <XAxis
            type="number"
            stroke="#6B7280"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#1F2937' }}
            tickFormatter={(val) => `₹${val / 1000}k`}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#9CA3AF"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#1F2937' }}
            width={120}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
