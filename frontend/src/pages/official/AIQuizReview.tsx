import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { assessmentQuestions } from '../../data/assessments';

type ReviewStatus = 'pending' | 'approved' | 'rejected';

export default function AIQuizReview() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { fileName?: string; competency?: string } | null;

  const questions = assessmentQuestions.filter(q => q.type === 'mcq').slice(0, 6);
  const [statuses, setStatuses] = useState<ReviewStatus[]>(questions.map(() => 'pending'));
  const [editIdx, setEditIdx] = useState<number | null>(null);

  const approved = statuses.filter(s => s === 'approved').length;
  const rejected = statuses.filter(s => s === 'rejected').length;
  const pending = statuses.filter(s => s === 'pending').length;

  function setStatus(i: number, status: ReviewStatus) {
    setStatuses(prev => prev.map((s, idx) => idx === i ? status : s));
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="AI Quiz Review"
        subtitle={state?.fileName ? `Generated from: ${state.fileName}` : 'Review AI-generated assessment questions'}
        breadcrumbs={[{ label: 'Resources', href: '/app/ai-quiz' }, { label: 'Review' }]}
        actions={
          <button
            onClick={() => navigate('/app/ai-quiz')}
            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 transition-colors"
          >
            Publish Approved ({approved})
          </button>
        }
      />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-md px-4 py-3 text-center">
          <p className="text-xl font-bold text-amber-700">{pending}</p>
          <p className="text-xs text-amber-600">Needs Review</p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-md px-4 py-3 text-center">
          <p className="text-xl font-bold text-teal-700">{approved}</p>
          <p className="text-xs text-teal-600">Approved</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-md px-4 py-3 text-center">
          <p className="text-xl font-bold text-red-700">{rejected}</p>
          <p className="text-xs text-red-600">Rejected</p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((q, i) => {
          const status = statuses[i];
          const borderColor = status === 'approved' ? 'border-teal-300' : status === 'rejected' ? 'border-red-200' : 'border-slate-200';

          return (
            <div key={q.id} className={`bg-white border rounded-md shadow-sm overflow-hidden ${borderColor}`}>
              <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Q{i + 1}</span>
                  <Badge variant={q.difficulty === 'Easy' ? 'teal' : q.difficulty === 'Hard' ? 'HIGH' : 'neutral'}>{q.difficulty}</Badge>
                  {q.aiConfidence && (
                    <span className={`text-xs font-medium ${q.aiConfidence >= 90 ? 'text-teal-600' : q.aiConfidence >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                      AI: {q.aiConfidence}%
                    </span>
                  )}
                  {q.sourcePage && <span className="text-xs text-slate-400">· {q.sourcePage}</span>}
                  <Badge variant="neutral">{state?.competency ?? 'Sampling'}</Badge>
                </div>
                <Badge variant={status === 'approved' ? 'verified' : status === 'rejected' ? 'CRITICAL' : 'pending'}>
                  {status === 'approved' ? '✓ Approved' : status === 'rejected' ? '✗ Rejected' : 'Needs Review'}
                </Badge>
              </div>

              <div className="px-5 py-4">
                <p className="text-sm font-medium text-slate-800 mb-3">{q.text}</p>

                {q.options && (
                  <div className="space-y-1.5 mb-3">
                    {q.options.map((opt, oi) => (
                      <div key={oi} className={`flex items-start gap-2 text-xs px-3 py-2 rounded ${oi === q.correctIndex ? 'bg-teal-50 border border-teal-200' : 'bg-slate-50'}`}>
                        <span className={`font-bold shrink-0 ${oi === q.correctIndex ? 'text-teal-600' : 'text-slate-400'}`}>{String.fromCharCode(65 + oi)}.</span>
                        <span className={oi === q.correctIndex ? 'text-teal-800 font-medium' : 'text-slate-600'}>{opt}</span>
                        {oi === q.correctIndex && <span className="ml-auto text-teal-600 font-semibold shrink-0">✓ Correct</span>}
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-slate-50 rounded px-3 py-2 text-xs text-slate-600 mb-3">
                  <span className="font-semibold">Explanation: </span>{q.explanation}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setStatus(i, 'approved')}
                    disabled={status === 'approved'}
                    className="px-3 py-1.5 bg-teal-600 text-white text-xs font-medium rounded hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setEditIdx(editIdx === i ? null : i)}
                    className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs font-medium rounded hover:bg-slate-50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setStatus(i, 'rejected')}
                    disabled={status === 'rejected'}
                    className="px-3 py-1.5 border border-red-300 text-red-600 text-xs font-medium rounded hover:bg-red-50 transition-colors disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button className="px-3 py-1.5 border border-slate-200 text-slate-500 text-xs rounded hover:bg-slate-50 transition-colors ml-auto">
                    Regenerate
                  </button>
                </div>

                {editIdx === i && (
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <textarea
                      className="w-full border border-slate-200 rounded p-2 text-sm focus:outline-none focus:border-navy-600"
                      rows={3}
                      defaultValue={q.text}
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => { setEditIdx(null); setStatus(i, 'approved'); }} className="px-3 py-1.5 bg-navy-900 text-white text-xs font-medium rounded">Save & Approve</button>
                      <button onClick={() => setEditIdx(null)} className="px-3 py-1.5 border border-slate-200 text-slate-500 text-xs rounded">Cancel</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
