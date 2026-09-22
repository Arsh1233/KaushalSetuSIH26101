import { useNavigate } from 'react-router-dom';
import Badge from '../ui/Badge';
import type { Course } from '../../data/types';

interface RecommendationCardProps {
  course: Course;
}

const providerBadge: Record<string, 'navy' | 'teal' | 'neutral'> = {
  'iGOT Karmayogi': 'navy',
  'NSSTA': 'teal',
  'Department': 'neutral',
};

export default function RecommendationCard({ course }: RecommendationCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <Badge variant={providerBadge[course.provider] ?? 'neutral'}>{course.provider}</Badge>
        <span className="text-xs text-slate-500">{course.durationMinutes} min</span>
      </div>

      <h3 className="font-semibold text-slate-800 text-sm mb-1 leading-tight">{course.title}</h3>
      <p className="text-xs text-slate-500 mb-3">Difficulty: {course.difficulty} · Expected gain: {course.expectedGain}</p>

      <div className="bg-navy-50 border border-navy-100 rounded p-2.5 mb-3">
        <p className="text-xs text-navy-800 leading-relaxed">
          <span className="font-semibold">Why recommended: </span>
          {course.whyRecommended}
        </p>
      </div>

      <button
        onClick={() => navigate(`/app/learning/${course.id}`)}
        className="w-full py-1.5 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
      >
        Start Learning
      </button>
    </div>
  );
}
