import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import GapCard from '../../components/official/GapCard';
import { getOfficialById, getGapsFor } from '../../data/index';
import type { GapSeverity } from '../../data/types';

const SEVERITIES: GapSeverity[] = ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'];

const severityConfig: Record<GapSeverity, { label: string; color: string; bg: string; border: string }> = {
  CRITICAL: { label: 'Critical Gaps', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  HIGH: { label: 'High Priority Gaps', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  MEDIUM: { label: 'Medium Priority Gaps', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  LOW: { label: 'Low Priority Gaps', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
};

export default function SkillGaps() {
  const { currentOfficialId } = useApp();
  const official = getOfficialById(currentOfficialId);

  if (!official) return null;

  const allGaps = getGapsFor(currentOfficialId);
  const totalGaps = allGaps.length;
  const critCount = allGaps.filter(g => g.severity === 'CRITICAL').length;
  const highCount = allGaps.filter(g => g.severity === 'HIGH').length;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Skill Gaps"
        subtitle="Prioritised competency gaps based on your role requirements and evidence confidence."
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Skill Gaps' }]}
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
          <p className="text-3xl font-bold text-red-700">{critCount}</p>
          <p className="text-xs text-red-600 mt-0.5">Critical Gaps</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-center">
          <p className="text-3xl font-bold text-amber-700">{highCount}</p>
          <p className="text-xs text-amber-600 mt-0.5">High Priority</p>
        </div>
        <div className="bg-navy-50 border border-navy-100 rounded-md p-4 text-center">
          <p className="text-3xl font-bold text-navy-900">{totalGaps}</p>
          <p className="text-xs text-navy-700 mt-0.5">Total Gaps</p>
        </div>
      </div>

      {/* AI insight */}
      <div className="bg-navy-50 border border-navy-100 rounded-md p-4 mb-6">
        <p className="text-sm text-navy-800">
          <span className="font-semibold">AI Gap Analysis: </span>
          Python for Statistical Analysis is your most critical gap — it directly limits your ability to process survey microdata independently. Addressing this gap is estimated to improve your role readiness by approximately 8 percentage points.
        </p>
      </div>

      {/* Gaps by severity */}
      {SEVERITIES.map(severity => {
        const gaps = getGapsFor(currentOfficialId, severity);
        if (gaps.length === 0) return null;
        const cfg = severityConfig[severity];
        return (
          <div key={severity} className="mb-6">
            <div className={`flex items-center gap-2 px-3 py-2 ${cfg.bg} border ${cfg.border} rounded-md mb-3`}>
              <span className={`font-semibold text-sm ${cfg.color}`}>{cfg.label}</span>
              <span className={`text-xs font-medium ${cfg.color} ml-auto`}>{gaps.length} gap{gaps.length > 1 ? 's' : ''}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gaps.map(gap => (
                <GapCard key={gap.competencyId} gap={gap} officialId={currentOfficialId} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
