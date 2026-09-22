import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import type { CompetencyScore } from '../../data/types';
import { getCompetencyById } from '../../data/competencies';

interface CompetencyRowProps {
  score: CompetencyScore;
}

function getStatus(score: CompetencyScore) {
  if (score.current >= score.required) return { label: 'Met', variant: 'verified' as const };
  const delta = score.required - score.current;
  if (delta >= 1.5) return { label: 'Critical Gap', variant: 'CRITICAL' as const };
  if (delta >= 0.8) return { label: 'High Gap', variant: 'HIGH' as const };
  return { label: 'Developing', variant: 'MEDIUM' as const };
}

export default function CompetencyRow({ score }: CompetencyRowProps) {
  const navigate = useNavigate();
  const comp = getCompetencyById(score.competencyId);
  if (!comp) return null;

  const status = getStatus(score);
  const isMet = score.current >= score.required;
  const pct = Math.min(100, Math.round((score.current / score.required) * 100));
  const confidenceColor = score.confidence >= 80 ? 'text-teal-600' : score.confidence >= 65 ? 'text-slate-700' : 'text-amber-600';
  const barColor = isMet ? 'bg-teal-500' : pct >= 70 ? 'bg-navy-700' : 'bg-amber-500';

  return (
    <button
      onClick={() => navigate(`/app/competencies/${score.competencyId}`)}
      className="w-full text-left flex items-center gap-5 px-5 py-4 border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-0 group"
    >
      {/* Left — name + category */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-medium text-slate-800 leading-tight group-hover:text-navy-900 transition-colors">
          {comp.name}
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{comp.category}</p>
      </div>

      {/* Center — progress bar + levels */}
      <div className="w-48 shrink-0 hidden sm:block">
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-1">
          <div className={`h-2 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between text-xs text-slate-400">
          <span>{score.current.toFixed(1)} current</span>
          <span>{score.required.toFixed(1)} required</span>
        </div>
      </div>

      {/* Right — status + confidence + evidence + arrow */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="text-right hidden md:block">
          <p className={`text-sm font-semibold ${confidenceColor}`}>{score.confidence}%</p>
          <p className="text-xs text-slate-400">{score.evidenceCount} evidence</p>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
        <span className="text-slate-300 group-hover:text-navy-600 transition-colors text-sm">›</span>
      </div>
    </button>
  );
}
