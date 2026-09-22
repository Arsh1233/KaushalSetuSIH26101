import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

const GENERATION_STEPS = ['Parsing document...', 'Identifying key concepts...', 'Generating questions...'];

type Difficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';
type Lang = 'English' | 'हिन्दी' | 'Both';

export default function AIQuizGenerator() {
  const navigate = useNavigate();
  const [file, setFile] = useState<{ name: string; size: string } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [stepIdx, setStepIdx] = useState(0);
  const [numQ, setNumQ] = useState(8);
  const [difficulty, setDifficulty] = useState<Difficulty>('Mixed');
  const [language, setLanguage] = useState<Lang>('English');
  const [competency, setCompetency] = useState('Sampling Methods');
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(f: File) {
    const kb = (f.size / 1024).toFixed(0);
    setFile({ name: f.name, size: `${kb} KB` });
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function handleGenerate() {
    if (!file) return;
    setGenerating(true);
    setStepIdx(0);
    const interval = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= GENERATION_STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(() => navigate('/app/ai-quiz/review', { state: { fileName: file.name, competency } }), 600);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  }

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="AI Assessment Generator"
        subtitle="Upload a document and generate competency-mapped assessment questions automatically."
        breadcrumbs={[{ label: 'Home', href: '/app/dashboard' }, { label: 'Resources' }, { label: 'AI Quiz Generator' }]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload + options */}
        <div className="lg:col-span-2 space-y-4">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
              dragging ? 'border-navy-600 bg-navy-50' : 'border-slate-300 hover:border-navy-400 hover:bg-slate-50'
            }`}
          >
            <input ref={fileRef} type="file" accept=".pdf,.ppt,.pptx,.docx,.txt" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            {file ? (
              <div>
                <div className="w-12 h-12 bg-teal-100 rounded-md flex items-center justify-center mx-auto mb-2 text-xl">📄</div>
                <p className="font-semibold text-navy-900">{file.name}</p>
                <p className="text-xs text-slate-500 mt-0.5">{file.size} · Click to replace</p>
              </div>
            ) : (
              <div>
                <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center mx-auto mb-3 text-2xl">↑</div>
                <p className="font-medium text-slate-700">Drag and drop or click to upload</p>
                <p className="text-xs text-slate-400 mt-1">Supported: PDF, PPT, DOCX, Video transcript · Max 50 MB</p>
              </div>
            )}
          </div>

          {/* Uploaded example */}
          {!file && (
            <button
              onClick={() => setFile({ name: 'Survey Sampling Fundamentals.pdf', size: '1.2 MB' })}
              className="w-full py-2 text-sm text-teal-600 hover:text-teal-700 border border-dashed border-teal-300 rounded-md transition-colors"
            >
              + Load sample: Survey Sampling Fundamentals.pdf
            </button>
          )}

          {/* Options */}
          <div className="bg-white border border-slate-200 rounded-md p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-navy-900 mb-4">Generation Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Number of Questions</label>
                <input
                  type="number"
                  value={numQ}
                  onChange={e => setNumQ(Number(e.target.value))}
                  min={3} max={20}
                  className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600"
                />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Difficulty</label>
                <select value={difficulty} onChange={e => setDifficulty(e.target.value as Difficulty)} className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600">
                  {(['Easy', 'Medium', 'Hard', 'Mixed'] as Difficulty[]).map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Competency</label>
                <select value={competency} onChange={e => setCompetency(e.target.value)} className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600">
                  {['Sampling Methods', 'Survey Design', 'Python for Statistical Analysis', 'Data Quality & Validation', 'National Accounts'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Language</label>
                <select value={language} onChange={e => setLanguage(e.target.value as Lang)} className="w-full border border-slate-200 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-navy-600">
                  {(['English', 'हिन्दी', 'Both'] as Lang[]).map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!file || generating}
            className="w-full py-3 bg-navy-900 text-white font-semibold rounded hover:bg-navy-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generating ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">↻</span>
                {GENERATION_STEPS[stepIdx]}
              </span>
            ) : '⚡ Generate Assessment'}
          </button>
        </div>

        {/* How it works */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-navy-900 mb-3">How it works</h4>
            <ol className="space-y-3">
              {['Upload a training document (PDF, PPT, DOCX)', 'AI extracts key concepts and maps them to competencies', 'Questions are generated with correct answers and explanations', 'Trainer reviews, edits and approves each question', 'Assessment is published to selected officials'].map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="w-4 h-4 rounded-full bg-navy-100 text-navy-800 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </div>

          <div className="bg-navy-50 border border-navy-100 rounded-md p-4">
            <h4 className="text-sm font-semibold text-navy-900 mb-2">AI Quality</h4>
            <p className="text-xs text-slate-600">All generated questions include AI confidence scores. Questions with confidence below 80% are automatically flagged for human review before publication.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
