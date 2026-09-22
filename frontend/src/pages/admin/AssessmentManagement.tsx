import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';

interface Assessment {
  id: string;
  title: string;
  competency: string;
  questionCount: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  attempts: number;
  avgScore: number;
  status: 'Published' | 'Draft' | 'Archived';
  timeLimit: number;
}

const ASSESSMENTS: Assessment[] = [
  { id: 'a1', title: 'Python Competency Assessment', competency: 'Python Programming', questionCount: 20, difficulty: 'Intermediate', attempts: 387, avgScore: 74, status: 'Published', timeLimit: 25 },
  { id: 'a2', title: 'Sampling Techniques Diagnostic', competency: 'Sampling Methods', questionCount: 15, difficulty: 'Intermediate', attempts: 312, avgScore: 78, status: 'Published', timeLimit: 20 },
  { id: 'a3', title: 'Data Visualisation Quiz', competency: 'Data Visualisation', questionCount: 10, difficulty: 'Beginner', attempts: 0, avgScore: 0, status: 'Draft', timeLimit: 15 },
  { id: 'a4', title: 'AI/ML Readiness Assessment', competency: 'Artificial Intelligence', questionCount: 25, difficulty: 'Advanced', attempts: 198, avgScore: 69, status: 'Published', timeLimit: 30 },
  { id: 'a5', title: 'Cybersecurity Awareness Test', competency: 'Cybersecurity', questionCount: 20, difficulty: 'Beginner', attempts: 876, avgScore: 91, status: 'Published', timeLimit: 25 },
  { id: 'a6', title: 'SQL Proficiency Test', competency: 'SQL & Databases', questionCount: 15, difficulty: 'Intermediate', attempts: 234, avgScore: 77, status: 'Published', timeLimit: 20 },
  { id: 'a7', title: 'R Programming Diagnostic', competency: 'R Programming', questionCount: 12, difficulty: 'Intermediate', attempts: 0, avgScore: 0, status: 'Draft', timeLimit: 15 },
  { id: 'a8', title: 'National Accounts Fundamentals', competency: 'National Accounts', questionCount: 20, difficulty: 'Advanced', attempts: 156, avgScore: 72, status: 'Published', timeLimit: 25 },
  { id: 'a9', title: 'GIS Spatial Analysis Quiz', competency: 'Geographic Information Systems', questionCount: 15, difficulty: 'Intermediate', attempts: 189, avgScore: 80, status: 'Published', timeLimit: 20 },
  { id: 'a10', title: 'Data Quality Management Test', competency: 'Data Quality', questionCount: 18, difficulty: 'Intermediate', attempts: 97, avgScore: 0, status: 'Archived', timeLimit: 20 },
];

function statusVariant(status: string) {
  if (status === 'Published') return 'verified';
  if (status === 'Draft') return 'MEDIUM';
  return 'neutral';
}

function scoreColor(score: number): string {
  if (score === 0) return 'text-slate-400';
  if (score >= 85) return 'text-teal-600 font-semibold';
  if (score >= 70) return 'text-navy-800 font-semibold';
  if (score >= 55) return 'text-amber-600 font-semibold';
  return 'text-red-600 font-semibold';
}

export default function AssessmentManagement() {
  const [statusFilter, setStatusFilter] = useState<'All' | 'Published' | 'Draft' | 'Archived'>('All');

  const filtered = ASSESSMENTS.filter((a) => statusFilter === 'All' || a.status === statusFilter);
  const published = ASSESSMENTS.filter((a) => a.status === 'Published').length;
  const scoredAssessments = ASSESSMENTS.filter((a) => a.avgScore > 0);
  const avgScore = scoredAssessments.length > 0
    ? Math.round(scoredAssessments.reduce((sum, a) => sum + a.avgScore, 0) / scoredAssessments.length)
    : 0;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Assessment Management"
        subtitle="Create, manage, and publish competency assessments across learning programmes"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Assessments' }]}
        actions={
          <>
            <button className="bg-white text-navy-900 text-sm font-medium px-4 py-2 rounded-md border border-slate-200 hover:border-slate-300 transition-colors flex items-center gap-1.5">
              ✦ Generate with AI
            </button>
            <button className="bg-navy-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-navy-800 transition-colors">
              + Create Assessment
            </button>
          </>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Assessments" value={10} accent="navy" icon="📋" />
        <StatCard label="Published" value={published} accent="teal" icon="✓" />
        <StatCard label="Avg Score (all)" value={avgScore} unit="%" accent="amber" icon="📊" />
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm">
        <div className="p-4 border-b border-slate-100 flex gap-2">
          <span className="text-xs font-medium text-slate-500 self-center mr-1">Status:</span>
          {(['All', 'Published', 'Draft', 'Archived'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                statusFilter === s
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Title</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Competency</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Questions</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Time Limit</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Difficulty</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Attempts</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Avg Score</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-navy-900 max-w-[200px]">
                    <div className="leading-snug">{a.title}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{a.competency}</td>
                  <td className="px-4 py-3 text-slate-700">{a.questionCount}</td>
                  <td className="px-4 py-3 text-slate-600">{a.timeLimit} min</td>
                  <td className="px-4 py-3 text-slate-600">{a.difficulty}</td>
                  <td className="px-4 py-3 text-slate-700">{a.attempts.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={scoreColor(a.avgScore)}>
                      {a.avgScore > 0 ? `${a.avgScore}%` : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={statusVariant(a.status) as any}>{a.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">Edit</button>
                      <button className="text-xs text-slate-400 hover:text-slate-600 font-medium">
                        {a.status === 'Published' ? 'Unpublish' : 'Publish'}
                      </button>
                      <button className="text-xs text-amber-600 hover:text-amber-700 font-medium">AI Generate</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {ASSESSMENTS.length} assessments
        </div>
      </div>
    </div>
  );
}
