import type { EvidenceRecord } from './types';

export const evidenceRecords: EvidenceRecord[] = [
  // Ananya Sharma evidence
  { id: 'ev-001', officialId: 'ananya-sharma', competencyId: 'survey-design', type: 'Course', title: 'Survey Sampling and Design — NSSTA Certificate', date: '2024-03-15', score: 88, verified: true, source: 'NSSTA' },
  { id: 'ev-002', officialId: 'ananya-sharma', competencyId: 'survey-design', type: 'Project', title: 'HCES 2022-23 Questionnaire Review', date: '2024-01-20', score: 92, verified: true, source: 'Supervisor Validation' },
  { id: 'ev-003', officialId: 'ananya-sharma', competencyId: 'sampling', type: 'Assessment', title: 'Sampling Methods Diagnostic', date: '2024-04-02', score: 84, verified: true, source: 'KaushalSetu' },
  { id: 'ev-004', officialId: 'ananya-sharma', competencyId: 'r-lang', type: 'Course', title: 'R for Statistical Analysis — iGOT', date: '2024-02-10', score: 86, verified: true, source: 'iGOT Karmayogi' },
  { id: 'ev-005', officialId: 'ananya-sharma', competencyId: 'r-lang', type: 'Practical Task', title: 'PLFS Data Analysis Task', date: '2024-04-10', score: 89, verified: true, source: 'KaushalSetu' },
  { id: 'ev-006', officialId: 'ananya-sharma', competencyId: 'python', type: 'Course', title: 'Python Basics — iGOT Karmayogi', date: '2023-11-05', score: 72, verified: true, source: 'iGOT Karmayogi' },
  { id: 'ev-007', officialId: 'ananya-sharma', competencyId: 'python', type: 'Assessment', title: 'Python Diagnostic Assessment', date: '2024-04-15', score: 68, verified: true, source: 'KaushalSetu' },
  { id: 'ev-008', officialId: 'ananya-sharma', competencyId: 'python', type: 'Practical Task', title: 'CSV Data Cleaning Exercise', date: '2024-03-28', score: 75, verified: true, source: 'KaushalSetu' },
  { id: 'ev-009', officialId: 'ananya-sharma', competencyId: 'communication', type: 'Supervisor Validation', title: 'Quarterly Review Presentation — Supervisor Validated', date: '2024-04-01', score: 94, verified: true, source: 'Supervisor: Sh. V. Menon' },
  { id: 'ev-010', officialId: 'ananya-sharma', competencyId: 'leadership', type: 'Project', title: 'District Survey Coordination — Team Lead', date: '2024-02-15', score: 88, verified: true, source: 'Supervisor Validation' },
  { id: 'ev-011', officialId: 'ananya-sharma', competencyId: 'data-quality', type: 'Assessment', title: 'Data Quality Frameworks Assessment', date: '2024-03-10', score: 82, verified: true, source: 'KaushalSetu' },
  { id: 'ev-012', officialId: 'ananya-sharma', competencyId: 'data-privacy', type: 'Course', title: 'Data Privacy and Ethics — iGOT', date: '2024-01-08', score: 85, verified: true, source: 'iGOT Karmayogi' },
  // Other officials
  { id: 'ev-101', officialId: 'rajesh-kumar', competencyId: 'python', type: 'Course', title: 'Advanced Python for Data Analysis', date: '2024-03-20', score: 94, verified: true, source: 'iGOT Karmayogi' },
  { id: 'ev-102', officialId: 'rajesh-kumar', competencyId: 'sql', type: 'Practical Task', title: 'Database Optimisation Task', date: '2024-04-05', score: 96, verified: true, source: 'KaushalSetu' },
  { id: 'ev-201', officialId: 'priya-nair', competencyId: 'survey-design', type: 'Assessment', title: 'Survey Design Assessment', date: '2024-03-25', score: 87, verified: true, source: 'KaushalSetu' },
  { id: 'ev-301', officialId: 'arjun-mehta', competencyId: 'national-accounts', type: 'Supervisor Validation', title: 'GDP Estimation Methodology — Expert Review', date: '2024-04-08', score: 97, verified: true, source: 'Director, CSO' },
  { id: 'ev-401', officialId: 'kavita-singh', competencyId: 'labour-statistics', type: 'Course', title: 'PLFS Methodology Certification', date: '2024-03-01', score: 95, verified: true, source: 'NSSTA' },
  { id: 'ev-801', officialId: 'suresh-iyer', competencyId: 'leadership', type: 'Supervisor Validation', title: 'Annual Performance Review — Leadership', date: '2024-04-10', score: 97, verified: true, source: 'Additional DG, MoSPI' },
];

export const getEvidenceForOfficial = (officialId: string) =>
  evidenceRecords.filter(e => e.officialId === officialId);

export const getEvidenceForCompetency = (officialId: string, competencyId: string) =>
  evidenceRecords.filter(e => e.officialId === officialId && e.competencyId === competencyId);
