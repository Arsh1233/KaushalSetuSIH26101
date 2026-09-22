interface LevelPipProps {
  current: number;
  max?: number;
  size?: 'sm' | 'md';
}

export default function LevelPip({ current, max = 5, size = 'md' }: LevelPipProps) {
  const dim = size === 'sm' ? 'w-2 h-2' : 'w-3 h-3';
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`${dim} rounded-full ${i < Math.round(current) ? 'bg-navy-800' : 'bg-slate-200'}`}
        />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-700">{current.toFixed(1)}</span>
    </div>
  );
}
