interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  size?: 'sm' | 'md';
  colorOverride?: string;
}

function getColor(pct: number) {
  if (pct >= 85) return 'bg-teal-600';
  if (pct >= 65) return 'bg-navy-700';
  if (pct >= 45) return 'bg-amber-600';
  return 'bg-red-600';
}

export default function ProgressBar({ value, max = 100, label, showValue = true, size = 'md', colorOverride }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const color = colorOverride ?? getColor(pct);
  const h = size === 'sm' ? 'h-1.5' : 'h-2';

  return (
    <div className="w-full">
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm text-slate-600">{label}</span>}
          {showValue && <span className="text-sm font-medium text-slate-800">{pct}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-200 rounded-full ${h} overflow-hidden`}>
        <div
          className={`${h} rounded-full ${color} transition-all duration-500`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
