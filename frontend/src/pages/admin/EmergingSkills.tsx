import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

const RADAR_DATA = [
  { skill: 'AI/ML Methods', current: 42, future: 80 },
  { skill: 'Big Data Tools', current: 38, future: 75 },
  { skill: 'Cloud Computing', current: 54, future: 78 },
  { skill: 'GIS & Spatial', current: 61, future: 82 },
  { skill: 'Data Visualisation', current: 58, future: 85 },
  { skill: 'Cybersecurity', current: 66, future: 80 },
  { skill: 'Automated Reporting', current: 45, future: 72 },
  { skill: 'SDG Indicators', current: 70, future: 85 },
];

const SKILLS = [
  { name: 'AI/ML Methods', current: 2.1, future: 4.0, gap: 1.9, priority: 'CRITICAL' as const },
  { name: 'Big Data Analytics', current: 1.9, future: 3.75, gap: 1.85, priority: 'CRITICAL' as const },
  { name: 'Cloud Computing', current: 2.7, future: 3.9, gap: 1.2, priority: 'HIGH' as const },
  { name: 'GIS & Spatial Analysis', current: 3.05, future: 4.1, gap: 1.05, priority: 'HIGH' as const },
  { name: 'Data Visualisation', current: 2.9, future: 4.25, gap: 1.35, priority: 'HIGH' as const },
  { name: 'Cybersecurity', current: 3.3, future: 4.0, gap: 0.7, priority: 'MEDIUM' as const },
];

export default function EmergingSkills() {
  const avgGap = RADAR_DATA.reduce((a, d) => a + (d.future - d.current), 0) / RADAR_DATA.length;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Emerging Skills Radar"
        subtitle="Current workforce capability vs. future skill requirements for the Official Statistical System"
      />

      {/* Gap score */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
          <p className="text-2xl font-bold text-red-700">{avgGap.toFixed(0)}pp</p>
          <p className="text-xs text-red-600 mt-0.5">Avg. Skills Gap Score</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-md p-4 text-center">
          <p className="text-2xl font-bold text-amber-700">2</p>
          <p className="text-xs text-amber-600 mt-0.5">Critical Emerging Gaps</p>
        </div>
        <div className="bg-navy-50 border border-navy-100 rounded-md p-4 text-center">
          <p className="text-2xl font-bold text-navy-900">2026</p>
          <p className="text-xs text-navy-700 mt-0.5">Target Year for Readiness</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Radar chart */}
        <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-navy-900 mb-4">Skill Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: '#475569' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
              <Radar name="Current Capability" dataKey="current" stroke="#1e3a5f" fill="#1e3a5f" fillOpacity={0.3} />
              <Radar name="Future Requirement" dataKey="future" stroke="#d97706" fill="#d97706" fillOpacity={0.15} />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills table */}
        <div className="bg-white border border-slate-200 rounded-md shadow-sm">
          <div className="px-5 py-3 border-b border-slate-100">
            <h3 className="text-sm font-semibold text-navy-900">Emerging Skill Priorities</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {SKILLS.map(skill => (
              <div key={skill.name} className="px-5 py-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-slate-800">{skill.name}</span>
                  <Badge variant={skill.priority}>{skill.priority}</Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
                  <span>Current: <strong className="text-slate-700">{skill.current.toFixed(1)}/5</strong></span>
                  <span>Required: <strong className="text-teal-600">{skill.future.toFixed(1)}/5</strong></span>
                  <span>Gap: <strong className="text-red-600">{skill.gap.toFixed(2)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
