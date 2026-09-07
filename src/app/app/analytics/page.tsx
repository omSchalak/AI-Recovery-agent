'use client';

import React, { useState } from 'react';
import { BarChart3, Download, Calendar, TrendingUp, PieChart, Layers, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { RevenueTrendAreaChart } from '@/components/app/charts/RevenueTrendAreaChart';
import { CategoryPieChart } from '@/components/app/charts/CategoryPieChart';
import { formatCurrency } from '@/lib/utils';

export default function AnalyticsPage() {
  const [range, setRange] = useState('30D');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Demo Data Export: CSV file generated successfully.');
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Revenue Analytics & Reporting
          </h1>
          <p className="text-xs text-gray-400">
            Audit-ready revenue recovery attribution, channel performance, and ROI metrics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-900 border border-gray-800 rounded-lg p-1 text-xs">
            {['7D', '30D', '90D', 'YTD'].map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1 rounded-md font-mono transition-colors ${
                  range === r ? 'bg-cyan-500 text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            isLoading={isExporting}
            leftIcon={<Download className="w-4 h-4 text-cyan-400" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Analytics Summary Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 glass-card rounded-xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-medium">Avg Recovery / Transaction</span>
          <div className="text-2xl font-black text-white font-mono">{formatCurrency(971)}</div>
          <span className="text-[11px] text-emerald-400 font-semibold">+14.2% efficiency</span>
        </div>

        <div className="p-5 glass-card rounded-xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-medium">Recovery Time SLA</span>
          <div className="text-2xl font-black text-cyan-400 font-mono">18.4 Hours</div>
          <span className="text-[11px] text-cyan-400 font-semibold">-4.2h vs target</span>
        </div>

        <div className="p-5 glass-card rounded-xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-medium">Top Recovery Channel</span>
          <div className="text-2xl font-black text-indigo-400 font-mono">Smart Dunning</div>
          <span className="text-[11px] text-gray-400 font-mono">68.4% conversion</span>
        </div>

        <div className="p-5 glass-card rounded-xl border border-gray-800 space-y-1">
          <span className="text-xs text-gray-400 font-medium">Net Platform ROI</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">14.8x</div>
          <span className="text-[11px] text-emerald-400 font-semibold">Verified return</span>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <ChartContainer title="Cumulative Revenue Recovery Velocity" description="Historical velocity across active dunning flows." height="h-72">
            <RevenueTrendAreaChart />
          </ChartContainer>
        </div>

        <div className="lg:col-span-4">
          <ChartContainer title="Recovery Attribution by Channel" description="Proportional split of recovered dollars by flow." height="h-72">
            <CategoryPieChart />
          </ChartContainer>
        </div>
      </div>
    </div>
  );
}
