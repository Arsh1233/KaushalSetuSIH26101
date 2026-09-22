import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import type { GapRecord } from '../../data/types';
import { getCompetencyById } from '../../data/competencies';
import { getCompetencyScoreFor } from '../../data/index';

interface GapCardProps {
  gap: GapRecord;
  officialId: string;
}

export default function GapCard({ gap, officialId }: GapCardProps) {
  const navigate = useNavigate();
  const comp = getCompetencyById(gap.competencyId);
  const score = getCompetencyScoreFor(officialId, gap.competencyId);

  if (!comp || !score) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm hover:border-navy-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-semibold text-slate-800">{comp.name}</p>
          <p className="text-xs text-slate-500 mt-0.5">{comp.category}</p>
        </div>
        <Badge variant={gap.severity}>{gap.severity}</Badge>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
        <div>
          <p className="text-xs text-slate-500 mb-0.5">Current Level</p>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 bg-slate-100 rounded-full h-1.5">
              <div className="h-1.5 bg-amber-500 rounded-full" style={{ width: `${(score.current / 5) * 100}%` }} />
            </div>
            <span className="font-medium text-slate-700 text-xs">{score.current.toFixed(1)}</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-0.5">Required Level</p>
          <div className="flex items-center gap-1.5">
            <div className="flex-1 bg-slate-100 rounded-full h-1.5">
              <div className="h-1.5 bg-teal-600 rounded-full" style={{ width: `${(score.required / 5) * 100}%` }} />
            </div>
            <span className="font-medium text-slate-700 text-xs">{score.required.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
        <span>Gap: <strong className="text-slate-700">{gap.delta.toFixed(1)}</strong></span>
        <span>Role Impact: <strong className={gap.roleImpact === 'High' ? 'text-red-600' : gap.roleImpact === 'Medium' ? 'text-amber-600' : 'text-slate-600'}>{gap.roleImpact}</strong></span>
        <span>Est. {gap.estimatedMinutes} min</span>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-500">
          Confidence: <span className="font-medium text-slate-700">{score.confidence}%</span>
        </div>
        <button
          onClick={() => navigate(`/app/learning-path?comp=${gap.competencyId}`)}
          className="text-xs font-medium text-navy-800 hover:text-teal-600 transition-colors"
        >
          View Minimum Path →
        </button>
      </div>
    </div>
  );
}
