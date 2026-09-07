import React from 'react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { PricingTable } from '@/components/marketing/PricingTable';
import { FaqAccordion } from '@/components/marketing/FaqAccordion';

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />
      <main className="flex-1">
        <PricingTable />
        <FaqAccordion />
      </main>
      <Footer />
    </div>
  );
}
