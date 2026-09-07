'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Target,
  Users,
  Megaphone,
  Sparkles,
  BarChart3,
  Layers,
  Settings,
  CreditCard,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useWorkspace } from '@/context/WorkspaceContext';

export const AppSidebar: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { workspace } = useWorkspace();

  const navItems = [
    { name: 'Overview', href: '/app', icon: LayoutDashboard },
    { name: 'Opportunities', href: '/app/opportunities', icon: Target, badge: '147' },
    { name: 'Customers', href: '/app/customers', icon: Users },
    { name: 'Campaigns', href: '/app/campaigns', icon: Megaphone },
    { name: 'AI Insights', href: '/app/ai-insights', icon: Sparkles, badge: 'NEW', badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
    { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    { name: 'Integrations', href: '/app/integrations', icon: Layers },
  ];

  const secondaryItems = [
    { name: 'Settings', href: '/app/settings', icon: Settings },
    { name: 'Billing', href: '/app/billing', icon: CreditCard },
  ];

  return (
    <aside className="w-64 bg-[#090D14] border-r border-gray-800/80 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div>
        <div className="h-20 px-6 flex items-center gap-3 border-b border-gray-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-cyan-500/20">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1">
              Revive<span className="text-cyan-400">AI</span>
            </span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-semibold">
              Platform Terminal
            </span>
          </div>
        </div>

        {/* Primary Nav Links */}
        <div className="p-4 space-y-6">
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
              REVENUE ENGINE
            </span>
            <nav className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30 shadow-sm shadow-cyan-500/5'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                          item.badgeColor || 'bg-gray-800 text-gray-300 border-gray-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Management Items */}
          <div className="space-y-1 pt-2 border-t border-gray-800/60">
            <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-wider text-gray-500">
              MANAGEMENT
            </span>
            <nav className="mt-2 space-y-1">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-cyan-500/10 text-cyan-400 font-semibold border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                      <span>{item.name}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* User Session Footer */}
      <div className="p-4 border-t border-gray-800/80 bg-gray-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center font-bold text-xs text-cyan-400 shrink-0">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">{user?.name || 'Alex Mercer'}</span>
              <span className="text-[10px] text-gray-400 truncate">{workspace.name}</span>
            </div>
          </div>
          <button
            onClick={logout}
            title="Log Out"
            className="p-1.5 text-gray-400 hover:text-rose-400 hover:bg-rose-950/40 rounded transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
