import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/80 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-md shadow-cyan-500/20">
                <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                Revive<span className="text-cyan-400">AI</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The AI Revenue Recovery Platform. Continuously identify revenue leakage, prioritize high-value recovery opportunities, and automate revenue retention.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> SOC2 Type II Certified
              </span>
              <span className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-cyan-400" /> 256-bit Encryption
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200 mb-4 font-mono">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/product" className="hover:text-cyan-400 transition-colors">Overview</Link></li>
              <li><Link href="/how-it-works" className="hover:text-cyan-400 transition-colors">Revenue Engine</Link></li>
              <li><Link href="/solutions" className="hover:text-cyan-400 transition-colors">Use Cases</Link></li>
              <li><Link href="/integrations" className="hover:text-cyan-400 transition-colors">Integrations</Link></li>
              <li><Link href="/pricing" className="hover:text-cyan-400 transition-colors">Pricing Plans</Link></li>
              <li><Link href="/app" className="hover:text-cyan-400 transition-colors font-medium text-cyan-400">App Dashboard</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200 mb-4 font-mono">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/solutions#payment-recovery" className="hover:text-cyan-400 transition-colors">Payment Recovery</Link></li>
              <li><Link href="/solutions#churn-risk" className="hover:text-cyan-400 transition-colors">Churn Signal Risk</Link></li>
              <li><Link href="/solutions#conversion" className="hover:text-cyan-400 transition-colors">Checkout Conversion</Link></li>
              <li><Link href="/solutions#billing" className="hover:text-cyan-400 transition-colors">Billing Inconsistencies</Link></li>
              <li><Link href="/solutions#expansion" className="hover:text-cyan-400 transition-colors">Expansion Opportunities</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-200 mb-4 font-mono">
              Company & Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="/resources" className="hover:text-cyan-400 transition-colors">Resources & Guides</Link></li>
              <li><Link href="/contact" className="hover:text-cyan-400 transition-colors">Contact Sales</Link></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Security Overview</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© {new Date().getFullYear()} ReviveAI Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-gray-400 font-mono">System Status: <span className="text-emerald-400 font-semibold">Operational</span></span>
            <span className="text-gray-400">Version 2.4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
