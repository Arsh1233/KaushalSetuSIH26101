export { officials } from './officials';
export { competencies, getCompetencyById } from './competencies';
export { courses, getCourseById } from './courses';
export { assessmentQuestions, getQuestionsForCompetency, getMCQs, getScenarios } from './assessments';
export { evidenceRecords, getEvidenceForOfficial, getEvidenceForCompetency } from './evidence';

import { officials } from './officials';
import { courses } from './courses';
import type { GapSeverity } from './types';

export const getOfficialById = (id: string) => officials.find(o => o.id === id);

export const getGapsFor = (officialId: string, severity?: GapSeverity) => {
  const official = getOfficialById(officialId);
  if (!official) return [];
  return severity ? official.gaps.filter(g => g.severity === severity) : official.gaps;
};

export const getCompetencyScoreFor = (officialId: string, competencyId: string) => {
  const official = getOfficialById(officialId);
  return official?.competencyScores.find(s => s.competencyId === competencyId);
};

export const getLearningPathFor = (officialId: string) => {
  const official = getOfficialById(officialId);
  if (!official) return [];
  const courseIds = official.gaps
    .sort((a, b) => {
      const order: Record<GapSeverity, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
      return order[a.severity] - order[b.severity];
    })
    .flatMap(g => g.recommendedCourseIds);
  const seen = new Set<string>();
  return courseIds
    .filter(id => { if (seen.has(id)) return false; seen.add(id); return true; })
    .map(id => courses.find(c => c.id === id))
    .filter(Boolean);
};

export const getTopGaps = (officialId: string, limit = 3) => {
  const all = getGapsFor(officialId);
  const order: Record<GapSeverity, number> = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
  return [...all].sort((a, b) => order[a.severity] - order[b.severity]).slice(0, limit);
};
