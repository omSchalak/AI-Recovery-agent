'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] px-4 py-12 relative overflow-hidden bg-grid-pattern">
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-3">
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Reset Password</h1>
          <p className="text-xs text-gray-400">Enter your email to receive a password reset link</p>
        </div>

        <Card className="glass-card p-8 border-gray-800 space-y-6 shadow-2xl">
          {sent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Password Reset Link Sent</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                If an account exists for <strong className="text-white">{email}</strong>, you will receive password reset instructions shortly.
              </p>
              <Link href="/login">
                <Button variant="outline" className="w-full justify-center mt-2" leftIcon={<ArrowLeft className="w-4 h-4" />}>
                  Back to Sign In
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Work Email Address"
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leftIcon={<Mail className="w-4 h-4 text-gray-500" />}
                required
              />
              <Button
                variant="primary"
                size="lg"
                type="submit"
                isLoading={loading}
                className="w-full justify-center shadow-lg shadow-cyan-500/20"
              >
                Send Reset Link
              </Button>
              <div className="pt-2 text-center">
                <Link href="/login" className="text-xs text-gray-400 hover:text-white inline-flex items-center gap-1">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
                </Link>
              </div>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
