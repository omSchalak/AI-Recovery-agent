'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Navbar } from '@/components/marketing/Navbar';
import { Footer } from '@/components/marketing/Footer';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-gray-100">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan" size="md">Get In Touch</Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Talk to a Revenue Recovery Specialist
          </h1>
          <p className="text-lg text-gray-400">
            Have custom enterprise requirements or need help evaluating your revenue leakage potential? Our team is here to assist.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <Card className="glass-card p-6 border-gray-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Contacts</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Sales & Enterprise Enquiries</span>
                  <span className="font-semibold text-white">enterprise@reviveai.io</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-indigo-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Phone Support</span>
                  <span className="font-semibold text-white">+1 (800) 555-REVIVE</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-300">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 text-emerald-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-gray-400 block">Headquarters</span>
                  <span className="font-semibold text-white">San Francisco, CA 94107</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <Card className="glass-card p-8 border-gray-800">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent Successfully!</h3>
                  <p className="text-sm text-gray-400">
                    Our revenue engineering team will review your details and respond within 4 business hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-2">Send Us a Message</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="Full Name" placeholder="Alex Mercer" required />
                    <Input label="Work Email" type="email" placeholder="alex@company.com" required />
                  </div>

                  <Input label="Company Name" placeholder="Acme Global Inc" required />

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300">Monthly Revenue Volume</label>
                    <select className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500">
                      <option>$50,000 - $250,000 / mo</option>
                      <option>$250,000 - $1,000,000 / mo</option>
                      <option>$1,000,000+ / mo</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300">Message / Request Details</label>
                    <textarea
                      rows={4}
                      className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="Tell us about your payment stack and current dunning challenges..."
                      required
                    />
                  </div>

                  <Button variant="primary" size="lg" type="submit" isLoading={loading} className="w-full justify-center" rightIcon={<Send className="w-4 h-4" />}>
                    Submit Request
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
