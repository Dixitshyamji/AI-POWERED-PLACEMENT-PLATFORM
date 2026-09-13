import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function Problem() {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [code, setCode] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    api.get(`/dsa/problems/${id}`).then((res) => {
      setProblem(res.data);
      setCode(res.data.starter_code || '');
    });
  }, [id]);

  async function runAI(action) {
    setAiLoading(true);
    setAiResult('');
    try {
      const endpoint = action === 'explain' ? '/ai/explain-code' : '/ai/dry-run';
      const { data } = await api.post(endpoint, { code, input: '[2,7,11,15], target=9' });
      setAiResult(data.explanation || data.dryRun);
    } catch (err) {
      setAiResult('AI Assistant request failed. Kripya check karein ki Gemini API key configured hai ya nahi.');
    } finally {
      setAiLoading(false);
    }
  }

  async function submit() {
    await api.post(`/dsa/problems/${id}/submit`, { language: 'java', code, status: 'ACCEPTED' });
    alert('🎉 Solution submitted successfully! DSA score updated.');
  }

  if (!problem) return <div className="p-10 text-muted">Loading DSA problem…</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 grid md:grid-cols-2 gap-8">
      <div className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider bg-teal/15 text-teal px-3 py-1 rounded-full">
            DSA Problem #{problem.id}
          </span>
          <span className="text-xs font-bold bg-amber/20 text-ink px-3 py-1 rounded-full">
            {problem.difficulty}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-ink mb-4">{problem.title}</h1>
        <p className="text-sm leading-relaxed text-ink/80 whitespace-pre-wrap">{problem.description}</p>

        {problem.examples && (
          <div className="mt-6 pt-4 border-t border-ink/10">
            <h3 className="text-xs font-bold uppercase text-muted tracking-wider mb-2">Example Cases:</h3>
            <pre className="bg-paper p-3 rounded-xl text-xs font-mono border border-ink/10 text-ink">
              {typeof problem.examples === 'string' ? problem.examples : JSON.stringify(problem.examples, null, 2)}
            </pre>
          </div>
        )}
      </div>

      <div>
        <div className="bg-ink rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between text-paper/70 text-xs font-mono mb-2 px-1">
            <span>Solution Code (Java / C++)</span>
            <span>Gemini AI Tutor Ready</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full font-mono text-sm bg-ink text-paper rounded-xl p-3 focus:outline-none border border-paper/10"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => runAI('explain')}
            disabled={aiLoading}
            className="text-sm bg-teal text-ink px-4 py-2 rounded-full font-bold shadow hover:brightness-95 transition"
          >
            💡 Explain with Gemini AI
          </button>
          <button
            onClick={() => runAI('dryrun')}
            disabled={aiLoading}
            className="text-sm bg-amber text-ink px-4 py-2 rounded-full font-bold shadow hover:brightness-95 transition"
          >
            🏃 Step-by-Step Dry Run
          </button>
          <button
            onClick={submit}
            className="text-sm bg-ink text-paper px-6 py-2 rounded-full font-bold shadow hover:bg-ink/90 transition ml-auto"
          >
            Submit Code
          </button>
        </div>

        {aiLoading && (
          <div className="mt-4 text-sm text-teal font-medium animate-pulse flex items-center gap-2">
            <div className="w-3 h-3 bg-teal rounded-full animate-ping"></div>
            Gemini AI code padh raha hai aur explanation generate kar raha hai...
          </div>
        )}

        {aiResult && (
          <div className="mt-4 bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-ink mb-2 flex items-center gap-2">
              <span>🤖</span> Gemini AI Explanation & Analysis:
            </h3>
            <pre className="text-xs md:text-sm whitespace-pre-wrap font-sans text-ink/90 leading-relaxed bg-paper/60 p-4 rounded-xl border border-ink/5">
              {aiResult}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
