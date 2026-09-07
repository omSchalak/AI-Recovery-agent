'use client';

import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Sparkles, CheckCircle2, ArrowRight, RefreshCw } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';

export const RoiCalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(500000);
  const [customerCount, setCustomerCount] = useState<number>(12500);
  const [avgOrderValue, setAvgOrderValue] = useState<number>(850);
  const [currentRecovery, setCurrentRecovery] = useState<number>(2.4);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Calculations (Estimates)
  const estimatedLeakage = monthlyRevenue * 0.095;
  const estimatedMonthlyRecovered = estimatedLeakage * 0.68;
  const estimatedAnnualImpact = estimatedMonthlyRecovered * 12;

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 900);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 via-[#0E1524] to-gray-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <Badge variant="cyan" size="md" className="gap-1.5 font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Interactive ROI Simulator (INR ₹)
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            See How Much Lost Revenue You Could Recover
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            Adjust your business metrics below to simulate real-time AI leakage detection and potential annual revenue impact in Indian Rupees.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-6">
            <Card className="glass-card p-6 sm:p-8 space-y-6 border-cyan-500/20">
              <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <RefreshCw className={`w-5 h-5 text-cyan-400 ${isSimulating ? 'animate-spin' : ''}`} />
                  Input Your Business Parameters
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
                  INR CALCULATOR
                </span>
              </div>

              {/* Input 1: Monthly Revenue */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label className="text-gray-300">Monthly Revenue (MRR)</label>
                  <span className="text-cyan-400 font-extrabold font-mono text-base">{formatCurrency(monthlyRevenue)}</span>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={5000000}
                  step={25000}
                  value={monthlyRevenue}
                  onChange={(e) => {
                    setMonthlyRevenue(Number(e.target.value));
                    handleSimulate();
                  }}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[11px] text-gray-400 font-mono">
                  <span>₹50K</span>
                  <span>₹10L</span>
                  <span>₹50L+</span>
                </div>
              </div>

              {/* Input 2: Customer Count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label className="text-gray-300">Active Customer Count</label>
                  <span className="text-white font-bold font-mono">{customerCount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={500}
                  max={100000}
                  step={500}
                  value={customerCount}
                  onChange={(e) => {
                    setCustomerCount(Number(e.target.value));
                    handleSimulate();
                  }}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Input 3: Average Order Value */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label className="text-gray-300">Average Order / Contract Value</label>
                  <span className="text-white font-bold font-mono font-sans">₹{avgOrderValue}</span>
                </div>
                <input
                  type="range"
                  min={100}
                  max={10000}
                  step={100}
                  value={avgOrderValue}
                  onChange={(e) => {
                    setAvgOrderValue(Number(e.target.value));
                    handleSimulate();
                  }}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Input 4: Current Recovery Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label className="text-gray-300">Current In-House Recovery Rate</label>
                  <span className="text-white font-bold font-mono">{currentRecovery}%</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.1}
                  value={currentRecovery}
                  onChange={(e) => {
                    setCurrentRecovery(Number(e.target.value));
                    handleSimulate();
                  }}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>
            </Card>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Card className="glass-card p-6 sm:p-8 relative overflow-hidden border-cyan-500/40 glow-cyan">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-cyan-400">
                    ESTIMATED RECOVERABLE OPPORTUNITY (INR)
                  </span>
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-1">
                    {formatCurrency(estimatedMonthlyRecovered)} <span className="text-base font-normal text-gray-400">/ month</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Estimated annual incremental impact: <strong className="text-emerald-400 font-mono text-sm">{formatCurrency(estimatedAnnualImpact)} / yr</strong>
                  </p>
                </div>

                <div className="border-t border-gray-800 pt-6 space-y-3">
                  <h4 className="text-xs font-mono font-semibold text-gray-300 uppercase tracking-wider">
                    Potential Recovery Areas Breakdown
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-900/90 rounded-lg border border-gray-800">
                      <span className="text-xs text-gray-400 block">Payment Recovery</span>
                      <span className="text-base font-bold text-cyan-400 font-mono">{formatCurrency(estimatedMonthlyRecovered * 0.40)}</span>
                    </div>
                    <div className="p-3 bg-gray-900/90 rounded-lg border border-gray-800">
                      <span className="text-xs text-gray-400 block">Churn Signals</span>
                      <span className="text-base font-bold text-indigo-400 font-mono">{formatCurrency(estimatedMonthlyRecovered * 0.28)}</span>
                    </div>
                    <div className="p-3 bg-gray-900/90 rounded-lg border border-gray-800">
                      <span className="text-xs text-gray-400 block">Checkout Conversion</span>
                      <span className="text-base font-bold text-emerald-400 font-mono">{formatCurrency(estimatedMonthlyRecovered * 0.18)}</span>
                    </div>
                    <div className="p-3 bg-gray-900/90 rounded-lg border border-gray-800">
                      <span className="text-xs text-gray-400 block">Expansion Opportunities</span>
                      <span className="text-base font-bold text-amber-400 font-mono">{formatCurrency(estimatedMonthlyRecovered * 0.14)}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/app">
                    <Button variant="primary" size="lg" className="w-full justify-center" rightIcon={<ArrowRight className="w-5 h-5" />}>
                      Explore Your Opportunities →
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
