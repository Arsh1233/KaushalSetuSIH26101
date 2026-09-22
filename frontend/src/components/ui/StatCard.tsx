import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: ReactNode;
  accent?: 'navy' | 'teal' | 'amber' | 'red' | 'green';
}

const accentMap = {
  navy: 'text-navy-900',
  teal: 'text-teal-600',
  amber: 'text-amber-600',
  red: 'text-red-600',
  green: 'text-green-600',
};

const iconBg = {
  navy: 'bg-navy-100',
  teal: 'bg-teal-100',
  amber: 'bg-amber-100',
  red: 'bg-red-100',
  green: 'bg-green-100',
};

export default function StatCard({ label, value, unit, delta, deltaPositive, icon, accent = 'navy' }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-2xl font-bold ${accentMap[accent]}`}>{value}</span>
            {unit && <span className="text-sm text-slate-500">{unit}</span>}
          </div>
          {delta && (
            <p className={`text-xs mt-1 font-medium ${deltaPositive ? 'text-green-600' : 'text-red-600'}`}>
              {delta}
            </p>
          )}
        </div>
        {icon && (
          <div className={`w-10 h-10 ${iconBg[accent]} rounded-md flex items-center justify-center text-lg`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
