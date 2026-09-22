import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import { getCompetencyById } from '../../data/competencies';

export default function CompetencyUpdate() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { competencyId?: string; from?: string } | null;
  const comp = state?.competencyId ? getCompetencyById(state.competencyId) : null;
  const compName = comp?.name ?? 'Python for Statistical Analysis';

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Capability Updated"
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Competency Update' }]}
      />

      <div className="bg-white border border-teal-300 rounded-md p-8 shadow-sm text-center mb-4">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">✓</div>
        <h2 className="text-xl font-semibold text-teal-700 mb-1">Capability Improved</h2>
        <p className="text-slate-500 text-sm mb-6">{compName} — evidence validated and competency profile updated</p>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-50 rounded-md p-4 border border-slate-200">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-2">Before</p>
            <p className="text-xl font-bold text-slate-500">2.4 / 5</p>
            <p className="text-xs text-slate-400 mt-0.5">Confidence: 72%</p>
          </div>
          <div className="bg-teal-50 rounded-md p-4 border border-teal-200">
            <p className="text-xs text-teal-500 uppercase tracking-wide mb-2">After</p>
            <p className="text-xl font-bold text-teal-700">3.7 / 5</p>
            <p className="text-xs text-teal-500 mt-0.5">Confidence: 88%</p>
          </div>
        </div>

        {/* Role readiness update */}
        <div className="bg-navy-50 border border-navy-100 rounded-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-xs text-slate-500 mb-0.5">Role Readiness</p>
              <p className="text-base font-bold text-navy-900">82% → 89%</p>
            </div>
            <div className="text-3xl">↑</div>
            <div className="text-right">
              <p className="text-xs text-slate-500 mb-0.5">Competency Confidence</p>
              <p className="text-base font-bold text-teal-600">72% → 88%</p>
            </div>
          </div>
        </div>

        {/* Evidence added */}
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-6 text-left">
          <p className="text-xs font-semibold text-green-700 mb-2">Evidence Added to Profile</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-green-600 font-bold">✓</span>
            <span className="text-slate-700">Practical Task — Python Data Cleaning</span>
            <span className="text-xs text-slate-400 ml-auto">Score: 91%</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => navigate('/app/role-readiness')}
          className="flex-1 py-2.5 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors"
        >
          View Role Readiness
        </button>
        <button
          onClick={() => navigate('/app/dashboard')}
          className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded hover:bg-slate-50 transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
