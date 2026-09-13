import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function CompanyPlaylists() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/companies')
      .then((res) => {
        setCompanies(res.data || []);
        if (res.data && res.data.length > 0) {
          setSelectedCompanyId(res.data[0].id);
        }
      })
      .catch((err) => console.error('Error fetching company playlists:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16 text-center text-ink/70 font-medium">
        <div className="animate-spin w-8 h-8 border-4 border-amber border-t-transparent rounded-full mx-auto mb-4"></div>
        Company Playlists & Selection Process load ho rahe hain...
      </div>
    );
  }

  const activeCompany = companies.find((c) => c.id === selectedCompanyId) || companies[0];
  const sp = activeCompany?.selectionProcess || {};

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-teal tracking-wider uppercase mb-1">
          <span>Target Preparation</span> • <span>Company-wise Selection Process & Playlists</span>
        </div>
        <h1 className="text-3xl font-bold text-ink">Company Selection Process & Playlists</h1>
        <p className="text-muted text-sm mt-1">
          Explore complete hiring rounds, eligibility criteria, top asked DSA questions, and Aptitude video kits for top tech giants.
        </p>
      </div>

      {/* Company Selector Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {companies.map((comp) => {
          const isActive = comp.id === selectedCompanyId;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedCompanyId(comp.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm transition whitespace-nowrap border ${
                isActive
                  ? 'bg-ink text-paper border-ink shadow-md'
                  : 'bg-white text-ink/80 border-ink/10 hover:border-ink/30 hover:bg-paper/50'
              }`}
            >
              <span className="text-lg">{comp.logo}</span>
              <span>{comp.name}</span>
            </button>
          );
        })}
      </div>

      {activeCompany && (
        <div className="space-y-8">
          {/* Company Overview Card */}
          <div className="bg-ink text-paper rounded-2xl p-6 md:p-8 shadow-md border border-ink/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{activeCompany.logo}</span>
                  <h2 className="text-3xl font-bold text-paper">{activeCompany.name}</h2>
                  <span className="bg-amber text-ink text-xs font-bold px-3 py-1 rounded-full">
                    {activeCompany.difficulty}
                  </span>
                </div>
                <p className="text-paper/80 text-sm">{activeCompany.tagline}</p>
              </div>

              <div className="bg-white/10 p-4 rounded-xl text-xs space-y-1.5 md:min-w-[260px]">
                <div className="font-bold text-amber uppercase tracking-wider">Hiring Pattern & Format</div>
                <div className="text-paper/80">⏱️ Aptitude: <strong>{activeCompany.pattern?.aptitudeDuration}</strong></div>
                <div className="text-paper/80">💻 DSA: <strong>{activeCompany.pattern?.dsaQuestions}</strong></div>
              </div>
            </div>

            {/* Selection Rounds List */}
            <div className="mt-6 pt-6 border-t border-paper/10">
              <span className="text-xs uppercase tracking-wider font-semibold text-paper/60 block mb-2">
                Hiring Selection Rounds
              </span>
              <div className="flex flex-wrap gap-2">
                {(activeCompany.rounds || []).map((round, idx) => (
                  <span key={idx} className="bg-white/10 text-paper text-xs font-medium px-3 py-1.5 rounded-lg">
                    Round {idx + 1}: {round}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Selection Process Breakdown */}
          <div className="bg-white border border-ink/10 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-ink flex items-center gap-2 border-b border-ink/10 pb-4">
              <span>📋</span> Detailed {activeCompany.name} Selection Process & Eligibility
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-paper/50 border border-ink/10 p-5 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal block">
                  🎓 Academic Eligibility Criteria
                </span>
                <p className="text-sm text-ink/90 font-medium">{sp.eligibility || '60% throughout academics'}</p>
              </div>

              <div className="bg-amber/10 border border-amber/30 p-5 rounded-xl space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-ink block">
                  💡 Selection & Cracking Tip
                </span>
                <p className="text-sm text-ink/90 font-medium">{sp.selectionTips || 'Focus on time management and speed.'}</p>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-ink text-sm uppercase tracking-wider text-muted">Round-by-Round Breakdown</h4>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-ink/10 rounded-xl p-4 bg-white shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-ink text-sm mb-2">
                    <span className="bg-ink text-paper w-5 h-5 rounded-full flex items-center justify-center text-xs">1</span>
                    <span>Round 1: Assessment</span>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">{sp.round1 || 'Aptitude & Verbal online test.'}</p>
                </div>

                <div className="border border-ink/10 rounded-xl p-4 bg-white shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-ink text-sm mb-2">
                    <span className="bg-teal text-ink w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold">2</span>
                    <span>Round 2: Coding/Technical</span>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">{sp.round2 || 'Data Structures & Algorithmic Coding.'}</p>
                </div>

                <div className="border border-ink/10 rounded-xl p-4 bg-white shadow-xs">
                  <div className="flex items-center gap-2 font-bold text-ink text-sm mb-2">
                    <span className="bg-amber text-ink w-5 h-5 rounded-full flex items-center justify-center text-xs font-extrabold">3</span>
                    <span>Round 3: Interview</span>
                  </div>
                  <p className="text-xs text-ink/80 leading-relaxed">{sp.round3 || 'Technical & HR Interview.'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* DSA & Aptitude Playlists Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* DSA Playlists */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink flex items-center gap-2">
                  <span className="text-teal">💻</span> {activeCompany.name} DSA & Coding Playlists
                </h3>
                <button
                  onClick={() => navigate('/dsa')}
                  className="text-xs font-bold text-teal hover:underline"
                >
                  Practice DSA →
                </button>
              </div>

              {(activeCompany.dsaPlaylists || []).map((pl, idx) => (
                <div key={idx} className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm hover:border-teal/50 transition space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-ink text-base leading-snug">{pl.title}</h4>
                    <span className="bg-teal/15 text-ink font-bold text-xs px-2.5 py-1 rounded-full flex-shrink-0">
                      {pl.count}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(pl.topics || []).map((t, i) => (
                      <span key={i} className="bg-paper text-ink/70 text-xs px-2.5 py-1 rounded-md border border-ink/5">
                        • {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={pl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-ink bg-amber px-4 py-2 rounded-full hover:brightness-95 transition mt-2"
                  >
                    ▶ Open Video Playlist / Problems
                  </a>
                </div>
              ))}
            </div>

            {/* Aptitude Playlists */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-ink flex items-center gap-2">
                  <span className="text-amber">🧠</span> {activeCompany.name} Aptitude & Reasoning Kits
                </h3>
                <button
                  onClick={() => navigate('/aptitude')}
                  className="text-xs font-bold text-amber hover:underline"
                >
                  Practice Aptitude →
                </button>
              </div>

              {(activeCompany.aptitudePlaylists || []).map((pl, idx) => (
                <div key={idx} className="bg-white border border-ink/10 rounded-2xl p-6 shadow-sm hover:border-amber/50 transition space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-bold text-ink text-base leading-snug">{pl.title}</h4>
                    <span className="bg-amber/15 text-ink font-bold text-xs px-2.5 py-1 rounded-full flex-shrink-0">
                      {pl.count}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {(pl.topics || []).map((t, i) => (
                      <span key={i} className="bg-paper text-ink/70 text-xs px-2.5 py-1 rounded-md border border-ink/5">
                        • {t}
                      </span>
                    ))}
                  </div>

                  <a
                    href={pl.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-ink bg-amber px-4 py-2 rounded-full hover:brightness-95 transition mt-2"
                  >
                    ▶ Open Video Playlist & Formula Sheets
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
