import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import StatCard from '../../components/ui/StatCard';
import {
  getOfficialById,
  getGapsFor,
  getEvidenceForOfficial,
  getCompetencyById,
} from '../../data/index';

const severityVariant: Record<string, 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'> = {
  CRITICAL: 'CRITICAL',
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
};

const typeVariant: Record<string, 'teal' | 'verified' | 'neutral' | 'HIGH'> = {
  Course: 'teal',
  Assessment: 'HIGH',
  'Practical Task': 'MEDIUM' as any,
  Project: 'neutral',
  'Supervisor Validation': 'verified',
};

export default function MyProgress() {
  const { currentOfficialId } = useApp();
  const official = getOfficialById(currentOfficialId);
  const evidence = getEvidenceForOfficial(currentOfficialId);
  const gaps = getGapsFor(currentOfficialId);

  if (!official) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <p className="text-slate-500 text-sm">Official not found.</p>
      </div>
    );
  }

  const coursesDone = evidence.filter(e => e.type === 'Course').length;
  const assessmentsDone = evidence.filter(e => e.type === 'Assessment').length;
  const avgScore =
    evidence.length > 0
      ? Math.round(evidence.reduce((sum, e) => sum + e.score, 0) / evidence.length)
      : 0;

  const competencyEvidence = Object.entries(
    evidence.reduce<Record<string, typeof evidence>>((acc, e) => {
      if (!acc[e.competencyId]) acc[e.competencyId] = [];
      acc[e.competencyId].push(e);
      return acc;
    }, {})
  );

  const recentEvidence = [...evidence]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const gapsBySeverity = {
    CRITICAL: gaps.filter(g => g.severity === 'CRITICAL').length,
    HIGH: gaps.filter(g => g.severity === 'HIGH').length,
    MEDIUM: gaps.filter(g => g.severity === 'MEDIUM').length,
    LOW: gaps.filter(g => g.severity === 'LOW').length,
  };
  const totalGaps = gaps.length;
  const closedGaps = 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <PageHeader
        title="My Progress"
        subtitle="Track your learning journey, competency growth and achievements"
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'My Progress' }]}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard label="Learning Hours" value={official.learningHoursSaved} unit="hrs" accent="teal" />
        <StatCard label="Courses Completed" value={coursesDone} accent="navy" />
        <StatCard label="Assessments Done" value={assessmentsDone} accent="navy" />
        <StatCard label="Avg Score" value={`${avgScore}%`} accent={avgScore >= 80 ? 'teal' : 'amber'} />
      </div>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-navy-900">Competency Growth</h2>
        {competencyEvidence.length === 0 && (
          <p className="text-xs text-slate-500">No competency evidence recorded yet.</p>
        )}
        <div className="space-y-3">
          {competencyEvidence.map(([compId, evList]) => {
            const comp = getCompetencyById(compId);
            const officialScore = official.competencyScores.find(s => s.competencyId === compId);
            const current = officialScore?.current ?? 0;
            const required = officialScore?.required ?? 5;
            const pct = Math.round((current / required) * 100);
            const avgEv = Math.round(evList.reduce((s, e) => s + e.score, 0) / evList.length);
            return (
              <div key={compId} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-navy-800">{comp?.name ?? compId}</span>
                  <span className="text-xs text-slate-500">
                    Level {current} / {required} &middot; avg {avgEv}%
                  </span>
                </div>
                <ProgressBar value={Math.min(pct, 100)} showValue />
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-navy-900">Learning Timeline</h2>
        <div className="relative pl-5 space-y-4 border-l-2 border-slate-100">
          {recentEvidence.map((e, i) => (
            <div key={e.id} className="relative">
              <div className="absolute -left-[1.35rem] top-1 w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-white" />
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold text-navy-900">{e.title}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Badge variant={(typeVariant[e.type] ?? 'neutral') as any}>{e.type}</Badge>
                    {e.verified && <Badge variant="verified">Verified</Badge>}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs font-bold text-navy-700">{e.score}%</div>
                  <div className="text-xs text-slate-400">{e.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <h2 className="text-sm font-semibold text-navy-900">Skill Gaps Overview</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(sev => (
            <div key={sev} className="bg-slate-50 rounded-lg p-3 text-center">
              <Badge variant={severityVariant[sev]}>{sev}</Badge>
              <div className="text-2xl font-bold text-navy-900 mt-2">{gapsBySeverity[sev]}</div>
              <div className="text-xs text-slate-500 mt-0.5">gaps</div>
            </div>
          ))}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Gaps closed</span>
            <span className="font-medium text-navy-700">{closedGaps} / {totalGaps}</span>
          </div>
          <ProgressBar value={totalGaps > 0 ? Math.round((closedGaps / totalGaps) * 100) : 0} showValue />
        </div>
      </section>
    </div>
  );
}
