'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('alex@reviveai.io');
  const [password, setPassword] = useState('••••••••••••');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    const success = await login(email);
    if (success) {
      router.push('/app');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F17] px-4 py-12 relative overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-gray-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <span className="font-extrabold text-2xl tracking-tight text-white">
              Revive<span className="text-cyan-400">AI</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-xs text-gray-400">Sign in to your revenue intelligence workspace</p>
        </div>

        <Card className="glass-card p-8 border-gray-800 space-y-6 shadow-2xl">
          {error && (
            <div className="p-3 bg-rose-950/80 border border-rose-500/50 rounded-lg text-xs text-rose-300">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Work Email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-gray-500" />}
              required
            />

            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <label className="font-medium text-gray-300">Password</label>
                <Link href="/forgot-password" className="text-cyan-400 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                leftIcon={<Lock className="w-4 h-4 text-gray-500" />}
                required
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center mt-2 shadow-lg shadow-cyan-500/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to App Dashboard
            </Button>
          </form>

          <div className="pt-4 border-t border-gray-800/80 text-center">
            <span className="text-xs text-gray-400">Don't have an account? </span>
            <Link href="/signup" className="text-xs font-semibold text-cyan-400 hover:underline">
              Start Free Trial
            </Link>
          </div>

          <div className="p-3 bg-gray-950/90 rounded-lg border border-gray-800 text-[11px] text-gray-400 text-center">
            💡 <strong className="text-gray-300">Demo Quick Access:</strong> Click "Sign In" to instantly enter the live dashboard using pre-loaded test data.
          </div>
        </Card>
      </div>
    </div>
  );
}
