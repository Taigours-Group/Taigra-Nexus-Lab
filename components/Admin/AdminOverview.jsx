import React from 'react';
import { Database, FileText, Layers, Star, ExternalLink, Plus } from 'lucide-react';
import { PUBLIC_PATHS } from './adminConfig.js';

const StatCard = ({ icon, label, value, sub }) => (
  <div className="nexus-card p-4 sm:p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="p-2 rounded-lg bg-blue-500/10 text-blue-400">{icon}</span>
      <span className="text-2xl sm:text-3xl font-bold text-white">{value}</span>
    </div>
    <p className="text-sm font-semibold text-white">{label}</p>
    {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
  </div>
);

export const AdminOverview = ({ stats, onAdd }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <StatCard
        icon={<Database size={20} />}
        label="Projects"
        value={stats.projects}
        sub={`${stats.featured} featured`}
      />
      <StatCard icon={<FileText size={20} />} label="Blogs" value={stats.blogs} />
      <StatCard icon={<Layers size={20} />} label="Services" value={stats.services} />
      <StatCard
        icon={<Star size={20} />}
        label="Featured"
        value={stats.featured}
        sub="On homepage"
      />
    </div>

    <div className="nexus-card p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white mb-4">Quick actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
        {[
          { tab: 'projects', label: 'New project', icon: <Plus size={16} /> },
          { tab: 'blogs', label: 'New blog post', icon: <Plus size={16} /> },
          { tab: 'services', label: 'New service', icon: <Plus size={16} /> },
        ].map(({ tab, label, icon }) => (
          <button
            key={tab}
            type="button"
            onClick={() => onAdd(tab)}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600/15 text-blue-300 text-sm font-semibold hover:bg-blue-600/25 transition-colors"
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </div>

    <div className="nexus-card p-4 sm:p-6">
      <h2 className="text-lg font-bold text-white mb-4">View live pages</h2>
      <div className="flex flex-wrap gap-2">
        {Object.entries(PUBLIC_PATHS).map(([key, path]) => (
          <a
            key={key}
            href={`/#${path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 text-sm font-medium hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ExternalLink size={14} />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ))}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 text-slate-300 text-sm font-medium hover:text-white hover:bg-white/10 border border-white/10 transition-colors"
        >
          <ExternalLink size={14} /> Homepage
        </a>
      </div>
    </div>
  </div>
);
