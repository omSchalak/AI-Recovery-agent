'use client';

import React, { useState } from 'react';
import { Sparkles, BrainCircuit, RefreshCw, CheckCircle2, Zap, ArrowRight, ShieldCheck, Filter } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency, formatDate } from '@/lib/utils';
import { mockAiInsights } from '@/mocks';
import { AiInsight } from '@/types';

export default function AiInsightsPage() {
  const [insights, setInsights] = useState<AiInsight[]>(mockAiInsights);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisStep(1);
    setTimeout(() => setAnalysisStep(2), 700);
    setTimeout(() => setAnalysisStep(3), 1400);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisStep(0);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 glass-card rounded-2xl border-cyan-500/30 glow-cyan">
        <div className="space-y-1">
          <Badge variant="cyan" size="sm" className="gap-1.5 font-semibold">
            <BrainCircuit className="w-3.5 h-3.5" /> Prescriptive AI Intelligence Layer
          </Badge>
          <h1 className="text-2xl font-bold text-white tracking-tight">AI Insights & Pattern Signals</h1>
          <p className="text-xs text-gray-400">
            Real-time pattern recognition isolating high-yield recovery opportunities across your payment webhooks.
          </p>
        </div>
        <div>
          <Button
            variant="primary"
            size="md"
            onClick={handleRunAnalysis}
            isLoading={isAnalyzing}
            leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}
          >
            {isAnalyzing ? 'Analyzing Telemetry...' : 'Run AI Revenue Scan'}
          </Button>
        </div>
      </div>

      {/* Interactive Scan Simulation Banner */}
      {isAnalyzing && (
        <Card className="glass-card p-6 border-cyan-500/50 space-y-4 animate-pulse">
          <div className="flex items-center gap-3">
            <RefreshCw className="w-5 h-5 text-cyan-400 animate-spin" />
            <h3 className="text-base font-bold text-white">ReviveAI Neural Intelligence Engine Active</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className={`p-3 rounded-lg border ${analysisStep >= 1 ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
              ✓ Stage 1: Ingesting Stripe & Gateway Webhooks
            </div>
            <div className={`p-3 rounded-lg border ${analysisStep >= 2 ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-300' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
              ✓ Stage 2: Isolating Card Decline Cluster Rules
            </div>
            <div className={`p-3 rounded-lg border ${analysisStep >= 3 ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
              ✓ Stage 3: Prioritizing Prescriptive Recovery Actions
            </div>
          </div>
        </Card>
      )}

      {/* AI Insights Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((item) => (
          <Card key={item.id} hoverEffect className="glass-card p-6 border-gray-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
                  {item.id}
                </span>
                <Badge
                  variant={item.confidenceTier === 'HIGH' ? 'cyan' : item.confidenceTier === 'MEDIUM' ? 'warning' : 'neutral'}
                  size="sm"
                >
                  {item.confidenceScore}% Confidence
                </Badge>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{item.summary}</p>

              <div className="p-3 bg-gray-950/90 rounded-xl border border-gray-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Potential Revenue Impact:</span>
                  <span className="font-mono font-bold text-emerald-400">{formatCurrency(item.impactValue)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Leakage Category:</span>
                  <span className="font-mono text-gray-300">{item.category}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-gray-400 uppercase font-semibold">EVIDENCE SIGNALS:</span>
                {item.signals.map((sig, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{sig}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-800/80 space-y-3">
              <div className="text-xs text-gray-400">
                <span className="font-semibold text-gray-300">Suggested Action: </span>
                {item.suggestedAction}
              </div>
              <Button variant="primary" size="sm" className="w-full justify-center" rightIcon={<Zap className="w-4 h-4" />}>
                Execute Recommended Flow
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="p-4 bg-gray-950/80 rounded-xl border border-gray-800 text-xs text-gray-400 text-center">
        ⚠️ <strong className="text-gray-300">AI Disclaimer:</strong> Insights and confidence ratings represent probabilistic predictions generated by AI models based on historical billing data and telemetry signals.
      </div>
    </div>
  );
}
