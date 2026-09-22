import type { ReactNode } from 'react';
import type { GapSeverity } from '../../data/types';

interface BadgeProps {
  variant?: GapSeverity | 'verified' | 'pending' | 'neutral' | 'teal' | 'navy';
  children: ReactNode;
  className?: string;
}

const variantMap: Record<string, string> = {
  CRITICAL: 'bg-red-100 text-red-700 border border-red-200',
  HIGH: 'bg-amber-100 text-amber-700 border border-amber-200',
  MEDIUM: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  LOW: 'bg-slate-100 text-slate-600 border border-slate-200',
  verified: 'bg-green-100 text-green-700 border border-green-200',
  pending: 'bg-amber-100 text-amber-700 border border-amber-200',
  neutral: 'bg-slate-100 text-slate-600 border border-slate-200',
  teal: 'bg-teal-100 text-teal-600 border border-teal-100',
  navy: 'bg-navy-100 text-navy-900 border border-navy-100',
};

export default function Badge({ variant = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${variantMap[variant] ?? variantMap.neutral} ${className}`}>
      {children}
    </span>
  );
}
