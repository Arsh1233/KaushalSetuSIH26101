export type GapSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type CompetencyCategory = 'Statistical' | 'Technical' | 'Digital Governance' | 'Behavioural';
export type EvidenceType = 'Assessment' | 'Practical Task' | 'Course' | 'Project' | 'Supervisor Validation';
export type Provider = 'iGOT Karmayogi' | 'NSSTA' | 'Department';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface CompetencyDefinition {
  id: string;
  name: string;
  category: CompetencyCategory;
  description: string;
}

export interface CompetencyScore {
  competencyId: string;
  current: number;
  required: number;
  confidence: number;
  evidenceCount: number;
  freshnessMonths: number;
}

export interface GapRecord {
  competencyId: string;
  severity: GapSeverity;
  delta: number;
  roleImpact: 'High' | 'Medium' | 'Low';
  estimatedMinutes: number;
  recommendedCourseIds: string[];
}

export interface EvidenceRecord {
  id: string;
  officialId: string;
  competencyId: string;
  type: EvidenceType;
  title: string;
  date: string;
  score: number;
  verified: boolean;
  source: string;
}

export interface Official {
  id: string;
  name: string;
  role: string;
  department: string;
  experienceYears: number;
  roleReadiness: number;
  competencyConfidence: number;
  learningProgress: number;
  criticalGaps: number;
  learningHoursSaved: number;
  competencyScores: CompetencyScore[];
  gaps: GapRecord[];
}

export interface CourseModule {
  title: string;
  durationMin: number;
}

export interface Course {
  id: string;
  title: string;
  provider: Provider;
  durationMinutes: number;
  difficulty: Difficulty;
  competencyId: string;
  expectedGain: string;
  whyRecommended: string;
  modules: CourseModule[];
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  competencyId: string;
  type: 'mcq' | 'scenario';
  text: string;
  options?: string[];
  correctIndex?: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sourcePage?: string;
  aiConfidence?: number;
}

export interface LearningStep {
  title: string;
  type: 'module' | 'practice' | 'task' | 'validation';
  durationMin: number;
  description: string;
  courseId?: string;
}
