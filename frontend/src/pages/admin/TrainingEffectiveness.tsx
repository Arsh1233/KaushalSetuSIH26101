import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

const COURSES = [
  { name: 'Python for Statistical Analysis', provider: 'iGOT Karmayogi', participants: 32, completion: 84, compGain: 21, validated: 76 },
  { name: 'Survey Sampling Fundamentals', provider: 'NSSTA', participants: 28, completion: 91, compGain: 18, validated: 85 },
  { name: 'Data Visualisation for Statistical Communication', provider: 'iGOT Karmayogi', participants: 24, completion: 79, compGain: 15, validated: 68 },
  { name: 'Labour Statistics: Theory and Practice', provider: 'NSSTA', participants: 18, completion: 88, compGain: 22, validated: 82 },
  { name: 'GIS Fundamentals for Statistical Officers', provider: 'Department', participants: 15, completion: 73, compGain: 12, validated: 60 },
  { name: 'Cloud Computing for Government Officials', provider: 'iGOT Karmayogi', participants: 22, completion: 95, compGain: 8, validated: 88 },
];

const KEY_INSIGHT = 'Python course completion is high (84%), but practical capability validation is lower (76%). This gap indicates that some officials completed the course without fully demonstrating applied statistical data processing skills.';

export default function TrainingEffectiveness() {
  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Training Effectiveness"
        subtitle="Measuring the impact of training on demonstrated capability — not just attendance."
      />

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-6">
        <p className="text-sm text-amber-800">
          <span className="font-semibold">Key Insight: </span>{KEY_INSIGHT}
        </p>
        <p className="text-xs text-amber-600 mt-1">
          KaushalSetu tracks the difference between course completion and validated capability — the core differentiator from a traditional LMS.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs text-slate-500 font-medium">
              <th className="px-4 py-2.5 text-left">Course / Programme</th>
              <th className="px-4 py-2.5 text-left">Provider</th>
              <th className="px-4 py-2.5 text-center">Participants</th>
              <th className="px-4 py-2.5 text-center">Completion</th>
              <th className="px-4 py-2.5 text-center">Avg. Competency Gain</th>
              <th className="px-4 py-2.5 text-center">Capability Validated</th>
            </tr>
          </thead>
          <tbody>
            {COURSES.map((c, i) => {
              const gap = c.completion - c.validated;
              return (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 text-sm">
                  <td className="px-4 py-3 font-medium text-slate-800 max-w-xs">{c.name}</td>
                  <td className="px-4 py-3">
                    <Badge variant={c.provider === 'iGOT Karmayogi' ? 'navy' : c.provider === 'NSSTA' ? 'teal' : 'neutral'}>
                      {c.provider}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-center text-slate-700">{c.participants}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-1.5 bg-navy-700 rounded-full" style={{ width: `${c.completion}%` }} />
                      </div>
                      <span className="text-xs text-slate-700">{c.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-teal-600 font-semibold">+{c.compGain}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-center gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-1.5 rounded-full ${c.validated >= 80 ? 'bg-teal-500' : 'bg-amber-500'}`} style={{ width: `${c.validated}%` }} />
                        </div>
                        <span className="text-xs text-slate-700">{c.validated}%</span>
                      </div>
                      {gap > 10 && <span className="text-xs text-amber-600">Gap: {gap}pp</span>}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 p-4 bg-navy-50 border border-navy-100 rounded-md text-xs text-navy-800">
        <strong>Interpretation: </strong>
        "Completion" refers to course modules accessed and marked complete. "Capability Validated" measures officials who subsequently passed a practical assessment or demonstrated the skill in a work context. A large gap between these two metrics indicates training that is not translating to demonstrated capability.
      </div>
    </div>
  );
}
