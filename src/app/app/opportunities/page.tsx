'use client';

import React, { useState } from 'react';
import { Search, Filter, RefreshCw, X, CheckCircle2, AlertCircle, ArrowUpRight, Zap, Eye, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { formatCurrency, formatDate } from '@/lib/utils';
import { mockOpportunities } from '@/mocks';
import { Opportunity, OpportunityStatus, PriorityLevel, OpportunityType } from '@/types';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filter logic
  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch =
      opp.customerName.toLowerCase().includes(search.toLowerCase()) ||
      opp.id.toLowerCase().includes(search.toLowerCase()) ||
      opp.type.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || opp.status === statusFilter;
    const matchesPriority = priorityFilter === 'ALL' || opp.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleUpdateStatus = (oppId: string, newStatus: OpportunityStatus) => {
    setOpportunities((prev) =>
      prev.map((item) => (item.id === oppId ? { ...item, status: newStatus, lastUpdated: new Date().toISOString() } : item))
    );
    if (selectedOpp && selectedOpp.id === oppId) {
      setSelectedOpp((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const getStatusBadgeVariant = (status: OpportunityStatus) => {
    switch (status) {
      case 'RECOVERED': return 'success';
      case 'ACTIONABLE': return 'cyan';
      case 'IN_PROGRESS': return 'indigo';
      case 'REVIEWING': return 'warning';
      case 'DISMISSED': return 'neutral';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            Revenue Opportunities Engine
          </h1>
          <p className="text-xs text-gray-400">
            Prioritized leakage opportunities flagged by AI telemetry models.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="cyan" size="md" className="font-mono">
            {filteredOpps.length} Opportunities Displayed
          </Badge>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <Card className="glass-card p-4 border-gray-800 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search */}
          <div className="md:col-span-6">
            <Input
              placeholder="Search customer, ID, or opportunity category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-gray-500" />}
            />
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">NEW</option>
              <option value="REVIEWING">REVIEWING</option>
              <option value="ACTIONABLE">ACTIONABLE</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="RECOVERED">RECOVERED</option>
              <option value="DISMISSED">DISMISSED</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="md:col-span-3">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2.5 text-xs text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="HIGH">HIGH Priority</option>
              <option value="MEDIUM">MEDIUM Priority</option>
              <option value="LOW">LOW Priority</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main Opportunities Data Table */}
      <Card className="glass-card border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-950/60 text-gray-400 font-mono">
                <th className="p-4 font-semibold">CUSTOMER</th>
                <th className="p-4 font-semibold">TYPE</th>
                <th className="p-4 font-semibold">ESTIMATED VALUE</th>
                <th className="p-4 font-semibold">PRIORITY</th>
                <th className="p-4 font-semibold">AI CONFIDENCE</th>
                <th className="p-4 font-semibold">STATUS</th>
                <th className="p-4 font-semibold text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredOpps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    No matching opportunities found for current filters.
                  </td>
                </tr>
              ) : (
                filteredOpps.map((opp) => (
                  <tr
                    key={opp.id}
                    className="hover:bg-gray-800/40 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedOpp(opp);
                      setIsDrawerOpen(true);
                    }}
                  >
                    <td className="p-4 font-semibold text-white">
                      <div>{opp.customerName}</div>
                      <div className="text-[10px] text-gray-500 font-mono">{opp.id}</div>
                    </td>
                    <td className="p-4">
                      <Badge variant="secondary" size="sm">
                        {opp.type}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono font-bold text-cyan-400 text-sm">
                      {formatCurrency(opp.estimatedValue)}
                    </td>
                    <td className="p-4">
                      <Badge
                        variant={opp.priority === 'HIGH' ? 'danger' : opp.priority === 'MEDIUM' ? 'warning' : 'neutral'}
                        size="sm"
                      >
                        {opp.priority}
                      </Badge>
                    </td>
                    <td className="p-4 font-mono text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${opp.confidenceScore}%` }} />
                        </div>
                        <span className="text-[11px] font-bold text-white">{opp.confidenceScore}%</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusBadgeVariant(opp.status)} size="sm">
                        {opp.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-right">
                      <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>
                        Inspect
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Opportunity Detail Drawer Modal */}
      {selectedOpp && (
        <Modal
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          title={`Opportunity Details: ${selectedOpp.id}`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex justify-between items-start border-b border-gray-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{selectedOpp.customerName}</h3>
                <span className="text-xs text-gray-400 font-mono">{selectedOpp.customerEmail}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block font-mono">ESTIMATED RECOVERABLE</span>
                <span className="text-2xl font-black text-cyan-400 font-mono">
                  {formatCurrency(selectedOpp.estimatedValue)}
                </span>
              </div>
            </div>

            {/* AI Recommended Action Box */}
            <div className="p-4 bg-cyan-950/40 rounded-xl border border-cyan-500/30 space-y-2">
              <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" /> RECOMMENDED AI ACTION
              </span>
              <p className="text-sm font-semibold text-white">{selectedOpp.recommendedAction}</p>
            </div>

            {/* Evidence Signals */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase">
                TELEMETRY SIGNALS DETECTED
              </span>
              <div className="space-y-1.5">
                {selectedOpp.signals.map((sig, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300 p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{sig}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update Actions */}
            <div className="pt-4 border-t border-gray-800 space-y-3">
              <span className="text-xs font-mono font-bold text-gray-400 uppercase">UPDATE STATUS</span>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOpp.id, 'RECOVERED')}
                  disabled={selectedOpp.status === 'RECOVERED'}
                >
                  Mark as RECOVERED
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOpp.id, 'IN_PROGRESS')}
                  disabled={selectedOpp.status === 'IN_PROGRESS'}
                >
                  Set IN_PROGRESS
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedOpp.id, 'DISMISSED')}
                  disabled={selectedOpp.status === 'DISMISSED'}
                >
                  Dismiss Opportunity
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
