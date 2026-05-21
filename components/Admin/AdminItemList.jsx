import React from 'react';
import {
  Edit2,
  Trash2,
  User,
  Calendar,
  Copy,
  ExternalLink,
  Star,
  Search,
  ArrowUpDown,
} from 'lucide-react';

export const AdminItemList = ({
  activeTab,
  items,
  isLoading,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleFeatured,
}) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-16 gap-3">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-500 text-sm">Loading…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={`Search ${activeTab}…`}
            className="admin-input !pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown size={16} className="text-slate-500 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="admin-input !py-2.5 text-sm min-w-[140px]"
          >
            <option value="newest">Newest first</option>
            <option value="title-asc">Title A–Z</option>
            <option value="title-desc">Title Z–A</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        {items.length} item{items.length !== 1 ? 's' : ''}
        {searchQuery ? ' matching search' : ''}
      </p>

      {items.length === 0 ? (
        <div className="nexus-card p-10 text-center text-slate-500 text-sm">
          {searchQuery ? 'No matches. Try a different search.' : `No ${activeTab} yet.`}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="nexus-card p-3 sm:p-5 flex flex-col sm:flex-row gap-3 sm:gap-5 sm:items-center"
            >
              <div className="flex gap-3 min-w-0 flex-1">
                {(activeTab === 'projects' || activeTab === 'blogs') && (
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-white/10 shrink-0">
                    <img src={item.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-semibold text-white truncate">
                      {item.title}
                    </h3>
                    {activeTab === 'projects' && item.featured && (
                      <Star size={14} className="text-amber-400 fill-amber-400 shrink-0" />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-1.5 text-[10px] sm:text-xs text-slate-500">
                    {activeTab === 'projects' && (
                      <span className="text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                        {item.clientType}
                      </span>
                    )}
                    {activeTab === 'blogs' && (
                      <span className="flex items-center gap-1">
                        <User size={12} /> {item.author}
                      </span>
                    )}
                    {activeTab === 'services' && (
                      <span className="text-slate-400">{item.category}</span>
                    )}
                    {(activeTab === 'blogs' || item.date) && (
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {item.date || '—'}
                      </span>
                    )}
                    {activeTab === 'services' && (
                      <span className="text-slate-600">Icon: {item.icon}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:shrink-0">
                {activeTab === 'projects' && item.liveUrl && item.liveUrl !== '#' && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-white/5 text-slate-300 rounded-xl text-sm hover:text-white"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                {activeTab === 'projects' && onToggleFeatured && (
                  <button
                    type="button"
                    onClick={() => onToggleFeatured(item)}
                    title={item.featured ? 'Remove from featured' : 'Mark featured'}
                    className={`p-2.5 rounded-xl transition-colors ${
                      item.featured
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-white/5 text-slate-500 hover:text-amber-400'
                    }`}
                  >
                    <Star size={18} className={item.featured ? 'fill-current' : ''} />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onDuplicate(item)}
                  className="p-2.5 bg-white/5 text-slate-400 rounded-xl hover:text-white"
                  title="Duplicate"
                >
                  <Copy size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(item)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500/15 text-blue-400 rounded-xl text-sm font-semibold hover:bg-blue-600 hover:text-white"
                >
                  <Edit2 size={18} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(item.id)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/15 text-red-400 rounded-xl text-sm font-semibold hover:bg-red-500 hover:text-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
