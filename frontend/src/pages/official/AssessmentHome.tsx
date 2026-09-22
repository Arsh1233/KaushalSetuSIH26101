import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { getOfficialById, getGapsFor } from '../../data/index';
import { getCompetencyById } from '../../data/competencies';

function confidenceColor(c: number) {
  if (c >= 80) return 'text-teal-600';
  if (c >= 60) return 'text-amber-600';
  return 'text-red-600';
}

export default function AssessmentHome() {
  const { currentOfficialId } = useApp();
  const navigate = useNavigate();

  const official = getOfficialById(currentOfficialId);
  if (!official) return null;

  const criticalGaps = getGapsFor(currentOfficialId, 'CRITICAL');
  const criticalIds = new Set(criticalGaps.map(g => g.competencyId));
  const criticalScores = official.competencyScores.filter(s => criticalIds.has(s.competencyId));

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Capability Validation"
        subtitle={`${criticalScores.length} critical gap${criticalScores.length !== 1 ? 's' : ''} require your attention`}
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Assessments' }]}
      />

      {/* Focus nudge */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 mb-6">
        <p className="text-sm text-slate-700 leading-relaxed">
          <span className="font-semibold text-navy-900">Focus area: </span>
          These are the competencies most critical to your role. Validating them will have the highest impact on your role readiness score.
        </p>
      </div>

      {/* Critical gap cards */}
      {criticalScores.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center shadow-sm">
          <p className="text-3xl mb-3">✓</p>
          <p className="font-semibold text-teal-700 text-lg">No critical gaps</p>
          <p className="text-sm text-slate-500 mt-1 mb-5">Your role readiness is strong — all critical competencies are met.</p>
          <button
            onClick={() => navigate('/app/passport')}
            className="px-5 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
          >
            View Capability Passport
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {criticalScores.map(score => {
            const comp = getCompetencyById(score.competencyId);
            const gap = criticalGaps.find(g => g.competencyId === score.competencyId);
            if (!comp) return null;
            const pct = Math.min(Math.round((score.current / score.required) * 100), 100);

            return (
              <div
                key={score.competencyId}
                className="bg-white border border-red-100 rounded-lg p-5 shadow-sm"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <p className="text-base font-semibold text-slate-800 leading-tight">{comp.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{comp.category}</p>
                  </div>
                  <Badge variant="CRITICAL">Critical Gap</Badge>
                </div>

                {/* Level bar */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-slate-500 mb-1.5">
                    <span>Current: <strong className="text-slate-700">{score.current.toFixed(1)}</strong></span>
                    <span>Required: <strong className="text-teal-600">{score.required.toFixed(1)}</strong></span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-2.5 bg-red-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                  <span className={confidenceColor(score.confidence)}>{score.confidence}% confidence</span>
                  <span className="text-slate-300">·</span>
                  <span>{score.evidenceCount} evidence item{score.evidenceCount !== 1 ? 's' : ''}</span>
                  {gap && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span>~{gap.estimatedMinutes} min to close</span>
                    </>
                  )}
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate(`/app/assessment/${score.competencyId}`)}
                  className="w-full py-2.5 bg-navy-900 text-white text-sm font-semibold rounded hover:bg-navy-800 transition-colors"
                >
                  Validate & Close Gap
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer link */}
      {criticalScores.length > 0 && (
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/app/passport')}
            className="text-sm text-navy-800 hover:text-teal-600 font-medium transition-colors"
          >
            View all competencies in Capability Passport →
          </button>
        </div>
      )}
    </div>
  );
}
