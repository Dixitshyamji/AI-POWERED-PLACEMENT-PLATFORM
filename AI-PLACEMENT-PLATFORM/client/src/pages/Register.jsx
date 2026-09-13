import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const pwd = form.password;
  const isLength = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasDigit = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
  const isStrong = isLength && hasUpper && hasLower && hasDigit && hasSpecial;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!isStrong) {
      return setError('Kripya ek strong password banayein (Minimum 8 chars, A-Z, a-z, 0-9, special char).');
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      // Direct post-login flow: Navigate user to Resume Upload & ATS check first as requested!
      navigate('/resume');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-paper px-6 py-10">
      <div className="w-full max-w-md bg-white border border-ink/10 p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold mb-1 text-ink">Create your account</h1>
        <p className="text-muted text-sm mb-6">Start tracking your placement readiness & ATS score today.</p>

        {error && <div className="mb-4 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-ink">Full name</label>
            <input required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="mt-1 w-full border border-ink/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber" />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink">Email Address</label>
            <input type="email" required value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="rahul@example.com"
              className="mt-1 w-full border border-ink/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber" />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink">Strong Password</label>
            <input type="password" required value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="e.g. Placement@2026"
              className="mt-1 w-full border border-ink/15 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber font-mono" />
            
            {/* Real-time Password Strength Checkers */}
            <div className="mt-3 p-3 bg-paper/60 border border-ink/5 rounded-xl text-xs space-y-1">
              <span className="font-bold text-ink/70 block mb-1">Strong Password Checklist:</span>
              <div className="grid grid-cols-2 gap-1 text-[11px]">
                <span className={isLength ? 'text-teal font-bold' : 'text-muted'}>
                  {isLength ? '✓' : '○'} Min 8 characters
                </span>
                <span className={hasUpper ? 'text-teal font-bold' : 'text-muted'}>
                  {hasUpper ? '✓' : '○'} Uppercase (A-Z)
                </span>
                <span className={hasLower ? 'text-teal font-bold' : 'text-muted'}>
                  {hasLower ? '✓' : '○'} Lowercase (a-z)
                </span>
                <span className={hasDigit ? 'text-teal font-bold' : 'text-muted'}>
                  {hasDigit ? '✓' : '○'} Number (0-9)
                </span>
                <span className={`col-span-2 ${hasSpecial ? 'text-teal font-bold' : 'text-muted'}`}>
                  {hasSpecial ? '✓' : '○'} Special Character (!@#$%^&*)
                </span>
              </div>
            </div>
          </div>

          <button disabled={loading} className="w-full bg-amber text-ink py-3 rounded-xl font-bold shadow hover:brightness-95 transition disabled:opacity-50 mt-2">
            {loading ? 'Creating Account…' : 'Create Account & Start Placement Test'}
          </button>
        </form>

        <p className="mt-6 text-sm text-muted text-center">
          Already have an account? <Link to="/login" className="text-teal font-bold">Log in</Link>
        </p>
      </div>
    </div>
  );
}
