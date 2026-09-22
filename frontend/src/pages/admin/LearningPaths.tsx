import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import ProgressBar from '../../components/ui/ProgressBar';

interface Stage {
  step: number;
  title: string;
  courses: string[];
}

interface LearningPath {
  id: string;
  title: string;
  targetRole: string;
  stages: Stage[];
  totalOfficials: number;
  completionRate: number;
  avgDuration: number;
}

const PATHS: LearningPath[] = [
  {
    id: 'lp1',
    title: 'Statistical Officer Foundation',
    targetRole: 'Statistical Officer',
    stages: [
      { step: 1, title: 'Core Statistical Theory', courses: ['Sampling Theory for Statistical Surveys', 'Data Collection Methods Fundamentals', 'Statistical Quality Frameworks'] },
      { step: 2, title: 'Data Processing & Tools', courses: ['Python for Statistical Data Processing', 'R for Statistical Computing', 'Data Visualisation for Statistical Communication'] },
      { step: 3, title: 'Applied Practice', courses: ['Survey Management & Field Operations', 'Data Quality Management in Statistical Systems'] },
    ],
    totalOfficials: 278,
    completionRate: 61,
    avgDuration: 45,
  },
  {
    id: 'lp2',
    title: 'Data Analyst Path',
    targetRole: 'Senior Statistical Officer',
    stages: [
      { step: 1, title: 'Advanced Programming', courses: ['Python for Government Data Analysis', 'R for Statistical Computing', 'SQL Proficiency for Data Analysts'] },
      { step: 2, title: 'Modelling & Analysis', courses: ['Econometric Modelling Essentials', 'Time Series Analysis', 'Spatial Data & GIS Analytics'] },
      { step: 3, title: 'Communication & Reporting', courses: ['Data Visualisation for Statistical Communication', 'Policy Brief Writing for Statistical Officers'] },
    ],
    totalOfficials: 212,
    completionRate: 54,
    avgDuration: 60,
  },
  {
    id: 'lp3',
    title: 'Digital Governance Track',
    targetRole: 'Deputy Director (Statistics)',
    stages: [
      { step: 1, title: 'Digital Foundations', courses: ['Cloud Computing for Government Officials', 'Cybersecurity Awareness for Government Officials', 'Digital India Framework Overview'] },
      { step: 2, title: 'Data Governance', courses: ['Open Data Standards & Policy', 'Data Architecture for NSOs', 'AI/ML Applications in Government'] },
      { step: 3, title: 'Leadership in Digital Transformation', courses: ['Change Management in Digital Governance', 'Stakeholder Engagement for Technology Projects'] },
    ],
    totalOfficials: 156,
    completionRate: 72,
    avgDuration: 35,
  },
  {
    id: 'lp4',
    title: 'AI/ML for Statistics',
    targetRole: 'Data Informatics Specialist',
    stages: [
      { step: 1, title: 'Programming Foundations', courses: ['Python for Statistical Data Processing', 'R for Statistical Computing'] },
      { step: 2, title: 'Machine Learning Basics', courses: ['Introduction to Machine Learning for NSOs', 'Natural Language Processing for Survey Analysis'] },
      { step: 3, title: 'Applied AI Projects', courses: ['AI/ML Readiness Assessment Practicum', 'Responsible AI in Government Statistics'] },
    ],
    totalOfficials: 98,
    completionRate: 43,
    avgDuration: 75,
  },
  {
    id: 'lp5',
    title: 'Survey Operations Path',
    targetRole: 'Junior Statistical Officer',
    stages: [
      { step: 1, title: 'Survey Design', courses: ['Sampling Theory for Statistical Surveys', 'Questionnaire Design Fundamentals', 'GIS Fundamentals for Statistical Officers'] },
      { step: 2, title: 'Field Operations', courses: ['Field Survey Operations and Supervision', 'CAPI/CATI Data Collection Methods'] },
      { step: 3, title: 'Data Processing', courses: ['Data Quality Management in Statistical Systems', 'PLFS Data Processing Workshop'] },
    ],
    totalOfficials: 148,
    completionRate: 68,
    avgDuration: 30,
  },
];

export default function LearningPaths() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Learning Path Management"
        subtitle="Define and manage structured learning journeys mapped to roles and competency targets"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Learning Paths' }]}
        actions={
          <button className="bg-navy-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-navy-800 transition-colors">
            + Create Path
          </button>
        }
      />

      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard label="Total Learning Paths" value={5} accent="navy" icon="🛤" />
        <StatCard label="Officials on a Path" value={892} accent="teal" icon="👥" delta="↑ 67 this month" deltaPositive />
      </div>

      <div className="flex flex-col gap-3">
        {PATHS.map((path) => {
          const isExpanded = expandedId === path.id;
          return (
            <div key={path.id} className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
              <button
                className="w-full text-left p-5"
                onClick={() => setExpandedId(isExpanded ? null : path.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-navy-900 text-base">{path.title}</h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">
                      Target: <span className="text-navy-800 font-medium">{path.targetRole}</span>
                      &nbsp;· {path.stages.length} stages · ~{path.avgDuration} days avg
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 mb-1">
                          <span>Completion Rate</span>
                          <span className={path.completionRate >= 70 ? 'text-teal-600 font-semibold' : 'text-amber-600 font-semibold'}>
                            {path.completionRate}%
                          </span>
                        </div>
                        <ProgressBar value={path.completionRate} showValue={false} size="sm" />
                      </div>
                      <div className="text-sm">
                        <span className="text-slate-500">Officials enrolled: </span>
                        <span className="font-semibold text-navy-900">{path.totalOfficials}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-slate-400 text-lg">{isExpanded ? '▲' : '▼'}</span>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs px-3 py-1.5 border border-teal-200 text-teal-600 hover:bg-teal-50 rounded-md font-medium transition-colors"
                    >
                      Assign to Department
                    </button>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-slate-100 px-5 pb-5">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mt-4 mb-3">Stage Pipeline</p>
                  <div className="flex flex-col gap-0">
                    {path.stages.map((stage, idx) => (
                      <div key={stage.step} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-7 h-7 rounded-full bg-navy-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {stage.step}
                          </div>
                          {idx < path.stages.length - 1 && (
                            <div className="w-0.5 bg-slate-200 flex-1 min-h-[24px] my-1" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="font-semibold text-navy-900 text-sm mb-1.5">{stage.title}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {stage.courses.map((course) => (
                              <span
                                key={course}
                                className="inline-flex items-center px-2.5 py-1 rounded-md text-xs bg-slate-50 text-slate-700 border border-slate-200"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
