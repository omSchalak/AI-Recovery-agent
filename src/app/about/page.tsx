import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Lock, Users, Award } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md">Our Mission</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built to Eliminate Silent Revenue Leakage
          </h1>
          <p className="text-lg text-gray-400">
            ReviveAI was founded by veteran fintech engineers and AI researchers with a single objective: ensure growing businesses keep every dollar of revenue they earned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="glass-card p-6 border-gray-800 space-y-3">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-cyan-400 border border-gray-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Enterprise Trust First</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We treat billing telemetry with zero compromise. 256-bit encryption, strict tenant isolation, and SOC2 compliance built into our core framework.
            </p>
          </Card>

          <Card className="glass-card p-6 border-gray-800 space-y-3">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-indigo-400 border border-gray-800">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Actionable Machine Learning</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We eliminate black-box guesswork. Every AI recommendation includes confidence scores, clear evidence signals, and auditability.
            </p>
          </Card>

          <Card className="glass-card p-6 border-gray-800 space-y-3">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-emerald-400 border border-gray-800">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Measurable ROI</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              We don’t measure success by vanity metrics. We measure success strictly by dollars recovered directly into your corporate bank accounts.
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
