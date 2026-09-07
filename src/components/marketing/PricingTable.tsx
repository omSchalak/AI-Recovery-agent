'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatCurrency } from '@/lib/utils';

export const PricingTable: React.FC = () => {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      description: 'Ideal for fast-growing startups and early-stage SaaS applications in India & globally.',
      monthlyPrice: 24999,
      annualPrice: 19999,
      features: [
        'Up to ₹50L/mo Recoverable MRR',
        'Stripe & Razorpay / Shopify Webhook Sync',
        'Automated Smart Retry Engine',
        'Standard Email Dunning Sequences',
        'Basic Revenue Leakage Dashboard',
        'Email Support (24h SLA)',
      ],
      popular: false,
      cta: 'Start 14-Day Free Trial',
      variant: 'secondary' as const,
    },
    {
      name: 'Growth',
      description: 'For scaling B2B companies requiring AI insights and automated recovery flows.',
      monthlyPrice: 64999,
      annualPrice: 49999,
      features: [
        'Up to ₹2.5Cr/mo Recoverable MRR',
        'All Starter Integrations + HubSpot CRM',
        'AI Confidence Scoring & Churn Signals',
        'Multi-Channel Campaigns (Email + SMS + WhatsApp)',
        'Custom Webhooks & REST API Access',
        'Dedicated Recovery Specialist',
        '1-Hour Sync Telemetry Frequency',
      ],
      popular: true,
      cta: 'Start Growth Trial',
      variant: 'primary' as const,
    },
    {
      name: 'Enterprise',
      description: 'For high-volume enterprises seeking custom SLAs, custom models, and dedicated support.',
      monthlyPrice: 159999,
      annualPrice: 129999,
      features: [
        'Unlimited Recoverable MRR Volume',
        'Custom CRM & Billing Integrations (Salesforce)',
        'Custom Trained AI Leakage Detection',
        'Real-Time Webhook Stream & Audit Log',
        'Dedicated Account Manager & SLA Guarantee',
        'Custom Data Processing Agreement (DPA)',
        'Quarterly Revenue Optimization Audits',
      ],
      popular: false,
      cta: 'Contact Sales',
      variant: 'outline' as const,
    },
  ];

  return (
    <section className="py-24 bg-gray-950/80 border-t border-gray-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <Badge variant="cyan" size="md" className="gap-1 font-semibold">
            Transparent INR Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Plans Scaled to Your Recovered Revenue
          </h2>
          <p className="text-base text-gray-400">
            Every plan includes our core AI Revenue Intelligence engine. Pay monthly or save 20% with annual billing.
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm ${!annual ? 'text-white font-bold' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="w-14 h-8 bg-gray-800 rounded-full p-1 relative transition-colors border border-gray-700 focus:outline-none"
              aria-label="Toggle Annual Billing"
            >
              <div
                className={`w-6 h-6 rounded-full bg-cyan-400 shadow-md transition-transform ${
                  annual ? 'translate-x-6 bg-cyan-400' : 'translate-x-0 bg-gray-400'
                }`}
              />
            </button>
            <span className={`text-sm flex items-center gap-1.5 ${annual ? 'text-white font-bold' : 'text-gray-400'}`}>
              Annual <Badge variant="success" size="sm">Save 20%</Badge>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <Card
                key={plan.name}
                className={`glass-card p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  plan.popular
                    ? 'border-cyan-500/60 shadow-2xl shadow-cyan-500/10 ring-1 ring-cyan-500/40 glow-cyan'
                    : 'border-gray-800'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-[11px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <p className="text-xs text-gray-400 mt-2 min-h-[36px]">{plan.description}</p>
                  </div>

                  <div className="border-t border-b border-gray-800/80 py-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-black text-white font-mono">{formatCurrency(price)}</span>
                      <span className="text-sm text-gray-400 font-medium">/ month</span>
                    </div>
                    <span className="text-[11px] text-gray-500 font-mono mt-1 block">
                      {annual ? 'Billed annually (' + formatCurrency(price * 12) + '/yr)' : 'Billed monthly'}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-mono font-semibold uppercase tracking-wider text-gray-300">
                      Included Features:
                    </span>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8">
                  <Link href="/app">
                    <Button variant={plan.variant} size="lg" className="w-full justify-center" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
