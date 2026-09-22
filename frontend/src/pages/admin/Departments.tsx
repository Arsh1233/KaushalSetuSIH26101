import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';

interface Department {
  id: string;
  name: string;
  head: string;
  totalOfficials: number;
  activeLearners: number;
  avgCompetencyScore: number;
  mandatoryPrograms: number;
  divisions: string[];
}

const DEPARTMENTS: Department[] = [
  {
    id: 'd1',
    name: 'National Accounts Division',
    head: 'Dr. Ramesh Chandra Sharma',
    totalOfficials: 198,
    activeLearners: 172,
    avgCompetencyScore: 81,
    mandatoryPrograms: 4,
    divisions: ['GDP Estimation', 'Input-Output Tables', 'Sector Accounts', 'Capital Formation'],
  },
  {
    id: 'd2',
    name: 'Labour Statistics Division',
    head: 'Ms. Kavitha Rajan',
    totalOfficials: 164,
    activeLearners: 141,
    avgCompetencyScore: 74,
    mandatoryPrograms: 3,
    divisions: ['PLFS Operations', 'Employment Analytics', 'Wage Statistics', 'EUS Coordination'],
  },
  {
    id: 'd3',
    name: 'Price Statistics Division',
    head: 'Mr. Sunil Mehta',
    totalOfficials: 142,
    activeLearners: 128,
    avgCompetencyScore: 88,
    mandatoryPrograms: 4,
    divisions: ['CPI Urban', 'CPI Rural', 'WPI Monitoring', 'Inflation Analysis'],
  },
  {
    id: 'd4',
    name: 'Agricultural Statistics',
    head: 'Dr. Anand Kumar Gupta',
    totalOfficials: 187,
    activeLearners: 143,
    avgCompetencyScore: 61,
    mandatoryPrograms: 3,
    divisions: ['Crop Estimation', 'Land Use Statistics', 'Livestock Census', 'Area Enumeration'],
  },
  {
    id: 'd5',
    name: 'Data Informatics & Innovation Division',
    head: 'Ms. Deepa Krishnamurthy',
    totalOfficials: 121,
    activeLearners: 118,
    avgCompetencyScore: 79,
    mandatoryPrograms: 5,
    divisions: ['Data Architecture', 'AI/ML Applications', 'Open Data Portal', 'Geospatial Analytics'],
  },
  {
    id: 'd6',
    name: 'SDG Monitoring Cell',
    head: 'Mr. Vikram Bhatia',
    totalOfficials: 88,
    activeLearners: 82,
    avgCompetencyScore: 83,
    mandatoryPrograms: 3,
    divisions: ['Indicator Tracking', 'VNR Coordination', 'State Liaison', 'Metadata Management'],
  },
  {
    id: 'd7',
    name: 'Survey Design & Research',
    head: 'Dr. Pradeep Nayak',
    totalOfficials: 176,
    activeLearners: 152,
    avgCompetencyScore: 72,
    mandatoryPrograms: 4,
    divisions: ['Sample Frame', 'Questionnaire Design', 'Field Operations', 'Quality Assurance'],
  },
  {
    id: 'd8',
    name: 'IT & Digital Infrastructure',
    head: 'Mr. Arun Prakash Joshi',
    totalOfficials: 164,
    activeLearners: 153,
    avgCompetencyScore: 76,
    mandatoryPrograms: 3,
    divisions: ['Network Operations', 'Application Support', 'Cybersecurity', 'Data Centre Management'],
  },
];

function scoreColorClass(score: number): string {
  if (score >= 85) return 'text-teal-600';
  if (score >= 70) return 'text-navy-800';
  if (score >= 55) return 'text-amber-600';
  return 'text-red-600';
}

function scoreBgClass(score: number): string {
  if (score >= 85) return 'bg-teal-50 border-teal-200';
  if (score >= 70) return 'bg-navy-50 border-navy-200';
  if (score >= 55) return 'bg-amber-50 border-amber-200';
  return 'bg-red-50 border-red-200';
}

export default function Departments() {
  const meetingTarget = DEPARTMENTS.filter((d) => d.avgCompetencyScore >= 70).length;

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Department Management"
        subtitle="Overview of all MoSPI departments, their capability scores, and learning engagement"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Departments' }]}
        actions={
          <button className="bg-navy-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-navy-800 transition-colors">
            + Add Department
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Departments" value={8} accent="navy" icon="🏛" />
        <StatCard label="Total Officials" value={1240} accent="teal" icon="👥" />
        <StatCard label="Departments Meeting Target" value={`${meetingTarget} / 8`} accent="amber" icon="✓" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEPARTMENTS.map((dept) => (
          <div key={dept.id} className="bg-white border border-slate-200 rounded-md p-5 shadow-sm flex flex-col gap-3">
            <div>
              <h3 className="font-semibold text-navy-900 text-base leading-snug">{dept.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Head: {dept.head}</p>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-50 rounded-md p-2">
                <div className="text-lg font-bold text-navy-900">{dept.totalOfficials}</div>
                <div className="text-xs text-slate-500">Officials</div>
              </div>
              <div className="bg-slate-50 rounded-md p-2">
                <div className="text-lg font-bold text-teal-600">{dept.activeLearners}</div>
                <div className="text-xs text-slate-500">Active Learners</div>
              </div>
              <div className={`rounded-md p-2 border ${scoreBgClass(dept.avgCompetencyScore)}`}>
                <div className={`text-lg font-bold ${scoreColorClass(dept.avgCompetencyScore)}`}>{dept.avgCompetencyScore}%</div>
                <div className="text-xs text-slate-500">Avg Score</div>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-500 mb-1.5">
                Divisions ({dept.divisions.length}) · {dept.mandatoryPrograms} mandatory programmes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {dept.divisions.map((div) => (
                  <span
                    key={div}
                    className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-600 border border-slate-200"
                  >
                    {div}
                  </span>
                ))}
              </div>
            </div>

            <button className="mt-1 w-full text-sm text-teal-600 hover:text-teal-700 font-medium border border-teal-200 hover:border-teal-300 rounded-md py-2 transition-colors bg-teal-50 hover:bg-teal-100">
              View Department →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
