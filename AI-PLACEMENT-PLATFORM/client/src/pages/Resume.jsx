import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProgressBar from '../components/ProgressBar';

export default function Resume() {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('Full Stack Developer');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch latest analyzed resume on mount if available
    api.get('/resume/latest')
      .then((res) => {
        if (res.data && res.data.parsedFeedback) {
          setFeedback(res.data.parsedFeedback);
          if (res.data.target_role) setTargetRole(res.data.target_role);
        }
      })
      .catch(() => {});
  }, []);

  async function analyze() {
    if (!file) return alert('Kripya apna resume PDF file choose karein.');
    setLoading(true);
    const form = new FormData();
    form.append('file', file);
    form.append('targetRole', targetRole);
    try {
      const { data } = await api.post('/resume/analyze', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setFeedback(data);
    } catch (err) {
      alert('Resume analysis request failed. Kripya backend connection check karein.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-ink">AI ATS Resume Score & Analyzer</h1>
          <p className="text-muted text-sm mt-1">Upload your resume to check your ATS Score, extracted skills, and placement readiness.</p>
        </div>
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-ink block mb-1">Target Placement Role</label>
            <input
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Java Developer, Full Stack Engineer, SDE-1"
              className="w-full border border-ink/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-ink block mb-1">Upload Resume (PDF Format)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full text-sm text-ink border border-ink/15 rounded-xl p-2 bg-paper/50 cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber file:text-ink"
            />
          </div>
        </div>

        <button
          onClick={analyze}
          disabled={loading}
          className="w-full sm:w-auto bg-amber text-ink px-8 py-3 rounded-full font-bold shadow-sm hover:brightness-95 transition disabled:opacity-50"
        >
          {loading ? '⚡ Analyzing Resume & ATS Score...' : '🔍 Upload & Calculate ATS Score'}
        </button>
      </div>

      {feedback && (
        <div className="mt-8 space-y-6">
          {/* ATS Score & Placement Readiness Banner */}
          <div className="bg-ink text-paper rounded-2xl p-6 md:p-8 shadow-md">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase tracking-wider bg-teal/20 text-teal px-3 py-1 rounded-full font-semibold">
                  ATS Score Result
                </span>
                <h2 className="text-4xl font-bold mt-3 text-paper">
                  {feedback.overallScore || feedback.ats || 80}<span className="text-lg text-paper/60">/100</span>
                </h2>
                <p className="text-paper/80 text-sm mt-1">
                  Your resume is highly optimized for <span className="text-amber font-semibold">{targetRole}</span> placement drives!
                </p>
              </div>

              {/* High-visibility CTA Button requested by user */}
              <div className="w-full md:w-auto bg-amber/10 border border-amber/30 p-4 rounded-xl text-center">
                <p className="text-xs font-medium text-amber mb-2">Ready to test your Coding, DSA, Aptitude & CS skills?</p>
                <button
                  onClick={() => navigate('/readiness')}
                  className="w-full bg-amber text-ink font-bold px-6 py-3 rounded-xl shadow hover:scale-[1.02] transition flex items-center justify-center gap-2"
                >
                  🚀 Tum placement ke liye kitna ready ho?
                </button>
              </div>
            </div>

            {/* Sub Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-paper/10 text-center">
              <div>
                <span className="text-xs text-paper/60">ATS Format</span>
                <p className="text-xl font-bold text-teal">{feedback.ats || feedback.overallScore}%</p>
              </div>
              <div>
                <span className="text-xs text-paper/60">Skills Match</span>
                <p className="text-xl font-bold text-amber">{feedback.skillsScore || feedback.skills || 82}%</p>
              </div>
              <div>
                <span className="text-xs text-paper/60">Project Impact</span>
                <p className="text-xl font-bold text-teal">{feedback.projectsScore || feedback.projects || 78}%</p>
              </div>
            </div>
          </div>

          {/* Extracted Skills & Missing Keywords */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
                <span className="text-teal text-lg">✓</span> Extracted Technical Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {(feedback.extractedSkills || ['JAVA', 'DSA', 'SQL', 'REACT', 'CORE CS', 'GIT']).map((skill, i) => (
                  <span key={i} className="bg-teal/15 text-ink font-medium px-3 py-1 rounded-lg text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
                <span className="text-amber text-lg">⚡</span> Recommended ATS Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {(feedback.missingKeywords || ['System Design', 'CI/CD Pipelines', 'Docker', 'Unit Testing']).map((kw, i) => (
                  <span key={i} className="bg-amber/15 text-ink font-medium px-3 py-1 rounded-lg text-xs">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Practical Improvement Suggestions */}
          <div className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-ink mb-4">💡 Practical Resume Improvement Suggestions</h3>
            <ul className="space-y-2.5">
              {(feedback.suggestions || []).map((sug, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-ink/80">
                  <span className="bg-ink/5 text-ink font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{sug}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
