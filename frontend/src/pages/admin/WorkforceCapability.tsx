import { useState, useMemo, type ReactNode } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import OfficialRow from '../../components/admin/OfficialRow';
import { officials } from '../../data/officials';

type SortKey = 'name' | 'readiness' | 'confidence' | 'gaps';

export default function WorkforceCapability() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [sortKey, setSortKey] = useState<SortKey>('readiness');
  const [sortAsc, setSortAsc] = useState(false);

  const roles = ['All', ...Array.from(new Set(officials.map(o => o.role)))];

  const filtered = useMemo(() => {
    let list = officials.filter(o => {
      const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.role.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'All' || o.role === roleFilter;
      return matchSearch && matchRole;
    });
    list = [...list].sort((a, b) => {
      let va: number | string = 0, vb: number | string = 0;
      if (sortKey === 'readiness') { va = a.roleReadiness; vb = b.roleReadiness; }
      else if (sortKey === 'confidence') { va = a.competencyConfidence; vb = b.competencyConfidence; }
      else if (sortKey === 'gaps') { va = a.criticalGaps; vb = b.criticalGaps; }
      else if (sortKey === 'name') { va = a.name; vb = b.name; }
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
    return list;
  }, [search, roleFilter, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  }

  const SortBtn = ({ k, children }: { k: SortKey; children: ReactNode }) => (
    <button onClick={() => toggleSort(k)} className="flex items-center gap-1 hover:text-navy-900 transition-colors">
      {children}
      <span className="text-xs">{sortKey === k ? (sortAsc ? '↑' : '↓') : '↕'}</span>
    </button>
  );

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Workforce Capability"
        subtitle="Competency profiles for all officials in the Department of Official Statistics"
      />

      {/* Insights */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-center">
          <p className="text-lg font-bold text-amber-700">3</p>
          <p className="text-xs text-amber-600">Officials At Risk (readiness &lt;70%)</p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-md p-3 text-center">
          <p className="text-lg font-bold text-teal-700">4</p>
          <p className="text-xs text-teal-600">Officials On Track (readiness ≥85%)</p>
        </div>
        <div className="bg-navy-50 border border-navy-100 rounded-md p-3 text-center">
          <p className="text-lg font-bold text-navy-900">3</p>
          <p className="text-xs text-navy-700">Developing (70–85%)</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <input
          type="search"
          placeholder="Search by name or role..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600 w-56"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600"
        >
          {roles.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} of {officials.length} officials</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-xs text-slate-500 font-medium">
              <th className="px-4 py-2.5 text-left">
                <SortBtn k="name">Official / Role</SortBtn>
              </th>
              <th className="px-4 py-2.5 text-left">
                <SortBtn k="readiness">Role Readiness</SortBtn>
              </th>
              <th className="px-4 py-2.5 text-left">Top Gap</th>
              <th className="px-4 py-2.5 text-left">
                <SortBtn k="confidence">Confidence</SortBtn>
              </th>
              <th className="px-4 py-2.5 text-left">Learning</th>
              <th className="px-4 py-2.5 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => <OfficialRow key={o.id} official={o} />)}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400 text-sm">No officials match your search.</div>
        )}
      </div>
    </div>
  );
}
