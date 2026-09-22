import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';

interface User {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  designation: string;
  role: 'official' | 'admin';
  competencyScore: number;
  learningStatus: 'Active' | 'Inactive' | 'On Leave';
  accountStatus: 'Active' | 'Suspended';
}

const USERS: User[] = [
  { id: 'u1', name: 'Priya Sharma', employeeId: 'MOS-1042', department: 'National Accounts Division', designation: 'Statistical Officer', role: 'official', competencyScore: 78, learningStatus: 'Active', accountStatus: 'Active' },
  { id: 'u2', name: 'Rajesh Kumar Verma', employeeId: 'MOS-0834', department: 'Labour Statistics Division', designation: 'Senior Statistical Officer', role: 'official', competencyScore: 84, learningStatus: 'Active', accountStatus: 'Active' },
  { id: 'u3', name: 'Anita Patel', employeeId: 'MOS-1201', department: 'Price Statistics Division', designation: 'Deputy Director (Statistics)', role: 'official', competencyScore: 91, learningStatus: 'Active', accountStatus: 'Active' },
  { id: 'u4', name: 'Suresh Nair', employeeId: 'MOS-0671', department: 'Agricultural Statistics', designation: 'Junior Statistical Officer', role: 'official', competencyScore: 54, learningStatus: 'Inactive', accountStatus: 'Active' },
  { id: 'u5', name: 'Deepa Krishnamurthy', employeeId: 'MOS-0980', department: 'Data Informatics & Innovation Division', designation: 'Statistical Officer', role: 'official', competencyScore: 73, learningStatus: 'Active', accountStatus: 'Active' },
  { id: 'u6', name: 'Amit Saxena', employeeId: 'MOS-1155', department: 'SDG Monitoring Cell', designation: 'Senior Statistical Officer', role: 'admin', competencyScore: 88, learningStatus: 'Active', accountStatus: 'Active' },
  { id: 'u7', name: 'Kavitha Rajan', employeeId: 'MOS-0445', department: 'Survey Design & Research', designation: 'Director (Statistics)', role: 'official', competencyScore: 95, learningStatus: 'On Leave', accountStatus: 'Active' },
  { id: 'u8', name: 'Mohan Das Gupta', employeeId: 'MOS-0312', department: 'IT & Digital Infrastructure', designation: 'Statistical Officer', role: 'official', competencyScore: 61, learningStatus: 'Active', accountStatus: 'Active' },
  { id: 'u9', name: 'Sunita Agarwal', employeeId: 'MOS-1388', department: 'Labour Statistics Division', designation: 'Junior Statistical Officer', role: 'official', competencyScore: 47, learningStatus: 'Active', accountStatus: 'Suspended' },
  { id: 'u10', name: 'Vikram Singh Chauhan', employeeId: 'MOS-0756', department: 'National Accounts Division', designation: 'Senior Statistical Officer', role: 'official', competencyScore: 82, learningStatus: 'Active', accountStatus: 'Active' },
  { id: 'u11', name: 'Lalitha Menon', employeeId: 'MOS-1093', department: 'Price Statistics Division', designation: 'Statistical Officer', role: 'official', competencyScore: 69, learningStatus: 'Inactive', accountStatus: 'Active' },
  { id: 'u12', name: 'Arun Prakash Joshi', employeeId: 'MOS-0529', department: 'Agricultural Statistics', designation: 'Deputy Director (Statistics)', role: 'official', competencyScore: 77, learningStatus: 'Active', accountStatus: 'Active' },
];

function scoreColor(score: number): string {
  if (score >= 85) return 'text-teal-600 font-semibold';
  if (score >= 65) return 'text-navy-800 font-semibold';
  if (score >= 45) return 'text-amber-600 font-semibold';
  return 'text-red-600 font-semibold';
}

function learningBadgeVariant(status: string) {
  if (status === 'Active') return 'verified';
  if (status === 'On Leave') return 'MEDIUM';
  return 'neutral';
}

function accountBadgeVariant(status: string) {
  if (status === 'Active') return 'teal';
  return 'CRITICAL';
}

export default function Users() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended'>('All');

  const filtered = USERS.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.employeeId.toLowerCase().includes(search.toLowerCase()) ||
      u.department.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || u.accountStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="User Management"
        subtitle="Manage official accounts, roles, and learning status across the department"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users' }]}
        actions={
          <button className="bg-navy-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-navy-800 transition-colors">
            + Add User
          </button>
        }
      />

      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Officials" value={1240} accent="navy" icon="👥" />
        <StatCard label="Active Learners" value={1089} accent="teal" icon="📚" delta="↑ 42 this month" deltaPositive />
        <StatCard label="Avg Competency Score" value="68" unit="%" accent="amber" icon="📊" />
      </div>

      <div className="bg-white border border-slate-200 rounded-md shadow-sm">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name, employee ID, or department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="flex gap-2">
            {(['All', 'Active', 'Suspended'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-sm rounded-md border transition-colors ${
                  statusFilter === s
                    ? 'bg-navy-900 text-white border-navy-900'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Employee ID</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Department</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Designation</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Score</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Learning</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Account</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wide px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{u.employeeId}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-navy-900">{u.name}</div>
                    <div className="text-xs text-slate-400 capitalize">{u.role}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-[180px] truncate">{u.department}</td>
                  <td className="px-4 py-3 text-slate-600">{u.designation}</td>
                  <td className="px-4 py-3">
                    <span className={scoreColor(u.competencyScore)}>{u.competencyScore}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={learningBadgeVariant(u.learningStatus) as any}>{u.learningStatus}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={accountBadgeVariant(u.accountStatus) as any}>{u.accountStatus}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/admin/workforce/${u.id}`)}
                      className="text-teal-600 hover:text-teal-700 text-sm font-medium underline underline-offset-2"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 text-sm">
                    No users match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 text-xs text-slate-400">
          Showing {filtered.length} of {USERS.length} users (demo data)
        </div>
      </div>
    </div>
  );
}
