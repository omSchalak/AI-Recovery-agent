'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, TrendingUp, ShieldAlert, CheckCircle2, Zap, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { RevenueTrendAreaChart } from '@/components/app/charts/RevenueTrendAreaChart';
import { formatCurrency } from '@/lib/utils';
import { mockMetricSummary } from '@/mocks';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-12 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-grid-pattern">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Eyebrow Badge */}
          <Badge variant="cyan" size="md" className="gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 glow-cyan">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="font-semibold text-xs tracking-wider uppercase">AI REVENUE INTELLIGENCE</span>
          </Badge>

          {/* Headline Concept */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
            Turn Lost Revenue Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Recovered Revenue.
            </span>
          </h1>

          {/* Supporting Message */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
            AI continuously finds revenue leakage, identifies the highest-value recovery opportunities, and helps your team act before revenue disappears.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto pt-2">
            <Link href="/app" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 shadow-xl shadow-cyan-500/25" rightIcon={<ArrowRight className="w-5 h-5" />}>
                See Your Revenue Opportunity
              </Button>
            </Link>
            <Link href="/how-it-works" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8" leftIcon={<Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />}>
                Explore Platform
              </Button>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400 pt-4">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5-minute setup with Stripe & Shopify
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SOC2 Type II Security
            </span>
          </div>
        </div>

        {/* Hero Interactive Visualization Preview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <Card className="glass-card p-4 sm:p-6 rounded-2xl border-cyan-500/30 glow-cyan relative shadow-2xl">
            {/* Header Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-800/80 mb-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-xs font-mono text-gray-400 border-l border-gray-800 pl-3">
                  ReviveAI Revenue Intelligence Terminal (Demo Data)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="cyan" size="sm" className="font-mono">
                  LIVE ENGINE: ACTIVE
                </Badge>
                <span className="text-xs text-gray-500 font-mono">Synced 2m ago</span>
              </div>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-gray-950/80 rounded-xl border border-gray-800">
                <span className="text-xs font-medium text-gray-400">Recoverable Revenue</span>
                <div className="text-2xl font-black text-white font-mono mt-1">
                  {formatCurrency(mockMetricSummary.recoverableRevenue)}
                </div>
                <span className="text-xs text-emerald-400 font-semibold mt-1 inline-block">
                  +{mockMetricSummary.recoverableRevenueTrend}% vs last month
                </span>
              </div>

              <div className="p-4 bg-gray-950/80 rounded-xl border border-gray-800">
                <span className="text-xs font-medium text-gray-400">Revenue Recovered</span>
                <div className="text-2xl font-black text-cyan-400 font-mono mt-1">
                  {formatCurrency(mockMetricSummary.revenueRecovered)}
                </div>
                <span className="text-xs text-emerald-400 font-semibold mt-1 inline-block">
                  +{mockMetricSummary.revenueRecoveredTrend}% vs last month
                </span>
              </div>

              <div className="p-4 bg-gray-950/80 rounded-xl border border-gray-800">
                <span className="text-xs font-medium text-gray-400">Recovery Rate</span>
                <div className="text-2xl font-black text-indigo-400 font-mono mt-1">
                  {mockMetricSummary.recoveryRate}%
                </div>
                <span className="text-xs text-emerald-400 font-semibold mt-1 inline-block">
                  +{mockMetricSummary.recoveryRateTrend}% efficiency boost
                </span>
              </div>

              <div className="p-4 bg-gray-950/80 rounded-xl border border-gray-800">
                <span className="text-xs font-medium text-gray-400">AI Opportunities</span>
                <div className="text-2xl font-black text-amber-400 font-mono mt-1">
                  {mockMetricSummary.activeOpportunities}
                </div>
                <span className="text-xs text-amber-400 font-semibold mt-1 inline-block">
                  147 High Priority Flagged
                </span>
              </div>
            </div>

            {/* Interactive Recharts Graph Section */}
            <div className="p-6 bg-gray-950/90 rounded-xl border border-gray-800/80 space-y-4">
              <div className="flex justify-between items-center text-xs text-gray-400 font-mono pb-2 border-b border-gray-800">
                <span className="flex items-center gap-2 text-white font-semibold">
                  <TrendingUp className="w-4 h-4 text-cyan-400" /> Revenue Recovery Trend (30-Day Velocity)
                </span>
                <span>Live Recharts Analytics Preview</span>
              </div>

              {/* Area Chart Container */}
              <div className="w-full pt-2">
                <RevenueTrendAreaChart />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
