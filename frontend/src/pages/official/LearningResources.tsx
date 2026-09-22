import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';

type ResourceType = 'PDF' | 'PPT' | 'Video' | 'Article' | 'Manual';

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  topic: string;
  competency: string;
  difficulty: string;
  language: string;
  size: string;
  uploadedBy: string;
  date: string;
}

const resources: Resource[] = [
  { id: 'r1', title: 'National Accounts Statistics — Concepts and Definitions', type: 'PDF', topic: 'National Accounts', competency: 'National Accounts', difficulty: 'Intermediate', language: 'English', size: '4.2 MB', uploadedBy: 'CSO, MoSPI', date: '2024-01-10' },
  { id: 'r2', title: 'Sampling Theory and Practice for Household Surveys', type: 'Manual', topic: 'Sampling', competency: 'Sampling Methods', difficulty: 'Advanced', language: 'English', size: '8.7 MB', uploadedBy: 'NSSTA', date: '2023-11-20' },
  { id: 'r3', title: 'Introduction to Python for Data Analysis', type: 'Video', topic: 'Python', competency: 'Python for Statistical Analysis', difficulty: 'Beginner', language: 'English', size: '42 min', uploadedBy: 'iGOT Karmayogi', date: '2024-02-05' },
  { id: 'r4', title: 'Data Visualisation Best Practices for Policy Communication', type: 'PDF', topic: 'Data Visualization', competency: 'Data Visualisation', difficulty: 'Intermediate', language: 'English', size: '2.1 MB', uploadedBy: 'MoSPI Training Cell', date: '2024-03-14' },
  { id: 'r5', title: 'Cybersecurity Fundamentals for Government Officials', type: 'PPT', topic: 'Cybersecurity', competency: 'Cybersecurity Fundamentals', difficulty: 'Beginner', language: 'Hindi', size: '3.6 MB', uploadedBy: 'NIC', date: '2024-01-28' },
  { id: 'r6', title: 'SDG Indicators — India Country Report Methodology', type: 'PDF', topic: 'SDG Indicators', competency: 'National Accounts', difficulty: 'Intermediate', language: 'English', size: '5.9 MB', uploadedBy: 'MoSPI', date: '2023-12-15' },
  { id: 'r7', title: 'Advanced R Programming for Statistical Modelling', type: 'Video', topic: 'R Language', competency: 'R Statistical Computing', difficulty: 'Advanced', language: 'English', size: '68 min', uploadedBy: 'NSSTA', date: '2024-02-22' },
  { id: 'r8', title: 'Periodic Labour Force Survey — Field Manual', type: 'Manual', topic: 'Labour Statistics', competency: 'Labour Statistics', difficulty: 'Intermediate', language: 'English/Hindi', size: '12.3 MB', uploadedBy: 'MoSPI', date: '2023-10-05' },
  { id: 'r9', title: 'Data Privacy and Protection — Legal Framework Overview', type: 'Article', topic: 'Data Privacy', competency: 'Data Privacy & Ethics', difficulty: 'Beginner', language: 'English', size: '15 min read', uploadedBy: 'MeitY', date: '2024-03-01' },
  { id: 'r10', title: 'SQL for Government Database Management', type: 'Video', topic: 'SQL & Databases', competency: 'SQL & Database Management', difficulty: 'Intermediate', language: 'English', size: '55 min', uploadedBy: 'iGOT Karmayogi', date: '2024-01-18' },
  { id: 'r11', title: 'GIS Applications in Census and Survey Mapping', type: 'PPT', topic: 'GIS & Spatial Analysis', competency: 'GIS & Spatial Analysis', difficulty: 'Intermediate', language: 'English', size: '6.4 MB', uploadedBy: 'NSSTA', date: '2024-02-08' },
  { id: 'r12', title: 'Effective Statistical Communication for Policy Makers', type: 'Article', topic: 'Communication', competency: 'Communication & Presentation', difficulty: 'Beginner', language: 'English', size: '10 min read', uploadedBy: 'MoSPI Training Cell', date: '2024-03-20' },
  { id: 'r13', title: 'Cloud Computing for Government Data Platforms', type: 'PDF', topic: 'Cloud Computing', competency: 'Cloud Computing', difficulty: 'Intermediate', language: 'English', size: '3.3 MB', uploadedBy: 'NIC', date: '2024-02-14' },
  { id: 'r14', title: 'Data Quality Assurance in Large-Scale Surveys', type: 'Manual', topic: 'Data Quality', competency: 'Data Quality & Validation', difficulty: 'Advanced', language: 'English', size: '9.1 MB', uploadedBy: 'NSSTA', date: '2023-09-30' },
];

const typeIcon: Record<ResourceType, string> = {
  PDF: '📄',
  PPT: '📊',
  Video: '🎬',
  Article: '📰',
  Manual: '📚',
};

const typeVariant: Record<ResourceType, string> = {
  PDF: 'navy',
  PPT: 'teal',
  Video: 'verified',
  Article: 'neutral',
  Manual: 'MEDIUM',
};

const allTopics = Array.from(new Set(resources.map(r => r.topic)));
const allTypes: Array<'all' | ResourceType> = ['all', 'PDF', 'PPT', 'Video', 'Article', 'Manual'];

export default function LearningResources() {
  const [typeFilter, setTypeFilter] = useState<'all' | ResourceType>('all');
  const [topicFilter, setTopicFilter] = useState('all');

  const pdfCount = resources.filter(r => r.type === 'PDF').length;
  const videoCount = resources.filter(r => r.type === 'Video').length;

  const filtered = resources.filter(r => {
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    const matchesTopic = topicFilter === 'all' || r.topic === topicFilter;
    return matchesType && matchesTopic;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Learning Resources Library"
        subtitle="Reference materials, manuals and multimedia resources for skill development"
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Resources' }]}
      />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Resources" value={resources.length} />
        <StatCard label="PDFs & Manuals" value={pdfCount + resources.filter(r => r.type === 'Manual').length} />
        <StatCard label="Videos" value={videoCount} />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex gap-2 flex-wrap">
          {allTypes.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                typeFilter === t
                  ? 'bg-navy-900 text-white border-navy-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-navy-700'
              }`}
            >
              {t === 'all' ? 'All Types' : t}
            </button>
          ))}
        </div>
        <select
          value={topicFilter}
          onChange={e => setTopicFilter(e.target.value)}
          className="ml-auto px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="all">All Topics</option>
          {allTopics.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="text-center py-10 text-slate-500 text-sm">No resources match your filters.</div>
        )}
        {filtered.map(r => (
          <div
            key={r.id}
            className="bg-white rounded-xl border border-slate-200 px-4 py-3 flex items-center gap-4 hover:shadow-sm transition-shadow"
          >
            <div className="text-2xl w-8 text-center shrink-0">{typeIcon[r.type]}</div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-navy-900 truncate">{r.title}</div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-xs text-slate-500">{r.topic}</span>
                <Badge variant={typeVariant[r.type] as any}>{r.competency}</Badge>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">{r.uploadedBy} &middot; {r.date}</div>
            </div>

            <div className="text-right shrink-0 space-y-1">
              <div className="text-xs text-slate-500">{r.language}</div>
              <div className="text-xs font-medium text-slate-700">{r.size}</div>
              <button className="text-xs px-3 py-1 rounded-lg bg-teal-600 text-white hover:bg-teal-500 transition-colors">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
