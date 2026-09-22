import { useEffect, useRef, useState } from 'react';

interface CircularGaugeProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
}

export default function CircularGauge({ value, size = 200, strokeWidth = 14, label, sublabel }: CircularGaugeProps) {
  const [animated, setAnimated] = useState(0);
  const r = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * r;
  const dashoffset = circumference * (1 - animated / 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(value), 50);
    return () => clearTimeout(timer);
  }, [value]);

  const color = value >= 85 ? '#0d9488' : value >= 70 ? '#1e3a5f' : value >= 50 ? '#d97706' : '#dc2626';

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          style={{ transition: 'stroke-dashoffset 0.9s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-bold text-navy-900">{value}%</span>
        {label && <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{label}</span>}
        {sublabel && <span className="text-xs text-slate-400 mt-0.5">{sublabel}</span>}
      </div>
    </div>
  );
}
