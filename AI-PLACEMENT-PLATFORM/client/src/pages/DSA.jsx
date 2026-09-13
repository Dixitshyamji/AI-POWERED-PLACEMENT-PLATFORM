import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const badgeColor = { EASY: 'bg-teal/15 text-teal', MEDIUM: 'bg-amber/20 text-amber', HARD: 'bg-red-100 text-red-600' };

export default function DSA() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    api.get('/dsa/problems').then((res) => setProblems(res.data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-10">
      <h1 className="text-2xl font-bold mb-6">DSA Practice</h1>
      <div className="bg-white border border-ink/10 rounded-2xl divide-y divide-ink/10">
        {problems.map((p) => (
          <Link key={p.id} to={`/dsa/${p.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-paper transition">
            <span className="font-medium">{p.title}</span>
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeColor[p.difficulty]}`}>{p.difficulty}</span>
          </Link>
        ))}
        {problems.length === 0 && <p className="px-6 py-8 text-muted text-sm">No problems yet — add some from the admin/schema seed data.</p>}
      </div>
    </div>
  );
}
