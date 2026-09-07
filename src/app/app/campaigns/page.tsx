'use client';

import React, { useState } from 'react';
import { Megaphone, Plus, Pause, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { formatCurrency } from '@/lib/utils';
import { mockCampaigns } from '@/mocks';
import { Campaign, CampaignStatus, OpportunityType } from '@/types';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [objective, setObjective] = useState('');
  const [category, setCategory] = useState<OpportunityType>('Payment Recovery');

  const toggleCampaignStatus = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus: CampaignStatus = c.status === 'Running' ? 'Paused' : 'Running';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    const newCamp: Campaign = {
      id: `CMP-${Math.floor(100 + Math.random() * 900)}`,
      name: name || 'New Recovery Campaign',
      objective: objective || 'Automated dunning flow',
      category,
      status: 'Running',
      targetAudienceCount: 120,
      recoveredValue: 0,
      channel: 'Multi-Channel',
      createdAt: new Date().toISOString().split('T')[0],
      conversionRate: 0,
    };
    setCampaigns([newCamp, ...campaigns]);
    setIsModalOpen(false);
    setName('');
    setObjective('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Revenue Recovery Campaigns
          </h1>
          <p className="text-xs text-gray-400">
            Automated dunning, retention incentives, and abandoned checkout rescue workflows.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
          Create New Campaign
        </Button>
      </div>

      <Card className="glass-card border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-950/60 text-gray-400 font-mono">
                <th className="p-4 font-semibold">CAMPAIGN NAME</th>
                <th className="p-4 font-semibold">CATEGORY</th>
                <th className="p-4 font-semibold">CHANNEL</th>
                <th className="p-4 font-semibold">AUDIENCE</th>
                <th className="p-4 font-semibold">RECOVERED VALUE</th>
                <th className="p-4 font-semibold">STATUS</th>
                <th className="p-4 font-semibold text-right">TOGGLE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {campaigns.map((camp) => (
                <tr key={camp.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="p-4 font-semibold text-white">
                    <div>{camp.name}</div>
                    <div className="text-[10px] text-gray-500 font-mono">{camp.objective}</div>
                  </td>
                  <td className="p-4">
                    <Badge variant="secondary" size="sm">
                      {camp.category}
                    </Badge>
                  </td>
                  <td className="p-4 font-mono text-gray-300">{camp.channel}</td>
                  <td className="p-4 font-mono text-gray-400">{camp.targetAudienceCount} accounts</td>
                  <td className="p-4 font-mono font-bold text-emerald-400 text-sm">
                    {formatCurrency(camp.recoveredValue)}
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        camp.status === 'Running'
                          ? 'success'
                          : camp.status === 'Paused'
                          ? 'warning'
                          : 'secondary'
                      }
                      size="sm"
                    >
                      {camp.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button
                      variant={camp.status === 'Running' ? 'secondary' : 'outline'}
                      size="sm"
                      onClick={() => toggleCampaignStatus(camp.id)}
                      leftIcon={
                        camp.status === 'Running' ? (
                          <Pause className="w-3.5 h-3.5 text-amber-400" />
                        ) : (
                          <Play className="w-3.5 h-3.5 text-emerald-400" />
                        )
                      }
                    >
                      {camp.status === 'Running' ? 'Pause' : 'Resume'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Campaign Creation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Recovery Campaign">
        <form onSubmit={handleCreateCampaign} className="space-y-4">
          <Input
            label="Campaign Name"
            placeholder="Smart Retry Sequence Sept 2026"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            label="Campaign Objective"
            placeholder="Target soft decline recurring payments"
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-300">Opportunity Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as OpportunityType)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="Payment Recovery">Payment Recovery</option>
              <option value="Churn Risk">Churn Risk</option>
              <option value="Conversion Opportunity">Conversion Opportunity</option>
              <option value="Expansion Opportunity">Expansion Opportunity</option>
              <option value="Billing Issue">Billing Issue</option>
            </select>
          </div>

          <Button variant="primary" size="lg" type="submit" className="w-full justify-center mt-2">
            Launch Recovery Campaign
          </Button>
        </form>
      </Modal>
    </div>
  );
}
