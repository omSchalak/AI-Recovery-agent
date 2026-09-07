import React from 'react';
import { AppSidebar } from '@/components/app/AppSidebar';
import { AppHeader } from '@/components/app/AppHeader';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0B0F17] text-gray-100 font-sans">
      {/* Sidebar Navigation */}
      <AppSidebar />

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 p-6 md:p-8 space-y-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
