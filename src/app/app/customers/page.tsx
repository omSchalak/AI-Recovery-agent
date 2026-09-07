'use client';

import React, { useState } from 'react';
import { Search, Users, ShieldAlert, ArrowUpRight, Clock, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { mockCustomers } from '@/mocks';
import { Customer } from '@/types';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [search, setSearch] = useState('');
  const [selectedCust, setSelectedCust] = useState<Customer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Customer Revenue Intelligence
          </h1>
          <p className="text-xs text-gray-400">
            Account-level risk tiering, lifetime value (LTV), and recoverable revenue history.
          </p>
        </div>
        <Badge variant="cyan" size="md" className="font-mono">
          {filtered.length} Customer Accounts Tracked
        </Badge>
      </div>

      <Card className="glass-card p-4 border-gray-800">
        <Input
          placeholder="Search customer by name, email, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-4 h-4 text-gray-500" />}
        />
      </Card>

      <Card className="glass-card border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-950/60 text-gray-400 font-mono">
                <th className="p-4 font-semibold">CUSTOMER</th>
                <th className="p-4 font-semibold">MRR</th>
                <th className="p-4 font-semibold">LTV</th>
                <th className="p-4 font-semibold">RISK TIER</th>
                <th className="p-4 font-semibold">RECOVERABLE VALUE</th>
                <th className="p-4 font-semibold">STATUS</th>
                <th className="p-4 font-semibold text-right">TIMELINE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filtered.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-gray-800/40 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedCust(cust);
                    setIsModalOpen(true);
                  }}
                >
                  <td className="p-4 font-semibold text-white">
                    <div>{cust.name}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{cust.email}</div>
                  </td>
                  <td className="p-4 font-mono text-gray-200">{formatCurrency(cust.mrr)}/mo</td>
                  <td className="p-4 font-mono text-gray-400">{formatCurrency(cust.ltv)}</td>
                  <td className="p-4">
                    <Badge
                      variant={cust.riskTier === 'HIGH' ? 'danger' : cust.riskTier === 'MEDIUM' ? 'warning' : 'success'}
                      size="sm"
                    >
                      {cust.riskTier} RISK
                    </Badge>
                  </td>
                  <td className="p-4 font-mono font-bold text-cyan-400">
                    {formatCurrency(cust.recoverableValue)}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        cust.status === 'Recovered'
                          ? 'success'
                          : cust.status === 'At Risk'
                          ? 'danger'
                          : 'secondary'
                      }
                      size="sm"
                    >
                      {cust.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                      View Activity Log
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Customer Activity Timeline Modal */}
      {selectedCust && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Customer Activity Timeline: ${selectedCust.name}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-3 p-4 bg-gray-950 rounded-xl border border-gray-800 text-center font-mono">
              <div>
                <span className="text-[10px] text-gray-500 block">MRR</span>
                <span className="text-sm font-bold text-white">{formatCurrency(selectedCust.mrr)}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block">RECOVERABLE</span>
                <span className="text-sm font-bold text-cyan-400">{formatCurrency(selectedCust.recoverableValue)}</span>
              </div>
              <div>
                <span className="text-[10px] text-gray-500 block">JOINED</span>
                <span className="text-sm font-bold text-gray-300">{formatDate(selectedCust.joinedDate)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                CHRONOLOGICAL REVENUE ACTIVITY STREAM
              </span>
              <div className="space-y-3">
                {selectedCust.timeline.map((event) => (
                  <div key={event.id} className="p-3 bg-gray-900 rounded-xl border border-gray-800 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-white">{event.title}</span>
                      <span className="text-[10px] font-mono text-gray-500">{formatDate(event.timestamp)}</span>
                    </div>
                    <p className="text-xs text-gray-400">{event.description}</p>
                    {event.amount && (
                      <span className="text-xs font-mono text-emerald-400 font-bold block pt-1">
                        Amount: {formatCurrency(event.amount)}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
