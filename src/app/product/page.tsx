import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, Zap, BarChart3, Lock, Cpu, Database } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md">Product Architecture</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            The Complete AI Revenue Recovery Platform
          </h1>
          <p className="text-lg text-gray-400">
            Engineered from the ground up to continuously monitor, detect, prioritize, and recover revenue leakage across your subscription lifecycle.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="glass-card p-6 border-gray-800 space-y-4">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-cyan-400 border border-gray-800">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Smart Dunning & Payment Retry</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              ML algorithms optimize transaction retry windows based on issuer behavior, card network error codes, and time zone probabilities.
            </p>
          </Card>

          <Card className="glass-card p-6 border-gray-800 space-y-4">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-indigo-400 border border-gray-800">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Churn Risk Detection</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Early warning indicator system analyzing API volume dropoffs, admin user setting visits, and ticket signals before cancellation occurs.
            </p>
          </Card>

          <Card className="glass-card p-6 border-gray-800 space-y-4">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-emerald-400 border border-gray-800">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Checkout Cart Conversion Rescue</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Automated high-intent conversion recovery flows that engage trial users who hit payment friction at upgrade checkout.
            </p>
          </Card>

          <Card className="glass-card p-6 border-gray-800 space-y-4">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-amber-400 border border-gray-800">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Billing & Tax Reconciliation</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Identifies uncollected VAT/sales tax discrepancies, failed invoice webhooks, and gateway error mismatches automatically.
            </p>
          </Card>

          <Card className="glass-card p-6 border-gray-800 space-y-4">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-purple-400 border border-gray-800">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Prescriptive Action AI Engine</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Translates raw telemetry signals into actionable step-by-step recommendations assigned directly to account managers or webhooks.
            </p>
          </Card>

          <Card className="glass-card p-6 border-gray-800 space-y-4">
            <div className="p-3 bg-gray-900 rounded-xl w-fit text-rose-400 border border-gray-800">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Enterprise Security & Compliance</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              SOC2 Type II certified infrastructure with end-to-end 256-bit encryption, role-based access control, and full audit telemetry.
            </p>
          </Card>
        </div>

        <div className="text-center pt-8">
          <Link href="/app">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
              Explore Live App Dashboard
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
