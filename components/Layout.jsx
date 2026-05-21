import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, Star, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME } from '../constants.js';
import { Tutorial } from './Tutorial.jsx';
import { CookieConsent, CookieSettingsLink } from './CookieConsent.jsx';
import { applyCookieConsent, getCookieConsent } from '../utils/cookieConsent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const LOGO_URL = 'https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696070/Taigra_Nexus_Labs_logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="fixed w-full z-50 top-0">
      <nav
        className="bg-nexus-950/90 backdrop-blur-xl border-b border-white/[0.06]"
        aria-label="Main navigation"
      >
        <div className="container-page">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-[4.5rem]">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <div className="p-1 rounded-lg bg-nexus-700 ring-1 ring-white/10 group-hover:ring-blue-500/30 transition-all">
                <img src={LOGO_URL} alt="" className="w-7 h-7 lg:w-8 lg:h-8 rounded-md" loading="lazy" />
              </div>
              <span className="text-base lg:text-lg font-bold tracking-tight text-white hidden sm:block">
                {BRAND_NAME}
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'text-white bg-white/[0.06]'
                      : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link
                id="admin-btn"
                to="/admin/login"
                className="text-xs text-slate-500 hover:text-slate-300 px-2 py-1 transition-colors"
              >
                Admin
              </Link>
              <Link to="/contact" className="btn-primary text-sm !py-2.5 !px-5">
                <Mail className="w-4 h-4" />
                Contact
              </Link>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/[0.06] bg-nexus-900 overflow-hidden"
            >
              <div className="px-4 py-6 flex flex-col gap-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-4 py-3.5 rounded-xl text-base font-semibold transition-colors ${
                      isActive(link.path)
                        ? 'text-white bg-blue-500/15 border border-blue-500/25'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-white/10 my-3" />
                <Link
                  to="/contact"
                  className="btn-primary w-full text-center !py-3.5"
                >
                  Contact us <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/admin/login"
                  className="text-center text-sm text-slate-500 py-2 hover:text-slate-300"
                >
                  Admin login
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const Footer = () => {
  const socialLinks = [
    { icon: <FontAwesomeIcon icon={faInstagram} size={16} />, url: 'https://www.instagram.com/taigranexuslabs', label: 'Instagram', hover: 'hover:text-pink-400' },
    { icon: <FontAwesomeIcon icon={faFacebook} size={16} />, url: 'https://www.facebook.com/TaigraNexusLabs', label: 'Facebook', hover: 'hover:text-blue-400' },
    { icon: <FontAwesomeIcon icon={faTiktok} size={16} />, url: 'https://www.tiktok.com/@taigranexualabs', label: 'TikTok', hover: 'hover:text-cyan-400' },
    { icon: <FontAwesomeIcon icon={faWhatsapp} size={16} />, url: 'https://wa.me/9779766115626', label: 'WhatsApp', hover: 'hover:text-green-400' },
  ];

  return (
    <footer className="bg-nexus-900 border-t border-white/[0.06] pt-14 md:pt-18 pb-8">
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <div className="p-1 rounded-lg bg-nexus-700 ring-1 ring-white/10">
                <img src={LOGO_URL} alt="" className="w-7 h-7 rounded-md" />
              </div>
              <span className="text-lg font-bold text-white">{BRAND_NAME}</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              High-performance digital infrastructure for Taigours Group and its global partners.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-slate-400 transition-all ${social.hover}`}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-slate-400 hover:text-blue-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Corporate</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="https://taigours-group.github.io/Taigours-Group/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-blue-400 transition-colors"
                >
                  TGO Group
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>

          <div className="nexus-card p-5">
            <div className="flex gap-0.5 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-300 text-sm leading-relaxed mb-3">
              Excellent service and robust infrastructure support.
            </p>
            <span className="text-slate-500 text-xs font-medium">Verified TGO Partner</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06] text-slate-500 text-xs sm:text-sm">
          <p>&copy; 2026 {BRAND_NAME} Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
            <a href="/privacy-policy.html" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="/terms-of-service.html" className="hover:text-white transition-colors">
              Terms
            </a>
            <CookieSettingsLink />
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = ({ children }) => {
  React.useEffect(() => {
    applyCookieConsent(getCookieConsent());
  }, []);

  return (
    <div className="min-h-screen flex flex-col page-shell">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <CookieConsent />
      <Tutorial />
      <Navbar />
      <main id="main-content" className="flex-grow pt-16 lg:pt-[4.5rem]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
