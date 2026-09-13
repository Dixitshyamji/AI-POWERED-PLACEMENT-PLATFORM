import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ReadinessGauge from '../components/ReadinessGauge';
import ProgressBar from '../components/ProgressBar';

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [hasUploadedResume, setHasUploadedResume] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      api.get('/students/dashboard'),
      api.get('/resume/latest').catch(() => ({ data: null }))
    ])
      .then(([dashRes, resumeRes]) => {
        setData(dashRes.data);
        if (resumeRes.data && (resumeRes.data.overall_score || resumeRes.data.parsedFeedback)) {
          setHasUploadedResume(true);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-10 text-muted">Loading your dashboard…</div>;

  const p = data?.progress || {};
  const isResumeDone = hasUploadedResume || (p.resume_score && p.resume_score > 0);

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
      {/* Step Guidance Banner based on User Request */}
      <div className="bg-ink text-paper rounded-2xl p-6 md:p-8 mb-8 shadow-md border border-amber/30">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber text-ink text-xs font-black uppercase px-3 py-1 rounded-full">
                Step 1 of 2
              </span>
              <span className="text-xs text-paper/70 font-semibold uppercase tracking-wider">
                Placement Flow
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-paper">
              {isResumeDone
                ? '✅ Step 1 Completed: Resume Uploaded & ATS Score Calculated!'
                : '📄 Step 1: Pehle Login karke Resume Upload karo & ATS Score check karo'}
            </h1>
            <p className="text-paper/80 text-sm mt-1.5 leading-relaxed">
              {isResumeDone
                ? 'Aapka ATS score calculate ho chuka hai. Ab Step 2 Placement Readiness Test dene ke liye ready hain!'
                : 'Sabse pehle apna Resume PDF upload karke ATS score check karo. Iske baad "Tum placement ke liye kitna ready ho?" test button unlock ho jayega.'}
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full md:w-auto">
            {!isResumeDone ? (
              <button
                onClick={() => navigate('/resume')}
                className="w-full bg-amber text-ink font-extrabold px-8 py-3.5 rounded-xl shadow hover:brightness-95 transition flex items-center justify-center gap-2 whitespace-nowrap"
              >
                📄 Pehle Resume Upload Karo & ATS Score Dekho →
              </button>
            ) : (
              <button
                onClick={() => navigate('/readiness')}
                className="w-full bg-amber text-ink font-extrabold px-8 py-3.5 rounded-xl shadow hover:scale-[1.02] transition flex items-center justify-center gap-2 whitespace-nowrap animate-bounce"
              >
                🚀 Tum placement ke liye kitna ready ho? (Take Test) →
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-ink rounded-2xl p-8 flex flex-col items-center justify-center text-paper text-center md:col-span-1 shadow-md">
          <ReadinessGauge value={data?.readiness || 0} size={160} />
          <p className="text-xs text-paper/70 mt-4 uppercase tracking-wider font-semibold">Overall Placement Readiness</p>
        </div>

        <div className="bg-white border border-ink/10 rounded-2xl p-8 md:col-span-2 shadow-sm">
          <h2 className="font-bold text-ink mb-6 text-lg">Skill breakdown</h2>
          <ProgressBar label="DSA Score" value={p.dsa_score || 0} color="bg-teal" />
          <ProgressBar label="Aptitude Score" value={p.aptitude_score || 0} color="bg-amber" />
          <ProgressBar label="Core CS Score" value={p.core_cs_score || 0} color="bg-teal" />
          <ProgressBar label="Resume ATS Score" value={p.resume_score || 0} color="bg-amber" />
        </div>
      </div>

      {/* Quick Feature Action Cards */}
      <div className="mt-8 grid sm:grid-cols-3 gap-6">
        <div
          onClick={() => navigate('/resume')}
          className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm hover:border-amber transition cursor-pointer"
        >
          <div className="text-2xl mb-2">📄</div>
          <h3 className="font-bold text-ink flex items-center justify-between">
            <span>Resume & ATS Score</span>
            {isResumeDone && <span className="text-xs text-teal font-bold bg-teal/10 px-2 py-0.5 rounded-full">Checked</span>}
          </h3>
          <p className="text-muted text-xs mt-1">Upload resume PDF to extract skills and calculate ATS score.</p>
        </div>

        <div
          onClick={() => {
            if (!isResumeDone) {
              alert('Pehle Resume upload karke ATS Score check karein, fir placement readiness test dein!');
              navigate('/resume');
            } else {
              navigate('/readiness');
            }
          }}
          className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm hover:border-teal transition cursor-pointer"
        >
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="font-bold text-ink">Placement Readiness Test</h3>
          <p className="text-muted text-xs mt-1">Take Coding, DSA, Aptitude & Core CS test to verify placement readiness.</p>
        </div>

        <div
          onClick={() => navigate('/companies')}
          className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm hover:border-amber transition cursor-pointer"
        >
          <div className="text-2xl mb-2">🏢</div>
          <h3 className="font-bold text-ink">Company Playlists & Hiring</h3>
          <p className="text-muted text-xs mt-1">TCS, Infosys, Cognizant, Capgemini & Amazon selection process & kits.</p>
        </div>
      </div>
    </div>
  );
}
