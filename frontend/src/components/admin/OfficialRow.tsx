import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import type { Official, GapSeverity } from '../../data/types';

interface OfficialRowProps {
  official: Official;
}

function ReadinessBar({ value }: { value: number }) {
  const color = value >= 85 ? 'bg-teal-500' : value >= 75 ? 'bg-navy-700' : value >= 60 ? 'bg-amber-500' : 'bg-red-500';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-sm font-medium text-slate-700 w-10 text-right">{value}%</span>
    </div>
  );
}

export default function OfficialRow({ official }: OfficialRowProps) {
  const navigate = useNavigate();
  const topGap = official.gaps[0];
  const gapComp = topGap ? topGap.competencyId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : '—';

  const statusVariant: GapSeverity | 'verified' = official.roleReadiness >= 85 ? 'verified' as any
    : official.criticalGaps > 2 ? 'CRITICAL'
    : official.criticalGaps > 0 ? 'HIGH' : 'MEDIUM';

  const statusLabel = official.roleReadiness >= 85 ? 'On Track'
    : official.criticalGaps > 2 ? 'At Risk'
    : official.criticalGaps > 0 ? 'Needs Attention' : 'Developing';

  return (
    <tr
      className="hover:bg-slate-50 cursor-pointer border-b border-slate-100"
      onClick={() => navigate(`/admin/workforce/${official.id}`)}
    >
      <td className="px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-navy-100 flex items-center justify-center text-navy-800 text-xs font-semibold shrink-0">
            {official.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <p className="text-sm font-medium text-slate-800">{official.name}</p>
            <p className="text-xs text-slate-500">{official.role}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <div className="w-32">
          <ReadinessBar value={official.roleReadiness} />
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-600">{gapComp}</td>
      <td className="px-4 py-3 text-sm text-slate-700">{official.competencyConfidence}%</td>
      <td className="px-4 py-3">
        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-1.5 bg-teal-500 rounded-full" style={{ width: `${official.learningProgress}%` }} />
        </div>
      </td>
      <td className="px-4 py-3">
        <Badge variant={statusVariant as any}>{statusLabel}</Badge>
      </td>
    </tr>
  );
}
