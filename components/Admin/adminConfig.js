import { ClientType, Category } from '../../types.js';

export const ADMIN_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'projects', label: 'Projects' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'services', label: 'Services' },
];

export const SERVICE_ICON_OPTIONS = [
  'Monitor',
  'Code2',
  'Cpu',
  'Settings',
  'Database',
  'Cloud',
  'Shield',
  'Terminal',
];

export const CLIENT_TYPES = Object.values(ClientType);
export const SERVICE_CATEGORIES = Object.values(Category);

export const PUBLIC_PATHS = {
  projects: '/projects',
  blogs: '/blogs',
  services: '/services',
};
