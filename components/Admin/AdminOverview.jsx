import React from 'react';
import { Database, FileText, Layers, Star, ExternalLink, Plus } from 'lucide-react';
import { PUBLIC_PATHS } from './adminConfig.js';

const StatCard = ({ icon, label, value, sub }) => (
  <div className="nexus-card p-4 sm:p-5">
    <div className="flex items-center justify-between mb-3">
      <span className="p-2 rounded-lg bg-royal-50 text-royal-600">{icon}</span>
      <span className="text-2xl sm:text-3xl font-bold text-ink-950">{value}</span>
    </div>
    <p className="text-sm font-semibold text-ink-950">{label}</p>
    {sub && <p className="text-xs text-ink-400 mt-0.5">{sub}</p>}
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
      <h2 className="text-lg font-bold text-ink-950 mb-4">Quick actions</h2>
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
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-royal-50 text-royal-700 text-sm font-semibold hover:bg-royal-100 transition-colors"
          >
            {icon} {label}
          </button>
        ))}
      </div>
    </div>

    <div className="nexus-card p-4 sm:p-6">
      <h2 className="text-lg font-bold text-ink-950 mb-4">View live pages</h2>
      <div className="flex flex-wrap gap-2">
        {Object.entries(PUBLIC_PATHS).map(([key, path]) => (
          <a
            key={key}
            href={`/#${path}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-50 text-ink-600 text-sm font-medium hover:text-ink-950 hover:bg-ink-100 border border-ink-950/[0.08] transition-colors"
          >
            <ExternalLink size={14} />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </a>
        ))}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-50 text-ink-600 text-sm font-medium hover:text-ink-950 hover:bg-ink-100 border border-ink-950/[0.08] transition-colors"
        >
          <ExternalLink size={14} /> Homepage
        </a>
      </div>
    </div>
  </div>
);
