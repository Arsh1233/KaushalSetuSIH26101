import { useState } from "react";
import PageHeader from "../../components/ui/PageHeader";

const sampleQuestions = [
  "Which department has the largest Python competency gap?",
  "What skills should be prioritized next quarter?",
  "Which courses provide the highest competency improvement?",
  "Show officials who may require AI/ML training",
  "Which competencies are likely to become critical in 12 months?",
  "Compare Digital Governance readiness across departments",
];

interface BarDatum {
  label: string;
  value: number;
  color: string;
}

interface InsightResult {
  question: string;
  insight: string;
  data: BarDatum[];
}

const mockResults: Record<string, InsightResult> = {
  "Which department has the largest Python competency gap?": {
    question: "Which department has the largest Python competency gap?",
    insight:
      "The Economic Statistics Division shows the widest Python competency gap at 68%, with only 32% of officials meeting the Level 3 benchmark. This is followed by the National Accounts division (54% gap) and the Agricultural Statistics wing (49% gap). Immediate intervention through targeted Python training programmes is recommended for these three divisions.",
    data: [
      { label: "Economic Statistics", value: 68, color: "bg-red-500" },
      { label: "National Accounts", value: 54, color: "bg-amber-500" },
      { label: "Agricultural Stats", value: 49, color: "bg-amber-400" },
      { label: "IT & Systems", value: 21, color: "bg-teal-500" },
      { label: "Administrative", value: 14, color: "bg-teal-400" },
    ],
  },
  "What skills should be prioritized next quarter?": {
    question: "What skills should be prioritized next quarter?",
    insight:
      "Based on current competency gap analysis and upcoming policy mandates, three skills should be prioritised: Data Governance (72% officials below required level), Statistical Modelling (61% gap), and AI/ML Fundamentals (58% gap). Addressing these gaps aligns with the National Data Governance Framework and the Ministry's digital transformation roadmap.",
    data: [
      { label: "Data Governance", value: 72, color: "bg-red-500" },
      { label: "Statistical Modelling", value: 61, color: "bg-amber-500" },
      { label: "AI/ML Fundamentals", value: 58, color: "bg-amber-400" },
      { label: "Digital Literacy", value: 43, color: "bg-yellow-400" },
      { label: "Cybersecurity", value: 38, color: "bg-teal-500" },
    ],
  },
  "Which courses provide the highest competency improvement?": {
    question: "Which courses provide the highest competency improvement?",
    insight:
      "Analysis of post-completion assessments reveals that three iGOT courses consistently deliver the highest competency score uplift. 'Advanced Data Analytics with Python' yields an average +1.8 level improvement, 'Statistical Methods for Policy' shows +1.5, and 'Digital Governance Foundations' produces +1.4. These courses have completion rates above 82% and strong satisfaction scores.",
    data: [
      { label: "Advanced Data Analytics", value: 90, color: "bg-teal-600" },
      { label: "Statistical Methods", value: 75, color: "bg-teal-500" },
      { label: "Digital Governance", value: 70, color: "bg-teal-400" },
      { label: "SQL for Analysts", value: 58, color: "bg-slate-400" },
      { label: "Excel Advanced", value: 42, color: "bg-slate-300" },
    ],
  },
  "Show officials who may require AI/ML training": {
    question: "Show officials who may require AI/ML training",
    insight:
      "Approximately 678 officials (62% of total workforce) are assessed as requiring AI/ML training based on role criticality and current competency scores. The highest concentration is in the Statistics and Data Analysis role cluster (412 officials), followed by Policy Research (156) and IT Systems (110). Prioritising Level 2 AI/ML literacy courses is recommended as the first intervention.",
    data: [
      { label: "Stats & Data Analysis", value: 81, color: "bg-red-500" },
      { label: "Policy Research", value: 67, color: "bg-amber-500" },
      { label: "IT Systems", value: 44, color: "bg-amber-400" },
      { label: "Administrative", value: 28, color: "bg-yellow-400" },
      { label: "Leadership", value: 19, color: "bg-teal-500" },
    ],
  },
  "Which competencies are likely to become critical in 12 months?": {
    question: "Which competencies are likely to become critical in 12 months?",
    insight:
      "Trend modelling and policy horizon scanning indicate that four competencies will shift from 'important' to 'critical' within 12 months: Geospatial Data Analysis (driven by the National GIS Policy), Large Language Model Literacy (AI governance mandates), Cloud Data Infrastructure (cloud-first policy rollout), and Real-Time Data Streaming (proposed NSSO real-time reporting framework).",
    data: [
      { label: "Geospatial Analysis", value: 85, color: "bg-red-500" },
      { label: "LLM Literacy", value: 78, color: "bg-red-400" },
      { label: "Cloud Infrastructure", value: 71, color: "bg-amber-500" },
      { label: "Real-Time Streaming", value: 64, color: "bg-amber-400" },
      { label: "Data Privacy", value: 55, color: "bg-yellow-400" },
    ],
  },
  "Compare Digital Governance readiness across departments": {
    question: "Compare Digital Governance readiness across departments",
    insight:
      "Digital Governance readiness varies significantly across MoSPI departments. The IT & Systems division leads with 79% readiness, reflecting sustained investment in digital upskilling. The Economic Statistics Division lags at 31%, presenting the most critical gap. Organisation-wide readiness stands at 52%, below the Government of India benchmark of 65% set for FY 2026-27.",
    data: [
      { label: "IT & Systems", value: 79, color: "bg-teal-600" },
      { label: "Administrative", value: 61, color: "bg-teal-400" },
      { label: "National Accounts", value: 48, color: "bg-yellow-400" },
      { label: "Agricultural Stats", value: 39, color: "bg-amber-500" },
      { label: "Economic Statistics", value: 31, color: "bg-red-500" },
    ],
  },
};

export default function AIInsights() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InsightResult | null>(null);

  function handleAsk() {
    if (!question.trim()) return;
    setLoading(true);
    setResult(null);
    const matched = mockResults[question.trim()] ?? {
      question: question.trim(),
      insight:
        "Based on current workforce data and competency assessments, the analysis indicates significant variation across departments. The AI model has identified key patterns in training completion rates and competency score distributions that suggest targeted interventions would yield the highest return on investment for the identified skill areas.",
      data: [
        { label: "Category A", value: 72, color: "bg-teal-600" },
        { label: "Category B", value: 58, color: "bg-teal-400" },
        { label: "Category C", value: 44, color: "bg-amber-500" },
        { label: "Category D", value: 31, color: "bg-amber-400" },
      ],
    };
    setTimeout(() => {
      setLoading(false);
      setResult(matched);
    }, 1500);
  }

  function handleChip(q: string) {
    setQuestion(q);
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PageHeader
        title="AI Insights"
        subtitle="Ask natural language questions about workforce competency and training data"
        breadcrumbs={[{ label: "Admin", href: "/admin" }, { label: "AI Insights" }]}
      />

      <div className="flex gap-6 items-start">
        {/* Left panel */}
        <div className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <h2 className="text-base font-semibold text-navy-900 mb-3">Ask a workforce question</h2>
            <textarea
              className="w-full border border-slate-200 rounded-md p-3 text-sm text-slate-800 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-h-[96px]"
              placeholder="Type your question about the workforce, competencies, or training..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAsk();
              }}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAsk}
                disabled={loading || !question.trim()}
                className="px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Generating…" : "Ask AI"}
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Example questions</p>
            <div className="flex flex-wrap gap-2">
              {sampleQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleChip(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="w-96 shrink-0">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm min-h-[400px] flex flex-col">
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-slate-500">Generating insight…</p>
              </div>
            )}
            {!loading && !result && (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-navy-50 flex items-center justify-center text-2xl">✨</div>
                <p className="text-sm font-medium text-slate-600">AI insights will appear here</p>
                <p className="text-xs text-slate-400">Select a sample question or type your own</p>
              </div>
            )}
            {!loading && result && (
              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Question</p>
                  <p className="text-sm font-semibold text-navy-900">{result.question}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Insight</p>
                  <p className="text-sm text-slate-600 leading-relaxed">{result.insight}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Data</p>
                  <div className="flex flex-col gap-2">
                    {result.data.map((d) => (
                      <div key={d.label} className="flex items-center gap-2">
                        <span className="text-xs text-slate-600 w-36 shrink-0 truncate">{d.label}</span>
                        <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${d.color} transition-all duration-700`}
                            style={{ width: `${d.value}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-700 w-8 text-right">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
