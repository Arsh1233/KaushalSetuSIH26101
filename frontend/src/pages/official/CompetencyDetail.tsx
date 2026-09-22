import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import EvidenceCard from '../../components/official/EvidenceCard';
import { getOfficialById, getCompetencyScoreFor, getEvidenceForCompetency } from '../../data/index';
import { getCompetencyById } from '../../data/competencies';

export default function CompetencyDetail() {
  const { id } = useParams<{ id: string }>();
  const { currentOfficialId } = useApp();
  const navigate = useNavigate();

  const comp = id ? getCompetencyById(id) : null;
  const score = id ? getCompetencyScoreFor(currentOfficialId, id) : null;
  const evidence = id ? getEvidenceForCompetency(currentOfficialId, id) : [];

  if (!comp || !score) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-slate-500">Competency not found.</p>
    </div>
  );

  const gapDelta = score.required - score.current;
  const isGap = gapDelta > 0;
  const severity = gapDelta >= 1.5 ? 'CRITICAL' : gapDelta >= 0.8 ? 'HIGH' : gapDelta >= 0.3 ? 'MEDIUM' : null;
  const pctCurrent = (score.current / 5) * 100;
  const pctRequired = (score.required / 5) * 100;

  const confidenceReasons = [
    score.evidenceCount >= 2 ? `${score.evidenceCount} assessment records` : null,
    evidence.some(e => e.type === 'Practical Task') ? '1 practical task completed' : null,
    evidence.some(e => e.type === 'Course') ? 'Relevant course completed' : null,
    score.freshnessMonths > 6 ? `No recent workplace evidence (${score.freshnessMonths} months old)` : null,
    !evidence.some(e => e.type === 'Supervisor Validation') ? 'No supervisor validation on record' : null,
  ].filter(Boolean);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={comp.name}
        subtitle={comp.category + ' Competency'}
        breadcrumbs={[
          { label: 'Home', href: '/app/dashboard' },
          { label: 'My Competencies', href: '/app/competencies' },
          { label: comp.name },
        ]}
        actions={
          isGap ? (
            <button
              onClick={() => navigate(`/app/assessment/${comp.id}`)}
              className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
            >
              Validate Capability
            </button>
          ) : null
        }
      />

      {/* Score overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-xs text-slate-500 mb-1">Current Level</p>
          <p className="text-3xl font-bold text-navy-900">{score.current.toFixed(1)}</p>
          <p className="text-xs text-slate-400">out of 5.0</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-xs text-slate-500 mb-1">Required Level</p>
          <p className="text-3xl font-bold text-teal-600">{score.required.toFixed(1)}</p>
          <p className="text-xs text-slate-400">out of 5.0</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-xs text-slate-500 mb-1">Confidence</p>
          <p className={`text-3xl font-bold ${score.confidence >= 80 ? 'text-teal-600' : score.confidence >= 65 ? 'text-amber-600' : 'text-red-600'}`}>
            {score.confidence}%
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-xs text-slate-500 mb-1">Evidence Items</p>
          <p className="text-3xl font-bold text-navy-900">{score.evidenceCount}</p>
          <p className="text-xs text-slate-400">{score.freshnessMonths}mo old</p>
        </div>
      </div>

      {/* Visual progress bar */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-3 text-sm text-slate-600">
          <span>Current: <strong className="text-navy-900">{score.current.toFixed(1)}</strong></span>
          {severity && <Badge variant={severity}>Gap: {gapDelta.toFixed(1)}</Badge>}
          <span>Required: <strong className="text-teal-600">{score.required.toFixed(1)}</strong></span>
        </div>
        <div className="relative h-4 bg-slate-100 rounded-full overflow-hidden">
          <div className="absolute h-4 bg-teal-100 rounded-full" style={{ width: `${pctRequired}%` }} />
          <div className={`absolute h-4 rounded-full ${isGap ? 'bg-amber-500' : 'bg-teal-500'}`} style={{ width: `${pctCurrent}%` }} />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>Level 0</span>
          <span>Level 1</span>
          <span>Level 2</span>
          <span>Level 3</span>
          <span>Level 4</span>
          <span>Level 5</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Evidence */}
        <div>
          <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100">
              <h3 className="font-semibold text-navy-900 text-sm">Evidence of Capability</h3>
            </div>
            <div className="px-5 divide-y divide-slate-100">
              {evidence.length > 0 ? (
                evidence.map(ev => <EvidenceCard key={ev.id} evidence={ev} />)
              ) : (
                <p className="py-6 text-sm text-slate-400 text-center">No evidence recorded yet.</p>
              )}
            </div>
          </div>

          {isGap && (
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-4">
              <p className="text-sm font-semibold text-amber-800 mb-1">! Missing Evidence</p>
              <p className="text-xs text-amber-700">Real-world {comp.name.toLowerCase()} task in a work context. Supervisor validation would increase confidence significantly.</p>
              <button
                onClick={() => navigate(`/app/practical/${comp.id}`)}
                className="mt-3 px-3 py-1.5 bg-amber-600 text-white text-xs font-medium rounded hover:bg-amber-700 transition-colors"
              >
                Complete Practical Task
              </button>
            </div>
          )}
        </div>

        {/* Confidence explanation */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100">
              <h3 className="font-semibold text-navy-900 text-sm">Why is my confidence {score.confidence}%?</h3>
            </div>
            <div className="px-5 py-4">
              <ul className="space-y-2">
                {confidenceReasons.map((reason, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="text-slate-400 mt-0.5">•</span>
                    <span className="text-slate-600">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {isGap && (
            <div className="bg-navy-50 border border-navy-100 rounded-md p-4">
              <h4 className="text-sm font-semibold text-navy-900 mb-2">Recommended Validation</h4>
              <p className="text-sm text-navy-800 mb-3">
                Complete a 15-minute practical validation task to raise confidence from {score.confidence}% to ~{Math.min(99, score.confidence + 12)}%.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/app/assessment/${comp.id}`)}
                  className="px-3 py-1.5 bg-navy-900 text-white text-xs font-medium rounded hover:bg-navy-800 transition-colors"
                >
                  Validate Capability
                </button>
                <button
                  onClick={() => navigate(`/app/learning-path?comp=${comp.id}`)}
                  className="px-3 py-1.5 border border-navy-900 text-navy-900 text-xs font-medium rounded hover:bg-navy-50 transition-colors"
                >
                  View Learning Path
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
