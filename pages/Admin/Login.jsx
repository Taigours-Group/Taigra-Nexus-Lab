
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, User, ArrowLeft } from 'lucide-react';
import { dbService } from '../../services/dbService.js';
import { BRAND_NAME } from '../../constants.js';
import { LogoMark } from '../../components/Logo.jsx';

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
          <div className="inline-flex mb-5">
            <LogoMark variant="dark" size={52} animated />
          </div>
          <h1 className="text-2xl font-bold text-ink-950 mb-1">Admin access</h1>
          <p className="text-ink-400 text-sm">{BRAND_NAME} · authorized only</p>
        </div>

        <form onSubmit={handleLogin} className="nexus-card p-5 sm:p-8 space-y-5">
          {error && (
            <div className="p-3 bg-royal-50 border border-royal-200 text-royal-700 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-ink-950/[0.12] rounded-xl pl-12 pr-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-royal-500 outline-none transition-colors"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-ink-950/[0.12] rounded-xl pl-12 pr-4 py-3.5 text-ink-950 placeholder:text-ink-300 focus:border-royal-500 outline-none transition-colors"
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
          className="mt-6 flex items-center justify-center gap-2 text-ink-400 text-sm hover:text-ink-950 transition-colors"
        >
          <ArrowLeft size={16} /> Back to website
        </Link>
      </div>
    </div>
  );
};
