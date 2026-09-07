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

const data = [
  { stage: '1. Detected', count: 342, pct: '100%', color: '#06B6D4' },
  { stage: '2. Prioritized', count: 280, pct: '81.8%', color: '#6366F1' },
  { stage: '3. Action Triggered', count: 220, pct: '64.3%', color: '#8B5CF6' },
  { stage: '4. Recovered', count: 184, pct: '53.8%', color: '#10B981' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="glass-panel p-3 rounded-xl border border-gray-800 shadow-xl text-xs font-mono">
        <p className="text-white font-bold">{item.stage}</p>
        <p className="text-cyan-400 font-extrabold text-sm">{item.count} Accounts ({item.pct})</p>
      </div>
    );
  }
  return null;
};

export const RecoveryFunnelChart: React.FC = () => {
  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
          <XAxis dataKey="stage" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={{ stroke: '#1F2937' }} />
          <YAxis stroke="#6B7280" fontSize={11} tickLine={false} axisLine={{ stroke: '#1F2937' }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
