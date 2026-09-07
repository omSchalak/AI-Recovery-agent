'use client';

import React, { useState } from 'react';
import { CreditCard, ShoppingBag, Users, Cloud, Code2, Check, RefreshCw, AlertCircle, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { mockIntegrations } from '@/mocks';
import { Integration } from '@/types';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>(mockIntegrations);
  const [selectedInt, setSelectedInt] = useState<Integration | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

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

  const handleToggleConnection = (id: string) => {
    setIsConnecting(true);
    setTimeout(() => {
      setIntegrations((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            const nextStatus = item.status === 'CONNECTED' ? 'NOT_CONNECTED' : 'CONNECTED';
            return {
              ...item,
              status: nextStatus,
              lastSyncedAt: new Date().toISOString(),
              connectedAccount: nextStatus === 'CONNECTED' ? 'live_acct_simulated' : undefined,
            };
          }
          return item;
        })
      );
      setIsConnecting(false);
      setIsModalOpen(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Integrations & Webhook Connectors
          </h1>
          <p className="text-xs text-gray-400">
            Connect payment processors, billing systems, CRMs, and custom webhooks.
          </p>
        </div>
        <Badge variant="cyan" size="md" className="font-mono">
          5 Core Connectors Configured
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {integrations.map((item) => {
          const isConnected = item.status === 'CONNECTED';
          const isSim = item.status === 'SIMULATION';
          return (
            <Card key={item.id} className="glass-card p-6 flex flex-col justify-between space-y-6 border-gray-800">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-gray-900 rounded-xl border border-gray-800">
                    {getIcon(item.iconName)}
                  </div>
                  <Badge
                    variant={isConnected ? 'success' : isSim ? 'cyan' : 'neutral'}
                    size="sm"
                  >
                    {item.status}
                  </Badge>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                  <span className="text-[10px] font-mono text-cyan-400">{item.category}</span>
                  <p className="text-xs text-gray-400 leading-relaxed mt-2">{item.description}</p>
                </div>

                {item.connectedAccount && (
                  <div className="p-2.5 bg-gray-950/80 rounded-lg border border-gray-800 text-[11px] font-mono text-gray-300">
                    <span className="text-gray-500 block text-[10px]">CONNECTED ACCOUNT</span>
                    {item.connectedAccount}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-gray-800/80">
                <Button
                  variant={isConnected ? 'secondary' : 'primary'}
                  size="sm"
                  className="w-full justify-center"
                  onClick={() => {
                    setSelectedInt(item);
                    setIsModalOpen(true);
                  }}
                >
                  {isConnected ? 'Manage Connection' : 'Connect Integration'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Integration Connection Modal */}
      {selectedInt && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={`Integration Setup: ${selectedInt.name}`}
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3 p-4 bg-gray-950 rounded-xl border border-gray-800">
              {getIcon(selectedInt.iconName)}
              <div>
                <h3 className="text-base font-bold text-white">{selectedInt.name}</h3>
                <span className="text-xs text-gray-400 font-mono">Category: {selectedInt.category}</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed">
              {selectedInt.description}
            </p>

            <div className="p-3 bg-gray-900/90 rounded-lg border border-gray-800 text-xs space-y-1">
              <span className="text-gray-300 font-semibold block">⚠️ Connection Mode Notice:</span>
              <p className="text-[11px] text-gray-400">
                In demo evaluation mode, toggling connection will simulate read-only webhook synchronization without transmitting live API secrets.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button
                variant={selectedInt.status === 'CONNECTED' ? 'danger' : 'primary'}
                isLoading={isConnecting}
                onClick={() => handleToggleConnection(selectedInt.id)}
              >
                {selectedInt.status === 'CONNECTED' ? 'Disconnect' : 'Confirm Simulation Connection'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
