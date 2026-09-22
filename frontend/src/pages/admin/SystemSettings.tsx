import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";

type Tab = "General" | "Competency" | "Assessment" | "AI" | "Security";

const tabs: Tab[] = ["General", "Competency", "Assessment", "AI", "Security"];

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0 gap-4">
      <span className="text-sm text-slate-600 w-48 shrink-0">{label}</span>
      <span className="text-sm font-medium text-slate-800 flex-1">{value}</span>
      <button className="text-xs text-teal-600 hover:text-teal-700 font-medium px-3 py-1 border border-teal-200 rounded-md hover:bg-teal-50 transition-colors">
        Edit
      </button>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        checked ? "bg-teal-600" : "bg-slate-300"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-4.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function SaveButton({ onSave, saved }: { onSave: () => void; saved: boolean }) {
  return (
    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
      <button
        onClick={onSave}
        className="px-5 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-colors"
      >
        Save Settings
      </button>
      {saved && (
        <span className="text-sm text-green-600 font-medium flex items-center gap-1">
          ✓ Settings saved successfully
        </span>
      )}
    </div>
  );
}

function useSave() {
  const [saved, setSaved] = useState(false);
  function save() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }
  return { saved, save };
}

function GeneralTab() {
  const { saved, save } = useSave();
  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Platform Information</p>
      <div className="bg-white border border-slate-200 rounded-lg px-4 py-1 shadow-sm">
        <InfoRow label="Platform Name" value="KaushalSetu" />
        <InfoRow label="Organisation" value="Ministry of Statistics & Programme Implementation (MoSPI)" />
        <InfoRow label="Support Email" value="support@mospi.gov.in" />
        <InfoRow label="Platform Version" value="v1.0 — SIH 2024" />
        <InfoRow label="Time Zone" value="IST — UTC+5:30" />
        <InfoRow label="Default Language" value="English" />
      </div>
      <SaveButton onSave={save} saved={saved} />
    </div>
  );
}

function CompetencyTab() {
  const { saved, save } = useSave();
  const [gapThreshold, setGapThreshold] = useState("80");
  const [critThreshold, setCritThreshold] = useState("60");

  const levels = [
    { level: 1, name: "Awareness", desc: "Basic understanding; can identify and describe the competency" },
    { level: 2, name: "Foundation", desc: "Can apply knowledge in familiar contexts with guidance" },
    { level: 3, name: "Intermediate", desc: "Works independently; applies across different situations" },
    { level: 4, name: "Advanced", desc: "Coaches others; handles complex and non-routine challenges" },
    { level: 5, name: "Expert", desc: "Sets strategy; recognised authority and innovator" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Scoring System</p>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <p className="text-sm text-slate-700 mb-4">
            KaushalSetu uses a <span className="font-semibold text-navy-900">5-point competency scale</span> aligned with the Government of India competency framework.
          </p>
          <div className="flex flex-col gap-2">
            {levels.map((l) => (
              <div key={l.level} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-navy-800 text-white text-xs font-bold flex items-center justify-center shrink-0">
                  {l.level}
                </span>
                <div>
                  <span className="text-sm font-semibold text-slate-800">{l.name}</span>
                  <span className="text-xs text-slate-500 ml-2">— {l.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Thresholds</p>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Gap Threshold (%)
              <span className="ml-1 text-slate-400 font-normal">— score below this flags a gap</span>
            </label>
            <input
              type="number"
              value={gapThreshold}
              onChange={(e) => setGapThreshold(e.target.value)}
              min={0}
              max={100}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Criticality Threshold (%)
              <span className="ml-1 text-slate-400 font-normal">— marks a gap as critical</span>
            </label>
            <input
              type="number"
              value={critThreshold}
              onChange={(e) => setCritThreshold(e.target.value)}
              min={0}
              max={100}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>
      <SaveButton onSave={save} saved={saved} />
    </div>
  );
}

function AssessmentTab() {
  const { saved, save } = useSave();
  const [passingScore, setPassingScore] = useState("70");
  const [maxAttempts, setMaxAttempts] = useState("3");
  const [adaptive, setAdaptive] = useState(true);
  const [randomize, setRandomize] = useState(true);

  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Assessment Defaults</p>
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Default Passing Score (%)</label>
            <input
              type="number"
              value={passingScore}
              onChange={(e) => setPassingScore(e.target.value)}
              min={0}
              max={100}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Maximum Attempts</label>
            <input
              type="number"
              value={maxAttempts}
              onChange={(e) => setMaxAttempts(e.target.value)}
              min={1}
              max={10}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Adaptive Difficulty</p>
              <p className="text-xs text-slate-400">Adjust question difficulty based on previous responses</p>
            </div>
            <Toggle checked={adaptive} onChange={setAdaptive} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Question Randomisation</p>
              <p className="text-xs text-slate-400">Randomise question order and answer choices for each attempt</p>
            </div>
            <Toggle checked={randomize} onChange={setRandomize} />
          </div>
        </div>
      </div>
      <SaveButton onSave={save} saved={saved} />
    </div>
  );
}

function AITab() {
  const { saved, save } = useSave();
  const [provider, setProvider] = useState<"gpt4o" | "claude">("gpt4o");
  const [confidence, setConfidence] = useState("75");
  const [assistant, setAssistant] = useState(true);
  const [quizGen, setQuizGen] = useState(true);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">AI Provider</p>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="provider"
                value="gpt4o"
                checked={provider === "gpt4o"}
                onChange={() => setProvider("gpt4o")}
                className="accent-teal-600"
              />
              <div>
                <p className="text-sm font-medium text-slate-700">GPT-4o (OpenAI)</p>
                <p className="text-xs text-slate-400">Recommended for general insights and quiz generation</p>
              </div>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="provider"
                value="claude"
                checked={provider === "claude"}
                onChange={() => setProvider("claude")}
                className="accent-teal-600"
              />
              <div>
                <p className="text-sm font-medium text-slate-700">Anthropic Claude</p>
                <p className="text-xs text-slate-400">Alternative provider with strong reasoning capabilities</p>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Recommendation Settings</p>
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Recommendation Confidence Threshold (%)
              <span className="ml-1 text-slate-400 font-normal">— only surface recommendations above this score</span>
            </label>
            <input
              type="number"
              value={confidence}
              onChange={(e) => setConfidence(e.target.value)}
              min={0}
              max={100}
              className="w-48 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">AI Learning Assistant</p>
                <p className="text-xs text-slate-400">Allow officials to query the AI learning assistant from their dashboard</p>
              </div>
              <Toggle checked={assistant} onChange={setAssistant} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">AI Quiz Generation</p>
                <p className="text-xs text-slate-400">Enable automatic AI-generated practice quizzes for course completions</p>
              </div>
              <Toggle checked={quizGen} onChange={setQuizGen} />
            </div>
          </div>
        </div>
      </div>
      <SaveButton onSave={save} saved={saved} />
    </div>
  );
}

function SecurityTab() {
  const { saved, save } = useSave();
  const [sessionTimeout, setSessionTimeout] = useState("30");
  const [minPassword, setMinPassword] = useState("8");
  const [mfa, setMfa] = useState(false);
  const [sso, setSso] = useState(false);

  return (
    <div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Security Configuration</p>
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Session Timeout</label>
            <select
              value={sessionTimeout}
              onChange={(e) => setSessionTimeout(e.target.value)}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Minimum Password Length</label>
            <input
              type="number"
              value={minPassword}
              onChange={(e) => setMinPassword(e.target.value)}
              min={6}
              max={32}
              className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Multi-Factor Authentication (MFA)</p>
              <p className="text-xs text-slate-400">Require MFA for all administrator accounts</p>
            </div>
            <Toggle checked={mfa} onChange={setMfa} />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">Single Sign-On (SSO)</p>
              <p className="text-xs text-slate-400">
                {sso ? "SSO is enabled." : "SSO is disabled."}{" "}
                <span className="text-amber-600">Contact IT for SSO configuration.</span>
              </p>
            </div>
            <Toggle checked={sso} onChange={setSso} />
          </div>
        </div>
      </div>
      <SaveButton onSave={save} saved={saved} />
    </div>
  );
}

export default function SystemSettings() {
  const [activeTab, setActiveTab] = useState<Tab>("General");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <PageHeader
        title="System Settings"
        subtitle="Configure platform-wide settings for KaushalSetu"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "System Settings" }]}
      />

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "General" && <GeneralTab />}
      {activeTab === "Competency" && <CompetencyTab />}
      {activeTab === "Assessment" && <AssessmentTab />}
      {activeTab === "AI" && <AITab />}
      {activeTab === "Security" && <SecurityTab />}
    </div>
  );
}
