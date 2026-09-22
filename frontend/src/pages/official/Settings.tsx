import { useState } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { useApp } from '../../context/AppContext';

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
      <h2 className="text-sm font-semibold text-navy-900 border-b border-slate-100 pb-2">{title}</h2>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${checked ? 'bg-teal-600' : 'bg-slate-300'}`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-1'}`}
      />
    </button>
  );
}

function CheckRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer">
      <span className="text-sm text-slate-700">{label}</span>
      <Toggle checked={checked} onChange={onChange} />
    </label>
  );
}

function SelectRow({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-sm text-slate-700">{label}</span>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

export default function Settings() {
  const { language, setLanguage } = useApp();

  const [emailNotif, setEmailNotif] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [assessmentReminders, setAssessmentReminders] = useState(true);

  const [textSize, setTextSize] = useState('Normal');
  const [highContrast, setHighContrast] = useState(false);

  const [learningTime, setLearningTime] = useState('Morning');
  const [learningFormat, setLearningFormat] = useState('Mixed');
  const [dailyGoal, setDailyGoal] = useState('30');

  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Personalise your KaushalSetu experience"
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Settings' }]}
      />

      <SectionCard title="Language & Display">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-700">Interface Language</span>
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${language === 'en' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-navy-800'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${language === 'hi' ? 'bg-white text-navy-900 shadow-sm' : 'text-slate-600 hover:text-navy-800'}`}
            >
              हिन्दी
            </button>
          </div>
        </div>
        <div className="border-t border-slate-100 pt-4 space-y-3">
          <CheckRow label="Email Notifications" checked={emailNotif} onChange={setEmailNotif} />
          <CheckRow label="SMS Alerts" checked={smsAlerts} onChange={setSmsAlerts} />
          <CheckRow label="Weekly Learning Digest" checked={weeklyDigest} onChange={setWeeklyDigest} />
          <CheckRow label="Assessment Reminders" checked={assessmentReminders} onChange={setAssessmentReminders} />
        </div>
      </SectionCard>

      <SectionCard title="Accessibility">
        <SelectRow
          label="Text Size"
          value={textSize}
          options={['Normal', 'Large', 'Extra Large']}
          onChange={setTextSize}
        />
        <div className="border-t border-slate-100 pt-4">
          <CheckRow label="High Contrast Mode" checked={highContrast} onChange={setHighContrast} />
        </div>
      </SectionCard>

      <SectionCard title="Learning Preferences">
        <SelectRow
          label="Preferred Learning Time"
          value={learningTime}
          options={['Morning', 'Afternoon', 'Evening']}
          onChange={setLearningTime}
        />
        <SelectRow
          label="Learning Format"
          value={learningFormat}
          options={['Video', 'Text', 'Mixed']}
          onChange={setLearningFormat}
        />
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-slate-700">Daily Learning Goal</span>
          <select
            value={dailyGoal}
            onChange={e => setDailyGoal(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {['30', '45', '60', '90'].map(v => (
              <option key={v} value={v}>{v} minutes</option>
            ))}
          </select>
        </div>
      </SectionCard>

      <SectionCard title="Privacy & Data">
        <CheckRow
          label="Share anonymous usage data to improve KaushalSetu"
          checked={analyticsConsent}
          onChange={setAnalyticsConsent}
        />
        <p className="text-xs text-slate-400 leading-relaxed">
          Your data is processed under the Government of India data governance framework. No personally identifiable information is shared externally. Usage analytics help improve platform recommendations and course relevance.
        </p>
      </SectionCard>

      <SectionCard title="Account">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Employee ID</span>
            <span className="text-sm font-mono font-medium text-navy-800">MoSPI-DEMO-001</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Platform Version</span>
            <span className="text-xs text-slate-400 font-medium">KaushalSetu v1.0 — SIH 2024 Prototype</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500">Need help?</span>
            <span className="text-sm text-teal-600 font-medium cursor-pointer hover:text-teal-500 transition-colors">
              Contact Support
            </span>
          </div>
        </div>
      </SectionCard>

      <div className="flex items-center gap-4 pb-4">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-800 transition-colors"
        >
          Save Settings
        </button>
        {saved && (
          <span className="text-sm font-medium text-teal-600 animate-pulse">
            Settings saved successfully.
          </span>
        )}
      </div>
    </div>
  );
}
