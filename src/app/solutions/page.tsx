import React from 'react';
import Link from 'next/link';
import { ArrowRight, Building2, ShoppingBag, Layers, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function SolutionsPage() {
  const solutions = [
    {
      title: 'B2B SaaS & Subscription Platforms',
      desc: 'Recover failed recurring payments, mitigate customer churn risks before cancellation, and identify expansion opportunities.',
      icon: <Building2 className="w-6 h-6 text-cyan-400" />,
      benefits: ['Smart dunning schedules', 'Executive retention alerts', 'Capacity threshold expansion prompts'],
    },
    {
      title: 'High-Volume E-Commerce & Retail',
      desc: 'Rescue high-value abandoned checkouts, address payment gateway timeouts, and automate re-engagement campaigns.',
      icon: <ShoppingBag className="w-6 h-6 text-emerald-400" />,
      benefits: ['One-click cart recovery links', 'Alternative payment method prompts', 'Customer order LTV tracking'],
    },
    {
      title: 'Enterprise FinTech & Usage Billing',
      desc: 'Reconcile billing discrepancies, fix tax code mismatches, and automate high-MRR account dunning sequences.',
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      benefits: ['Custom REST API webhooks', 'Dedicated SLA guarantees', 'SOC2 Type II compliant audit logs'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md">Industry Solutions</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Tailored Revenue Recovery for Every Business Model
          </h1>
          <p className="text-lg text-gray-400">
            Whether you operate recurring B2B subscriptions, high-volume e-commerce, or enterprise usage billing, ReviveAI adapts to your revenue architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((sol) => (
            <Card key={sol.title} className="glass-card p-8 border-gray-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 w-fit">
                  {sol.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{sol.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{sol.desc}</p>
                <div className="pt-4 border-t border-gray-800 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">Key Capabilities:</span>
                  {sol.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/app">
                <Button variant="outline" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Explore Solution
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
