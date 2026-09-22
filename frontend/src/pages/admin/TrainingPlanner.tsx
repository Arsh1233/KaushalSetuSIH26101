import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { courses } from '../../data/courses';

const RECOMMENDATION = {
  course: 'Python for Statistical Data Processing',
  provider: 'iGOT Karmayogi',
  officials: 6,
  impact: 'Training 6 Data Analysts and Statistical Officers in Python could improve department role readiness by approximately 11 percentage points.',
  duration: '50 min per official',
  effort: 'Low',
};

export default function TrainingPlanner() {
  const [dept, setDept] = useState('All');
  const [role, setRole] = useState('All');
  const [competency, setCompetency] = useState('python');
  const [priority, setPriority] = useState('CRITICAL');
  const [showRec, setShowRec] = useState(false);

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Department Training Planner"
        subtitle="Plan targeted interventions to close workforce competency gaps efficiently."
      />

      {/* Filters */}
      <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm mb-6">
        <h3 className="text-sm font-semibold text-navy-900 mb-4">Plan Parameters</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs text-slate-500 block mb-1">Department</label>
            <select value={dept} onChange={e => setDept(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600">
              <option>All</option>
              <option>Data Processing Division</option>
              <option>Agricultural Statistics</option>
              <option>Labour Bureau</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600">
              <option>All</option>
              <option>Statistical Officer</option>
              <option>Data Analyst</option>
              <option>Research Officer</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Competency</label>
            <select value={competency} onChange={e => setCompetency(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600">
              <option value="python">Python for Statistical Analysis</option>
              <option value="data-viz">Data Visualisation</option>
              <option value="gis">GIS & Spatial Analysis</option>
              <option value="cloud-computing">Cloud Computing</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 block mb-1">Priority</label>
            <select value={priority} onChange={e => setPriority(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600">
              <option>CRITICAL</option>
              <option>HIGH</option>
              <option>MEDIUM</option>
              <option>LOW</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => setShowRec(true)}
          className="mt-4 px-6 py-2 bg-navy-900 text-white font-semibold text-sm rounded hover:bg-navy-800 transition-colors"
        >
          Get Recommendations
        </button>
      </div>

      {showRec && (
        <div className="space-y-4">
          {/* AI recommendation */}
          <div className="bg-navy-50 border border-navy-100 rounded-md p-5">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-lg">⚡</span>
              <div>
                <p className="text-sm font-semibold text-navy-900">AI Training Recommendation</p>
                <p className="text-xs text-slate-500 mt-0.5">Based on gap analysis and evidence confidence data</p>
              </div>
            </div>
            <p className="text-sm text-navy-800 leading-relaxed mb-4">{RECOMMENDATION.impact}</p>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-500">Recommended Course</p>
                <p className="font-medium text-slate-800 mt-0.5">{RECOMMENDATION.course}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Provider</p>
                <Badge variant="navy">{RECOMMENDATION.provider}</Badge>
              </div>
              <div>
                <p className="text-xs text-slate-500">Officials Affected</p>
                <p className="font-bold text-navy-900">{RECOMMENDATION.officials}</p>
              </div>
            </div>
          </div>

          {/* Course options */}
          <h3 className="text-sm font-semibold text-slate-700">Recommended Programmes</h3>
          <div className="space-y-3">
            {courses.filter(c => c.competencyId === competency).slice(0, 3).map(c => (
              <div key={c.id} className="bg-white border border-slate-200 rounded-md p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-800 text-sm">{c.title}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant={c.provider === 'iGOT Karmayogi' ? 'navy' : c.provider === 'NSSTA' ? 'teal' : 'neutral'}>{c.provider}</Badge>
                    <span className="text-xs text-slate-500">{c.durationMinutes} min · {c.difficulty}</span>
                    <span className="text-xs text-teal-600 font-medium">{c.expectedGain}</span>
                  </div>
                </div>
                <button className="px-3 py-1.5 bg-navy-900 text-white text-xs font-medium rounded hover:bg-navy-800 transition-colors">
                  Plan →
                </button>
              </div>
            ))}
            {courses.filter(c => c.competencyId === competency).length === 0 && (
              <p className="text-sm text-slate-400 text-center py-6">No programmes found for selected competency.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
