import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import { competencies } from '../../data/competencies';
import { officials } from '../../data/officials';

export default function AdminCompetencies() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader title="Competency Framework" subtitle="Organisation-wide competency levels and coverage" />
      <div className="grid grid-cols-1 gap-3">
        {competencies.map(comp => {
          const scores = officials.flatMap(o => o.competencyScores.filter(s => s.competencyId === comp.id));
          const avg = scores.length > 0 ? (scores.reduce((a, s) => a + s.current, 0) / scores.length).toFixed(1) : '—';
          const metCount = scores.filter(s => s.current >= s.required).length;
          return (
            <div key={comp.id} className="bg-white border border-slate-200 rounded-md p-4 shadow-sm flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-medium text-slate-800 text-sm">{comp.name}</p>
                  <Badge variant="neutral">{comp.category}</Badge>
                </div>
                <p className="text-xs text-slate-500">{comp.description}</p>
              </div>
              <div className="text-center px-4">
                <p className="text-lg font-bold text-navy-900">{avg}</p>
                <p className="text-xs text-slate-400">Avg. Level</p>
              </div>
              <div className="text-center px-4">
                <p className="text-lg font-bold text-teal-600">{metCount}/{scores.length}</p>
                <p className="text-xs text-slate-400">Met</p>
              </div>
              <button onClick={() => navigate('/admin/workforce')} className="px-3 py-1.5 border border-navy-900 text-navy-900 text-xs font-medium rounded hover:bg-navy-50 transition-colors">
                View Officials →
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
