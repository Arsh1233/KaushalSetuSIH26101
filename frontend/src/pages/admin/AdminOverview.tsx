import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import { officials } from '../../data/officials';

const DIST_DATA = [
  { level: 'Beginner (1–2)', count: 3, color: '#dc2626' },
  { level: 'Developing (2–3)', count: 14, color: '#d97706' },
  { level: 'Proficient (3–4)', count: 22, color: '#2d5a94' },
  { level: 'Advanced (4–5)', count: 11, color: '#0d9488' },
];

const INSIGHTS = [
  { text: 'Data Visualisation is the most common technical competency gap across the department, affecting 7 of 10 officials.', icon: '📊' },
  { text: 'Python proficiency is below required level for 60% of officials — targeted intervention could improve department readiness by 12%.', icon: '💻' },
  { text: 'GIS skills have the lowest average confidence (61%) and the highest proportion of outdated evidence (>6 months).', icon: '🗺' },
];

export default function AdminOverview() {
  const navigate = useNavigate();
  const avgReadiness = Math.round(officials.reduce((a, o) => a + o.roleReadiness, 0) / officials.length);
  const avgConfidence = Math.round(officials.reduce((a, o) => a + o.competencyConfidence, 0) / officials.length);
  const totalGaps = officials.reduce((a, o) => a + o.criticalGaps, 0);
  const totalHoursSaved = officials.reduce((a, o) => a + o.learningHoursSaved, 0).toFixed(1);
  const avgProgress = Math.round(officials.reduce((a, o) => a + o.learningProgress, 0) / officials.length);

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Department Overview"
        subtitle="Department of Official Statistics · 10 Officials · Smart India Hackathon Demo"
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Officials" value={officials.length} accent="navy" icon="👥" />
        <StatCard label="Avg. Role Readiness" value={avgReadiness} unit="%" accent="teal" icon="◎" delta="↑ 5% last month" deltaPositive />
        <StatCard label="Avg. Competency Confidence" value={avgConfidence} unit="%" accent="navy" icon="📊" />
        <StatCard label="Critical Skill Gaps" value={totalGaps} accent="red" icon="⚡" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <StatCard label="Training Completion" value={avgProgress} unit="%" accent="amber" icon="📈" />
        <StatCard label="Capability Improvement" value="+18" unit="%" accent="green" icon="↑" delta="vs. last quarter" deltaPositive />
        <StatCard label="Learning Hours Saved" value={totalHoursSaved} unit=" hrs" accent="teal" icon="⏱" />
      </div>

      {/* Competency distribution + insights */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-md p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-navy-900 mb-4">Competency Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={DIST_DATA} barSize={40}>
              <XAxis dataKey="level" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`${v} officials`, 'Count']} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {DIST_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-sm font-semibold text-navy-900">AI Workforce Insights</h3>
          {INSIGHTS.map((insight, i) => (
            <div key={i} className="bg-navy-50 border border-navy-100 rounded-md p-3">
              <div className="flex items-start gap-2">
                <span className="text-base shrink-0">{insight.icon}</span>
                <p className="text-xs text-navy-800 leading-relaxed">{insight.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'View Workforce', href: '/admin/workforce', icon: '👥' },
          { label: 'Training Analytics', href: '/admin/training', icon: '📈' },
          { label: 'Emerging Skills', href: '/admin/emerging-skills', icon: '🔭' },
          { label: 'Training Planner', href: '/admin/planner', icon: '📋' },
        ].map(link => (
          <button key={link.label} onClick={() => navigate(link.href)} className="bg-white border border-slate-200 rounded-md px-4 py-3 flex items-center gap-2 hover:border-navy-400 transition-colors shadow-sm text-sm font-medium text-navy-800 text-left">
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
