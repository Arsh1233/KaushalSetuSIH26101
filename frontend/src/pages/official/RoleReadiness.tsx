import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import CircularGauge from '../../components/ui/CircularGauge';
import ProgressBar from '../../components/ui/ProgressBar';
import Badge from '../../components/ui/Badge';
import { getOfficialById, getGapsFor } from '../../data/index';
import { getCompetencyById } from '../../data/competencies';

const CAT_CONFIG = [
  { key: 'Statistical', label: 'Statistical Competencies', icon: '📊' },
  { key: 'Technical', label: 'Technical Competencies', icon: '💻' },
  { key: 'Digital Governance', label: 'Digital Governance', icon: '🔐' },
  { key: 'Behavioural', label: 'Behavioural', icon: '👥' },
];

export default function RoleReadiness() {
  const { currentOfficialId } = useApp();
  const navigate = useNavigate();
  const official = getOfficialById(currentOfficialId);
  const criticalGaps = getGapsFor(currentOfficialId, 'CRITICAL');
  const highGaps = getGapsFor(currentOfficialId, 'HIGH');

  const categoryScores = useMemo(() => {
    if (!official) return CAT_CONFIG.map(c => ({ ...c, score: 0 }));
    return CAT_CONFIG.map(cat => {
      const scores = official.competencyScores.filter(s => {
        const comp = getCompetencyById(s.competencyId);
        return comp?.category === cat.key;
      });
      if (scores.length === 0) return { ...cat, score: 0 };
      const avg = Math.round(
        (scores.reduce((acc, s) => acc + Math.min(s.current / s.required, 1), 0) / scores.length) * 100
      );
      return { ...cat, score: avg };
    });
  }, [official]);

  const nextSteps = useMemo(() => {
    if (!official) return [];
    const steps: string[] = [];
    const actionGaps = [...criticalGaps, ...highGaps].slice(0, 2);
    actionGaps.forEach(gap => {
      const comp = getCompetencyById(gap.competencyId);
      if (comp) {
        const score = official.competencyScores.find(s => s.competencyId === gap.competencyId);
        const minutes = score ? Math.round(Math.abs(gap.delta) * 25) : 45;
        steps.push(`Complete the ${comp.name} minimum learning path (${minutes} min)`);
      }
    });
    if (steps.length < 3) {
      const lowestConf = official.competencyScores
        .filter(s => s.confidence < 80)
        .sort((a, b) => a.confidence - b.confidence)[0];
      if (lowestConf) {
        const comp = getCompetencyById(lowestConf.competencyId);
        if (comp) steps.push(`Request supervisor validation for your ${comp.name} proficiency`);
      }
    }
    return steps.slice(0, 3);
  }, [official, criticalGaps, highGaps]);

  if (!official) return null;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Role Readiness"
        subtitle={`Target Role: ${official.role}`}
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Role Readiness' }]}
      />

      {/* Main readiness score + breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        {/* Gauge */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-md p-8 shadow-sm flex flex-col items-center justify-center">
          <CircularGauge value={official.roleReadiness} label="Role Ready" sublabel={official.role} />
          <div className="mt-4 text-center">
            <Badge variant={official.roleReadiness >= 85 ? 'verified' : official.roleReadiness >= 70 ? 'MEDIUM' : 'HIGH'}>
              {official.roleReadiness >= 85 ? '✓ Deployment Ready' : official.roleReadiness >= 70 ? 'Nearly Ready' : 'Needs Development'}
            </Badge>
            <p className="text-xs text-slate-400 mt-2">Based on {official.competencyScores.length} competency assessments</p>
          </div>
        </div>

        {/* Category breakdown */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-md p-5 shadow-sm">
          <h3 className="font-semibold text-navy-900 text-sm mb-4">Readiness by Domain</h3>
          <div className="space-y-4">
            {categoryScores.map(cat => (
              <div key={cat.label}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{cat.icon}</span>
                    <span className="text-sm text-slate-700">{cat.label}</span>
                  </div>
                  <span className={`text-sm font-semibold ${cat.score >= 85 ? 'text-teal-600' : cat.score >= 70 ? 'text-navy-800' : 'text-amber-600'}`}>
                    {cat.score}%
                  </span>
                </div>
                <ProgressBar value={cat.score} showValue={false} />
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Competency Confidence</p>
              <p className="font-semibold text-navy-900">{official.competencyConfidence}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-0.5">Evidence Coverage</p>
              <p className="font-semibold text-navy-900">{Math.round((official.competencyScores.filter(s => s.evidenceCount > 0).length / official.competencyScores.length) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Role-blocking gaps */}
      {criticalGaps.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-md shadow-sm mb-6">
          <div className="px-5 py-3 border-b border-red-100 bg-red-50 rounded-t-md">
            <h3 className="font-semibold text-red-700 text-sm">Role-Blocking Gaps</h3>
            <p className="text-xs text-red-600 mt-0.5">These competency gaps must be addressed to achieve full role readiness</p>
          </div>
          <div className="p-5 space-y-3">
            {criticalGaps.map((gap, i) => {
              const compName = gap.competencyId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              return (
                <div key={gap.competencyId} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center">{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-800">{compName}</p>
                      <p className="text-xs text-slate-500">Gap: {gap.delta.toFixed(1)} levels · Role Impact: {gap.roleImpact}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/app/learning-path?comp=${gap.competencyId}`)}
                    className="text-xs font-medium text-navy-800 hover:text-teal-600 transition-colors"
                  >
                    Close gap →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* What will make you role-ready */}
      <div className="bg-navy-50 border border-navy-100 rounded-md p-5">
        <h3 className="font-semibold text-navy-900 text-sm mb-3">What will make you role-ready?</h3>
        <p className="text-xs text-slate-500 mb-3">
          Completing these targeted actions is estimated to raise your role readiness from <strong>{official.roleReadiness}%</strong> to approximately <strong>93%</strong>.
        </p>
        <ol className="space-y-2">
          {nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-navy-800">
              <span className="w-5 h-5 rounded-full bg-navy-900 text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
        <button
          onClick={() => navigate('/app/learning-path')}
          className="mt-4 px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
        >
          View Minimum Learning Path
        </button>
      </div>
    </div>
  );
}
