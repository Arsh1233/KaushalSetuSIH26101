import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import { courses } from '../../data/courses';

interface CourseStats {
  enrolments: number;
  completions: number;
  avgScore: number;
}

const courseStats: Record<string, CourseStats> = {
  'igot-python-stats': { enrolments: 412, completions: 338, avgScore: 78 },
  'igot-dataviz': { enrolments: 367, completions: 301, avgScore: 81 },
  'nssta-python': { enrolments: 189, completions: 142, avgScore: 74 },
  'dept-gis-intro': { enrolments: 221, completions: 187, avgScore: 83 },
  'igot-cloud': { enrolments: 534, completions: 461, avgScore: 88 },
  'nssta-labour': { enrolments: 163, completions: 121, avgScore: 72 },
  'igot-sampling': { enrolments: 298, completions: 244, avgScore: 79 },
  'igot-dataquality': { enrolments: 276, completions: 228, avgScore: 76 },
  'nssta-nataccts': { enrolments: 144, completions: 108, avgScore: 71 },
  'igot-cybersec': { enrolments: 892, completions: 812, avgScore: 91 },
  'igot-r': { enrolments: 234, completions: 181, avgScore: 75 },
  'igot-gis': { enrolments: 198, completions: 154, avgScore: 77 },
};

const EXTRA_COURSES = [
  {
    id: 'nssta-sdg',
    title: 'SDG Indicator Framework for National Statistical Offices',
    provider: 'NSSTA',
    durationMinutes: 75,
    difficulty: 'Intermediate',
    competencyId: 'sdg-monitoring',
    expectedGain: '+1.1 levels',
    whyRecommended: '',
    description: '',
    modules: [],
  },
  {
    id: 'dept-survey-ops',
    title: 'Field Survey Operations and Supervision',
    provider: 'Department',
    durationMinutes: 60,
    difficulty: 'Beginner',
    competencyId: 'survey-management',
    expectedGain: '+0.9 levels',
    whyRecommended: '',
    description: '',
    modules: [],
  },
];

const EXTRA_STATS: Record<string, CourseStats> = {
  'nssta-sdg': { enrolments: 211, completions: 178, avgScore: 82 },
  'dept-survey-ops': { enrolments: 324, completions: 271, avgScore: 84 },
};

const ALL_COURSES = [...courses, ...EXTRA_COURSES];
const ALL_STATS: Record<string, CourseStats> = { ...courseStats, ...EXTRA_STATS };

const PROVIDERS = ['All', 'iGOT Karmayogi', 'NSSTA', 'Department'];
const DIFFICULTIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

function providerVariant(provider: string): string {
  if (provider === 'iGOT Karmayogi') return 'teal';
  if (provider === 'NSSTA') return 'HIGH';
  return 'neutral';
}

function completionColor(rate: number): string {
  if (rate >= 85) return 'text-teal-600 font-semibold';
  if (rate >= 70) return 'text-navy-800 font-semibold';
  if (rate >= 55) return 'text-amber-600 font-semibold';
  return 'text-red-600 font-semibold';
}

export default function CourseManagement() {
  const [providerFilter, setProviderFilter] = useState('All');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  const filtered = ALL_COURSES.filter((c) => {
    const matchProvider = providerFilter === 'All' || c.provider === providerFilter;
    const matchDiff = difficultyFilter === 'All' || c.difficulty === difficultyFilter;
    return matchProvider && matchDiff;
  });

  const igotCount = ALL_COURSES.filter((c) => c.provider === 'iGOT Karmayogi').length;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Course Management"
        subtitle="Manage and monitor all learning content across iGOT, NSSTA, and departmental providers"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Course Management' }]}
        actions={
          <>
            <button className="bg-white text-navy-900 text-sm font-medium px-4 py-2 rounded-md border border-slate-200 hover:border-slate-300 transition-colors">
              ↻ Sync Courses
            </button>
            <button className="bg-navy-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-navy-800 transition-colors">
              + Add Course
            </button>
          </>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Courses" value={ALL_COURSES.length} accent="navy" icon="📖" />
        <StatCard label="iGOT Karmayogi Courses" value={igotCount} accent="teal" icon="🎓" />
        <StatCard label="Avg Completion Rate" value="82" unit="%" accent="amber" icon="✓" delta="↑ 4% vs last quarter" deltaPositive />
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Provider:</span>
            {PROVIDERS.map((p) => (
              <button
                key={p}
                onClick={() => setProviderFilter(p)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  providerFilter === p
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-4">
            <span className="text-xs font-medium text-slate-500">Difficulty:</span>
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-3 py-1.5 text-xs rounded-md border transition-colors ${
                  difficultyFilter === d
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Course Title</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Provider</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Difficulty</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Duration</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Competency</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Enrolments</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Completion</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course) => {
                const stats = ALL_STATS[course.id] ?? { enrolments: 0, completions: 0, avgScore: 0 };
                const rate = stats.enrolments > 0 ? Math.round((stats.completions / stats.enrolments) * 100) : 0;
                const durationStr = course.durationMinutes >= 60
                  ? `${Math.floor(course.durationMinutes / 60)}h ${course.durationMinutes % 60 > 0 ? `${course.durationMinutes % 60}m` : ''}`
                  : `${course.durationMinutes}m`;
                return (
                  <tr key={course.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-navy-900 max-w-[220px]">
                      <div className="leading-snug">{course.title}</div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={providerVariant(course.provider) as any}>{course.provider}</Badge>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{course.difficulty}</td>
                    <td className="px-4 py-3 text-slate-600">{durationStr.trim()}</td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">{course.competencyId}</td>
                    <td className="px-4 py-3 text-slate-700">{stats.enrolments.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={completionColor(rate)}>{rate}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-xs text-teal-600 hover:text-teal-700 font-medium">Edit</button>
                        <button className="text-xs text-slate-400 hover:text-slate-600 font-medium">Archive</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {ALL_COURSES.length} courses
        </div>
      </div>
    </div>
  );
}
