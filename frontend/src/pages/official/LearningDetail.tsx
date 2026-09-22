import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { getCourseById } from '../../data/courses';

const providerBadge: Record<string, 'navy' | 'teal' | 'neutral'> = {
  'iGOT Karmayogi': 'navy',
  'NSSTA': 'teal',
  'Department': 'neutral',
};

export default function LearningDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const course = courseId ? getCourseById(courseId) : null;

  if (!course) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-slate-500">Course not found.</p>
    </div>
  );

  const totalDuration = course.modules.reduce((a, m) => a + m.durationMin, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title={course.title}
        breadcrumbs={[
          { label: 'Home', href: '/app/dashboard' },
          { label: 'Learning Path', href: '/app/learning-path' },
          { label: 'Course' },
        ]}
        actions={
          <button
            onClick={() => navigate(`/app/assessment/${course.competencyId}`)}
            className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
          >
            Start Learning
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-4">
          {/* Meta */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge variant={providerBadge[course.provider] ?? 'neutral'}>{course.provider}</Badge>
              <Badge variant="neutral">{course.difficulty}</Badge>
              <Badge variant="neutral">{totalDuration} min</Badge>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{course.description}</p>
          </div>

          {/* Why recommended */}
          <div className="bg-navy-50 border border-navy-100 rounded-md p-4">
            <p className="text-xs font-semibold text-navy-700 mb-1 uppercase tracking-wide">Why recommended</p>
            <p className="text-sm text-navy-800 leading-relaxed">{course.whyRecommended}</p>
            <div className="mt-2 text-sm font-medium text-teal-600">Expected competency gain: {course.expectedGain}</div>
          </div>

          {/* Modules */}
          <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-semibold text-navy-900 text-sm">Course Modules</h3>
              <span className="text-xs text-slate-500">{course.modules.length} modules · {totalDuration} min total</span>
            </div>
            <div className="divide-y divide-slate-100">
              {course.modules.map((mod, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                    ${i < progress ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-500'}`}>
                    {i < progress ? '✓' : i + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{mod.title}</p>
                    <p className="text-xs text-slate-500">{mod.durationMin} minutes</p>
                  </div>
                  {i === progress && (
                    <button
                      onClick={() => { setProgress(i + 1); if (i + 1 >= course.modules.length) navigate(`/app/assessment/${course.competencyId}`); }}
                      className="text-xs font-medium text-teal-600 hover:text-teal-700 transition-colors"
                    >
                      Start →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Learning outcomes */}
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-navy-900 mb-3">Learning Outcomes</h4>
            <ul className="space-y-2">
              {['Apply Python to clean and validate survey microdata', 'Compute weighted estimates for population statistics', 'Handle missing data using appropriate imputation methods', 'Produce reproducible analysis scripts'].map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="text-teal-500 font-bold mt-0.5">✓</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Progress */}
          {progress > 0 && (
            <div className="bg-teal-50 border border-teal-200 rounded-md p-4">
              <p className="text-xs font-semibold text-teal-700 mb-2">Progress</p>
              <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
                <div className="h-2 bg-teal-500 rounded-full transition-all" style={{ width: `${(progress / course.modules.length) * 100}%` }} />
              </div>
              <p className="text-xs text-teal-600 mt-1">{progress} / {course.modules.length} modules complete</p>
            </div>
          )}

          {/* Alternative */}
          <div className="bg-slate-50 border border-slate-200 rounded-md p-4">
            <p className="text-xs font-semibold text-slate-600 mb-2">Alternative Programme</p>
            <p className="text-xs text-slate-500">NSSTA offers a longer {course.difficulty === 'Beginner' ? 'intermediate' : 'beginner'}-level course on this topic with physical classroom sessions. Recommended for officials who prefer instructor-led learning.</p>
            <button className="mt-2 text-xs text-navy-800 font-medium hover:text-teal-600 transition-colors">
              View NSSTA Recommended Programme →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
