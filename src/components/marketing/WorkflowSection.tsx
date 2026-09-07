import React from 'react';
import { Database, Cpu, Target, ArrowRight, ShieldCheck, PieChart } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export const WorkflowSection: React.FC = () => {
  const flowNodes = [
    { title: 'DATA', desc: 'Billing, CRM & Webhooks', icon: <Database className="w-5 h-5 text-cyan-400" /> },
    { title: 'AI ANALYSIS', desc: 'Pattern Recognition', icon: <Cpu className="w-5 h-5 text-indigo-400" /> },
    { title: 'OPPORTUNITY', desc: 'Prioritized Risk Items', icon: <Target className="w-5 h-5 text-amber-400" /> },
    { title: 'ACTION', desc: 'Automated Dunning & Retries', icon: <ArrowRight className="w-5 h-5 text-emerald-400" /> },
    { title: 'RECOVERY', desc: 'Direct Revenue Restored', icon: <ShieldCheck className="w-5 h-5 text-emerald-400" /> },
    { title: 'INSIGHT', desc: 'Executive ROI Analytics', icon: <PieChart className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <section className="py-20 bg-gray-950/60 border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            End-to-End Autonomous Pipeline
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            From raw billing webhooks to verified bank deposits—all tracked in real-time.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {flowNodes.map((node, index) => (
            <div key={node.title} className="flex flex-col items-center text-center">
              <Card className="w-full glass-card p-4 border-gray-800 hover:border-cyan-500/40 transition-all flex flex-col items-center justify-center space-y-2">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 mb-1">
                  {node.icon}
                </div>
                <span className="text-xs font-mono font-extrabold text-white tracking-wider">
                  {node.title}
                </span>
                <span className="text-[11px] text-gray-400 line-clamp-1">{node.desc}</span>
              </Card>
              {index < flowNodes.length - 1 && (
                <div className="hidden lg:block my-2 text-cyan-500/40">
                  <ArrowRight className="w-4 h-4 rotate-90 lg:rotate-0" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
