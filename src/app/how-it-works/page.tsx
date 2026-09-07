import React from 'react';
import Link from 'next/link';
import { ArrowRight, Search, BrainCircuit, BarChart3, Zap, RefreshCcw, LineChart } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function HowItWorksPage() {
  const steps = [
    { num: '01', title: 'Data Ingestion', desc: 'Read-only connection to your payment gateway, billing provider, and CRM via encrypted webhooks.', icon: <Search className="w-6 h-6 text-cyan-400" /> },
    { num: '02', title: 'AI Leakage Detection', desc: 'Machine learning algorithms inspect millions of telemetry signals to isolate soft declines, churn risk, and billing bugs.', icon: <BrainCircuit className="w-6 h-6 text-indigo-400" /> },
    { num: '03', title: 'Opportunity Prioritization', desc: 'Each flagged item receives an estimated recovery dollar value and AI confidence score.', icon: <BarChart3 className="w-6 h-6 text-purple-400" /> },
    { num: '04', title: 'Action Recommendation', desc: 'Prescriptive action steps generated for automated retry schedules or human account manager outreach.', icon: <Zap className="w-6 h-6 text-amber-400" /> },
    { num: '05', title: 'Automated Recovery', desc: 'Executes automated multi-channel sequences or triggers webhook endpoints to restore account standing.', icon: <RefreshCcw className="w-6 h-6 text-emerald-400" /> },
    { num: '06', title: 'ROI Analytics & Reporting', desc: 'Measures exact net revenue recovered down to the dollar with full audit trail attribution.', icon: <LineChart className="w-6 h-6 text-rose-400" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md">Step-by-Step Workflow</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How ReviveAI Recovers Lost Revenue
          </h1>
          <p className="text-lg text-gray-400">
            A transparent 6-stage process designed to run continuously in the background of your business.
          </p>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {steps.map((step) => (
            <Card key={step.num} className="glass-card p-6 border-gray-800 flex items-start gap-6">
              <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 shrink-0">
                {step.icon}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-cyan-400 font-bold">STEP {step.num}</span>
                  <h3 className="text-xl font-bold text-white">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link href="/app">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Test Drive Platform Dashboard
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
