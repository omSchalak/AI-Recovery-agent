'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, MailCheck, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function VerifyEmailPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] px-4 py-12 relative overflow-hidden bg-grid-pattern">
      <div className="w-full max-w-md space-y-8 relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white">
            Revive<span className="text-cyan-400">AI</span>
          </span>
        </Link>

        <Card className="glass-card p-8 border-gray-800 space-y-6 shadow-2xl">
          <div className="w-14 h-14 bg-cyan-950 text-cyan-400 rounded-full flex items-center justify-center mx-auto border border-cyan-500/40">
            <MailCheck className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-white tracking-tight">Verify Your Email</h1>
            <p className="text-xs text-gray-400 leading-relaxed">
              We sent a verification confirmation link to your inbox. For demo mode evaluation, you can skip straight to your active workspace.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={() => router.push('/app')}
            className="w-full justify-center shadow-lg shadow-cyan-500/20"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Proceed to App Workspace →
          </Button>

          <p className="text-[11px] text-gray-500 font-mono">
            Didn't receive the email? Check spam or <button className="text-cyan-400 hover:underline">Resend Email</button>
          </p>
        </Card>
      </div>
    </div>
  );
}
