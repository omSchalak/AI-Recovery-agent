'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, ArrowRight, Lock, Mail, User, Building } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email || 'newuser@reviveai.io');
    router.push('/verify-email');
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
          <h1 className="text-2xl font-bold text-white tracking-tight">Create Workspace</h1>
          <p className="text-xs text-gray-400">Start recovering your business revenue leakage in 5 minutes</p>
        </div>

        <Card className="glass-card p-8 border-gray-800 space-y-6 shadow-2xl">
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Alex Mercer"
              value={name}
              onChange={(e) => setName(e.target.value)}
              leftIcon={<User className="w-4 h-4 text-gray-500" />}
              required
            />

            <Input
              label="Work Email"
              type="email"
              placeholder="alex@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail className="w-4 h-4 text-gray-500" />}
              required
            />

            <Input
              label="Company / Workspace Name"
              placeholder="Acme Global Inc"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              leftIcon={<Building className="w-4 h-4 text-gray-500" />}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock className="w-4 h-4 text-gray-500" />}
              required
            />

            <Button
              variant="primary"
              size="lg"
              type="submit"
              isLoading={isLoading}
              className="w-full justify-center mt-2 shadow-lg shadow-cyan-500/20"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Free Workspace
            </Button>
          </form>

          <div className="pt-4 border-t border-gray-800/80 text-center">
            <span className="text-xs text-gray-400">Already have an account? </span>
            <Link href="/login" className="text-xs font-semibold text-cyan-400 hover:underline">
              Sign In
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
