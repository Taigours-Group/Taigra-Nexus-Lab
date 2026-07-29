import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  LogOut,
  LayoutDashboard,
  Database,
  FileText,
  Layers,
  ArrowLeft,
  RefreshCw,
} from 'lucide-react';
import { dbService } from '../../services/dbService.js';
import { ClientType, Category } from '../../types.js';
import { BRAND_NAME } from '../../constants.js';
import { ADMIN_TABS, SERVICE_CATEGORIES } from '../../components/Admin/adminConfig.js';
import { AdminOverview } from '../../components/Admin/AdminOverview.jsx';
import { AdminItemForm } from '../../components/Admin/AdminItemForm.jsx';
import { AdminItemList } from '../../components/Admin/AdminItemList.jsx';
import { AdminToast } from '../../components/Admin/AdminToast.jsx';

const LOGO_URL =
  'https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696070/Taigra_Nexus_Labs_logo.png';

const TAB_ICONS = {
  overview: LayoutDashboard,
  projects: Database,
  blogs: FileText,
  services: Layers,
};

const emptyForm = (tab) => {
  const base = {
    id: '',
    title: '',
    description: '',
    content: '',
    techStack: '',
    clientType: ClientType.EXTERNAL,
    author: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl: 'https://picsum.photos/seed/new/800/600',
    liveUrl: '#',
    repoUrl: '',
    featured: false,
    icon: 'Code2',
    category: SERVICE_CATEGORIES[0] || Category.WEB,
  };
  if (tab === 'services') {
    return {
      id: '',
      title: '',
      description: '',
      icon: 'Code2',
      category: SERVICE_CATEGORIES[0] || Category.WEB,
    };
  }
  return base;
};

const filterSortItems = (items, tab, searchQuery, sortBy) => {
  let list = [...(items || [])];

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    list = list.filter((item) => {
      const hay = [
        item.title,
        item.description,
        item.excerpt,
        item.author,
        item.category,
        item.clientType,
        ...(Array.isArray(item.techStack) ? item.techStack : []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }

  list.sort((a, b) => {
    if (sortBy === 'title-asc') return (a.title || '').localeCompare(b.title || '');
    if (sortBy === 'title-desc') return (b.title || '').localeCompare(a.title || '');
    return String(b.id || '').localeCompare(String(a.id || ''));
  });

  return list;
};

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [items, setItems] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(emptyForm('projects'));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [toast, setToast] = useState(null);
  const [stats, setStats] = useState({ projects: 0, blogs: 0, services: 0, featured: 0 });

  const showToast = (message, type = 'success') => setToast({ message, type });

  const refreshStats = useCallback(async () => {
    const [projects, blogs, services] = await Promise.all([
      dbService.getProjects(),
      dbService.getBlogs(),
      dbService.getServices(),
    ]);
    setStats({
      projects: projects.length,
      blogs: blogs.length,
      services: services.length,
      featured: projects.filter((p) => p.featured).length,
    });
  }, []);

  const loadData = useCallback(async () => {
    if (activeTab === 'overview') {
      setIsLoading(true);
      await refreshStats();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    let data = [];
    if (activeTab === 'projects') data = await dbService.getProjects();
    else if (activeTab === 'blogs') data = await dbService.getBlogs();
    else if (activeTab === 'services') data = await dbService.getServices();
    setItems(data || []);
    setIsLoading(false);
    refreshStats();
  }, [activeTab, refreshStats]);

  useEffect(() => {
    if (!dbService.isAuthenticated()) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [activeTab, navigate, loadData]);

  const displayedItems = useMemo(
    () => (activeTab === 'overview' ? [] : filterSortItems(items, activeTab, searchQuery, sortBy)),
    [items, activeTab, searchQuery, sortBy]
  );

  const switchTab = (tab) => {
    setActiveTab(tab);
    setIsEditing(false);
    setSearchQuery('');
    setFormData(emptyForm(tab));
  };

  const openAdd = (tab) => {
    setActiveTab(tab);
    setFormData(emptyForm(tab));
    setIsEditing(true);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startEdit = (item) => {
    if (activeTab === 'blogs') {
      setFormData({
        ...item,
        description: item.excerpt || item.description || '',
        content: item.content || '',
      });
    } else if (activeTab === 'services') {
      setFormData({
        id: item.id,
        title: item.title || '',
        description: item.description || '',
        icon: item.icon || 'Code2',
        category: item.category || SERVICE_CATEGORIES[0],
      });
    } else {
      setFormData({
        ...item,
        techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : '',
      });
    }
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const duplicateItem = (item) => {
    if (activeTab === 'blogs') {
      setFormData({
        ...emptyForm('blogs'),
        title: `${item.title} (Copy)`,
        description: item.excerpt || item.description || '',
        content: item.content || '',
        author: item.author || '',
        date: item.date || new Date().toISOString().split('T')[0],
        imageUrl: item.imageUrl || '',
      });
    } else if (activeTab === 'services') {
      setFormData({
        ...emptyForm('services'),
        title: `${item.title} (Copy)`,
        description: item.description || '',
        icon: item.icon || 'Code2',
        category: item.category || SERVICE_CATEGORIES[0],
      });
    } else {
      setFormData({
        ...emptyForm('projects'),
        title: `${item.title} (Copy)`,
        description: item.description || '',
        techStack: Array.isArray(item.techStack) ? item.techStack.join(', ') : '',
        clientType: item.clientType,
        imageUrl: item.imageUrl || '',
        liveUrl: item.liveUrl || '#',
        repoUrl: item.repoUrl || '',
        featured: false,
      });
    }
    setIsEditing(true);
    showToast('Duplicated — save to create a new entry');
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const itemId =
      formData.id ||
      `${activeTab === 'projects' ? 'p' : activeTab === 'blogs' ? 'b' : 's'}_${Date.now()}`;

    let result = null;

    if (activeTab === 'projects') {
      result = await dbService.saveProject({
        id: itemId,
        title: formData.title,
        description: formData.description,
        techStack:
          typeof formData.techStack === 'string'
            ? formData.techStack.split(',').map((s) => s.trim()).filter(Boolean)
            : formData.techStack,
        clientType: formData.clientType,
        imageUrl: formData.imageUrl,
        featured: formData.featured,
        liveUrl: formData.liveUrl,
        repoUrl: formData.repoUrl,
      });
    } else if (activeTab === 'blogs') {
      result = await dbService.saveBlog({
        id: itemId,
        title: formData.title,
        excerpt: formData.description,
        content: formData.content,
        date: formData.date,
        author: formData.author,
        imageUrl: formData.imageUrl,
      });
    } else if (activeTab === 'services') {
      result = await dbService.saveService({
        id: itemId,
        title: formData.title,
        description: formData.description,
        icon: formData.icon,
        category: formData.category,
      });
    }

    if (result) {
      showToast('Saved successfully');
      setIsEditing(false);
      setFormData(emptyForm(activeTab));
      loadData();
    } else {
      showToast('Save failed — check server connection', 'error');
    }
  };

  const handleDelete = async (id) => {
    const label = activeTab.slice(0, -1);
    if (!window.confirm(`Permanently delete this ${label}?`)) return;

    if (activeTab === 'projects') await dbService.deleteProject(id);
    else if (activeTab === 'blogs') await dbService.deleteBlog(id);
    else if (activeTab === 'services') await dbService.deleteService(id);

    showToast('Deleted');
    loadData();
  };

  const handleToggleFeatured = async (item) => {
    const result = await dbService.saveProject({
      ...item,
      featured: !item.featured,
    });
    if (result) {
      showToast(item.featured ? 'Removed from featured' : 'Marked as featured');
      loadData();
    } else {
      showToast('Could not update featured status', 'error');
    }
  };

  const handleLogout = () => {
    dbService.logout();
    navigate('/');
  };

  const renderTabButton = (tab) => {
    const Icon = TAB_ICONS[tab.id];
    const isActive = activeTab === tab.id;
    return (
      <button
        key={tab.id}
        type="button"
        onClick={() => switchTab(tab.id)}
        className={`flex items-center justify-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
          isActive
            ? 'bg-royal-600 text-white shadow-lg shadow-royal-600/25'
            : 'text-ink-500 bg-ink-950/[0.04] hover:text-ink-950 lg:w-full lg:justify-start'
        }`}
      >
        <Icon size={18} />
        <span>{tab.label}</span>
      </button>
    );
  };

  const contentTab = ADMIN_TABS.find((t) => t.id === activeTab);
  const showList = activeTab !== 'overview' && !isEditing;

  return (
    <div className="min-h-screen bg-ink-50 flex flex-col lg:flex-row">
      <header className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-ink-950/[0.08]">
        <div className="flex items-center justify-between px-3 py-2.5 gap-2">
          <Link to="/" className="flex items-center gap-2 min-w-0 text-ink-950 font-bold text-sm">
            <img src={LOGO_URL} alt="" className="w-8 h-8 rounded-md shrink-0" />
            <span className="truncate">Admin</span>
          </Link>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={loadData}
              className="p-2.5 text-ink-500 hover:text-ink-950 rounded-lg"
              aria-label="Refresh"
            >
              <RefreshCw size={18} />
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="p-2.5 text-royal-600 hover:bg-royal-50 rounded-lg"
              aria-label="Sign out"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
        <div className="flex gap-2 px-3 pb-3 overflow-x-auto scrollbar-thin">
          {ADMIN_TABS.map(renderTabButton)}
        </div>
      </header>

      <aside className="hidden lg:flex w-72 bg-white border-r border-ink-950/[0.08] p-6 flex-col shrink-0">
        <div className="flex items-center gap-3 text-ink-950 font-bold text-lg mb-8">
          <div className="w-9 h-9 bg-royal-600 text-white rounded-lg flex items-center justify-center">
            <LayoutDashboard size={18} />
          </div>
          <span>Admin</span>
        </div>

        <nav className="space-y-1.5 flex-grow">{ADMIN_TABS.map(renderTabButton)}</nav>

        <button
          type="button"
          onClick={loadData}
          className="flex items-center gap-2 text-ink-500 text-sm py-2 hover:text-ink-950 mb-2"
        >
          <RefreshCw size={16} /> Refresh data
        </button>
        <Link
          to="/"
          className="flex items-center gap-2 text-ink-500 text-sm py-2 hover:text-ink-950 mb-2"
        >
          <ArrowLeft size={16} /> Public site
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-royal-600 font-semibold hover:bg-royal-50 rounded-xl"
        >
          <LogOut size={20} /> Sign out
        </button>
      </aside>

      <main className="flex-grow min-w-0 flex flex-col">
        <div className="flex-grow p-3 sm:p-6 lg:p-10 overflow-y-auto pb-24 lg:pb-10">
          <div className="max-w-4xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-ink-950 capitalize">
                  {contentTab?.label || 'Admin'}
                </h1>
                <p className="text-ink-500 text-xs sm:text-sm mt-1">
                  {BRAND_NAME} · control panel
                </p>
              </div>
              {showList && (
                <button
                  type="button"
                  onClick={() => openAdd(activeTab)}
                  className="btn-primary w-full sm:w-auto text-sm !py-3"
                >
                  <Plus size={18} /> Add new
                </button>
              )}
            </div>

            {activeTab === 'overview' &&
              (isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-10 h-10 border-2 border-royal-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <AdminOverview stats={stats} onAdd={openAdd} />
              ))}

            {isEditing && activeTab !== 'overview' && (
              <AdminItemForm
                activeTab={activeTab}
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSave}
                onCancel={() => {
                  setIsEditing(false);
                  setFormData(emptyForm(activeTab));
                }}
                onDuplicate={() => duplicateItem(formData)}
                canDuplicate={!!formData.id}
              />
            )}

            {showList && (
              <AdminItemList
                activeTab={activeTab}
                items={displayedItems}
                isLoading={isLoading}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                onEdit={startEdit}
                onDelete={handleDelete}
                onDuplicate={duplicateItem}
                onToggleFeatured={activeTab === 'projects' ? handleToggleFeatured : undefined}
              />
            )}
          </div>
        </div>

        {isEditing && activeTab !== 'overview' && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-xl border-t border-ink-950/[0.08] flex gap-2">
            <button type="submit" form="admin-form" className="btn-primary flex-1 !py-3.5 text-sm">
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn-secondary !py-3.5 px-5 text-sm"
            >
              Cancel
            </button>
          </div>
        )}
      </main>

      <AdminToast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
};
