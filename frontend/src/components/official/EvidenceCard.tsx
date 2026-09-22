import Badge from '../ui/Badge';
import type { EvidenceRecord } from '../../data/types';
import { getCompetencyById } from '../../data/competencies';

interface EvidenceCardProps {
  evidence: EvidenceRecord;
}

const typeIcon: Record<string, string> = {
  'Assessment': '✏',
  'Practical Task': '⚙',
  'Course': '📚',
  'Project': '📋',
  'Supervisor Validation': '✓',
};

function daysAgo(dateStr: string) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 30) return `${diff} days ago`;
  if (diff < 60) return '1 month ago';
  return `${Math.floor(diff / 30)} months ago`;
}

export default function EvidenceCard({ evidence }: EvidenceCardProps) {
  const comp = getCompetencyById(evidence.competencyId);
  const icon = typeIcon[evidence.type] ?? '📄';

  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-9 h-9 bg-navy-100 rounded-md flex items-center justify-center text-navy-800 text-sm shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-slate-800 leading-tight">{evidence.title}</p>
            <p className="text-xs text-slate-500 mt-0.5">{comp?.name} · {evidence.source}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {evidence.verified && <Badge variant="verified">✓ Verified</Badge>}
            <span className="text-xs text-slate-500">{daysAgo(evidence.date)}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-1.5 text-xs">
          <Badge variant="neutral">{evidence.type}</Badge>
          <span className="text-slate-500">Score: <strong className="text-slate-700">{evidence.score}%</strong></span>
        </div>
      </div>
    </div>
  );
}
