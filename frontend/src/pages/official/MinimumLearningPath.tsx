import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { getOfficialById, getLearningPathFor, getCompetencyScoreFor } from '../../data/index';
import { getCompetencyById } from '../../data/competencies';
import type { Course } from '../../data/types';

export default function MinimumLearningPath() {
  const { currentOfficialId } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [whyOpen, setWhyOpen] = useState(false);
  const focusComp = searchParams.get('comp');

  const official = getOfficialById(currentOfficialId);
  const learningPath = getLearningPathFor(currentOfficialId) as Course[];
  const primaryCourse = focusComp ? learningPath.find(c => c.competencyId === focusComp) ?? learningPath[0] : learningPath[0];

  if (!official || !primaryCourse) return null;

  const comp = getCompetencyById(primaryCourse.competencyId);
  const score = getCompetencyScoreFor(currentOfficialId, primaryCourse.competencyId);
  const totalMinutes = primaryCourse.modules.reduce((acc, m) => acc + m.durationMin, 0);
  const expectedConfidence = score ? Math.min(99, score.confidence + 16) : 88;

  const stepColors = ['bg-navy-900 text-white', 'bg-navy-700 text-white', 'bg-teal-600 text-white', 'bg-green-600 text-white'];
  const lineColors = ['border-navy-300', 'border-teal-300', 'border-green-300'];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Minimum Learning Path"
        subtitle="The shortest targeted path to close this capability gap — based on your existing evidence."
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Capability Passport', href: '/app/passport' }, { label: 'Learning Path' }]}
      />

      {/* Context header */}
      {comp && score && (
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-navy-900">{comp.name}</h3>
            <Badge variant="CRITICAL">Critical Gap</Badge>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-500 mb-1">Current Level</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-3 bg-amber-500 rounded-full" style={{ width: `${(score.current / 5) * 100}%` }} />
                </div>
                <span className="text-sm font-bold text-slate-700">{score.current.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Target Level</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-3 bg-teal-500 rounded-full" style={{ width: `${(score.required / 5) * 100}%` }} />
                </div>
                <span className="text-sm font-bold text-teal-600">{score.required.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-500">Total time: <strong className="text-navy-900">{totalMinutes} minutes</strong></span>
            <span className="text-slate-500">Expected confidence: <strong className="text-teal-600">{score.confidence}% → {expectedConfidence}%</strong></span>
          </div>
        </div>
      )}

      {/* "Why not a full course?" accordion */}
      <div className="bg-navy-50 border border-navy-100 rounded-md mb-6 overflow-hidden">
        <button
          onClick={() => setWhyOpen(!whyOpen)}
          className="w-full flex items-center justify-between px-5 py-3 text-left"
        >
          <span className="text-sm font-semibold text-navy-900">Why not a full course?</span>
          <span className="text-navy-700 text-sm">{whyOpen ? '▲' : '▼'}</span>
        </button>
        {whyOpen && (
          <div className="px-5 pb-4 text-sm text-navy-800 leading-relaxed">
            Existing evidence already demonstrates foundational capability in this area. Specifically:
            <ul className="mt-2 space-y-1 list-disc list-inside text-navy-700">
              <li>You have completed relevant course modules on iGOT</li>
              <li>Your diagnostic assessment confirms basic-level proficiency</li>
              <li>Only the practical application skills require targeted validation</li>
            </ul>
            <p className="mt-2">A full course would repeat knowledge you have already demonstrated. This path focuses only on the specific skills where evidence is missing or outdated.</p>
          </div>
        )}
      </div>

      {/* Steps timeline */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm mb-6">
        <h3 className="font-semibold text-navy-900 mb-5 text-sm">Recommended Intervention</h3>
        <div className="space-y-0">
          {primaryCourse.modules.map((module, i) => (
            <div key={i} className="flex gap-4">
              {/* Line + circle */}
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full ${stepColors[i % stepColors.length]} flex items-center justify-center text-sm font-bold shrink-0`}>
                  {i + 1}
                </div>
                {i < primaryCourse.modules.length - 1 && (
                  <div className={`w-0 flex-1 border-l-2 border-dashed my-1 ${lineColors[i % lineColors.length]}`} style={{ minHeight: 32 }} />
                )}
              </div>
              {/* Content */}
              <div className={`pb-5 flex-1 ${i < primaryCourse.modules.length - 1 ? 'pb-6' : ''}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-slate-800 text-sm">{module.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{module.durationMin} minutes · {primaryCourse.provider}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/app/learning/${primaryCourse.id}`)}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Start →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-2 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500">Total estimated time</p>
            <p className="text-xl font-bold text-navy-900">{totalMinutes} minutes</p>
          </div>
          {score && (
            <div className="text-right">
              <p className="text-xs text-slate-500">Expected result</p>
              <p className="text-sm font-semibold text-teal-600">Confidence: {score.confidence}% → {expectedConfidence}%</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/app/learning/${primaryCourse.id}`)}
          className="px-6 py-2.5 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors"
        >
          Start Path
        </button>
        <button
          onClick={() => navigate('/app/evidence')}
          className="px-6 py-2.5 border border-navy-900 text-navy-900 font-semibold rounded hover:bg-navy-50 transition-colors"
        >
          View Evidence
        </button>
      </div>

      {/* Other courses in path */}
      {learningPath.length > 1 && (
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-slate-600 mb-3">Other recommended paths</h3>
          <div className="space-y-2">
            {learningPath.slice(1, 4).map((c: any) => c && (
              <div key={c.id} className="flex items-center justify-between bg-white border border-slate-200 rounded-md px-4 py-3 shadow-sm">
                <div>
                  <p className="text-sm font-medium text-slate-800">{c.title}</p>
                  <p className="text-xs text-slate-500">{c.provider} · {c.durationMinutes} min</p>
                </div>
                <button
                  onClick={() => navigate(`/app/learning/${c.id}`)}
                  className="text-xs text-navy-800 font-medium hover:text-teal-600 transition-colors"
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
