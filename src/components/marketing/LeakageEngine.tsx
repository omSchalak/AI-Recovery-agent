import React from 'react';
import { Search, BrainCircuit, BarChart3, Zap, RefreshCcw, LineChart, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const LeakageEngine: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Detect',
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      desc: 'Continuously monitors payment webhooks, billing sync logs, support tickets, and telemetry signals to identify hidden leakage.',
      category: 'Telemetry & Webhooks',
    },
    {
      num: '02',
      title: 'Understand',
      icon: <BrainCircuit className="w-5 h-5 text-indigo-400" />,
      desc: 'Analyzes root causes: credit card soft vs hard declines, tax discrepancies, churn signals, or abandoned upgrades.',
      category: 'Pattern Recognition',
    },
    {
      num: '03',
      title: 'Prioritize',
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
      desc: 'Ranks recoverable opportunities by dollar value, customer LTV, and AI confidence score to maximize engineering effort ROI.',
      category: 'Opportunity Scoring',
    },
    {
      num: '04',
      title: 'Recommend',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      desc: 'Generates prescriptive recovery actions—from optimal card retry schedules to automated dunning campaigns and exec outreach.',
      category: 'Prescriptive Actions',
    },
    {
      num: '05',
      title: 'Recover',
      icon: <RefreshCcw className="w-5 h-5 text-emerald-400" />,
      desc: 'Executes automated sequences or routes actionable tasks directly into your team’s existing CRM and support queues.',
      category: 'Automated Retention',
    },
    {
      num: '06',
      title: 'Measure',
      icon: <LineChart className="w-5 h-5 text-rose-400" />,
      desc: 'Tracks net revenue recovered down to the exact dollar with full auditability and channel attribution.',
      category: 'Attribution & ROI',
    },
  ];

  return (
    <section className="py-24 bg-gray-950 border-t border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="indigo" size="md" className="gap-1.5 font-semibold">
            <BrainCircuit className="w-3.5 h-3.5" /> Core AI Revenue Engine
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How ReviveAI Stops Revenue Leakage
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            A continuous 6-stage autonomous intelligence engine designed for modern B2B SaaS and subscription businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <Card key={step.num} hoverEffect className="glass-card p-6 border-gray-800 relative group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/30">
                  STAGE {step.num}
                </span>
                <div className="p-2.5 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-cyan-500/40 transition-colors">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{step.desc}</p>
              <div className="pt-3 border-t border-gray-800/80 text-[11px] font-mono text-gray-500 flex justify-between">
                <span>CATEGORY</span>
                <span className="text-gray-300 font-semibold">{step.category}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
