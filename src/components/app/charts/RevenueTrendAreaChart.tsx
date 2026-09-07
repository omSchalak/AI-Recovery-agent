'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

const data = [
  { date: 'Aug 01', recoverable: 82000, recovered: 54000 },
  { date: 'Aug 05', recoverable: 95000, recovered: 68000 },
  { date: 'Aug 10', recoverable: 110000, recovered: 78000 },
  { date: 'Aug 15', recoverable: 130000, recovered: 92000 },
  { date: 'Aug 20', recoverable: 145000, recovered: 108000 },
  { date: 'Aug 25', recoverable: 160000, recovered: 125000 },
  { date: 'Aug 30', recoverable: 184000, recovered: 142000 },
  { date: 'Today', recoverable: 284620, recovered: 182500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-panel p-3 rounded-xl border border-gray-800 shadow-2xl space-y-1.5 text-xs font-mono">
        <p className="text-gray-300 font-bold border-b border-gray-800 pb-1">{label}</p>
        <div className="flex items-center justify-between gap-4 text-cyan-400">
          <span>Recoverable:</span>
          <span className="font-bold">{formatCurrency(payload[0].value)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-emerald-400">
          <span>Recovered:</span>
          <span className="font-bold">{formatCurrency(payload[1]?.value || 0)}</span>
        </div>
      </div>
    );
  }
  return null;
};

export const RevenueTrendAreaChart: React.FC = () => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gradientRecoverable" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradientRecovered" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#6B7280"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#1F2937' }}
          />
          <YAxis
            stroke="#6B7280"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: '#1F2937' }}
            tickFormatter={(val) => `₹${val / 1000}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="recoverable"
            stroke="#06B6D4"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#gradientRecoverable)"
          />
          <Area
            type="monotone"
            dataKey="recovered"
            stroke="#10B981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#gradientRecovered)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
