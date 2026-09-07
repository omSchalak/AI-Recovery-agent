'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  DollarSign,
  Target,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { MetricCard } from '@/components/ui/MetricCard';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ChartContainer } from '@/components/ui/ChartContainer';
import { RevenueTrendAreaChart } from '@/components/app/charts/RevenueTrendAreaChart';
import { RevenueRiskBarChart } from '@/components/app/charts/RevenueRiskBarChart';
import { RecoveryFunnelChart } from '@/components/app/charts/RecoveryFunnelChart';
import { formatCurrency } from '@/lib/utils';
import { mockMetricSummary, mockOpportunities, mockAiInsights } from '@/mocks';

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-card rounded-2xl border-cyan-500/20 glow-cyan">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Revenue Overview</h1>
            <Badge variant="cyan" size="sm" className="font-mono">LIVE INTELLIGENCE</Badge>
          </div>
          <p className="text-xs text-gray-400">
            AI detected <strong className="text-cyan-400 font-mono">147 actionable revenue leakage opportunities</strong> valued at {formatCurrency(mockMetricSummary.recoverableRevenue)}.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/app/ai-insights">
            <Button variant="primary" size="sm" leftIcon={<Sparkles className="w-4 h-4" />}>
              View AI Insights
            </Button>
          </Link>
          <Link href="/app/opportunities">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Opportunities
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Hero Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <MetricCard
          title="Recoverable Revenue"
          value={formatCurrency(mockMetricSummary.recoverableRevenue)}
          trend={mockMetricSummary.recoverableRevenueTrend}
          trendLabel="vs previous period"
          tooltip="Total estimated revenue leakage detected across payment declines, churn signals, and billing bugs."
          icon={<DollarSign className="w-5 h-5 text-cyan-400" />}
        />

        <MetricCard
          title="Revenue Recovered"
          value={formatCurrency(mockMetricSummary.revenueRecovered)}
          trend={mockMetricSummary.revenueRecoveredTrend}
          trendLabel="vs previous period"
          tooltip="Net cash successfully retained or re-collected directly into your bank accounts."
          icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
        />

        <MetricCard
          title="Recovery Rate"
          value={`${mockMetricSummary.recoveryRate}%`}
          trend={mockMetricSummary.recoveryRateTrend}
          trendLabel="efficiency rate"
          tooltip="Percentage of identified recoverable opportunities successfully restored."
          icon={<TrendingUp className="w-5 h-5 text-indigo-400" />}
        />

        <MetricCard
          title="Active Opportunities"
          value={mockMetricSummary.activeOpportunities}
          trend={mockMetricSummary.activeOpportunitiesTrend}
          trendLabel="new items flagged"
          tooltip="Number of prioritized recovery actions awaiting execution or processing."
          icon={<Target className="w-5 h-5 text-amber-400" />}
        />
      </div>

      {/* Interactive Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Revenue Recovery Velocity Gradient Area Graph */}
        <div className="lg:col-span-8">
          <ChartContainer
            title="Revenue Recovery Velocity (30 Days)"
            description="Comparison of identified recoverable revenue vs actual recovered cash over time."
            height="h-72"
          >
            <RevenueTrendAreaChart />
          </ChartContainer>
        </div>

        {/* Chart 2: Revenue At Risk Horizontal Bar Graph */}
        <div className="lg:col-span-4">
          <ChartContainer
            title="Revenue At Risk by Category"
            description="Dollar distribution across leakage categories."
            height="h-72"
          >
            <RevenueRiskBarChart />
          </ChartContainer>
        </div>
      </div>

      {/* Interactive Charts Row 2: Conversion Funnel Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ChartContainer
            title="Recovery Conversion Funnel"
            description="Stage-by-stage progression from detection to verified recovery."
            height="h-72"
          >
            <RecoveryFunnelChart />
          </ChartContainer>
        </div>

        {/* AI Insight Highlights Sidebar */}
        <div className="lg:col-span-6">
          <Card className="glass-card p-6 border-cyan-500/30 glow-cyan space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase font-mono">
                <Sparkles className="w-4 h-4 animate-pulse" /> AI Engine Recommendation
              </div>
              <h3 className="text-lg font-bold text-white">
                {mockAiInsights[0].title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                {mockAiInsights[0].summary}
              </p>
              <div className="p-3 bg-gray-950/80 rounded-xl border border-gray-800 text-xs space-y-2 font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Est. Impact Value:</span>
                  <span className="text-emerald-400 font-bold">{formatCurrency(mockAiInsights[0].impactValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">AI Confidence Score:</span>
                  <span className="text-cyan-400 font-bold">{mockAiInsights[0].confidenceScore}%</span>
                </div>
              </div>
            </div>

            <Link href="/app/ai-insights" className="pt-2">
              <Button variant="primary" size="md" className="w-full justify-center" rightIcon={<Zap className="w-4 h-4" />}>
                Execute AI Recommended Flow
              </Button>
            </Link>
          </Card>
        </div>
      </div>

      {/* Top Priority Opportunities Table */}
      <Card className="glass-card p-6 border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">Top Recovery Opportunities</CardTitle>
            <CardDescription className="text-xs">Highest value items flagged by AI engine</CardDescription>
          </div>
          <Link href="/app/opportunities">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-mono">
                <th className="pb-3 font-semibold">CUSTOMER</th>
                <th className="pb-3 font-semibold">TYPE</th>
                <th className="pb-3 font-semibold">VALUE</th>
                <th className="pb-3 font-semibold">PRIORITY</th>
                <th className="pb-3 font-semibold">RECOMMENDED ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {mockOpportunities.slice(0, 5).map((opp) => (
                <tr key={opp.id} className="hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 font-semibold text-white">
                    <div>{opp.customerName}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{opp.id}</div>
                  </td>
                  <td className="py-3">
                    <Badge variant="secondary" size="sm">
                      {opp.type}
                    </Badge>
                  </td>
                  <td className="py-3 font-mono font-bold text-cyan-400">
                    {formatCurrency(opp.estimatedValue)}
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={opp.priority === 'HIGH' ? 'danger' : opp.priority === 'MEDIUM' ? 'warning' : 'neutral'}
                      size="sm"
                    >
                      {opp.priority}
                    </Badge>
                  </td>
                  <td className="py-3 text-gray-300 max-w-xs truncate">
                    {opp.recommendedAction}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
