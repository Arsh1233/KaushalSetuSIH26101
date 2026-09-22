import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard";
import ProgressBar from "../../components/ui/ProgressBar";

const capabilities = [
  {
    title: "Training Catalogue Sync",
    description: "Pull the full NSSTA/TPAC programme catalogue and sync metadata automatically.",
    status: "enabled" as const,
  },
  {
    title: "Course Mapping",
    description: "Map NSSTA programmes to MoSPI competency framework competencies (12/18 complete).",
    status: "partial" as const,
  },
  {
    title: "Training Calendar",
    description: "Sync upcoming training sessions, dates, venues, and seat availability from TPAC.",
    status: "enabled" as const,
  },
  {
    title: "Recommendation Eligibility",
    description: "Flag officials eligible for NSSTA nomination based on role and competency profile.",
    status: "enabled" as const,
  },
  {
    title: "Competency Mapping",
    description: "Automatic mapping of programme outcomes to competency levels — currently in progress.",
    status: "inprogress" as const,
  },
];

const pendingMappings = [
  "Leadership in Public Administration — Advanced",
  "Strategic Thinking for Senior Officials",
  "Public Finance and Budgeting Essentials",
  "Digital Tools for Government Transformation",
  "Evidence-Based Policy Design",
  "Stakeholder Communication and Engagement",
];

const syncLog = [
  { time: "5 Sep 2026 — 04:00", message: "Synced 847 programmes from NSSTA catalogue API", status: "success" },
  { time: "5 Sep 2026 — 04:02", message: "Updated 23 calendar events from TPAC training calendar", status: "success" },
  { time: "5 Sep 2026 — 04:04", message: "6 new programmes added — pending competency mapping", status: "warning" },
  { time: "5 Sep 2026 — 04:05", message: "Competency mappings: 12/18 complete", status: "warning" },
  { time: "5 Sep 2026 — 04:06", message: "Sync completed with 2 warnings — manual review required", status: "warning" },
];

export default function NSSTAIntegration() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("5 Sep 2026");

  function handleSync() {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setLastSync("just now");
    }, 1000);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <PageHeader
        title="NSSTA / TPAC Integration"
        subtitle="Manage the connection to the National School of Statistical Training and Training Planning & Administration Centre"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "NSSTA Integration" }]}
      />

      {/* Connection status card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-xl">🔗</div>
              <div>
                <p className="text-sm font-semibold text-slate-700">NSSTA / TPAC API</p>
                <Badge variant="HIGH">Connected — Partial</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-1.5 text-sm">
              <span className="text-slate-500">Last sync</span>
              <span className="font-medium text-slate-800">{lastSync}</span>
              <span className="text-slate-500">Next scheduled sync</span>
              <span className="font-medium text-slate-800">12 Sep 2026 (weekly)</span>
              <span className="text-slate-500">Programmes synced</span>
              <span className="font-medium text-slate-800">847</span>
              <span className="text-slate-500">Competency mappings</span>
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-800">12 / 18</span>
                <div className="w-24">
                  <ProgressBar value={66} />
                </div>
                <span className="text-xs text-amber-600 font-medium">66%</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSync}
              disabled={syncing}
              className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 disabled:opacity-60 transition-colors"
            >
              {syncing && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {syncing ? "Syncing…" : "Sync Now"}
            </button>
            <button className="px-4 py-2 border border-red-200 text-red-600 text-sm font-medium rounded-md hover:bg-red-50 transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <StatCard label="Programmes Catalogued" value="847" accent="teal" />
        <StatCard label="Calendar Events" value="23" accent="amber" delta="Updated 5 Sep" deltaPositive />
        <StatCard label="Competency Maps" value="12" accent="navy" delta="6 pending" deltaPositive={false} />
      </div>

      {/* Capability cards */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-navy-900 mb-3">Integration Capabilities</h2>
        <div className="grid grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.title} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-semibold text-slate-800">{cap.title}</p>
                {cap.status === "enabled" && (
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0">✓ Enabled</span>
                )}
                {cap.status === "partial" && (
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">⚠ Partial</span>
                )}
                {cap.status === "inprogress" && (
                  <span className="text-xs font-medium text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full shrink-0">⟳ In Progress</span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{cap.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pending mappings */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-navy-900">Pending Competency Mappings</h2>
          <Badge variant="HIGH">6 pending</Badge>
        </div>
        <div className="flex flex-col gap-0">
          {pendingMappings.map((course, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0 gap-4">
              <p className="text-sm text-slate-700">{course}</p>
              <button className="text-xs text-teal-600 font-medium hover:text-teal-700 shrink-0 border border-teal-200 px-3 py-1 rounded-md hover:bg-teal-50 transition-colors">
                Map →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Sync activity log */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
        <h2 className="text-base font-semibold text-navy-900 mb-4">Recent Sync Activity</h2>
        <div className="flex flex-col gap-0">
          {syncLog.map((entry, i) => (
            <div key={i} className="flex items-start gap-3 py-2.5 border-b border-slate-100 last:border-0">
              <span
                className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${
                  entry.status === "success" ? "bg-green-500" : "bg-amber-500"
                }`}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{entry.message}</p>
                <p className="text-xs text-slate-400 mt-0.5">{entry.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
