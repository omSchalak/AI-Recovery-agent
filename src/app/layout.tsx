import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { WorkspaceProvider } from '@/context/WorkspaceContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ReviveAI | AI Revenue Recovery Platform',
  description: 'Recover revenue your business is already earning—but currently losing. AI continuously finds revenue leakage, prioritizes opportunities, and automates recovery.',
  keywords: ['Revenue Recovery', 'AI Revenue Intelligence', 'Payment Recovery', 'Churn Risk', 'SaaS Revenue Leakage'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0B0F17] text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        <AuthProvider>
          <WorkspaceProvider>
            {children}
          </WorkspaceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
