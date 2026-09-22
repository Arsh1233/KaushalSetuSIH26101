import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';

interface RequiredCompetency {
  name: string;
  requiredLevel: number;
}

interface Role {
  id: string;
  title: string;
  level: 'Entry' | 'Junior' | 'Senior' | 'Lead' | 'Head';
  totalOfficials: number;
  avgReadiness: number;
  requiredCompetencies: RequiredCompetency[];
}

const ROLES: Role[] = [
  {
    id: 'r1',
    title: 'Junior Statistical Officer',
    level: 'Entry',
    totalOfficials: 312,
    avgReadiness: 58,
    requiredCompetencies: [
      { name: 'Statistical Theory', requiredLevel: 2 },
      { name: 'Data Collection Methods', requiredLevel: 2 },
      { name: 'Python / R Programming', requiredLevel: 1 },
      { name: 'Report Writing', requiredLevel: 2 },
      { name: 'Sampling Techniques', requiredLevel: 2 },
    ],
  },
  {
    id: 'r2',
    title: 'Statistical Officer',
    level: 'Junior',
    totalOfficials: 278,
    avgReadiness: 67,
    requiredCompetencies: [
      { name: 'Statistical Theory', requiredLevel: 3 },
      { name: 'Python / R Programming', requiredLevel: 2 },
      { name: 'Data Visualisation', requiredLevel: 2 },
      { name: 'Sampling Techniques', requiredLevel: 3 },
      { name: 'Survey Management', requiredLevel: 2 },
      { name: 'Data Quality Management', requiredLevel: 2 },
    ],
  },
  {
    id: 'r3',
    title: 'Senior Statistical Officer',
    level: 'Senior',
    totalOfficials: 224,
    avgReadiness: 74,
    requiredCompetencies: [
      { name: 'Statistical Theory', requiredLevel: 4 },
      { name: 'Python / R Programming', requiredLevel: 3 },
      { name: 'Data Visualisation', requiredLevel: 3 },
      { name: 'Econometric Modelling', requiredLevel: 2 },
      { name: 'National Accounts', requiredLevel: 2 },
      { name: 'Data Quality Management', requiredLevel: 3 },
      { name: 'Leadership & Mentoring', requiredLevel: 2 },
    ],
  },
  {
    id: 'r4',
    title: 'Deputy Director (Statistics)',
    level: 'Lead',
    totalOfficials: 187,
    avgReadiness: 81,
    requiredCompetencies: [
      { name: 'Statistical Theory', requiredLevel: 4 },
      { name: 'Econometric Modelling', requiredLevel: 3 },
      { name: 'National Accounts', requiredLevel: 3 },
      { name: 'Policy Analysis', requiredLevel: 3 },
      { name: 'Leadership & Mentoring', requiredLevel: 3 },
      { name: 'Project Management', requiredLevel: 3 },
      { name: 'Digital Governance', requiredLevel: 2 },
    ],
  },
  {
    id: 'r5',
    title: 'Director (Statistics)',
    level: 'Lead',
    totalOfficials: 143,
    avgReadiness: 86,
    requiredCompetencies: [
      { name: 'Statistical Theory', requiredLevel: 5 },
      { name: 'Econometric Modelling', requiredLevel: 4 },
      { name: 'National Accounts', requiredLevel: 4 },
      { name: 'Policy Analysis', requiredLevel: 4 },
      { name: 'Leadership & Mentoring', requiredLevel: 4 },
      { name: 'Stakeholder Management', requiredLevel: 4 },
      { name: 'International Standards (SNA/ILO)', requiredLevel: 3 },
    ],
  },
  {
    id: 'r6',
    title: 'Deputy Director General',
    level: 'Head',
    totalOfficials: 96,
    avgReadiness: 89,
    requiredCompetencies: [
      { name: 'Statistical Theory', requiredLevel: 5 },
      { name: 'National Accounts', requiredLevel: 5 },
      { name: 'Policy Analysis', requiredLevel: 5 },
      { name: 'Leadership & Mentoring', requiredLevel: 5 },
      { name: 'Stakeholder Management', requiredLevel: 5 },
      { name: 'International Standards (SNA/ILO)', requiredLevel: 4 },
      { name: 'Strategic Planning', requiredLevel: 5 },
      { name: 'Digital Governance', requiredLevel: 3 },
    ],
  },
];

const LEVEL_COLORS: Record<string, string> = {
  Entry: 'MEDIUM',
  Junior: 'LOW',
  Senior: 'teal',
  Lead: 'HIGH',
  Head: 'CRITICAL',
};

export default function RolesDesignations() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('r1');
  const selectedRole = ROLES.find((r) => r.id === selectedRoleId) ?? ROLES[0];
  const meetingThreshold = ROLES.filter((r) => r.avgReadiness >= 70).length;

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Roles & Designations"
        subtitle="Define competency requirements by role and track workforce readiness against thresholds"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Roles & Designations' }]}
        actions={
          <button className="bg-navy-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-navy-800 transition-colors">
            + Add Role
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Roles" value={6} accent="navy" icon="🎯" />
        <StatCard label="Officials Mapped" value={1240} accent="teal" icon="👥" />
        <StatCard label="Roles Meeting Threshold" value={`${meetingThreshold} / 6`} accent="amber" icon="✓" />
      </div>

      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 flex flex-col gap-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-1">Select a Role</p>
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRoleId(role.id)}
              className={`w-full text-left rounded-md border p-3 transition-all ${
                selectedRoleId === role.id
                  ? 'border-teal-500 bg-teal-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-medium text-navy-900 text-sm leading-snug">{role.title}</span>
                <Badge variant={LEVEL_COLORS[role.level] as any}>{role.level}</Badge>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                <span>{role.totalOfficials} officials</span>
                <span className={role.avgReadiness >= 70 ? 'text-teal-600 font-semibold' : 'text-amber-600 font-semibold'}>
                  {role.avgReadiness}% ready
                </span>
              </div>
              <ProgressBar value={role.avgReadiness} showValue={false} size="sm" />
            </button>
          ))}
        </div>

        <div className="col-span-3">
          <div className="bg-white border border-slate-200 rounded-md shadow-sm h-full">
            <div className="p-5 border-b border-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-navy-900 text-lg">{selectedRole.title}</h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {selectedRole.totalOfficials} officials · Avg readiness {selectedRole.avgReadiness}%
                  </p>
                </div>
                <Badge variant={LEVEL_COLORS[selectedRole.level] as any}>{selectedRole.level}</Badge>
              </div>
              <div className="mt-3">
                <ProgressBar value={selectedRole.avgReadiness} label="Workforce Readiness" />
              </div>
            </div>

            <div className="p-5">
              <h3 className="text-sm font-semibold text-navy-900 mb-3">Required Competencies</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide pb-2">Competency</th>
                    <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide pb-2">Required Level</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRole.requiredCompetencies.map((comp) => (
                    <tr key={comp.name} className="border-b border-slate-50 last:border-0">
                      <td className="py-2.5 pr-4 font-medium text-navy-800">{comp.name}</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((pip) => (
                            <span
                              key={pip}
                              className={`inline-block w-5 h-5 rounded-full border text-xs font-bold flex items-center justify-center ${
                                pip <= comp.requiredLevel
                                  ? 'bg-navy-800 border-navy-800 text-white'
                                  : 'bg-slate-100 border-slate-200 text-slate-400'
                              }`}
                            >
                              {pip}
                            </span>
                          ))}
                          <span className="ml-2 text-xs text-slate-500">Level {comp.requiredLevel}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
