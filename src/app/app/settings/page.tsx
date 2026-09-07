'use client';

import React, { useState } from 'react';
import { User, Building, Bell, Shield, Sparkles, CheckCircle2, Save } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useWorkspace } from '@/context/WorkspaceContext';

export default function SettingsPage() {
  const { user } = useAuth();
  const { workspace } = useWorkspace();
  const [activeTab, setActiveTab] = useState<'profile' | 'workspace' | 'notifications' | 'ai' | 'security'>('profile');
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState(user?.name || 'Alex Mercer');
  const [email, setEmail] = useState(user?.email || 'alex@reviveai.io');
  const [workspaceName, setWorkspaceName] = useState(workspace.name);
  const [aiConfidenceThreshold, setAiConfidenceThreshold] = useState(80);
  const [autoRetry, setAutoRetry] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Account & Workspace Settings</h1>
        <p className="text-xs text-gray-400">Manage user profile, AI confidence thresholds, and security preferences.</p>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-gray-800 space-x-6 text-xs font-medium">
        {[
          { id: 'profile', label: 'User Profile', icon: User },
          { id: 'workspace', label: 'Workspace Details', icon: Building },
          { id: 'ai', label: 'AI Preferences', icon: Sparkles },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'security', label: 'Security & Keys', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-3 flex items-center gap-2 font-mono transition-colors relative ${
                isActive ? 'text-cyan-400 font-bold border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {saved && (
        <div className="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Settings preferences updated successfully.</span>
        </div>
      )}

      {/* Tab Panels */}
      <Card className="glass-card p-8 border-gray-800 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Profile Information</h3>
              <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Input label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs text-gray-400">
                User Role: <strong className="text-cyan-400 font-mono">Workspace Administrator</strong>
              </div>
            </div>
          )}

          {activeTab === 'workspace' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Workspace Configuration</h3>
              <Input label="Workspace Name" value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)} required />
              <div className="p-3 bg-gray-950 rounded-lg border border-gray-800 text-xs text-gray-400 space-y-1">
                <div>Plan: <strong className="text-white font-mono">{workspace.plan} Tier</strong></div>
                <div>Team Seats: <strong className="text-cyan-400 font-mono">{workspace.seatsUsed} / {workspace.totalSeats} seats active</strong></div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">AI Engine Sensitivity Settings</h3>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <label className="text-gray-300">Minimum AI Confidence Score Threshold</label>
                  <span className="text-cyan-400 font-mono font-bold">{aiConfidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={95}
                  value={aiConfidenceThreshold}
                  onChange={(e) => setAiConfidenceThreshold(Number(e.target.value))}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <p className="text-[11px] text-gray-500">Only opportunities with confidence score &ge; {aiConfidenceThreshold}% will trigger automated dunning actions.</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-950 rounded-xl border border-gray-800">
                <div>
                  <h4 className="text-sm font-bold text-white">Automated Smart Card Retries</h4>
                  <p className="text-xs text-gray-400">Automatically execute optimal window retries for soft declines.</p>
                </div>
                <input
                  type="checkbox"
                  checked={autoRetry}
                  onChange={(e) => setAutoRetry(e.target.checked)}
                  className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Email & Webhook Alerts</h3>
              <div className="space-y-3 text-xs">
                {['High-Value Opportunity Alerts (>$5,000)', 'Daily Revenue Recovery Digest', 'Weekly Executive ROI Report', 'Gateway Webhook Failure Warnings'].map((label, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 bg-gray-950 rounded-lg border border-gray-800 text-gray-300 cursor-pointer">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-cyan-500 rounded" />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Security & API Keys</h3>
              <div className="p-4 bg-gray-950 rounded-xl border border-gray-800 space-y-2 text-xs font-mono">
                <span className="text-gray-500 uppercase font-semibold">PRODUCTION API SECRET KEY</span>
                <div className="p-2.5 bg-gray-900 rounded border border-gray-800 text-cyan-400 font-bold flex justify-between items-center">
                  <span>rv_live_98a72f1092a...8910</span>
                  <Button variant="outline" size="sm">Rotate Key</Button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-800 flex justify-end">
            <Button variant="primary" type="submit" isLoading={loading} leftIcon={<Save className="w-4 h-4" />}>
              Save Settings Preferences
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
