import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Hero } from '@/components/marketing/Hero';
import { RoiCalculator } from '@/components/marketing/RoiCalculator';
import { LeakageEngine } from '@/components/marketing/LeakageEngine';
import { WorkflowSection } from '@/components/marketing/WorkflowSection';
import { IntegrationsPreview } from '@/components/marketing/IntegrationsPreview';
import { PricingTable } from '@/components/marketing/PricingTable';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';
import { Footer } from '@/components/marketing/Footer';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero Section with Interactive Visualization */}
        <Hero />

        {/* 2. Interactive ROI Calculator */}
        <RoiCalculator />

        {/* 3. Core AI Revenue Engine Breakdown */}
        <LeakageEngine />

        {/* 4. Workflow Pipeline Visualization */}
        <WorkflowSection />

        {/* 5. Integrations Ecosystem */}
        <IntegrationsPreview />

        {/* 6. Pricing Plans */}
        <PricingTable />

        {/* 7. FAQ Accordion */}
        <FaqAccordion />

        {/* 8. Final CTA Banner */}
        <section className="py-24 bg-gradient-to-br from-gray-950 via-[#0E172A] to-gray-950 border-t border-gray-800 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              See How Much Revenue You Could Recover
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto">
              Start identifying revenue leakage today. Connect your billing data in 5 minutes with zero code required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/app">
                <Button variant="primary" size="lg" className="px-8 shadow-xl shadow-cyan-500/25" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore Interactive App Dashboard
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="px-8">
                  Talk to Revenue Specialist
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
