import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { getCompetencyById } from '../../data/competencies';

const DATASET_PREVIEW = `hh_id  | district | income | members | usual_activity
--------|----------|--------|---------|---------------
HH001   | 01       | 12400  | 4       | 11
HH002   | 01       |        | 2       | 81
HH003   | 02       | 8200   | 3       | 11
HH004   | 02       | 15600  | 5       |
HH005   | 03       | 9800   | 4       | 21`;

const OPTIONS = [
  "df['income'].fillna(df['income'].mean())",
  "df.dropna(subset=['income'])",
  "df['income'].fillna(df.groupby('district')['income'].transform('median'))",
  "df['income'] = df['income'].interpolate()",
];

export default function PracticalTask() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const comp = taskId ? getCompetencyById(taskId) : null;
  const compName = comp?.name ?? 'Python for Statistical Analysis';

  const isCorrect = selected === 2;

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="Practical Capability Task"
        subtitle={compName}
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Assessment', href: `/app/assessment/${taskId}` }, { label: 'Practical Task' }]}
      />

      {!submitted ? (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-semibold text-navy-900">Task: Survey Data Cleaning</h3>
              <div className="flex gap-2">
                <Badge variant="navy">Practical</Badge>
                <Badge variant="neutral">~10 min</Badge>
              </div>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              You have received HCES 2022-23 household expenditure data from District 01-03. The dataset contains missing values in the <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-xs">income</code> column. Your task is to identify the most appropriate Python operation for cleaning these missing values while preserving the statistical integrity of the district-level analysis.
            </p>
            <div className="bg-slate-800 rounded-md p-4 mb-4">
              <p className="text-xs text-slate-400 mb-2 font-mono">HCES_2022_sample.csv (first 5 rows)</p>
              <pre className="text-xs text-green-300 font-mono overflow-x-auto">{DATASET_PREVIEW}</pre>
            </div>
            <p className="text-sm font-medium text-slate-700 mb-3">
              Which Python operation best handles the missing income values for this district-level analysis?
            </p>
            <div className="space-y-2 mb-4">
              {OPTIONS.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3 rounded-md text-sm font-mono border transition-all ${
                    selected === i ? 'border-navy-600 bg-navy-50' : 'border-slate-200 hover:border-navy-400'
                  }`}
                >
                  <span className="text-xs text-slate-400 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button className="text-sm text-slate-500 hover:text-navy-800 transition-colors">
                💡 Show Hint
              </button>
              <button
                onClick={() => selected !== null && setSubmitted(true)}
                disabled={selected === null}
                className="px-6 py-2 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs text-slate-500">
            <strong>Expected competency:</strong> Python for Statistical Analysis — Practical data processing and cleaning skills. This task contributes directly to your evidence portfolio.
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className={`bg-white border rounded-md p-6 shadow-sm ${isCorrect ? 'border-teal-300' : 'border-amber-300'}`}>
            <div className="text-center mb-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 ${isCorrect ? 'bg-teal-100' : 'bg-amber-100'}`}>
                {isCorrect ? '✓' : '○'}
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-1">
                {isCorrect ? 'Capability Demonstrated!' : 'Partially Correct'}
              </h3>
              <p className="text-sm text-slate-500">
                {isCorrect
                  ? 'Excellent — you selected the statistically appropriate approach for district-level analysis.'
                  : 'Your answer shows some understanding, but a district-stratified median imputation is more appropriate here.'}
              </p>
            </div>

            <div className="bg-slate-50 rounded-md p-4 mb-4">
              <p className="text-xs font-semibold text-slate-600 mb-1">Correct approach:</p>
              <code className="text-xs font-mono text-navy-800 block">{OPTIONS[2]}</code>
              <p className="text-xs text-slate-500 mt-2">
                Using district-level median imputation preserves geographic variation in income, which is critical for district-level statistical analysis. A global mean would bias district estimates.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-50 rounded-md p-3 text-center">
                <p className="text-xs text-slate-500 mb-0.5">Evidence Added</p>
                <p className="text-sm font-semibold text-navy-900">Practical Task</p>
                <p className="text-xs text-teal-600">Python Data Cleaning</p>
              </div>
              <div className="bg-teal-50 rounded-md p-3 text-center">
                <p className="text-xs text-slate-500 mb-0.5">Confidence Updated</p>
                <p className="text-sm font-semibold text-teal-600">79% → 88%</p>
                <p className="text-xs text-slate-500">+9 points</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate('/app/competency-update', { state: { competencyId: taskId, from: 'practical' } })}
                className="flex-1 py-2.5 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors"
              >
                View Competency Update
              </button>
              <button
                onClick={() => navigate('/app/evidence')}
                className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded hover:bg-slate-50 transition-colors"
              >
                View Evidence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
