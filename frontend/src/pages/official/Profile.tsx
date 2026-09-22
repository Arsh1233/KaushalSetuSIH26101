import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { getOfficialById, getGapsFor, getEvidenceForOfficial } from '../../data/index';
import { competencies, getCompetencyById } from '../../data/competencies';

function InfoRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-slate-100 last:border-0">
      <span className="w-40 shrink-0 text-xs font-medium text-slate-500 pt-0.5">{label}</span>
      <span className="text-sm text-slate-800">{value}</span>
    </div>
  );
}

export default function Profile() {
  const { currentOfficialId, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const official = getOfficialById(currentOfficialId);

  if (!official) return null;

  const evidence = getEvidenceForOfficial(currentOfficialId);
  const criticalGaps = getGapsFor(currentOfficialId, 'CRITICAL');
  const metCount = official.competencyScores.filter(s => s.current >= s.required).length;
  const initials = official.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  const catGroups = ['Statistical', 'Technical', 'Digital Governance', 'Behavioural'];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="My Profile"
        subtitle="Your official KaushalSetu profile — competency record, evidence and settings."
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Profile' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — identity + stats */}
        <div className="space-y-4">
          {/* Avatar card */}
          <div className="bg-white border border-slate-200 rounded-md p-6 shadow-sm text-center">
            <div className="w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
              {initials}
            </div>
            <h2 className="font-semibold text-navy-900 text-lg">{official.name}</h2>
            <p className="text-sm text-slate-500 mt-0.5">{official.role}</p>
            <p className="text-xs text-slate-400 mt-0.5">{official.department}</p>
            <div className="mt-3 flex justify-center">
              <Badge variant={official.roleReadiness >= 85 ? 'verified' : official.roleReadiness >= 70 ? 'teal' : 'MEDIUM'}>
                {official.roleReadiness >= 85 ? '✓ Deployment Ready' : official.roleReadiness >= 70 ? 'Nearly Ready' : 'Needs Development'}
              </Badge>
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Capability Snapshot</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Role Readiness</span>
                  <span className="font-semibold text-teal-600">{official.roleReadiness}%</span>
                </div>
                <ProgressBar value={official.roleReadiness} showValue={false} />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Competency Confidence</span>
                  <span className="font-semibold text-navy-900">{official.competencyConfidence}%</span>
                </div>
                <ProgressBar value={official.competencyConfidence} showValue={false} />
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Learning Progress</span>
                  <span className="font-semibold text-amber-600">{official.learningProgress}%</span>
                </div>
                <ProgressBar value={official.learningProgress} showValue={false} />
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
              <div>
                <p className="text-base font-bold text-navy-900">{metCount}/{official.competencyScores.length}</p>
                <p className="text-xs text-slate-400">Competencies Met</p>
              </div>
              <div>
                <p className="text-base font-bold text-red-600">{criticalGaps.length}</p>
                <p className="text-xs text-slate-400">Critical Gaps</p>
              </div>
              <div>
                <p className="text-base font-bold text-teal-600">{evidence.filter(e => e.verified).length}</p>
                <p className="text-xs text-slate-400">Verified Evidence</p>
              </div>
              <div>
                <p className="text-base font-bold text-navy-900">{official.learningHoursSaved} hrs</p>
                <p className="text-xs text-slate-400">Hours Saved</p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Settings</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-700">Language</span>
              <div className="flex border border-slate-200 rounded overflow-hidden text-xs">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 font-medium transition-colors ${language === 'en' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1.5 font-medium transition-colors ${language === 'hi' ? 'bg-navy-900 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  हिन्दी
                </button>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm text-slate-700">Display Mode</span>
              <Badge variant="neutral">Light</Badge>
            </div>
          </div>
        </div>

        {/* Right — details + competencies */}
        <div className="lg:col-span-2 space-y-4">
          {/* Personal details */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <h4 className="text-sm font-semibold text-navy-900 mb-1">Personal & Service Details</h4>
            <p className="text-xs text-slate-400 mb-4">⚠ Demo data — all information is fictional</p>
            <InfoRow label="Full Name" value={official.name} />
            <InfoRow label="Role / Designation" value={official.role} />
            <InfoRow label="Department" value={official.department} />
            <InfoRow label="Experience" value={`${official.experienceYears} years`} />
            <InfoRow label="Employee ID" value={`MoSPI-${currentOfficialId.toUpperCase().slice(0, 8)}-DEMO`} />
            <InfoRow label="Training Platform" value="iGOT Karmayogi · NSSTA / TPAC" />
            <InfoRow label="Profile Last Updated" value={new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} />
          </div>

          {/* Competency profile by category */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-navy-900">Competency Profile</h4>
              <button
                onClick={() => navigate('/app/passport')}
                className="text-xs text-navy-800 font-medium hover:text-teal-600 transition-colors"
              >
                Full Passport →
              </button>
            </div>
            <div className="space-y-5">
              {catGroups.map(cat => {
                const catScores = official.competencyScores.filter(s => {
                  const comp = getCompetencyById(s.competencyId);
                  return comp?.category === cat;
                });
                if (catScores.length === 0) return null;
                return (
                  <div key={cat}>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{cat}</p>
                    <div className="space-y-2">
                      {catScores.map(s => {
                        const comp = getCompetencyById(s.competencyId);
                        const isGap = s.current < s.required;
                        return (
                          <div key={s.competencyId} className="flex items-center gap-3">
                            <span className="text-xs text-slate-600 w-44 shrink-0 truncate">{comp?.name}</span>
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-1.5 rounded-full ${isGap ? 'bg-amber-400' : 'bg-teal-500'}`}
                                style={{ width: `${Math.min((s.current / s.required) * 100, 100)}%` }}
                              />
                            </div>
                            <span className={`text-xs font-medium w-12 text-right shrink-0 ${isGap ? 'text-amber-600' : 'text-teal-600'}`}>
                              {s.current.toFixed(1)}/{s.required.toFixed(1)}
                            </span>
                            {isGap && <span className="text-xs text-red-500 shrink-0">Gap</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/app/passport')}
              className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-left hover:border-navy-400 transition-colors"
            >
              <p className="text-sm font-semibold text-navy-900">🎓 Capability Passport</p>
              <p className="text-xs text-slate-500 mt-0.5">View all competencies & gaps</p>
            </button>
            <button
              onClick={() => navigate('/app/evidence')}
              className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-left hover:border-navy-400 transition-colors"
            >
              <p className="text-sm font-semibold text-navy-900">📁 Evidence Portfolio</p>
              <p className="text-xs text-slate-500 mt-0.5">{evidence.length} items · {evidence.filter(e => e.verified).length} verified</p>
            </button>
            <button
              onClick={() => navigate('/app/assessment')}
              className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-left hover:border-navy-400 transition-colors"
            >
              <p className="text-sm font-semibold text-navy-900">✏ Validate Capability</p>
              <p className="text-xs text-slate-500 mt-0.5">Start an assessment</p>
            </button>
            <button
              onClick={() => navigate('/app/role-readiness')}
              className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-left hover:border-navy-400 transition-colors"
            >
              <p className="text-sm font-semibold text-navy-900">◎ Role Readiness</p>
              <p className="text-xs text-slate-500 mt-0.5">{official.roleReadiness}% ready for {official.role}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
