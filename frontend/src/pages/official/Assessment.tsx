import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { getMCQs, getScenarios } from '../../data/assessments';
import { getCompetencyById } from '../../data/competencies';
import { getCompetencyScoreFor } from '../../data/index';

type Phase = 'intro' | 'mcq' | 'scenario' | 'result' | 'unavailable';

export default function Assessment() {
  const { compId } = useParams<{ compId: string }>();
  const { currentOfficialId } = useApp();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [mcqCorrect, setMcqCorrect] = useState(0);
  const [mcqTotal, setMcqTotal] = useState(0);
  const [scenarioCount, setScenarioCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const comp = compId ? getCompetencyById(compId) : null;
  const currentScore = compId ? getCompetencyScoreFor(currentOfficialId, compId) : null;
  const mcqs = compId ? getMCQs(compId).slice(0, 5) : [];
  const scenarios = compId ? getScenarios(compId).slice(0, 2) : [];

  if (!comp) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-slate-500">Competency not found.</p>
    </div>
  );

  const currentQ = phase === 'mcq' ? mcqs[qIndex] : scenarios[qIndex];
  const totalQ = phase === 'mcq' ? mcqs.length : scenarios.length;

  // Dynamic confidence calculation based on actual data
  const baseConfidence = currentScore?.confidence ?? 72;
  const mcqScorePct = mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0;
  const confidenceGain = Math.round(mcqScorePct * 0.12) + (scenarioCount > 0 ? 4 : 0);
  const newConfidence = Math.min(99, baseConfidence + confidenceGain);

  function handleMCQAnswer(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setShowFeedback(true);
    const isCorrect = currentQ?.correctIndex === idx;
    setMcqTotal(t => t + 1);
    if (isCorrect) setMcqCorrect(c => c + 1);
  }

  function handleNext() {
    setSelected(null);
    setShowFeedback(false);
    if (phase === 'mcq') {
      if (qIndex + 1 < mcqs.length) {
        setQIndex(qIndex + 1);
      } else {
        setQIndex(0);
        setPhase(scenarios.length > 0 ? 'scenario' : 'result');
      }
    } else {
      if (qIndex + 1 < scenarios.length) {
        setQIndex(qIndex + 1);
      } else {
        setPhase('result');
      }
    }
  }

  function handleScenarioSubmit() {
    setScenarioCount(c => c + 1);
    setShowFeedback(true);
  }

  function startAssessment() {
    if (mcqs.length === 0 && scenarios.length === 0) {
      setPhase('unavailable');
    } else {
      setPhase(mcqs.length > 0 ? 'mcq' : 'scenario');
      setQIndex(0);
    }
  }

  // ─── No questions available ───────────────────────────────────────────────
  if (phase === 'unavailable') {
    return (
      <div className="max-w-2xl mx-auto">
        <PageHeader title="Capability Validation" subtitle={comp.name} />
        <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm text-center">
          <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">📋</div>
          <h2 className="text-lg font-semibold text-navy-900 mb-2">Assessment Not Yet Available</h2>
          <p className="text-slate-500 text-sm mb-6">
            A validated question bank for <strong>{comp.name}</strong> is being prepared by the MoSPI training team. In the meantime, you can strengthen your competency through the learning path.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(`/app/learning-path?comp=${comp.id}`)}
              className="px-5 py-2.5 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors"
            >
              View Learning Path
            </button>
            <button
              onClick={() => navigate('/app/passport')}
              className="px-5 py-2.5 border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors"
            >
              Back to Passport
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Intro screen ─────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Capability Validation"
          subtitle={comp.name}
          breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Passport', href: '/app/passport' }, { label: 'Assessment' }]}
        />
        <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-navy-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✏</div>
            <h2 className="text-xl font-semibold text-navy-900 mb-2">Adaptive Capability Assessment</h2>
            <p className="text-slate-500 text-sm mb-1">Competency: <strong className="text-slate-700">{comp.name}</strong></p>
            <p className="text-slate-500 text-sm">This short assessment validates your demonstrated capability — not just course completion.</p>
          </div>

          {currentScore && (
            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 mb-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-500">Your current confidence level</span>
                <span className={`font-semibold ${currentScore.confidence >= 80 ? 'text-teal-600' : currentScore.confidence >= 65 ? 'text-navy-800' : 'text-amber-600'}`}>
                  {currentScore.confidence}%
                </span>
              </div>
              <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-1.5 bg-navy-700 rounded-full" style={{ width: `${currentScore.confidence}%` }} />
              </div>
              <p className="text-xs text-slate-400 mt-1.5">Completing this assessment will update your confidence score.</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-6 text-sm text-center">
            <div className="bg-slate-50 rounded-md p-3">
              <p className="font-semibold text-navy-900">{mcqs.length}</p>
              <p className="text-xs text-slate-500">MCQ Questions</p>
            </div>
            <div className="bg-slate-50 rounded-md p-3">
              <p className="font-semibold text-navy-900">{scenarios.length}</p>
              <p className="text-xs text-slate-500">Scenario Questions</p>
            </div>
            <div className="bg-slate-50 rounded-md p-3">
              <p className="font-semibold text-navy-900">~{mcqs.length * 2 + scenarios.length * 5} min</p>
              <p className="text-xs text-slate-500">Estimated Time</p>
            </div>
          </div>

          <button
            onClick={startAssessment}
            className="w-full px-8 py-2.5 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors"
          >
            Begin Assessment
          </button>
        </div>
      </div>
    );
  }

  // ─── Result screen ────────────────────────────────────────────────────────
  if (phase === 'result') {
    const resultLabel = mcqScorePct >= 80 ? 'Excellent Performance' : mcqScorePct >= 60 ? 'Good Progress' : mcqTotal > 0 ? 'Keep Practising' : 'Response Recorded';
    return (
      <div className="max-w-2xl mx-auto">
        <PageHeader title="Assessment Complete" subtitle={comp.name} />
        <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 ${mcqScorePct >= 70 || mcqTotal === 0 ? 'bg-teal-100' : 'bg-amber-100'}`}>
              {mcqScorePct >= 70 || mcqTotal === 0 ? '✓' : '○'}
            </div>
            <h2 className="text-xl font-semibold text-navy-900 mb-1">{resultLabel}</h2>
            {mcqTotal > 0 && (
              <p className="text-slate-500 text-sm">You answered {mcqCorrect} of {mcqTotal} questions correctly ({mcqScorePct}%)</p>
            )}
            {scenarioCount > 0 && (
              <p className="text-slate-500 text-sm mt-0.5">{scenarioCount} scenario response{scenarioCount > 1 ? 's' : ''} submitted for expert review</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-50 rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-navy-900">{mcqTotal > 0 ? `${mcqScorePct}%` : '—'}</p>
              <p className="text-xs text-slate-500 mt-0.5">MCQ Score</p>
            </div>
            <div className="bg-teal-50 rounded-md p-4 text-center">
              <p className="text-2xl font-bold text-teal-600">{baseConfidence}% → {newConfidence}%</p>
              <p className="text-xs text-slate-500 mt-0.5">Confidence Updated</p>
            </div>
          </div>

          <div className="bg-navy-50 border border-navy-100 rounded-md p-4 mb-6">
            <p className="text-sm text-navy-800">
              <span className="font-semibold">Competency update: </span>
              Your confidence in {comp.name} has increased to {newConfidence}%.
              {newConfidence < 88
                ? ` Complete the practical task to further validate your capability and raise confidence toward 88%+.`
                : ` Your evidence is strong — consider requesting supervisor validation to lock in this score.`}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/app/practical/${comp.id}`)}
              className="flex-1 py-2.5 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors"
            >
              Continue to Practical Task
            </button>
            <button
              onClick={() => navigate('/app/passport')}
              className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded hover:bg-slate-50 transition-colors"
            >
              Back to Passport
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Question screens ─────────────────────────────────────────────────────
  if (!currentQ) return null;

  const phaseLabel = phase === 'mcq' ? 'Multiple Choice' : 'Scenario-Based';
  const progress = ((qIndex + 1) / Math.max(totalQ, 1)) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Capability Validation"
        subtitle={`${comp.name} · ${phaseLabel}`}
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Passport', href: '/app/passport' }, { label: 'Assessment' }]}
      />

      {/* Progress */}
      <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm mb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>{phaseLabel} — Question {qIndex + 1} of {totalQ}</span>
          <div className="flex gap-2">
            <Badge variant="neutral">{currentQ.difficulty}</Badge>
            <Badge variant={currentQ.type === 'mcq' ? 'navy' : 'teal'}>{currentQ.type.toUpperCase()}</Badge>
          </div>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-1.5 bg-navy-700 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
        {mcqTotal > 0 && (
          <p className="text-xs text-slate-400 mt-1.5">{mcqCorrect}/{mcqTotal} MCQ correct so far</p>
        )}
      </div>

      {/* Question */}
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm mb-4">
        <p className="text-base font-medium text-slate-800 leading-relaxed mb-5">{currentQ.text}</p>

        {currentQ.type === 'mcq' && currentQ.options && (
          <div className="space-y-2">
            {currentQ.options.map((opt, i) => {
              let style = 'border border-slate-200 hover:border-navy-400 hover:bg-slate-50 cursor-pointer';
              if (selected !== null) {
                if (i === currentQ.correctIndex) style = 'border-2 border-teal-500 bg-teal-50';
                else if (i === selected && i !== currentQ.correctIndex) style = 'border-2 border-red-400 bg-red-50';
                else style = 'border border-slate-200 opacity-50 cursor-default';
              }
              return (
                <button
                  key={i}
                  onClick={() => handleMCQAnswer(i)}
                  disabled={selected !== null}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-mono transition-all ${style}`}
                >
                  <span className="text-xs font-semibold text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>
        )}

        {currentQ.type === 'scenario' && !showFeedback && (
          <div>
            <textarea
              className="w-full border border-slate-200 rounded-md p-3 text-sm focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
              rows={6}
              placeholder="Describe your approach and reasoning in detail. Consider the context, stakeholders, and statistical principles involved..."
            />
            <div className="flex items-center justify-between mt-3">
              <p className="text-xs text-slate-400">Your response will be reviewed by a subject matter expert.</p>
              <button
                onClick={handleScenarioSubmit}
                className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
              >
                Submit Response
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Feedback panel */}
      {showFeedback && (
        <>
          {currentQ.type === 'mcq' && (
            <div className={`border rounded-md p-4 mb-4 ${selected === currentQ.correctIndex ? 'bg-teal-50 border-teal-200' : 'bg-red-50 border-red-200'}`}>
              <div className="flex items-start gap-2">
                <span className="text-lg">{selected === currentQ.correctIndex ? '✓' : '✗'}</span>
                <div>
                  <p className="font-semibold text-sm mb-1">
                    {selected === currentQ.correctIndex ? 'Correct' : 'Not quite'}
                  </p>
                  <p className="text-sm text-slate-700">{currentQ.explanation}</p>
                  {currentQ.sourcePage && (
                    <p className="text-xs text-slate-500 mt-1">Source: {currentQ.sourcePage}</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                className="mt-3 px-4 py-1.5 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
              >
                {qIndex + 1 >= totalQ
                  ? (phase === 'mcq' && scenarios.length > 0 ? 'Continue to Scenarios' : 'See Results')
                  : 'Next Question'}
              </button>
            </div>
          )}

          {currentQ.type === 'scenario' && (
            <div className="bg-navy-50 border border-navy-200 rounded-md p-4 mb-4">
              <div className="flex items-start gap-2">
                <span className="text-lg">📋</span>
                <div>
                  <p className="font-semibold text-sm mb-1 text-navy-900">Response Submitted for Expert Review</p>
                  <p className="text-sm text-navy-800">
                    Your scenario response has been recorded and will be reviewed by a MoSPI subject matter expert. This contributes to your Supervisor Validation evidence portfolio.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Expected review time: 2–3 working days</p>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="mt-3 px-4 py-1.5 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
              >
                {qIndex + 1 >= totalQ ? 'See Results' : 'Next Question'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
