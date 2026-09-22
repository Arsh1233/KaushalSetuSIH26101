import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import RecommendationCard from '../../components/official/RecommendationCard';
import { getOfficialById, getTopGaps, getLearningPathFor, getCompetencyScoreFor } from '../../data/index';
import { getCompetencyById } from '../../data/competencies';

export default function Dashboard() {
  const { currentOfficialId, language } = useApp();
  const navigate = useNavigate();
  const official = getOfficialById(currentOfficialId);
  const topGaps = getTopGaps(currentOfficialId, 1);
  const learningPath = getLearningPathFor(currentOfficialId);
  const topCourse = (learningPath[0] as any) ?? null;

  if (!official) return null;

  const hi = language === 'hi';
  const t = (en: string, hi_str: string) => (hi ? hi_str : en);

  const greeting = hi
    ? `सुप्रभात, ${official.name.split(' ')[0]}।`
    : `Good morning, ${official.name.split(' ')[0]}.`;

  const urgentGap = topGaps[0] ?? null;
  const urgentComp = urgentGap ? getCompetencyById(urgentGap.competencyId) : null;
  const urgentScore = urgentGap ? getCompetencyScoreFor(currentOfficialId, urgentGap.competencyId) : null;

  const readinessPct = official.roleReadiness;
  const readinessBarColor =
    readinessPct >= 85 ? 'bg-teal-600' : readinessPct >= 70 ? 'bg-navy-700' : 'bg-amber-600';

  const journeySteps = [
    { id: 'profile', label: t('Profile', 'प्रोफ़ाइल'), done: true },
    { id: 'evidence', label: t('Evidence', 'साक्ष्य'), done: true },
    { id: 'gap', label: t('Gap', 'अंतराल'), done: true },
    { id: 'learn', label: t('Learn', 'सीखें'), current: true, done: false },
    { id: 'prove', label: t('Prove', 'सिद्ध करें'), done: false },
    { id: 'ready', label: t('Ready', 'तैयार'), done: false },
  ];

  const currentStepIndex = journeySteps.findIndex(s => s.current);

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-semibold text-navy-900">{greeting}</h1>
        <p className="text-slate-500 text-sm mt-1">{official.role} · {official.department}</p>
      </div>

      {/* Role Readiness Hero */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-slate-500 mb-1">{t('Your Role Readiness', 'आपकी भूमिका तत्परता')}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-navy-900">{official.roleReadiness}</span>
              <span className="text-2xl font-semibold text-slate-400">%</span>
            </div>
            <p className="text-xs text-green-600 font-medium mt-1">↑ 3% {t('this month', 'इस महीने')}</p>
          </div>
          <button
            onClick={() => navigate('/app/role-readiness')}
            className="text-sm text-navy-800 hover:text-teal-600 font-medium transition-colors shrink-0"
          >
            {t('View full report →', 'पूरी रिपोर्ट देखें →')}
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
          <div
            className={`h-3 rounded-full ${readinessBarColor} transition-all`}
            style={{ width: `${readinessPct}%` }}
          />
        </div>

        {/* Inline stats */}
        <div className="flex items-center gap-6 text-sm text-slate-600">
          <span>
            {t('Confidence', 'आत्मविश्वास')}:{' '}
            <strong className="text-navy-900">{official.competencyConfidence}%</strong>
          </span>
          <span className="text-slate-300">|</span>
          <span>
            {t('Critical Gaps', 'गंभीर अंतराल')}:{' '}
            <strong className={official.criticalGaps > 0 ? 'text-red-600' : 'text-teal-600'}>
              {official.criticalGaps}
            </strong>
          </span>
          <span className="text-slate-300">|</span>
          <span>
            {t('Learning Progress', 'प्रगति')}:{' '}
            <strong className="text-amber-600">{official.learningProgress}%</strong>
          </span>
        </div>
      </div>

      {/* Capability Journey */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-base font-semibold text-navy-900 mb-5">
          {t('Your Capability Journey', 'आपकी क्षमता यात्रा')}
        </h2>
        <div className="flex items-start">
          {journeySteps.map((step, i) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                    step.current
                      ? 'bg-navy-900 border-navy-900 text-white'
                      : step.done
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {step.done && !step.current ? '✓' : step.current ? '→' : ''}
                </div>
                <span
                  className={`text-xs mt-2 font-medium text-center leading-tight ${
                    step.current ? 'text-navy-900' : step.done ? 'text-teal-600' : 'text-slate-400'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < journeySteps.length - 1 && (
                <div
                  className={`h-0.5 flex-1 mx-1 -mt-5 rounded ${
                    step.done ? 'bg-teal-400' : 'bg-slate-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        {currentStepIndex >= 0 && (
          <p className="text-sm text-slate-500 mt-5 pt-4 border-t border-slate-100 text-center">
            {t(
              `Step ${currentStepIndex + 1} of ${journeySteps.length} — complete learning and validation to move forward.`,
              `चरण ${currentStepIndex + 1} / ${journeySteps.length} — आगे बढ़ने के लिए सीखना पूरा करें।`
            )}
          </p>
        )}
      </div>

      {/* Most urgent gap */}
      {urgentGap && urgentComp && urgentScore && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-navy-900">
              {t('Most Urgent Gap', 'सबसे जरूरी अंतराल')}
            </h2>
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-red-100 text-red-700">
              {urgentGap.severity}
            </span>
          </div>

          <p className="text-lg font-semibold text-slate-800 mb-1">{urgentComp.name}</p>
          <p className="text-sm text-slate-500 mb-4">{urgentComp.category}</p>

          {/* Level bar */}
          <div className="mb-1">
            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
              <span>{t('Current level', 'वर्तमान स्तर')}: <strong className="text-slate-700">{urgentScore.current.toFixed(1)}</strong></span>
              <span>{t('Required', 'आवश्यक')}: <strong className="text-teal-600">{urgentScore.required.toFixed(1)}</strong></span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-3 bg-amber-500 rounded-full"
                style={{ width: `${Math.min((urgentScore.current / urgentScore.required) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 mt-3 mb-5">
            <span>{t('Confidence', 'आत्मविश्वास')}: <strong className="text-slate-700">{urgentScore.confidence}%</strong></span>
            <span className="text-slate-300">·</span>
            <span>{t('Estimated time', 'अनुमानित समय')}: <strong className="text-slate-700">{urgentGap.estimatedMinutes} min</strong></span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/app/learning-path?comp=${urgentGap.competencyId}`)}
              className="flex-1 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded hover:bg-navy-800 transition-colors"
            >
              {t('Start Learning Path', 'सीखना शुरू करें')}
            </button>
            <button
              onClick={() => navigate('/app/passport')}
              className="flex-1 py-2.5 border border-navy-900 text-navy-900 text-sm font-semibold rounded hover:bg-navy-50 transition-colors"
            >
              {t('View Capability Passport', 'क्षमता पासपोर्ट देखें')}
            </button>
          </div>
        </div>
      )}

      {/* Next recommended course */}
      {topCourse && (
        <div>
          <h2 className="text-base font-semibold text-navy-900 mb-3">
            {t('Recommended for You', 'आपके लिए अनुशंसित')}
          </h2>
          <RecommendationCard course={topCourse} />
          <button
            onClick={() => navigate('/app/learning-path')}
            className="mt-2 text-sm text-navy-800 hover:text-teal-600 font-medium transition-colors"
          >
            {t('View full learning path →', 'पूरा पथ देखें →')}
          </button>
        </div>
      )}

    </div>
  );
}
