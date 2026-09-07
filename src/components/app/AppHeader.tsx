'use client';

import React, { useState } from 'react';
import { Bell, Calendar, ChevronDown, RefreshCw, Sparkles, Building2, Check } from 'lucide-react';
import { useWorkspace } from '@/context/WorkspaceContext';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export const AppHeader: React.FC = () => {
  const { workspace, availableWorkspaces, switchWorkspace } = useWorkspace();
  const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  const notifications = [
    { id: '1', title: 'High-Value Opportunity Flagged', time: '10m ago', desc: 'Acme Corp ($18,450) soft decline detected.' },
    { id: '2', title: 'Smart Retry Recovered Payment', time: '1h ago', desc: 'Quantum Dynamics $22,100 recovered via Gateway 2.' },
    { id: '3', title: 'Stripe Webhook Sync Verified', time: '2h ago', desc: '147 telemetry events processed cleanly.' },
  ];

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1000);
  };

  return (
    <header className="h-20 bg-[#090D14]/90 backdrop-blur-md border-b border-gray-800/80 px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Workspace Selector */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button
            onClick={() => setShowWorkspaceMenu(!showWorkspaceMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 hover:border-cyan-500/40 text-xs font-semibold text-white transition-all"
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            <span>{workspace.name}</span>
            <Badge variant="cyan" size="sm" className="font-mono text-[10px]">
              {workspace.plan}
            </Badge>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {showWorkspaceMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 glass-panel rounded-xl shadow-2xl p-2 z-50 space-y-1">
              <span className="px-3 py-1 text-[10px] font-mono text-gray-400 uppercase font-bold block">
                SWITCH WORKSPACE
              </span>
              {availableWorkspaces.map((ws) => (
                <button
                  key={ws.id}
                  onClick={() => {
                    switchWorkspace(ws.id);
                    setShowWorkspaceMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    ws.id === workspace.id ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="flex flex-col">
                    <span>{ws.name}</span>
                    <span className="text-[10px] text-gray-500">{ws.seatsUsed}/{ws.totalSeats} seats used</span>
                  </div>
                  {ws.id === workspace.id && <Check className="w-4 h-4 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Engine Status Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px]">AI Engine: <strong className="text-white">Active</strong></span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Date Filter */}
        <div className="relative">
          <button
            onClick={() => setShowDateMenu(!showDateMenu)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-xs font-medium text-gray-300"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3 h-3 text-gray-500" />
          </button>

          {showDateMenu && (
            <div className="absolute top-full right-0 mt-2 w-44 glass-panel rounded-xl p-1 z-50 space-y-1">
              {['Last 7 Days', 'Last 30 Days', 'Last 90 Days', 'Year to Date'].map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setDateRange(range);
                    setShowDateMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-xs transition-colors ${
                    range === dateRange ? 'bg-cyan-500/10 text-cyan-400 font-semibold' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sync Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSync}
          isLoading={isSyncing}
          leftIcon={<RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />}
        >
          Sync
        </Button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-400 hover:text-white relative"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400" />
          </button>

          {showNotifications && (
            <div className="absolute top-full right-0 mt-2 w-80 glass-panel rounded-xl p-4 shadow-2xl z-50 space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-gray-800">
                <span className="text-xs font-bold text-white uppercase font-mono">Telemetry Alerts</span>
                <span className="text-[10px] text-cyan-400 font-mono">3 New</span>
              </div>
              <div className="space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2.5 bg-gray-900/90 rounded-lg border border-gray-800 text-xs space-y-0.5">
                    <div className="flex justify-between text-white font-semibold">
                      <span>{n.title}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-400">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
