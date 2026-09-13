import React from 'react';
import { Link } from 'react-router-dom';
import ReadinessGauge from '../components/ReadinessGauge';

const features = [
  { title: 'DSA Practice', desc: 'Solve curated array, string, tree and graph problems with an in-browser editor.' },
  { title: 'AI Code Tutor', desc: 'Get your code explained, dry-run line by line, or optimized on demand.' },
  { title: 'Resume Analyzer', desc: 'Upload your resume and get an ATS score plus concrete rewrite suggestions.' },
  { title: 'AI Mock Interview', desc: 'Practice with an interviewer that asks real follow-up questions.' },
  { title: 'Aptitude Tests', desc: 'Timed quantitative, logical and verbal sections with instant scoring.' },
  { title: 'Study Planner', desc: 'A day-by-day plan built around your target role and available time.' },
];

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-ink text-paper watermark-bg">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Know exactly how ready you are for placements.
            </h1>
            <p className="mt-5 text-paper/70 text-lg max-w-md">
              One score that tracks your DSA, aptitude, core CS and interview skills —
              with an AI mentor guiding what to fix next.
            </p>
            <div className="mt-8 flex gap-4">
              <Link to="/register" className="bg-amber text-ink px-6 py-3 rounded-full font-semibold hover:brightness-95 transition">
                Start preparing
              </Link>
              <Link to="/login" className="border border-paper/30 px-6 py-3 rounded-full font-semibold hover:bg-paper/10 transition">
                I already have an account
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <ReadinessGauge value={78} />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 md:px-10 py-16">
        <h2 className="text-2xl font-bold mb-10">Everything one placement season needs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="p-6 rounded-2xl border border-ink/10 bg-white hover:border-teal/50 transition-colors">
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal/10 border-t border-teal/20">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className="text-2xl font-bold">Your readiness score starts at zero. Let's change that.</h3>
          <Link to="/register" className="bg-ink text-paper px-6 py-3 rounded-full font-semibold hover:bg-inkSoft transition whitespace-nowrap">
            Create free account
          </Link>
        </div>
      </section>
    </div>
  );
}
