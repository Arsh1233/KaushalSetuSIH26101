import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";
import Badge from "../../components/ui/Badge";
import StatCard from "../../components/ui/StatCard";

const syncLog = [
  { time: "10 Sep 2026 — 02:00", message: "Synced 4,250 courses from iGOT API", status: "success" },
  { time: "10 Sep 2026 — 02:03", message: "Updated 182 enrolment records across 1,089 officials", status: "success" },
  { time: "10 Sep 2026 — 02:05", message: "Competency score recalculated for 847 officials", status: "success" },
  { time: "10 Sep 2026 — 02:07", message: "3 courses marked deprecated — removed from catalogue", status: "warning" },
  { time: "10 Sep 2026 — 02:08", message: "Sync completed — 0 errors, 4,250 records current", status: "success" },
];

const capabilities = [
  {
    title: "Course Catalog Sync",
    description: "Automatically pull and update course metadata from the iGOT Karmayogi platform.",
    status: "enabled" as const,
  },
  {
    title: "Enrolment Status",
    description: "Track official enrolments and sync progress in real time.",
    status: "enabled" as const,
  },
  {
    title: "Completion Tracking",
    description: "Receive completion certificates and update competency records automatically.",
    status: "enabled" as const,
  },
  {
    title: "Competency Score Update",
    description: "Map iGOT course completions to MoSPI competency framework — requires manual mapping for new courses.",
    status: "partial" as const,
  },
];

export default function IGOTIntegration() {
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState("10 Sep 2026");

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
        title="iGOT Karmayogi Integration"
        subtitle="Manage the connection between KaushalSetu and the iGOT Karmayogi national learning platform"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "iGOT Integration" }]}
      />

      {/* Connection status card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-xl">🔗</div>
              <div>
                <p className="text-sm font-semibold text-slate-700">iGOT Karmayogi API</p>
                <Badge variant="verified">Connected</Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-1.5 text-sm">
              <span className="text-slate-500">Last sync</span>
              <span className="font-medium text-slate-800">{lastSync}</span>
              <span className="text-slate-500">Next scheduled sync</span>
              <span className="font-medium text-slate-800">17 Sep 2026 (weekly)</span>
              <span className="text-slate-500">API version</span>
              <span className="font-medium text-slate-800">v2.1</span>
              <span className="text-slate-500">Courses synced</span>
              <span className="font-medium text-slate-800">4,250</span>
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
        <StatCard label="Courses Synced" value="4,250" accent="teal" delta="+3 from last sync" deltaPositive />
        <StatCard label="Enrolments Tracked" value="18,420" accent="navy" delta="+182 this week" deltaPositive />
        <StatCard label="Officials Connected" value="1,089" accent="teal" />
      </div>

      {/* Capability cards */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-navy-900 mb-3">Integration Capabilities</h2>
        <div className="grid grid-cols-2 gap-4">
          {capabilities.map((cap) => (
            <div key={cap.title} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <p className="text-sm font-semibold text-slate-800">{cap.title}</p>
                {cap.status === "enabled" ? (
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full shrink-0">✓ Enabled</span>
                ) : (
                  <span className="text-xs font-medium text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full shrink-0">⚠ Partial</span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{cap.description}</p>
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
