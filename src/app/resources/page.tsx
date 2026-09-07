import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, FileText, Video, Sparkles } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

export default function ResourcesPage() {
  const articles = [
    { title: 'The 2026 SaaS Revenue Leakage Benchmark Report', category: 'Whitepaper', time: '12 min read', icon: <FileText className="w-5 h-5 text-cyan-400" /> },
    { title: 'Optimizing Credit Card Retry Windows for European Issuers', category: 'Technical Guide', time: '8 min read', icon: <BookOpen className="w-5 h-5 text-indigo-400" /> },
    { title: 'Building a Proactive Churn Signal Prevention System', category: 'Masterclass', time: '15 min video', icon: <Video className="w-5 h-5 text-purple-400" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md">Knowledge Hub</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Revenue Recovery Guides & Research
          </h1>
          <p className="text-lg text-gray-400">
            Insights, technical documentation, and benchmark reports from the ReviveAI engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Card key={art.title} hoverEffect className="glass-card p-6 border-gray-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 w-fit">
                  {art.icon}
                </div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">{art.category}</span>
                <h3 className="text-xl font-bold text-white leading-snug">{art.title}</h3>
                <p className="text-xs text-gray-400">{art.time}</p>
              </div>
              <span className="text-sm font-semibold text-cyan-400 flex items-center gap-1.5 cursor-pointer hover:text-cyan-300">
                Read Article <ArrowRight className="w-4 h-4" />
              </span>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
