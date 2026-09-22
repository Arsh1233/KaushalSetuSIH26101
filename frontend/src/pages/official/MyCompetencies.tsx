import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import CompetencyCard from '../../components/official/CompetencyCard';
import PageHeader from '../../components/ui/PageHeader';
import { getOfficialById } from '../../data/index';
import type { CompetencyCategory } from '../../data/types';

const CATEGORIES: (CompetencyCategory | 'All')[] = ['All', 'Statistical', 'Technical', 'Digital Governance', 'Behavioural'];

export default function MyCompetencies() {
  const { currentOfficialId } = useApp();
  const [activeCategory, setActiveCategory] = useState<CompetencyCategory | 'All'>('All');
  const official = getOfficialById(currentOfficialId);

  if (!official) return null;

  const filtered = official.competencyScores.filter(s => {
    if (activeCategory === 'All') return true;
    // Category is determined by competency definition in competencies.ts
    const catMap: Record<string, CompetencyCategory> = {
      'survey-design': 'Statistical', 'sampling': 'Statistical', 'data-quality': 'Statistical',
      'labour-statistics': 'Statistical', 'national-accounts': 'Statistical',
      'python': 'Technical', 'r-lang': 'Technical', 'sql': 'Technical',
      'data-viz': 'Technical', 'gis': 'Technical',
      'cybersecurity': 'Digital Governance', 'data-privacy': 'Digital Governance', 'cloud-computing': 'Digital Governance',
      'leadership': 'Behavioural', 'communication': 'Behavioural', 'project-mgmt': 'Behavioural',
    };
    return catMap[s.competencyId] === activeCategory;
  });

  const metCount = official.competencyScores.filter(s => s.current >= s.required).length;
  const gapCount = official.competencyScores.filter(s => s.current < s.required).length;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="My Competency Passport"
        subtitle="Your evidence-backed capability profile — every score reflects actual demonstrated performance."
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'My Competencies' }]}
      />

      {/* Summary bar */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-md px-4 py-3 text-center shadow-sm">
          <p className="text-2xl font-bold text-teal-600">{metCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Competencies Met</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md px-4 py-3 text-center shadow-sm">
          <p className="text-2xl font-bold text-amber-600">{gapCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Gaps to Close</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md px-4 py-3 text-center shadow-sm">
          <p className="text-2xl font-bold text-navy-900">{official.competencyConfidence}%</p>
          <p className="text-xs text-slate-500 mt-0.5">Avg. Confidence</p>
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 mb-5 border-b border-slate-200">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              activeCategory === cat
                ? 'border-navy-900 text-navy-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Competency grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(score => (
          <CompetencyCard key={score.competencyId} score={score} />
        ))}
      </div>
    </div>
  );
}
