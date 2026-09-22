import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import LevelPip from '../ui/LevelPip';
import type { CompetencyScore } from '../../data/types';
import { getCompetencyById } from '../../data/competencies';

interface CompetencyCardProps {
  score: CompetencyScore;
}

function getStatus(score: CompetencyScore) {
  if (score.current >= score.required) return { label: 'Met', variant: 'verified' as const };
  const delta = score.required - score.current;
  if (delta >= 1.5) return { label: 'Gap', variant: 'CRITICAL' as const };
  if (delta >= 0.8) return { label: 'Gap', variant: 'HIGH' as const };
  return { label: 'Developing', variant: 'MEDIUM' as const };
}

export default function CompetencyCard({ score }: CompetencyCardProps) {
  const navigate = useNavigate();
  const comp = getCompetencyById(score.competencyId);
  if (!comp) return null;

  const status = getStatus(score);
  const confidenceColor = score.confidence >= 85 ? 'text-teal-600' : score.confidence >= 70 ? 'text-navy-800' : 'text-amber-600';

  return (
    <button
      onClick={() => navigate(`/app/competencies/${score.competencyId}`)}
      className="w-full text-left bg-white border border-slate-200 rounded-md p-4 shadow-sm hover:border-navy-400 hover:shadow-md transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-slate-800 text-sm leading-tight">{comp.name}</p>
        </div>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>

      <div className="space-y-2 mb-3">
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Current</span>
            <span>Required</span>
          </div>
          <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute h-2 bg-slate-300 rounded-full"
              style={{ width: `${(score.required / 5) * 100}%` }}
            />
            <div
              className={`absolute h-2 rounded-full ${score.current >= score.required ? 'bg-teal-500' : 'bg-navy-700'}`}
              style={{ width: `${(score.current / 5) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-medium text-slate-700 mt-1">
            <span>{score.current.toFixed(1)}/5</span>
            <span>{score.required.toFixed(1)}/5</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <p className="text-slate-400 mb-0.5">Confidence</p>
          <p className={`font-semibold ${confidenceColor}`}>{score.confidence}%</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 mb-0.5">Evidence</p>
          <p className="font-semibold text-slate-700">{score.evidenceCount}</p>
        </div>
        <div className="text-center">
          <p className="text-slate-400 mb-0.5">Freshness</p>
          <p className="font-semibold text-slate-700">{score.freshnessMonths}mo</p>
        </div>
      </div>
    </button>
  );
}
