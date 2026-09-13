import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function ReadinessTest() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);
  const [showImprovementPlan, setShowImprovementPlan] = useState(false);
  const [hasProjectQuestions, setHasProjectQuestions] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    api.get('/readiness/questions')
      .then((res) => {
        setQuestions(res.data.questions || []);
        setHasProjectQuestions(res.data.hasProjectQuestions || false);
      })
      .catch((err) => {
        console.error('Error fetching questions:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleOptionSelect(questionId, optionKey) {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  }

  async function handleSubmit() {
    if (Object.keys(answers).length === 0) {
      if (!confirm('Aapne koi question attempt nahi kiya hai. Kya aap sure hain ki test submit karna hai?')) {
        return;
      }
    }
    setSubmitting(true);
    try {
      const { data } = await api.post('/readiness/submit', { answers });
      setResult(data);
    } catch (err) {
      alert('Test submission failed. Kripya try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center text-ink/70 font-medium">
        <div className="animate-spin w-8 h-8 border-4 border-amber border-t-transparent rounded-full mx-auto mb-4"></div>
        Placement Readiness Test load ho raha hai... Resume se personalized questions bhi add kiye ja rahe hain!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal tracking-wider uppercase mb-1">
          <span>Placement Assessment</span> • <span>Coding | DSA | Aptitude | Core CS{hasProjectQuestions ? ' | Your Projects' : ''}</span>
        </div>
        <h1 className="text-3xl font-bold text-ink">Tum Placement Ke Liye Kitna Ready Ho?</h1>
        <p className="text-muted text-sm mt-1">
          Ye test aapke Coding, Data Structures & Algorithms, Aptitude, aur Core CS concepts ko analyze karta hai.
          {hasProjectQuestions && (
            <span className="ml-1 font-semibold text-amber">
              + 2 personalized questions aapke resume projects se bhi add hain! 🎯
            </span>
          )}
        </p>
      </div>

      {!result ? (
        /* Question Form Screen */
        <div className="space-y-8">
          {questions.map((q, idx) => (
            <div
              key={q.id}
              className={`bg-white border rounded-2xl p-6 md:p-8 shadow-sm ${
                q.category === 'Project-Based'
                  ? 'border-amber/50 ring-1 ring-amber/30 bg-amber/5'
                  : 'border-ink/10'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    q.category === 'Project-Based'
                      ? 'bg-amber/20 text-amber border border-amber/30'
                      : 'bg-ink/5 text-ink/70'
                  }`}
                >
                  {q.category === 'Project-Based' ? '🎯 ' : ''}Q{idx + 1} • {q.category} ({q.topic})
                </span>

                {answers[q.id] && (
                  <span className="text-xs font-semibold text-teal bg-teal/10 px-2.5 py-0.5 rounded-full">
                    Attempted
                  </span>
                )}
              </div>

              <h2 className="text-base md:text-lg font-bold text-ink mb-5 leading-relaxed">
                {q.question}
              </h2>

              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { key: 'A', text: q.option_a },
                  { key: 'B', text: q.option_b },
                  { key: 'C', text: q.option_c },
                  { key: 'D', text: q.option_d }
                ].map((opt) => {
                  const isSelected = answers[q.id] === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => handleOptionSelect(q.id, opt.key)}
                      className={`text-left p-4 rounded-xl border transition flex items-start gap-3 text-sm font-medium ${
                        isSelected
                          ? 'border-amber bg-amber/10 text-ink shadow-sm'
                          : 'border-ink/15 hover:border-ink/30 bg-paper/30 text-ink'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs flex-shrink-0 ${
                          isSelected ? 'bg-amber text-ink' : 'bg-ink/10 text-ink/70'
                        }`}
                      >
                        {opt.key}
                      </span>
                      <span>{opt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex justify-end pt-4">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-amber text-ink font-bold text-base px-10 py-3.5 rounded-full shadow hover:brightness-95 transition disabled:opacity-50"
            >
              {submitting ? 'Submitting Test...' : 'Submit & Check Placement Readiness'}
            </button>
          </div>
        </div>
      ) : (
        /* Results Screen */
        <div className="space-y-8">
          {/* Main Status Card */}
          <div
            className={`rounded-2xl p-8 text-paper shadow-lg ${
              result.status === 'READY'
                ? 'bg-gradient-to-br from-ink via-ink to-teal/30 border border-teal/30'
                : 'bg-gradient-to-br from-ink via-ink to-amber/30 border border-amber/30'
            }`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold bg-white/10 px-3 py-1 rounded-full text-paper/80">
                  Assessment Evaluation
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold mt-3 text-paper">
                  {result.headline}
                </h2>
                <p className="text-paper/80 text-sm mt-2">
                  Aapka overall score <span className="font-bold text-amber">{result.percentage}%</span> hai ({result.score} out of {result.total} questions correct).
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center min-w-[140px]">
                <div className="text-5xl font-black text-amber">{result.percentage}%</div>
                <div className="text-xs uppercase tracking-wider font-semibold text-paper/70 mt-1">Readiness Score</div>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-paper/10">
              {Object.entries(result.categoryStats || {}).map(([cat, stat]) => (
                <div key={cat} className="bg-white/5 p-3 rounded-xl">
                  <span className="text-xs text-paper/60 block">{cat}</span>
                  <span className="text-lg font-bold text-paper">
                    {stat.correct}/{stat.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* User Asked Interactive Inquiry Prompt */}
          <div className="bg-white border border-ink/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ink/10 pb-6">
              <div>
                <h3 className="text-xl font-bold text-ink">
                  Tumhe chahiye ki tumhe kya prepare krna hai? 🤔
                </h3>
                <p className="text-muted text-sm mt-1">
                  Click below to view your personalized performance breakdown and topic improvement guide.
                </p>
              </div>

              <button
                onClick={() => setShowImprovementPlan(!showImprovementPlan)}
                className="bg-amber text-ink font-bold px-6 py-2.5 rounded-full hover:brightness-95 transition flex items-center justify-center gap-2 self-start sm:self-auto text-sm"
              >
                {showImprovementPlan ? '▲ Hide Analysis' : '▼ Dekho Mujhe Kya Prepare Krna Hai'}
              </button>
            </div>

            {showImprovementPlan && (
              <div className="space-y-6 animate-fadeIn">
                {/* Weak Topics Highlight */}
                {result.weakTopics && result.weakTopics.length > 0 && (
                  <div className="bg-amber/10 border border-amber/30 rounded-xl p-5">
                    <h4 className="font-bold text-ink mb-2 flex items-center gap-2">
                      <span>⚠️</span> Topics That Need Improvement
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.weakTopics.map((topic, i) => (
                        <span key={i} className="bg-white border border-amber/40 text-ink font-semibold px-3 py-1 rounded-lg text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specific Recommendations */}
                <div>
                  <h4 className="font-bold text-ink mb-3">🎯 Tailored Improvement Recommendations</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {(result.improvements || []).map((imp, i) => (
                      <div key={i} className="bg-paper/60 border border-ink/10 p-4 rounded-xl">
                        <span className="text-xs font-bold text-teal uppercase tracking-wider block mb-1">
                          {imp.area}
                        </span>
                        <p className="text-sm text-ink/90 font-medium">{imp.recommendation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question-by-Question Review */}
                <div>
                  <h4 className="font-bold text-ink mb-3">📝 Detailed Question Analysis</h4>
                  <div className="space-y-3">
                    {(result.questionResults || []).map((qr, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-xl border text-sm ${
                          qr.isCorrect ? 'bg-teal/5 border-teal/20' : 'bg-red-50/50 border-red-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold mb-1">
                          <span>
                            Q{i + 1}. {qr.question}
                          </span>
                          <span className={qr.isCorrect ? 'text-teal' : 'text-red-600'}>
                            {qr.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                          </span>
                        </div>
                        <p className="text-xs text-muted mb-2">
                          Category: {qr.category} ({qr.topic}) | Your Answer: <strong className="text-ink">{qr.userAnswer}</strong> | Correct: <strong className="text-teal">{qr.correctOption}</strong>
                        </p>
                        <p className="text-xs bg-white p-2.5 rounded border border-ink/5 text-ink/80">
                          💡 <strong>Explanation:</strong> {qr.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Company Playlists Shortcut */}
                <div className="bg-ink text-paper p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-amber text-base">Want Company-wise DSA & Aptitude Playlists?</h4>
                    <p className="text-xs text-paper/70 mt-0.5">Explore TCS, Infosys, Amazon, Microsoft & Wipro curated problem kits.</p>
                  </div>
                  <button
                    onClick={() => navigate('/companies')}
                    className="bg-amber text-ink font-bold px-5 py-2.5 rounded-full text-xs hover:brightness-95 transition"
                  >
                    Go to Company Playlists 🚀
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
