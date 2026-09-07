import React from 'react';
import Link from 'next/link';
import { CreditCard, ShoppingBag, Users, Cloud, Code2, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { mockIntegrations } from '@/mocks';

export const IntegrationsPreview: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard': return <CreditCard className="w-6 h-6 text-cyan-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6 text-emerald-400" />;
      case 'Users': return <Users className="w-6 h-6 text-indigo-400" />;
      case 'Cloud': return <Cloud className="w-6 h-6 text-purple-400" />;
      case 'Code': return <Code2 className="w-6 h-6 text-amber-400" />;
      default: return <CreditCard className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section className="py-24 bg-gray-950 border-t border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <Badge variant="cyan" size="md" className="mb-3">Native Ecosystem</Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Connect Your Existing Tech Stack
            </h2>
            <p className="text-base text-gray-400 max-w-xl mt-2">
              Instant zero-code webhooks for leading payment processors, billing systems, CRMs, and custom enterprise APIs.
            </p>
          </div>
          <Link href="/integrations">
            <span className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors">
              Explore All Integrations <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockIntegrations.map((item) => (
            <Card key={item.id} hoverEffect className="glass-card p-6 flex flex-col justify-between space-y-4 border-gray-800">
              <div className="space-y-3">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 w-fit">
                  {getIcon(item.iconName)}
                </div>
                <h3 className="font-bold text-white text-base">{item.name}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.description}</p>
              </div>
              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between text-[11px]">
                <span className="font-mono text-gray-500">{item.category}</span>
                <span className="font-mono text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  {item.status === 'SIMULATION' ? 'DEMO SIMULATION' : 'READY'}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
