import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Aptitude() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    api.get('/aptitude/questions').then((res) => setQuestions(res.data));
  }, []);

  function choose(qId, opt) {
    setAnswers({ ...answers, [qId]: opt });
  }

  async function submit() {
    const { data } = await api.post('/aptitude/submit', { answers });
    setResult(data);
  }

  if (result) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Test complete</h1>
        <p className="text-5xl font-display font-bold text-amber my-6">{result.accuracy}%</p>
        <p className="text-muted">Score: {result.score} / {result.total}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 md:px-10 py-10">
      <h1 className="text-2xl font-bold mb-6">Aptitude Test</h1>
      <div className="space-y-6">
        {questions.map((q, i) => (
          <div key={q.id} className="bg-white border border-ink/10 rounded-2xl p-6">
            <p className="font-medium mb-4">{i + 1}. {q.question}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {['A', 'B', 'C', 'D'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => choose(q.id, opt)}
                  className={`text-left text-sm px-4 py-2 rounded-lg border transition ${
                    answers[q.id] === opt ? 'border-teal bg-teal/10' : 'border-ink/10 hover:border-ink/30'
                  }`}
                >
                  {q[`option_${opt.toLowerCase()}`]}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {questions.length > 0 && (
        <button onClick={submit} className="mt-8 bg-ink text-paper px-6 py-3 rounded-full font-semibold">
          Submit test
        </button>
      )}
    </div>
  );
}
