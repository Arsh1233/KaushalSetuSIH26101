import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Badge from '../../components/ui/Badge';
import CompetencyRow from '../../components/official/CompetencyRow';
import GapCard from '../../components/official/GapCard';
import { getOfficialById, getGapsFor } from '../../data/index';
import { getCompetencyById } from '../../data/competencies';
import type { GapSeverity } from '../../data/types';

type Tab = 'All' | 'Gaps' | 'Statistical' | 'Technical' | 'Digital Governance' | 'Behavioural';
const TABS: Tab[] = ['All', 'Gaps', 'Statistical', 'Technical', 'Digital Governance', 'Behavioural'];
const SEVERITIES: GapSeverity[] = ['CRITICAL', 'MEDIUM'];

const SEV_CFG = {
  CRITICAL: { label: 'Critical Gaps', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
  HIGH: { label: 'High Priority', color: 'text-amber-700', bg: 'bg-amber-50', border: 'border-amber-200' },
  MEDIUM: { label: 'Medium Priority', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
  LOW: { label: 'Low Priority', color: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
};

export default function CapabilityPassport() {
  const { currentOfficialId } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('All');

  const official = getOfficialById(currentOfficialId);
  if (!official) return null;

  const metCount = official.competencyScores.filter(s => s.current >= s.required).length;
  const criticalGaps = getGapsFor(currentOfficialId, 'CRITICAL');
  const allGaps = getGapsFor(currentOfficialId);

  const worstGap = official.gaps.find(g => g.severity === 'CRITICAL') ?? official.gaps[0];
  const worstComp = worstGap ? getCompetencyById(worstGap.competencyId) : null;
  const aiInsight = worstComp
    ? `${worstComp.name} is your most critical competency gap — it directly limits your ${official.role} effectiveness. Addressing this could improve your role readiness by approximately ${Math.round(worstGap.delta * 5)}%.`
    : 'Your competency profile is strong. Keep your evidence records fresh to maintain high confidence scores.';

  const filteredScores = official.competencyScores.filter(s => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Gaps') return s.current < s.required;
    const comp = getCompetencyById(s.competencyId);
    return comp?.category === activeTab;
  });

  const gapsByTab = activeTab === 'Gaps'
    ? SEVERITIES.map(sev => ({ sev, gaps: getGapsFor(currentOfficialId, sev) })).filter(g => g.gaps.length > 0)
    : [];

  return (
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold text-navy-900">Capability Passport</h1>
          <p className="text-slate-500 text-sm mt-1">{official.name} · {official.role}</p>
        </div>
        <button
          onClick={() => navigate('/app/evidence')}
          className="mt-1 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 transition-colors shrink-0"
        >
          + Add Evidence
        </button>
      </div>

      {/* Inline summary — no cards, just a readable line */}
      <div className="flex items-center gap-2 text-sm mb-6 flex-wrap">
        <span className="font-semibold text-teal-600">{official.roleReadiness}% role-ready</span>
        <span className="text-slate-300">·</span>
        <span className="text-slate-600"><strong className="text-navy-900">{metCount}/{official.competencyScores.length}</strong> competencies met</span>
        <span className="text-slate-300">·</span>
        {criticalGaps.length > 0 ? (
          <span className="text-red-600 font-medium">{criticalGaps.length} critical gap{criticalGaps.length > 1 ? 's' : ''}</span>
        ) : (
          <span className="text-teal-600 font-medium">No critical gaps</span>
        )}
        <span className="text-slate-300">·</span>
        <span className="text-slate-600">{official.competencyConfidence}% avg. confidence</span>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-0 overflow-x-auto">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-3 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${
              activeTab === tab
                ? 'border-navy-900 text-navy-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab}
            {tab === 'Gaps' && allGaps.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs font-bold rounded-full bg-red-100 text-red-700">
                {allGaps.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Gaps tab */}
      {activeTab === 'Gaps' && (
        <div className="mt-5">
          {/* AI insight */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-5 py-4 mb-6">
            <p className="text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold text-navy-900">Gap Analysis: </span>{aiInsight}
            </p>
          </div>

          {gapsByTab.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
              <p className="text-2xl mb-2">✓</p>
              <p className="font-semibold text-teal-700 text-base">No capability gaps — excellent!</p>
              <p className="text-sm text-slate-500 mt-1">All competencies meet or exceed the required level for your role.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {gapsByTab.map(({ sev, gaps }) => {
                const cfg = SEV_CFG[sev];
                return (
                  <div key={sev}>
                    <div className={`flex items-center gap-2 px-4 py-2.5 ${cfg.bg} border ${cfg.border} rounded-md mb-4`}>
                      <span className={`font-semibold text-sm ${cfg.color}`}>{cfg.label}</span>
                      <Badge variant={sev}>{sev}</Badge>
                      <span className={`text-xs ml-auto ${cfg.color}`}>{gaps.length} gap{gaps.length > 1 ? 's' : ''}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {gaps.map(gap => (
                        <GapCard key={gap.competencyId} gap={gap} officialId={currentOfficialId} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* All / category tabs — list view */}
      {activeTab !== 'Gaps' && (
        <div className="mt-0">
          {/* Column header */}
          <div className="hidden sm:flex items-center px-5 py-2 border-b border-slate-100 text-xs font-medium text-slate-400 uppercase tracking-wide">
            <span className="flex-1">Competency</span>
            <span className="w-48 shrink-0 hidden sm:block">Level</span>
            <span className="flex items-center gap-4 shrink-0">
              <span className="w-20 text-right hidden md:block">Confidence</span>
              <span className="w-24 text-right">Status</span>
              <span className="w-4" />
            </span>
          </div>

          {filteredScores.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center mt-4">
              <p className="text-slate-400 text-sm">No competencies in this category.</p>
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden mt-4 shadow-sm">
              {filteredScores.map(score => (
                <CompetencyRow key={score.competencyId} score={score} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer actions */}
      <div className="mt-8 flex flex-wrap gap-3 pt-6 border-t border-slate-100">
        <button
          onClick={() => navigate('/app/role-readiness')}
          className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
        >
          View Role Readiness
        </button>
        <button
          onClick={() => navigate('/app/learning-path')}
          className="px-4 py-2 border border-navy-900 text-navy-900 text-sm font-medium rounded hover:bg-navy-50 transition-colors"
        >
          Minimum Learning Path
        </button>
        <button
          onClick={() => navigate('/app/evidence')}
          className="px-4 py-2 border border-teal-600 text-teal-600 text-sm font-medium rounded hover:bg-teal-50 transition-colors"
        >
          View Evidence Portfolio
        </button>
      </div>
    </div>
  );
}
