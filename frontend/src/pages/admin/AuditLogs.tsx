import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";

type Severity = "info" | "warning" | "critical";
type EntityType = "Competency" | "User" | "Assessment" | "Course" | "Integration" | "Role";

interface AuditEntry {
  id: string;
  timestamp: string;
  adminId: string;
  adminName: string;
  action: string;
  entityType: EntityType;
  entityName: string;
  details: string;
  severity: Severity;
}

const auditData: AuditEntry[] = [
  {
    id: "LOG-001",
    timestamp: "10 Sep 2026 — 14:32",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Updated competency requirement",
    entityType: "Competency",
    entityName: "Python Programming",
    details: "Required level changed from Level 3 → Level 4 for Data Analyst roles",
    severity: "warning",
  },
  {
    id: "LOG-002",
    timestamp: "10 Sep 2026 — 11:15",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Assigned mandatory training",
    entityType: "Course",
    entityName: "Cybersecurity Fundamentals",
    details: "Assigned as mandatory to 240 users across IT and Administrative roles",
    severity: "warning",
  },
  {
    id: "LOG-003",
    timestamp: "10 Sep 2026 — 09:47",
    adminId: "Admin002",
    adminName: "Rajan Nair",
    action: "Created user account",
    entityType: "User",
    entityName: "Rohan Mehta",
    details: "New user account created for Rohan Mehta — National Accounts Division, Analyst role",
    severity: "info",
  },
  {
    id: "LOG-004",
    timestamp: "9 Sep 2026 — 16:20",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Published assessment",
    entityType: "Assessment",
    entityName: "Sampling Methods — Module 3",
    details: "Assessment published and made available to 312 eligible officials",
    severity: "info",
  },
  {
    id: "LOG-005",
    timestamp: "10 Sep 2026 — 02:08",
    adminId: "System",
    adminName: "System",
    action: "Integration sync completed",
    entityType: "Integration",
    entityName: "iGOT Karmayogi",
    details: "Sync completed — 4,250 courses updated, 182 enrolment records refreshed",
    severity: "info",
  },
  {
    id: "LOG-006",
    timestamp: "9 Sep 2026 — 08:31",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Administrator login",
    entityType: "User",
    entityName: "Admin001",
    details: "Login from IP 10.45.23.1 — session started successfully",
    severity: "info",
  },
  {
    id: "LOG-007",
    timestamp: "8 Sep 2026 — 15:04",
    adminId: "Admin002",
    adminName: "Rajan Nair",
    action: "Updated course catalogue",
    entityType: "Course",
    entityName: "Course Catalogue",
    details: "3 new courses added: Advanced GIS, Policy Evaluation Methods, Data Privacy Essentials",
    severity: "info",
  },
  {
    id: "LOG-008",
    timestamp: "10 Sep 2026 — 02:10",
    adminId: "System",
    adminName: "System",
    action: "Competency score recalculation",
    entityType: "Competency",
    entityName: "All Competencies",
    details: "Scheduled recalculation run — 1,089 officials updated based on latest assessment scores",
    severity: "info",
  },
  {
    id: "LOG-009",
    timestamp: "7 Sep 2026 — 11:52",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Suspended user account",
    entityType: "User",
    entityName: "Amit Kumar",
    details: "Account suspended pending HR review — access revoked immediately",
    severity: "critical",
  },
  {
    id: "LOG-010",
    timestamp: "6 Sep 2026 — 17:30",
    adminId: "Admin002",
    adminName: "Rajan Nair",
    action: "Modified role permissions",
    entityType: "Role",
    entityName: "Department Viewer",
    details: "Role permissions expanded to include competency gap reports — approved by Admin001",
    severity: "warning",
  },
  {
    id: "LOG-011",
    timestamp: "6 Sep 2026 — 14:10",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Deleted assessment draft",
    entityType: "Assessment",
    entityName: "Data Wrangling — Draft",
    details: "Unpublished draft deleted — no user records affected",
    severity: "info",
  },
  {
    id: "LOG-012",
    timestamp: "5 Sep 2026 — 04:06",
    adminId: "System",
    adminName: "System",
    action: "Integration sync completed",
    entityType: "Integration",
    entityName: "NSSTA / TPAC",
    details: "Sync completed with 2 warnings — 6 programmes pending competency mapping",
    severity: "warning",
  },
  {
    id: "LOG-013",
    timestamp: "5 Sep 2026 — 10:15",
    adminId: "Admin002",
    adminName: "Rajan Nair",
    action: "Exported report",
    entityType: "Assessment",
    entityName: "Q2 Competency Gap Report",
    details: "Full competency gap report exported as PDF — 1,089 officials included",
    severity: "info",
  },
  {
    id: "LOG-014",
    timestamp: "4 Sep 2026 — 09:05",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Created competency",
    entityType: "Competency",
    entityName: "Generative AI Literacy",
    details: "New competency added to the framework — mapped to Technical Skills cluster, Level 1–3",
    severity: "info",
  },
  {
    id: "LOG-015",
    timestamp: "3 Sep 2026 — 16:45",
    adminId: "Admin001",
    adminName: "Priya Sharma",
    action: "Bulk role assignment",
    entityType: "Role",
    entityName: "Statistical Analyst",
    details: "Role assigned to 18 new joiners in the Economic Statistics Division",
    severity: "info",
  },
];

const severityDot: Record<Severity, string> = {
  info: "bg-slate-400",
  warning: "bg-amber-500",
  critical: "bg-red-600",
};

const entityTypeBadge: Record<EntityType, "teal" | "neutral" | "HIGH" | "MEDIUM" | "verified" | "CRITICAL"> = {
  Competency: "teal",
  User: "neutral",
  Assessment: "MEDIUM",
  Course: "verified",
  Integration: "neutral",
  Role: "HIGH",
};

export default function AuditLogs() {
  const [severityFilter, setSeverityFilter] = useState<"All" | Severity>("All");
  const [entityFilter, setEntityFilter] = useState<"All" | EntityType>("All");
  const [search, setSearch] = useState("");

  const filtered = auditData.filter((entry) => {
    if (severityFilter !== "All" && entry.severity !== severityFilter) return false;
    if (entityFilter !== "All" && entry.entityType !== entityFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        entry.action.toLowerCase().includes(q) ||
        entry.entityName.toLowerCase().includes(q) ||
        entry.adminName.toLowerCase().includes(q) ||
        entry.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PageHeader
        title="Audit Logs"
        subtitle="Full audit trail of administrative actions and system events for compliance and traceability"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Audit Logs" }]}
        actions={
          <button className="px-4 py-2 bg-navy-800 text-white text-sm font-medium rounded-md hover:bg-navy-900 transition-colors">
            Export CSV
          </button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search logs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 w-56"
        />
        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value as "All" | Severity)}
          className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="All">All Severities</option>
          <option value="info">Info</option>
          <option value="warning">Warning</option>
          <option value="critical">Critical</option>
        </select>
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value as "All" | EntityType)}
          className="border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="All">All Entity Types</option>
          <option value="Competency">Competency</option>
          <option value="User">User</option>
          <option value="Assessment">Assessment</option>
          <option value="Course">Course</option>
          <option value="Integration">Integration</option>
          <option value="Role">Role</option>
        </select>
        <span className="text-sm text-slate-500 self-center">{filtered.length} entries</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Timestamp</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Admin</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Action</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Entity Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Entity</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Details</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Severity</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry, i) => (
                <tr key={entry.id} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}>
                  <td className="py-3 px-4 text-xs text-slate-500 whitespace-nowrap">{entry.timestamp}</td>
                  <td className="py-3 px-4">
                    <div className="text-xs font-medium text-slate-800">{entry.adminName}</div>
                    <div className="text-xs text-slate-400">{entry.adminId}</div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-700 whitespace-nowrap">{entry.action}</td>
                  <td className="py-3 px-4">
                    <Badge variant={entityTypeBadge[entry.entityType]}>{entry.entityType}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-navy-800 max-w-[140px] truncate">{entry.entityName}</td>
                  <td className="py-3 px-4 text-xs text-slate-500 max-w-[240px]">{entry.details}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full ${severityDot[entry.severity]}`} title={entry.severity} />
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-slate-400">
                    No audit entries match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
