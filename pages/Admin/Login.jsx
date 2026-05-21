
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { dbService } from '../../services/dbService.js';
import { BRAND_NAME } from '../../constants.js';

const LOGO_URL =
  'https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696070/Taigra_Nexus_Labs_logo.png';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    const success = await dbService.login(username, password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen page-shell flex items-center justify-center p-4 hero-mesh">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-2 rounded-xl bg-nexus-700 ring-1 ring-white/10 mb-5">
            <img src={LOGO_URL} alt="" className="w-11 h-11 rounded-lg" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Admin access</h1>
          <p className="text-slate-500 text-sm">{BRAND_NAME} · authorized only</p>
        </div>

        <form onSubmit={handleLogin} className="nexus-card p-5 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/25 text-red-400 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-nexus-950/80 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-nexus-950/80 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-white focus:border-blue-500 outline-none transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-2 text-slate-500 text-sm hover:text-white transition-colors"
        >
          <ArrowLeft size={16} /> Back to website
        </Link>
      </div>
    </div>
  );
};
