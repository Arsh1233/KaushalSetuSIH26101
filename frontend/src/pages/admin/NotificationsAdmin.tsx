import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard";

type NotifType = "Mandatory Training" | "Assessment Reminder" | "Policy Update" | "New Course" | "System Announcement";
type NotifTarget = "All Officials" | "By Department" | "By Role" | "Specific Users";

const departments = [
  "Economic Statistics Division",
  "National Accounts Division",
  "Agricultural Statistics",
  "IT & Systems",
  "Administrative Services",
  "Policy Research",
];

interface RecentNotif {
  id: string;
  subject: string;
  type: NotifType;
  target: string;
  sentDate: string;
  recipients: number;
  openRate: number;
}

const recentNotifications: RecentNotif[] = [
  {
    id: "N-001",
    subject: "Mandatory Cybersecurity Training — Complete by 30 Sep",
    type: "Mandatory Training",
    target: "All Officials",
    sentDate: "10 Sep 2026",
    recipients: 1089,
    openRate: 91,
  },
  {
    id: "N-002",
    subject: "Assessment Reminder: Python Programming — Module 2",
    type: "Assessment Reminder",
    target: "Economic Statistics Division",
    sentDate: "9 Sep 2026",
    recipients: 214,
    openRate: 78,
  },
  {
    id: "N-003",
    subject: "New Course Available: Advanced GIS for Statisticians",
    type: "New Course",
    target: "Agricultural Statistics",
    sentDate: "8 Sep 2026",
    recipients: 187,
    openRate: 84,
  },
  {
    id: "N-004",
    subject: "Policy Update: National Data Governance Framework v2",
    type: "Policy Update",
    target: "All Officials",
    sentDate: "7 Sep 2026",
    recipients: 1089,
    openRate: 88,
  },
  {
    id: "N-005",
    subject: "System Maintenance — Scheduled Downtime 15 Sep 02:00–04:00",
    type: "System Announcement",
    target: "All Officials",
    sentDate: "6 Sep 2026",
    recipients: 1089,
    openRate: 76,
  },
  {
    id: "N-006",
    subject: "Assessment Reminder: Statistical Sampling — Final Attempt",
    type: "Assessment Reminder",
    target: "National Accounts Division",
    sentDate: "5 Sep 2026",
    recipients: 156,
    openRate: 92,
  },
  {
    id: "N-007",
    subject: "New Courses: AI/ML Fundamentals Series (3 modules)",
    type: "New Course",
    target: "By Role: Data Analyst",
    sentDate: "3 Sep 2026",
    recipients: 312,
    openRate: 81,
  },
  {
    id: "N-008",
    subject: "Mandatory Training: Digital Governance Foundations",
    type: "Mandatory Training",
    target: "Administrative Services",
    sentDate: "1 Sep 2026",
    recipients: 98,
    openRate: 73,
  },
];

const typeBadgeMap: Record<NotifType, "CRITICAL" | "HIGH" | "MEDIUM" | "teal" | "neutral"> = {
  "Mandatory Training": "CRITICAL",
  "Assessment Reminder": "HIGH",
  "Policy Update": "MEDIUM",
  "New Course": "teal",
  "System Announcement": "neutral",
};

export default function NotificationsAdmin() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<NotifType>("Mandatory Training");
  const [target, setTarget] = useState<NotifTarget>("All Officials");
  const [department, setDepartment] = useState(departments[0]);
  const [success, setSuccess] = useState(false);

  function handleSend() {
    if (!subject.trim() || !message.trim()) return;
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
    setSubject("");
    setMessage("");
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <PageHeader
        title="Notification Management"
        subtitle="Create and send targeted notifications to officials across the platform"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "Notifications" }]}
      />

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Sent This Month" value="47" accent="teal" delta="+12 vs last month" deltaPositive />
        <StatCard label="Average Open Rate" value="84%" accent="navy" delta="+3% vs last month" deltaPositive />
        <StatCard label="Pending Notifications" value="3" accent="amber" />
      </div>

      {/* Create notification form */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mb-6">
        <h2 className="text-base font-semibold text-navy-900 mb-4">Create Notification</h2>

        {success && (
          <div className="mb-4 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-md">
            <span>✓</span>
            <span>Notification sent successfully to {target === "By Department" ? department : target}.</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Notification subject line…"
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-slate-600 mb-1">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your notification message here…"
              rows={3}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as NotifType)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>Mandatory Training</option>
              <option>Assessment Reminder</option>
              <option>Policy Update</option>
              <option>New Course</option>
              <option>System Announcement</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Target Audience</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value as NotifTarget)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option>All Officials</option>
              <option>By Department</option>
              <option>By Role</option>
              <option>Specific Users</option>
            </select>
          </div>
          {target === "By Department" && (
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {departments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSend}
            disabled={!subject.trim() || !message.trim()}
            className="px-5 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send Notification
          </button>
        </div>
      </div>

      {/* Recent notifications table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200">
          <h2 className="text-base font-semibold text-navy-900">Recent Notifications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Subject</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Target</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Sent Date</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide">Recipients</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wide whitespace-nowrap">Open Rate</th>
              </tr>
            </thead>
            <tbody>
              {recentNotifications.map((n, i) => (
                <tr key={n.id} className={`border-b border-slate-100 last:border-0 ${i % 2 === 0 ? "" : "bg-slate-50/40"}`}>
                  <td className="py-3 px-4 text-sm text-slate-800 max-w-[280px]">
                    <span className="line-clamp-2">{n.subject}</span>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={typeBadgeMap[n.type]}>{n.type}</Badge>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 whitespace-nowrap">{n.target}</td>
                  <td className="py-3 px-4 text-sm text-slate-500 whitespace-nowrap">{n.sentDate}</td>
                  <td className="py-3 px-4 text-sm font-medium text-slate-800 text-right">{n.recipients.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`text-sm font-semibold ${
                        n.openRate >= 85 ? "text-teal-600" : n.openRate >= 70 ? "text-amber-600" : "text-red-600"
                      }`}
                    >
                      {n.openRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
