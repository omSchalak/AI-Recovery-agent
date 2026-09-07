'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does ReviveAI identify revenue leakage without breaking existing billing workflows?',
      a: 'ReviveAI connects via read-only API webhooks (such as Stripe, Shopify, or HubSpot). It inspects payment status events, card decline codes, support ticket telemetry, and churn intent signals in real time without modifying your core checkout flow.',
    },
    {
      q: 'What types of revenue leakage categories does the platform support?',
      a: 'ReviveAI covers 6 main categories: Payment Recovery (soft declines & dunning), Churn Risk signals, Abandoned Checkout Conversions, Billing & Tax Inconsistencies, Inactive Customer Re-engagement, and Expansion Opportunities.',
    },
    {
      q: 'How does the Smart Payment Retry engine work?',
      a: 'Instead of blind retries that trigger hard card locks, ReviveAI uses machine learning models trained on millions of transaction outcomes to determine the optimal day, hour, and payment gateway retry window for each specific issuing bank.',
    },
    {
      q: 'Are the revenue figures shown on the marketing site guaranteed?',
      a: 'All ROI calculator figures and homepage numbers are estimates based on benchmarked industry datasets and demo simulations. Realized recovery outcomes depend on your specific customer base, MRR mix, and decline categories.',
    },
    {
      q: 'How long does setup take for enterprise customers?',
      a: 'Integration takes less than 15 minutes for standard Stripe & Shopify connections. Custom enterprise REST API integrations can be connected via webhooks in under 1 business day.',
    },
    {
      q: 'Is ReviveAI compliant with SOC2 and GDPR standards?',
      a: 'Yes. All data telemetry is encrypted both in transit (TLS 1.3) and at rest (256-bit AES). ReviveAI never stores raw credit card numbers or sensitive customer credentials.',
    },
  ];

  return (
    <section className="py-24 bg-gray-950 border-t border-gray-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-3">
          <Badge variant="cyan" size="md" className="gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Everything You Need to Know
          </h2>
          <p className="text-sm text-gray-400">
            Have questions about ReviveAI? Find clear answers below or contact our engineering team.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Card
                key={index}
                className={`glass-card p-6 transition-all duration-200 border-gray-800 cursor-pointer ${
                  isOpen ? 'border-cyan-500/40 shadow-lg shadow-cyan-500/5' : 'hover:border-gray-700'
                }`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h3 className="text-base font-bold text-white leading-snug">{faq.q}</h3>
                  <ChevronDown
                    className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-gray-800/80 text-sm text-gray-300 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
