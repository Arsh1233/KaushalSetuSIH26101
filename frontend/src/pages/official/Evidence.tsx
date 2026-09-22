import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';
import EvidenceCard from '../../components/official/EvidenceCard';
import { getEvidenceForOfficial } from '../../data/evidence';
import { getOfficialById, getGapsFor } from '../../data/index';
import { competencies } from '../../data/competencies';
import type { EvidenceRecord, EvidenceType } from '../../data/types';

const TYPE_FILTERS: (EvidenceType | 'All')[] = ['All', 'Assessment', 'Practical Task', 'Course', 'Project', 'Supervisor Validation'];
const EVIDENCE_TYPES: EvidenceType[] = ['Assessment', 'Practical Task', 'Course', 'Project', 'Supervisor Validation'];

interface UploadForm {
  competencyId: string;
  type: EvidenceType;
  title: string;
  score: string;
  source: string;
  date: string;
  notes: string;
  fileName: string;
}

function todayIso() {
  return new Date().toISOString().split('T')[0]!;
}

export default function Evidence() {
  const { currentOfficialId } = useApp();
  const navigate = useNavigate();
  const official = getOfficialById(currentOfficialId);
  const fileRef = useRef<HTMLInputElement>(null);

  const [activeType, setActiveType] = useState<EvidenceType | 'All'>('All');
  const [records, setRecords] = useState<EvidenceRecord[]>(() => getEvidenceForOfficial(currentOfficialId));
  const [showUpload, setShowUpload] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<UploadForm>({
    competencyId: competencies[0]?.id ?? '',
    type: 'Assessment',
    title: '',
    score: '75',
    source: '',
    date: todayIso(),
    notes: '',
    fileName: '',
  });

  const filtered = activeType === 'All' ? records : records.filter(e => e.type === activeType);
  const sortedFiltered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const totalScore = records.length > 0 ? Math.round(records.reduce((acc, e) => acc + e.score, 0) / records.length) : 0;
  const verifiedCount = records.filter(e => e.verified).length;
  const pendingCount = records.filter(e => !e.verified).length;

  const topGap = official ? (getGapsFor(currentOfficialId, 'CRITICAL')[0] ?? getGapsFor(currentOfficialId)[0]) : null;

  const dynamicGaps: string[] = [];
  if (official) {
    official.competencyScores.forEach(s => {
      const evidenceForComp = records.filter(e => e.competencyId === s.competencyId);
      const comp = competencies.find(c => c.id === s.competencyId);
      if (!comp) return;
      if (evidenceForComp.length < 2) {
        dynamicGaps.push(`${comp.name}: Low evidence count (${evidenceForComp.length} item${evidenceForComp.length === 1 ? '' : 's'})`);
      } else if (s.freshnessMonths > 6) {
        dynamicGaps.push(`${comp.name}: Evidence older than ${s.freshnessMonths} months`);
      }
    });
  }

  function setField<K extends keyof UploadForm>(key: K, value: UploadForm[K]) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setField('fileName', file.name);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const scoreNum = Math.max(0, Math.min(100, parseInt(form.score, 10) || 0));
    const newRecord: EvidenceRecord = {
      id: `upload-${Date.now()}`,
      officialId: currentOfficialId,
      competencyId: form.competencyId,
      type: form.type,
      title: form.title || `${form.type} — ${competencies.find(c => c.id === form.competencyId)?.name}`,
      date: form.date || todayIso(),
      score: scoreNum,
      verified: false,
      source: form.source || 'Self-reported',
    };
    setRecords(prev => [newRecord, ...prev]);
    setSubmitted(true);
  }

  function resetAndClose() {
    setShowUpload(false);
    setSubmitted(false);
    setForm({
      competencyId: competencies[0]?.id ?? '',
      type: 'Assessment',
      title: '',
      score: '75',
      source: '',
      date: todayIso(),
      notes: '',
      fileName: '',
    });
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="My Capability Evidence"
        subtitle="Evidence-backed proof of your demonstrated competencies — every score reflects actual performance."
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Evidence' }]}
        actions={
          <button
            onClick={() => { setShowUpload(true); setSubmitted(false); }}
            className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded hover:bg-teal-700 transition-colors"
          >
            + Upload Evidence
          </button>
        }
      />

      {/* Upload modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-semibold text-navy-900">Upload Evidence</h3>
              <button onClick={resetAndClose} className="text-slate-400 hover:text-slate-600 text-xl leading-none">×</button>
            </div>

            {submitted ? (
              <div className="px-6 py-8 text-center">
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">✓</div>
                <h4 className="font-semibold text-teal-700 text-lg mb-2">Evidence Added</h4>
                <p className="text-sm text-slate-500 mb-1">Your evidence record has been added to your portfolio.</p>
                <p className="text-xs text-amber-600 mb-6">Status: <strong>Pending Verification</strong> — a supervisor or administrator will verify this record.</p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={resetAndClose}
                    className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors"
                  >
                    Done
                  </button>
                  <button
                    onClick={() => { setSubmitted(false); setForm(f => ({ ...f, title: '', notes: '', fileName: '' })); }}
                    className="px-4 py-2 border border-slate-200 text-slate-600 text-sm rounded hover:bg-slate-50 transition-colors"
                  >
                    Add Another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-600 block mb-1">Competency *</label>
                    <select
                      value={form.competencyId}
                      onChange={e => setField('competencyId', e.target.value)}
                      required
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-600"
                    >
                      {competencies.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Evidence Type *</label>
                    <select
                      value={form.type}
                      onChange={e => setField('type', e.target.value as EvidenceType)}
                      required
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-600"
                    >
                      {EVIDENCE_TYPES.map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Date *</label>
                    <input
                      type="date"
                      value={form.date}
                      onChange={e => setField('date', e.target.value)}
                      max={todayIso()}
                      required
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-600"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-600 block mb-1">Title / Description *</label>
                    <input
                      type="text"
                      value={form.title}
                      onChange={e => setField('title', e.target.value)}
                      placeholder="e.g. Python Certificate — iGOT Karmayogi"
                      required
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Score (0–100) *</label>
                    <input
                      type="number"
                      value={form.score}
                      onChange={e => setField('score', e.target.value)}
                      min="0"
                      max="100"
                      required
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-600 block mb-1">Source / Institution</label>
                    <input
                      type="text"
                      value={form.source}
                      onChange={e => setField('source', e.target.value)}
                      placeholder="e.g. NSSTA, iGOT, Supervisor"
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-600"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-600 block mb-1">Attach Document (optional)</label>
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border-2 border-dashed border-slate-300 rounded-md px-4 py-3 text-center cursor-pointer hover:border-navy-400 transition-colors"
                    >
                      {form.fileName ? (
                        <p className="text-sm text-navy-800 font-medium">📄 {form.fileName}</p>
                      ) : (
                        <p className="text-sm text-slate-400">Click to attach PDF, JPG, or PNG</p>
                      )}
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="text-xs font-medium text-slate-600 block mb-1">Notes (optional)</label>
                    <textarea
                      value={form.notes}
                      onChange={e => setField('notes', e.target.value)}
                      placeholder="Additional context about this evidence..."
                      rows={2}
                      className="w-full border border-slate-200 rounded px-3 py-2 text-sm focus:outline-none focus:border-navy-600"
                    />
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded px-3 py-2 text-xs text-amber-700">
                  Uploaded evidence is marked <strong>Pending Verification</strong> until reviewed by a supervisor or training administrator.
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-teal-600 text-white font-semibold rounded hover:bg-teal-700 transition-colors"
                  >
                    Add to My Evidence
                  </button>
                  <button
                    type="button"
                    onClick={resetAndClose}
                    className="px-4 py-2.5 border border-slate-200 text-slate-600 rounded hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-navy-900">{records.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Evidence</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-teal-600">{verifiedCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Verified</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Pending</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm text-center">
          <p className="text-2xl font-bold text-navy-900">{totalScore}%</p>
          <p className="text-xs text-slate-500 mt-0.5">Avg. Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Evidence list */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {TYPE_FILTERS.map(t => (
              <button
                key={t}
                onClick={() => setActiveType(t)}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  activeType === t ? 'bg-navy-900 text-white border-navy-900' : 'border-slate-300 text-slate-600 hover:border-navy-400'
                }`}
              >
                {t}
                {t !== 'All' && (
                  <span className="ml-1 opacity-70">({records.filter(e => e.type === t).length})</span>
                )}
              </button>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-md shadow-sm">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <p className="text-sm font-semibold text-navy-900">
                {sortedFiltered.length} evidence item{sortedFiltered.length !== 1 ? 's' : ''}
              </p>
              {activeType !== 'All' && <span className="text-xs text-slate-400">Filtered: {activeType}</span>}
            </div>
            <div className="px-5">
              {sortedFiltered.length > 0 ? (
                sortedFiltered.map(ev => <EvidenceCard key={ev.id} evidence={ev} />)
              ) : (
                <p className="py-8 text-sm text-slate-400 text-center">No evidence of this type recorded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-navy-900 mb-3">Evidence by Type</h4>
            {EVIDENCE_TYPES.map(type => {
              const count = records.filter(e => e.type === type).length;
              const verif = records.filter(e => e.type === type && e.verified).length;
              return (
                <div key={type} className="flex items-center justify-between py-1.5 text-sm border-b border-slate-100 last:border-0">
                  <span className="text-slate-600 text-xs">{type}</span>
                  <div className="flex items-center gap-1.5">
                    <Badge variant="neutral">{count}</Badge>
                    {verif > 0 && <Badge variant="verified">{verif} ✓</Badge>}
                  </div>
                </div>
              );
            })}
          </div>

          {dynamicGaps.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h4 className="text-sm font-semibold text-amber-800 mb-2">Evidence Gaps</h4>
              <ul className="space-y-1.5">
                {dynamicGaps.slice(0, 4).map((gap, i) => (
                  <li key={i} className="text-xs text-amber-700 flex items-start gap-1.5">
                    <span className="shrink-0 mt-0.5">•</span>
                    <span>{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-navy-50 border border-navy-100 rounded-md p-4">
            <h4 className="text-sm font-semibold text-navy-900 mb-2">Validate a Competency</h4>
            <p className="text-xs text-slate-500 mb-3">Complete an assessment to generate verified evidence for your portfolio.</p>
            <button
              onClick={() => navigate(`/app/assessment/${topGap?.competencyId ?? 'python'}`)}
              className="w-full py-2 bg-navy-900 text-white text-xs font-medium rounded hover:bg-navy-800 transition-colors"
            >
              Start Capability Validation
            </button>
            <button
              onClick={() => { setShowUpload(true); setSubmitted(false); }}
              className="w-full py-2 mt-2 border border-teal-600 text-teal-600 text-xs font-medium rounded hover:bg-teal-50 transition-colors"
            >
              + Upload Evidence Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
