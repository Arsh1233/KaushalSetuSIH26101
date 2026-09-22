import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import CircularGauge from '../../components/ui/CircularGauge';
import EvidenceCard from '../../components/official/EvidenceCard';
import { getOfficialById } from '../../data/index';
import { getCompetencyById } from '../../data/competencies';
import { getEvidenceForOfficial } from '../../data/evidence';

export default function OfficialDetailAdmin() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const official = id ? getOfficialById(id) : null;
  const evidence = id ? getEvidenceForOfficial(id) : [];

  if (!official) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-slate-500">Official not found.</p>
    </div>
  );

  const metCount = official.competencyScores.filter(s => s.current >= s.required).length;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title={official.name}
        subtitle={`${official.role} · ${official.department}`}
        breadcrumbs={[
          { label: 'Workforce', href: '/admin/workforce' },
          { label: official.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Gauge */}
        <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm flex flex-col items-center justify-center">
          <CircularGauge value={official.roleReadiness} size={160} strokeWidth={12} label="Ready" />
          <p className="text-xs text-slate-500 mt-3 text-center">{official.experienceYears} years experience</p>
        </div>

        {/* Quick stats */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Role Readiness', value: `${official.roleReadiness}%`, color: 'text-teal-600' },
            { label: 'Confidence', value: `${official.competencyConfidence}%`, color: 'text-navy-900' },
            { label: 'Learning Progress', value: `${official.learningProgress}%`, color: 'text-amber-600' },
            { label: 'Critical Gaps', value: official.criticalGaps, color: official.criticalGaps > 1 ? 'text-red-600' : 'text-slate-700' },
            { label: 'Competencies Met', value: `${metCount} / ${official.competencyScores.length}`, color: 'text-teal-600' },
            { label: 'Evidence Items', value: evidence.length, color: 'text-navy-900' },
            { label: 'Hours Saved', value: `${official.learningHoursSaved} hrs`, color: 'text-green-600' },
            { label: 'Department', value: 'MoSPI', color: 'text-slate-600' },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-md px-3 py-2.5 shadow-sm">
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className={`text-sm font-bold mt-0.5 ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Competencies */}
        <div>
          <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-navy-900">Competency Breakdown</h3>
              <span className="text-xs text-slate-400">{metCount} met of {official.competencyScores.length}</span>
            </div>
            <div className="px-5 py-2 space-y-2 max-h-72 overflow-y-auto">
              {official.competencyScores.map(s => {
                const comp = getCompetencyById(s.competencyId);
                const met = s.current >= s.required;
                return (
                  <div key={s.competencyId} className="flex items-center gap-2 py-1.5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-slate-700 truncate">{comp?.name ?? s.competencyId}</span>
                        <span className={`text-xs font-semibold ml-2 shrink-0 ${met ? 'text-teal-600' : 'text-amber-600'}`}>
                          {s.current.toFixed(1)} / {s.required.toFixed(1)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full ${met ? 'bg-teal-500' : 'bg-amber-500'}`}
                          style={{ width: `${(s.current / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">{s.confidence}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Gaps + Evidence */}
        <div className="space-y-4">
          {/* Gaps */}
          <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-navy-900">Priority Skill Gaps</h3>
            </div>
            <div className="px-5 py-3 space-y-2">
              {official.gaps.map(g => {
                const comp = getCompetencyById(g.competencyId);
                return (
                  <div key={g.competencyId} className="flex items-center justify-between text-sm">
                    <span className="text-slate-700">{comp?.name ?? g.competencyId}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Gap: {g.delta.toFixed(1)}</span>
                      <Badge variant={g.severity}>{g.severity}</Badge>
                    </div>
                  </div>
                );
              })}
              {official.gaps.length === 0 && <p className="text-xs text-slate-400">No gaps identified.</p>}
            </div>
          </div>

          {/* Evidence */}
          <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100">
              <h3 className="text-sm font-semibold text-navy-900">Recent Evidence ({evidence.length})</h3>
            </div>
            <div className="px-5">
              {evidence.slice(0, 4).map(ev => <EvidenceCard key={ev.id} evidence={ev} />)}
              {evidence.length === 0 && <p className="py-4 text-xs text-slate-400 text-center">No evidence on record.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
