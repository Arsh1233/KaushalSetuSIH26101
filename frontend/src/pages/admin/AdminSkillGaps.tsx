import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { officials } from '../../data/officials';
import { getCompetencyById } from '../../data/competencies';
import type { GapSeverity } from '../../data/types';

interface AggregatedGap {
  competencyId: string;
  name: string;
  count: number;
  maxSeverity: GapSeverity;
  avgDelta: number;
}

const SEV_ORDER: Record<GapSeverity, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };

export default function AdminSkillGaps() {
  const navigate = useNavigate();
  const gapMap = new Map<string, { count: number; deltas: number[]; severities: GapSeverity[] }>();

  officials.forEach(o => {
    o.gaps.forEach(g => {
      const existing = gapMap.get(g.competencyId) ?? { count: 0, deltas: [], severities: [] };
      gapMap.set(g.competencyId, {
        count: existing.count + 1,
        deltas: [...existing.deltas, g.delta],
        severities: [...existing.severities, g.severity],
      });
    });
  });

  const aggregated: AggregatedGap[] = Array.from(gapMap.entries()).map(([compId, data]) => ({
    competencyId: compId,
    name: getCompetencyById(compId)?.name ?? compId,
    count: data.count,
    maxSeverity: data.severities.sort((a, b) => SEV_ORDER[a] - SEV_ORDER[b])[0],
    avgDelta: parseFloat((data.deltas.reduce((a, d) => a + d, 0) / data.deltas.length).toFixed(2)),
  })).sort((a, b) => SEV_ORDER[a.maxSeverity] - SEV_ORDER[b.maxSeverity] || b.count - a.count);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Department Skill Gaps"
        subtitle="Aggregated competency gaps across all officials — ranked by severity and prevalence"
      />
      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs text-slate-500 font-medium">
              <th className="px-4 py-2.5 text-left">Competency</th>
              <th className="px-4 py-2.5 text-center">Officials Affected</th>
              <th className="px-4 py-2.5 text-center">Max Severity</th>
              <th className="px-4 py-2.5 text-center">Avg. Gap</th>
              <th className="px-4 py-2.5 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {aggregated.map(g => (
              <tr key={g.competencyId} className="border-b border-slate-100 hover:bg-slate-50 text-sm">
                <td className="px-4 py-3 font-medium text-slate-800">{g.name}</td>
                <td className="px-4 py-3 text-center">
                  <span className="text-navy-900 font-semibold">{g.count}</span>
                  <span className="text-slate-400 text-xs"> / {officials.length}</span>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge variant={g.maxSeverity}>{g.maxSeverity}</Badge>
                </td>
                <td className="px-4 py-3 text-center text-slate-700 font-medium">{g.avgDelta}</td>
                <td className="px-4 py-3 text-center">
                  <button onClick={() => navigate('/admin/planner')} className="text-xs text-navy-800 font-medium hover:text-teal-600 transition-colors">Plan Training →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
