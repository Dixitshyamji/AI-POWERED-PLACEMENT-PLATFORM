import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.svg';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-ink text-paper border-b border-paper/10">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Elevate logo" className="w-9 h-9" />
        <span className="font-display font-bold text-lg tracking-tight">Elevate</span>
      </Link>

      <div className="flex items-center gap-5 text-sm font-medium">
        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-amber transition-colors">Dashboard</Link>
            <Link to="/resume" className="hover:text-amber transition-colors">Resume & ATS</Link>
            <Link to="/readiness" className="hover:text-amber transition-colors font-bold text-amber">Placement Test 🚀</Link>
            <Link to="/dsa" className="hover:text-amber transition-colors">DSA</Link>
            <Link to="/aptitude" className="hover:text-amber transition-colors">Aptitude</Link>
            <Link to="/companies" className="hover:text-amber transition-colors">Company Playlists</Link>
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="bg-amber text-ink px-4 py-1.5 rounded-full font-bold hover:brightness-95 transition text-xs"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-amber transition-colors">Log in</Link>
            <Link to="/register" className="bg-amber text-ink px-4 py-1.5 rounded-full font-bold hover:brightness-95 transition">
              Start preparing
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
