import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_NAME, OFFICE } from '../constants.js';
import { LogoMark } from './Logo.jsx';
import { Tutorial } from './Tutorial.jsx';
import { CookieConsent, CookieSettingsLink } from './CookieConsent.jsx';
import { applyCookieConsent, getCookieConsent } from '../utils/cookieConsent.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

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
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 lg:px-8 pt-3">
      {/* floating glass island */}
      <nav
        className={`mx-auto max-w-6xl rounded-2xl overflow-hidden border transition-all duration-300 ${
          scrolled || isOpen
            ? 'bg-white/90 backdrop-blur-xl border-ink-950/[0.08] shadow-[0_8px_32px_rgba(16,17,20,0.08)]'
            : 'bg-white/70 backdrop-blur-lg border-ink-950/[0.05] shadow-[0_2px_16px_rgba(16,17,20,0.04)]'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between h-14 lg:h-16 px-3.5 sm:px-5">
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <LogoMark variant="dark" size={28} className="transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3" />
            <span className="text-[0.95rem] lg:text-base font-bold tracking-tight text-ink-950 sm:block">
              {BRAND_NAME}
            </span>
          </Link>

          {/* center links — sliding active pill */}
          <div className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-ink-950/[0.03]">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                    active ? 'text-white' : 'text-ink-500 hover:text-ink-950'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-ink-950 shadow-[0_2px_8px_rgba(16,17,20,0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2">
            
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-white bg-royal-600 hover:bg-royal-700 rounded-full pl-5 pr-1.5 py-1.5 transition-colors shadow-[0_4px_16px_rgba(188,50,50,0.3)]"
            >
              Contact
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl text-ink-600 hover:text-ink-950 hover:bg-ink-950/5 transition-colors"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden border-t border-ink-950/[0.06] overflow-hidden"
            >
              <div className="px-3 py-4 flex flex-col gap-1 max-h-[calc(100vh-6rem)] overflow-y-auto">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.25 }}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-[0.95rem] font-semibold transition-colors ${
                        isActive(link.path)
                          ? 'text-white bg-ink-950'
                          : 'text-ink-700 hover:bg-ink-950/[0.04]'
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && <span className="w-1.5 h-1.5 rounded-full bg-royal-500" />}
                    </Link>
                  </motion.div>
                ))}
                <div className="h-px bg-ink-950/[0.07] my-2" />
                <Link
                  to="/contact"
                  className="btn-primary w-full text-center !py-3 !rounded-xl"
                >
                  Contact us <ArrowRight className="w-4 h-4" />
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
    { icon: <FontAwesomeIcon icon={faInstagram} size={16} />, url: 'https://www.instagram.com/taigranexuslabs', label: 'Instagram' },
    { icon: <FontAwesomeIcon icon={faFacebook} size={16} />, url: 'https://www.facebook.com/TaigraNexusLabs', label: 'Facebook' },
    { icon: <FontAwesomeIcon icon={faTiktok} size={16} />, url: 'https://www.tiktok.com/@taigranexualabs', label: 'TikTok' },
    { icon: <FontAwesomeIcon icon={faWhatsapp} size={16} />, url: 'https://wa.me/9779766115626', label: 'WhatsApp' },
  ];

  return (
    <footer className="bg-ink-950 text-ink-300 pt-14 md:pt-18 pb-8">
      <div className="container-page">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
              <LogoMark variant="light" size={30} />
              <span className="text-lg font-bold text-white">{BRAND_NAME}</span>
            </Link>
            <p className="text-ink-400 text-sm leading-relaxed mb-6 max-w-xs">
              High-performance digital infrastructure for Taigour Group and its global partners.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-ink-300 transition-all hover:text-white hover:border-royal-600 hover:bg-royal-600/20"
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
                  <Link to={link.path} className="text-ink-400 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Corporate</h4>
            <ul className="space-y-3 text-sm text-ink-400">
              <li>
                <a
                  href="https://taigours-group.github.io/TaigourGroup/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TGO Group
                </a>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck size={16} className="text-royal-400" />
              <span className="text-white font-semibold text-sm">Registered company</span>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed mb-3">
              Taigra Nexus Lab Pvt. Ltd. — the official technology subsidiary of Taigour Group of Organization.
            </p>
            <p className="flex items-start gap-1.5 text-ink-500 text-xs leading-snug">
              <MapPin size={13} className="shrink-0 mt-0.5" />
              {OFFICE.fullAddress}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-ink-500 text-xs sm:text-sm">
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
      <main id="main-content" className="flex-grow pt-[4.75rem] lg:pt-[5.5rem]">
        {children}
      </main>
      <Footer />
    </div>
  );
};
