import { useState, useRef } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import Badge from '../../components/ui/Badge';

const COMPETENCY_OPTIONS = [
  'Python Programming',
  'R Programming',
  'Statistical Theory',
  'Sampling Methods',
  'Data Visualisation',
  'Data Quality Management',
  'National Accounts',
  'Labour Statistics',
  'Econometric Modelling',
  'Cybersecurity',
  'GIS & Spatial Analysis',
  'SQL & Databases',
  'Artificial Intelligence',
  'Cloud Computing',
  'Survey Management',
  'SDG Monitoring',
];

interface GeneratedQuestion {
  id: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  sourcePage: number;
}

const SAMPLE_QUESTIONS: GeneratedQuestion[] = [
  {
    id: 1,
    text: "In stratified random sampling, which of the following best describes proportional allocation?",
    options: [
      "Each stratum contributes an equal number of samples regardless of size",
      "Sample size from each stratum is proportional to its share of the total population",
      "Strata are selected based on their variance and population mean",
      "Sample units are drawn from strata using systematic intervals",
    ],
    correctIndex: 1,
    explanation: "Proportional allocation assigns sample sizes to strata in proportion to the stratum's share of the total population. This minimises sampling variance when the population is heterogeneous across strata.",
    difficulty: 'Medium',
    sourcePage: 4,
  },
  {
    id: 2,
    text: "The Periodic Labour Force Survey (PLFS) uses which primary sampling design for its urban panel?",
    options: [
      "Simple random sampling with replacement",
      "Two-stage stratified systematic sampling",
      "Cluster sampling with probability proportional to size",
      "Quota sampling based on occupational categories",
    ],
    correctIndex: 1,
    explanation: "PLFS employs a two-stage stratified systematic sampling design for its urban frames. The first stage selects Urban Frame Survey (UFS) blocks, and the second stage selects households within selected blocks.",
    difficulty: 'Hard',
    sourcePage: 7,
  },
  {
    id: 3,
    text: "Which international framework does India primarily follow for GDP estimation methodology?",
    options: [
      "System of National Accounts 1993 (SNA 1993)",
      "European System of National and Regional Accounts (ESA 2010)",
      "System of National Accounts 2008 (SNA 2008)",
      "International Standard Industrial Classification (ISIC Rev. 4)",
    ],
    correctIndex: 2,
    explanation: "India adopted the System of National Accounts 2008 (SNA 2008) framework for its national accounts, with the CSO updating the base year to 2011-12 in alignment with the revised international standards.",
    difficulty: 'Medium',
    sourcePage: 12,
  },
];

export default function AdminAIQuiz() {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [questionCount, setQuestionCount] = useState<'10' | '15' | '20' | '25'>('15');
  const [difficulty, setDifficulty] = useState('Adaptive');
  const [questionType, setQuestionType] = useState('MCQ');
  const [topicFocus, setTopicFocus] = useState('');
  const [competency, setCompetency] = useState('Statistical Theory');
  const [bloomsLevel, setBloomsLevel] = useState('Understand');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) setUploadedFile(file.name);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setUploadedFile(file.name);
  }

  function handleGenerate() {
    if (!uploadedFile) return;
    setGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
    }, 1500);
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="AI Quiz Generator"
        subtitle="Generate competency assessments automatically from uploaded training content"
        breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Assessments', href: '/admin/assessments' }, { label: 'AI Quiz Generator' }]}
      />

      <div className="grid grid-cols-5 gap-5">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4">
            <h3 className="font-semibold text-navy-900 text-sm mb-3">Upload Content</h3>
            <div
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
                uploadedFile
                  ? 'border-teal-400 bg-teal-50'
                  : 'border-slate-300 hover:border-slate-400 bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.ppt,.pptx,.docx,.txt"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadedFile ? (
                <div>
                  <div className="text-2xl mb-1">📄</div>
                  <p className="text-sm font-medium text-teal-700 truncate">{uploadedFile}</p>
                  <p className="text-xs text-teal-600 mt-0.5">File ready for processing</p>
                </div>
              ) : (
                <div>
                  <div className="text-2xl mb-2">⬆</div>
                  <p className="text-sm font-medium text-slate-600">Drop file here or click to upload</p>
                  <p className="text-xs text-slate-400 mt-1">PDF, PPT, DOCX, or Video Transcript</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-md shadow-sm p-4 flex flex-col gap-4">
            <h3 className="font-semibold text-navy-900 text-sm">Configuration</h3>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Question Count</label>
              <div className="flex gap-2">
                {(['10', '15', '20', '25'] as const).map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={`flex-1 py-1.5 text-xs font-medium rounded border transition-colors ${
                      questionCount === n
                        ? 'bg-navy-900 text-white border-navy-900'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {['Easy', 'Medium', 'Hard', 'Adaptive'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Question Type</label>
              <select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {['MCQ', 'Scenario-Based', 'Mixed'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Topic Focus</label>
              <input
                type="text"
                value={topicFocus}
                onChange={(e) => setTopicFocus(e.target.value)}
                placeholder="e.g. Stratified sampling, PLFS methodology..."
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">Competency Mapping</label>
              <select
                value={competency}
                onChange={(e) => setCompetency(e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {COMPETENCY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600 block mb-1.5">{"Bloom's Level"}</label>
              <select
                value={bloomsLevel}
                onChange={(e) => setBloomsLevel(e.target.value)}
                className="w-full border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {['Recall', 'Understand', 'Apply', 'Analyze'].map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!uploadedFile || generating}
              className={`w-full py-2.5 text-sm font-semibold rounded-md transition-all flex items-center justify-center gap-2 ${
                !uploadedFile
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : generating
                  ? 'bg-teal-500 text-white cursor-wait'
                  : 'bg-teal-600 text-white hover:bg-teal-700'
              }`}
            >
              {generating ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                '✦ Generate Quiz'
              )}
            </button>
          </div>
        </div>

        <div className="col-span-3">
          {!generated && !generating && (
            <div className="bg-white border border-dashed border-slate-200 rounded-md h-full flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
              <div className="text-4xl mb-3">✦</div>
              <p className="font-semibold text-navy-900 text-base mb-1">Ready to Generate</p>
              <p className="text-sm text-slate-400 max-w-xs">Upload a document and configure the parameters to generate AI-powered quiz questions.</p>
            </div>
          )}

          {generating && (
            <div className="bg-white border border-slate-200 rounded-md h-full flex flex-col items-center justify-center text-center p-10 min-h-[400px]">
              <div className="inline-block w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4" />
              <p className="font-semibold text-navy-900">Analysing document...</p>
              <p className="text-sm text-slate-400 mt-1">Generating {questionCount} questions mapped to {competency}</p>
            </div>
          )}

          {generated && (
            <div className="flex flex-col gap-4">
              <div className="bg-white border border-slate-200 rounded-md p-4 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-semibold text-navy-900 text-sm">
                    {questionCount} Questions Generated
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {competency} · {bloomsLevel} · {difficulty} · {questionType}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="text-sm px-3 py-1.5 border border-slate-200 text-slate-600 hover:border-slate-300 rounded-md font-medium transition-colors">
                    Edit Questions
                  </button>
                  <button className="text-sm px-3 py-1.5 bg-navy-900 text-white rounded-md font-medium hover:bg-navy-800 transition-colors">
                    Export to Assessment
                  </button>
                </div>
              </div>

              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide px-0.5">Preview (showing 3 of {questionCount})</p>

              {SAMPLE_QUESTIONS.map((q, idx) => (
                <div key={q.id} className="bg-white border border-slate-200 rounded-md shadow-sm p-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-2">
                      <span className="shrink-0 w-6 h-6 bg-navy-100 text-navy-800 text-xs font-bold rounded-full flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium text-navy-900 leading-snug">{q.text}</p>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <Badge variant={q.difficulty === 'Easy' ? 'LOW' : q.difficulty === 'Medium' ? 'MEDIUM' : 'HIGH'}>{q.difficulty}</Badge>
                      <span className="text-xs text-slate-400 self-center">p.{q.sourcePage}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 mb-3 pl-8">
                    {q.options.map((opt, i) => (
                      <div
                        key={i}
                        className={`flex items-start gap-2 px-3 py-2 rounded-md text-sm ${
                          i === q.correctIndex
                            ? 'bg-green-50 border border-green-200 text-green-800'
                            : 'bg-slate-50 border border-slate-100 text-slate-600'
                        }`}
                      >
                        <span className={`shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold ${
                          i === q.correctIndex
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-slate-300 text-slate-400'
                        }`}>
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pl-8 bg-slate-50 rounded-md p-3 border border-slate-100">
                    <p className="text-xs font-medium text-slate-500 mb-0.5">Explanation</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
