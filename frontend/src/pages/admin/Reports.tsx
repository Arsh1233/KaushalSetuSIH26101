import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

const REPORTS = [
  { name: 'Workforce Competency Report', desc: 'Overall competency distribution and readiness across all officials', updated: '20 Apr 2024', type: 'Workforce' },
  { name: 'Skill Gap Analysis', desc: 'Detailed breakdown of competency gaps by severity, role, and department', updated: '18 Apr 2024', type: 'Gaps' },
  { name: 'Training Effectiveness Report', desc: 'Completion vs. capability validation rates for all programmes', updated: '15 Apr 2024', type: 'Training' },
  { name: 'Role Readiness Assessment', desc: 'Individual and aggregate role readiness scores for all officials', updated: '12 Apr 2024', type: 'Readiness' },
  { name: 'Emerging Skills Forecast', desc: 'Current vs. future skill requirements and priority interventions', updated: '10 Apr 2024', type: 'Emerging' },
  { name: 'Learning Hours & Efficiency', desc: 'Hours saved through targeted minimum learning paths vs. full courses', updated: '8 Apr 2024', type: 'Learning' },
  { name: 'Evidence Coverage Report', desc: 'Evidence quality, freshness, and coverage across all competencies', updated: '5 Apr 2024', type: 'Evidence' },
];

export default function Reports() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Reports"
        subtitle="Download and export department competency and training reports"
      />

      <div className="grid grid-cols-1 gap-3">
        {REPORTS.map((r, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-md p-4 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-navy-100 rounded-md flex items-center justify-center text-navy-800 text-lg shrink-0">📄</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <p className="font-semibold text-slate-800 text-sm">{r.name}</p>
                <Badge variant="neutral">{r.type}</Badge>
              </div>
              <p className="text-xs text-slate-500">{r.desc}</p>
              <p className="text-xs text-slate-400 mt-0.5">Last updated: {r.updated}</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="px-3 py-1.5 border border-navy-900 text-navy-900 text-xs font-medium rounded hover:bg-navy-50 transition-colors">
                Export PDF
              </button>
              <button className="px-3 py-1.5 border border-slate-300 text-slate-600 text-xs font-medium rounded hover:bg-slate-50 transition-colors">
                Export CSV
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
