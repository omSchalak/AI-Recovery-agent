'use client';

import React, { useState } from 'react';
import { CreditCard, Check, ArrowRight, Download, Sparkles, ShieldCheck } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { useWorkspace } from '@/context/WorkspaceContext';

export default function BillingPage() {
  const { workspace } = useWorkspace();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  const invoices = [
    { id: 'INV-2026-08', date: '2026-08-01', amount: 49999, status: 'Paid', plan: 'Growth Plan (Annual)' },
    { id: 'INV-2026-07', date: '2026-07-01', amount: 49999, status: 'Paid', plan: 'Growth Plan (Annual)' },
    { id: 'INV-2026-06', date: '2026-06-01', amount: 49999, status: 'Paid', plan: 'Growth Plan (Annual)' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Workspace Subscription & Billing</h1>
        <p className="text-xs text-gray-400">Manage plan tier, seat usage, payment methods, and invoice history in INR (₹).</p>
      </div>

      {/* Current Plan Overview Card */}
      <Card className="glass-card p-8 border-cyan-500/30 glow-cyan relative overflow-hidden space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-800">
          <div className="space-y-1">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase">CURRENT SUBSCRIPTION</span>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-extrabold text-white">{workspace.plan} Plan</h2>
              <Badge variant="cyan" size="md">₹49,999 / month (Billed Annual)</Badge>
            </div>
            <p className="text-xs text-gray-400">Next renewal date: September 15, 2026</p>
          </div>

          <Button variant="primary" size="md" onClick={() => setIsUpgradeModalOpen(true)} rightIcon={<Sparkles className="w-4 h-4" />}>
            Upgrade to Enterprise Tier
          </Button>
        </div>

        {/* Usage Meters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-medium">Team Seats Used</span>
              <span className="text-white font-mono font-bold">{workspace.seatsUsed} / {workspace.totalSeats} seats</span>
            </div>
            <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
              <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${(workspace.seatsUsed / workspace.totalSeats) * 100}%` }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-gray-300 font-medium">Recoverable MRR Volume Tracked</span>
              <span className="text-white font-mono font-bold">₹2.84L / ₹50L limit</span>
            </div>
            <div className="w-full h-2.5 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
              <div className="bg-indigo-500 h-full rounded-full" style={{ width: '56.9%' }} />
            </div>
          </div>
        </div>
      </Card>

      {/* Invoice History Table */}
      <Card className="glass-card border-gray-800 space-y-4 p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Invoice History</h3>
          <span className="text-xs text-gray-400 font-mono">INR Billing History</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400 font-mono">
                <th className="pb-3 font-semibold">INVOICE ID</th>
                <th className="pb-3 font-semibold">DATE</th>
                <th className="pb-3 font-semibold">PLAN TIER</th>
                <th className="pb-3 font-semibold">AMOUNT</th>
                <th className="pb-3 font-semibold">STATUS</th>
                <th className="pb-3 font-semibold text-right">RECEIPT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-800/30">
                  <td className="py-3 font-mono font-semibold text-white">{inv.id}</td>
                  <td className="py-3 text-gray-300">{formatDate(inv.date)}</td>
                  <td className="py-3 text-gray-300">{inv.plan}</td>
                  <td className="py-3 font-mono text-cyan-400 font-bold">{formatCurrency(inv.amount)}</td>
                  <td className="py-3"><Badge variant="success" size="sm">{inv.status}</Badge></td>
                  <td className="py-3 text-right">
                    <Button variant="ghost" size="sm" leftIcon={<Download className="w-3.5 h-3.5 text-gray-400" />}>
                      PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Plan Upgrade Modal */}
      <Modal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} title="Upgrade to Enterprise Tier" size="lg">
        <div className="space-y-6">
          <div className="p-4 bg-cyan-950/40 rounded-xl border border-cyan-500/30 space-y-2">
            <h4 className="text-base font-bold text-white">Enterprise Tier Features</h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Unlimited Recoverable MRR Volume</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Dedicated Salesforce & Custom REST Webhooks</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Custom AI Model Retraining & Dedicated SLA</li>
            </ul>
          </div>

          <div className="p-3 bg-gray-900 rounded-lg border border-gray-800 text-xs text-gray-400">
            ⚠️ Demo Mode: Clicking confirm simulates plan tier modification without processing real payment transactions.
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="ghost" onClick={() => setIsUpgradeModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => { setIsUpgradeModalOpen(false); alert('Simulated Upgrade to Enterprise Tier successful!'); }}>
              Confirm Upgrade
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
