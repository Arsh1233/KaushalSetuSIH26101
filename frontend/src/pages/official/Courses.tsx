import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import StatCard from '../../components/ui/StatCard';
import { courses } from '../../data/courses';
import { competencies } from '../../data/competencies';

type Provider = 'all' | 'iGOT Karmayogi' | 'NSSTA' | 'Department';
type Difficulty = 'all' | 'Beginner' | 'Intermediate' | 'Advanced';

const difficultyMatch: Record<string, number> = {
  Beginner: 94,
  Intermediate: 87,
  Advanced: 78,
};

const providerShort = (p: string) => {
  if (p === 'iGOT Karmayogi') return 'iGOT';
  if (p === 'NSSTA') return 'NSSTA';
  return 'Dept';
};

export default function Courses() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [provider, setProvider] = useState<Provider>('all');
  const [difficulty, setDifficulty] = useState<Difficulty>('all');

  const igotCount = courses.filter(c => c.provider === 'iGOT Karmayogi').length;
  const nsstaCount = courses.filter(c => c.provider === 'NSSTA').length;

  const filtered = courses.filter(c => {
    const matchesSearch =
      search === '' ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesProvider = provider === 'all' || c.provider === provider;
    const matchesDifficulty = difficulty === 'all' || c.difficulty === difficulty;
    return matchesSearch && matchesProvider && matchesDifficulty;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Course Catalogue"
        subtitle="Browse and enrol in courses mapped to your competency gaps"
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Courses' }]}
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Courses" value={courses.length} />
        <StatCard label="iGOT Karmayogi" value={igotCount} />
        <StatCard label="NSSTA" value={nsstaCount} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <select
          value={provider}
          onChange={e => setProvider(e.target.value as Provider)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Providers</option>
          <option value="iGOT Karmayogi">iGOT</option>
          <option value="NSSTA">NSSTA</option>
          <option value="Department">Department</option>
        </select>
        <select
          value={difficulty}
          onChange={e => setDifficulty(e.target.value as Difficulty)}
          className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-slate-500 text-sm">No courses match your filters.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(course => {
          const comp = competencies.find(c => c.id === course.competencyId);
          const match = difficultyMatch[course.difficulty] ?? 87;
          const providerBadge = course.provider === 'iGOT Karmayogi' ? 'teal' : course.provider === 'NSSTA' ? 'HIGH' : 'neutral';
          return (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-navy-900 leading-snug">{course.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant={providerBadge as any}>{providerShort(course.provider)}</Badge>
                <Badge variant="neutral">{course.difficulty}</Badge>
              </div>

              <div className="text-xs text-slate-500 space-y-0.5">
                <div>{course.durationMinutes} min &middot; {comp?.name ?? course.competencyId}</div>
                <div className="font-medium text-teal-600">{course.expectedGain} expected gain</div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {course.description.slice(0, 100)}{course.description.length > 100 ? '…' : ''}
              </p>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Match</span>
                  <span className="font-medium text-navy-700">{match}%</span>
                </div>
                <ProgressBar value={match} />
              </div>

              <button
                onClick={() => navigate(`/app/learning/${course.id}`)}
                className="mt-auto w-full py-2 rounded-lg bg-navy-900 text-white text-xs font-semibold hover:bg-navy-800 transition-colors"
              >
                View Course →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
