import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'brand' | 'outline' | 'cyan' | 'indigo' | 'secondary';
  size?: 'sm' | 'md';
  glow?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'neutral',
  size = 'md',
  glow = false,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full transition-colors';

  const variants = {
    success: 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/60',
    warning: 'bg-amber-950/80 text-amber-400 border border-amber-800/60',
    danger: 'bg-rose-950/80 text-rose-400 border border-rose-800/60',
    info: 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60',
    cyan: 'bg-cyan-950/80 text-cyan-400 border border-cyan-800/60',
    brand: 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60',
    indigo: 'bg-indigo-950/80 text-indigo-300 border border-indigo-800/60',
    neutral: 'bg-gray-800 text-gray-300 border border-gray-700',
    secondary: 'bg-gray-800 text-gray-300 border border-gray-700',
    outline: 'bg-transparent text-gray-300 border border-gray-700',
  };

  const glows = {
    success: 'shadow-sm shadow-emerald-500/20',
    warning: 'shadow-sm shadow-amber-500/20',
    danger: 'shadow-sm shadow-rose-500/20',
    info: 'shadow-sm shadow-cyan-500/20',
    cyan: 'shadow-sm shadow-cyan-500/20',
    brand: 'shadow-sm shadow-indigo-500/20',
    indigo: 'shadow-sm shadow-indigo-500/20',
    neutral: '',
    secondary: '',
    outline: '',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={cn(
        baseStyles,
        variants[variant] || variants.neutral,
        sizes[size],
        glow && (glows[variant] || ''),
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
