import { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getOfficialById, getGapsFor } from '../../data/index';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const EXAMPLE_QUERIES = [
  'Why do I need to learn Python?',
  'Explain stratified sampling in simple terms',
  'What should I learn after SQL?',
  'Suggest courses for becoming proficient in AI/ML',
  'Which skills should I improve for my next role?',
  'How long will it take to close my critical gaps?',
];

const MOCK_RESPONSES: Record<string, string> = {
  python: `Python is now central to modern statistical work at MoSPI. Your current role as a Statistical Officer requires automated data processing, reproducible analysis, and integration with national data pipelines — all of which depend on Python.

Your current Python level is below the required threshold, which is flagged as a critical gap in your profile. Specifically, your role needs Level 3 (Working Knowledge), while your assessed level is Level 2.

Closing this gap is estimated to take 50 minutes using the targeted iGOT Karmayogi module. I'd recommend starting with "Python for Statistical Data Processing" immediately.`,

  sampling: `Stratified sampling divides the population into distinct subgroups (called strata) based on a shared characteristic — such as region, income group, or industry type — and then samples from each stratum separately.

**Why is it useful?**
It ensures every important subgroup is represented in the final sample, which improves the precision of estimates especially when subgroups differ significantly from each other.

**A simple example:** If MoSPI conducts a survey of enterprises across India, stratifying by state ensures every state is proportionally represented — rather than relying on chance to include smaller states.

**Key formula:** The overall estimate is a weighted average of stratum-level estimates, weighted by stratum size.

This is one of the core competencies for your role. Your evidence shows working knowledge — you may want to validate this with the Sampling Methods assessment.`,

  sql: `After SQL, the most logical progression depends on your role context:

1. **Python (Pandas + SQLAlchemy)** — combining SQL querying skills with Python data manipulation unlocks full-stack data analysis. This is your highest-priority gap.

2. **Data Visualization** — once you can query and transform data, communicating findings effectively is the natural next step. Tools: Tableau, Power BI, or Python (matplotlib/seaborn).

3. **Statistical Analysis using R** — for more advanced statistical modelling, R integrates well with SQL data sources and is widely used in official statistics.

4. **Cloud Data Platforms** — as government moves to cloud infrastructure, understanding cloud-based SQL (BigQuery, Azure SQL) is increasingly relevant.

Based on your profile, I'd recommend Python next — it closes your critical gap and builds directly on your SQL foundation.`,

  aiml: `For AI/ML proficiency in the context of official statistics, here is a structured path:

**Foundation (if not already covered):**
- Python for Data Analysis (your current gap — address this first)
- Statistics for ML (probability, distributions, hypothesis testing)

**Core ML:**
- "AI/ML for Government Statistics" — available on iGOT Karmayogi
- Supervised Learning: regression, classification, decision trees
- Unsupervised Learning: clustering for survey segmentation

**Applied to MoSPI context:**
- Anomaly detection in census/survey data
- Predictive modelling for economic indicators
- NLP for text data in official documents

**Timeline estimate:** 40–60 hours of structured learning to reach Level 3 (Working Knowledge), which is the requirement for your current role.

I can identify specific iGOT courses for any of these stages — just ask.`,

  default: `That's a great question. Based on your current competency profile and role as a Statistical Officer, here is what I can tell you:

Your strongest areas are in Statistical Methodology and Survey Design, where your evidence confidence is above 85%. These are genuine strengths you can build on.

Your development priorities — based on role requirements — are:
1. **Python** (critical gap, ~50 min to close)
2. **Data Visualization** (high gap, ~35 min)
3. **AI/ML for Statistics** (medium gap, ~90 min)

For career progression toward Deputy Director level, Digital Governance and Behavioural competencies (especially Leadership and Communication) become more important.

Is there a specific area you'd like to explore further? I can explain any competency in depth, suggest a course sequence, or help you understand an assessment result.`,
};

function getMockResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('python')) return MOCK_RESPONSES.python;
  if (q.includes('sampling') || q.includes('stratif')) return MOCK_RESPONSES.sampling;
  if (q.includes('sql') || q.includes('after sql')) return MOCK_RESPONSES.sql;
  if (q.includes('ai') || q.includes('ml') || q.includes('machine')) return MOCK_RESPONSES.aiml;
  return MOCK_RESPONSES.default;
}

function formatResponse(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <p key={i} className="font-semibold text-navy-900 mt-3 mb-1">{line.slice(2, -2)}</p>;
    }
    if (line.match(/^\*\*(.*?)\*\*/)) {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className={line.startsWith('-') ? 'ml-4' : ''}>
          {parts.map((part, j) =>
            part.startsWith('**') ? <strong key={j}>{part.slice(2, -2)}</strong> : part
          )}
        </p>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-2" />;
    return <p key={i} className={line.match(/^\d+\./) ? 'ml-4' : ''}>{line}</p>;
  });
}

export default function AIAssistant() {
  const { currentOfficialId } = useApp();
  const official = getOfficialById(currentOfficialId);
  const criticalGaps = getGapsFor(currentOfficialId, 'CRITICAL');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: `Hello${official ? `, ${official.name.split(' ')[0]}` : ''}! I'm your KaushalSetu AI Learning Assistant.\n\nI can help you understand your competency gaps, explain statistical concepts, suggest learning paths, and guide your career development.\n\n${criticalGaps.length > 0 ? `I can see you have ${criticalGaps.length} critical gap${criticalGaps.length > 1 ? 's' : ''} — would you like to know how to close them?` : "Your profile looks strong — ask me anything about your learning journey."}\n\nWhat would you like to explore?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, thinking]);

  function handleSend(text?: string) {
    const question = (text ?? input).trim();
    if (!question || thinking) return;
    setInput('');

    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: question, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setThinking(true);

    const delay = 900 + Math.random() * 600;
    setTimeout(() => {
      const response = getMockResponse(question);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', text: response, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
      setThinking(false);
    }, delay);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 8rem)' }}>
      {/* Header */}
      <div className="mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white text-lg">🤖</div>
          <div>
            <h1 className="text-xl font-semibold text-navy-900">AI Learning Assistant</h1>
            <p className="text-sm text-slate-500">Personalized guidance for your capability development</p>
          </div>
          <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-teal-50 border border-teal-200 rounded text-xs font-medium text-teal-700">
            <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
            Online
          </div>
        </div>
      </div>

      {/* Example queries */}
      <div className="mb-4 shrink-0">
        <p className="text-xs text-slate-500 mb-2 font-medium">Try asking:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_QUERIES.map(q => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-full text-slate-700 hover:border-navy-400 hover:text-navy-900 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${msg.role === 'assistant' ? 'bg-teal-600 text-white' : 'bg-navy-900 text-white'}`}>
                {msg.role === 'assistant' ? '🤖' : 'AS'}
              </div>
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`px-4 py-3 rounded-lg text-sm leading-relaxed ${msg.role === 'assistant' ? 'bg-slate-50 border border-slate-200 text-slate-800' : 'bg-navy-900 text-white'}`}>
                  {msg.role === 'assistant' ? (
                    <div className="space-y-1">{formatResponse(msg.text)}</div>
                  ) : (
                    msg.text
                  )}
                </div>
                <span className="text-xs text-slate-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {thinking && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm shrink-0">🤖</div>
              <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 p-3 flex gap-3 shrink-0">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about your learning path, competencies, or statistical concepts..."
            rows={2}
            className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded resize-none focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600 text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || thinking}
            className="px-4 py-2 bg-navy-900 text-white text-sm font-medium rounded hover:bg-navy-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed self-end"
          >
            Send
          </button>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-2 shrink-0">
        AI responses are generated for demonstration. Content is based on your competency profile and KaushalSetu learning data.
      </p>
    </div>
  );
}
