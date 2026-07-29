import React from 'react';
import { X, Copy, Star } from 'lucide-react';
import { CLIENT_TYPES, SERVICE_ICON_OPTIONS, SERVICE_CATEGORIES } from './adminConfig.js';

export const AdminItemForm = ({
  activeTab,
  formData,
  setFormData,
  onSubmit,
  onCancel,
  onDuplicate,
  canDuplicate,
}) => {
  const isProject = activeTab === 'projects';
  const isBlog = activeTab === 'blogs';
  const isService = activeTab === 'services';

  return (
    <form id="admin-form" onSubmit={onSubmit} className="nexus-card p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h2 className="text-lg font-bold text-ink-950">
          {formData.id ? 'Edit' : 'New'} {activeTab.slice(0, -1)}
        </h2>
        <div className="flex items-center gap-2">
          {canDuplicate && (
            <button
              type="button"
              onClick={onDuplicate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-ink-500 hover:text-ink-950 bg-ink-950/[0.04] rounded-lg"
            >
              <Copy size={14} /> Duplicate
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="p-2 text-ink-500 hover:text-ink-950 lg:hidden"
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {formData.imageUrl && (isProject || isBlog) && (
        <div className="rounded-xl overflow-hidden border border-ink-950/10 bg-ink-50 aspect-video max-h-48">
          <img
            src={formData.imageUrl}
            alt="Preview"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Title</label>
          <input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="admin-input"
          />
        </div>

        {isProject && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
              Client type
            </label>
            <select
              value={formData.clientType}
              onChange={(e) => setFormData({ ...formData, clientType: e.target.value })}
              className="admin-input"
            >
              {CLIENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        )}

        {isBlog && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Author</label>
              <input
                required
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
                Publish date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="admin-input"
              />
            </div>
          </>
        )}

        {isService && (
          <>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="admin-input"
              >
                {SERVICE_ICON_OPTIONS.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="admin-input"
              >
                {SERVICE_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {(isProject || isBlog) && (
          <div className="space-y-1.5 sm:col-span-2">
            <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Image URL</label>
            <input
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="admin-input"
              placeholder="https://..."
            />
          </div>
        )}

        {isProject && (
          <>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
                Tech stack (comma-separated)
              </label>
              <input
                value={formData.techStack}
                onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Live URL</label>
              <input
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="admin-input"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">GitHub URL</label>
              <input
                value={formData.repoUrl}
                onChange={(e) => setFormData({ ...formData, repoUrl: e.target.value })}
                className="admin-input"
              />
            </div>
            <label className="flex items-center gap-3 sm:col-span-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 accent-royal-600"
              />
              <span className="text-sm text-ink-700 flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> Featured on homepage
              </span>
            </label>
          </>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">
          {isService ? 'Description' : isProject ? 'Description' : 'Excerpt'}
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="admin-input min-h-[88px] resize-y"
          rows={3}
        />
      </div>

      {isBlog && (
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-ink-500 uppercase tracking-wide">Full content</label>
          <textarea
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="admin-input min-h-[160px] resize-y"
            rows={6}
          />
        </div>
      )}

      <div className="hidden lg:flex gap-3 pt-2">
        <button type="submit" className="btn-primary flex-1 !py-3.5">
          Save changes
        </button>
        <button type="button" onClick={onCancel} className="btn-secondary flex-1 !py-3.5">
          Cancel
        </button>
      </div>
    </form>
  );
};
