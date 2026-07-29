import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

/**
 * Consistent inner-page header — readable typography, no tiny mobile text.
 */
export const PageHero = ({ title, highlight, subtitle, badge, children }) => {
  return (
    <section className="relative overflow-hidden border-b border-ink-950/[0.06] hero-mesh">
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" aria-hidden />
      <div className="container-page py-12 sm:py-16 md:py-24 relative z-10 text-center">
        {badge && (
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider text-royal-700 bg-royal-50 border border-royal-100"
          >
            {badge}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-ink-950 mb-4 sm:mb-5 leading-[1.15] px-1"
        >
          {title}{' '}
          {highlight && <span className="text-royal-600">{highlight}</span>}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-ink-500 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export const PageLoader = ({ message = 'Loading…' }) => (
  <div className="page-shell min-h-[60vh] flex flex-col items-center justify-center gap-4">
    <div className="w-10 h-10 rounded-full border-2 border-royal-200 border-t-royal-600 animate-spin" />
    <p className="text-ink-500 text-sm font-medium">{message}</p>
  </div>
);

export const SectionHeading = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10 md:mb-14">
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-ink-950 mb-2">{title}</h2>
      {subtitle && <p className="text-ink-500 text-sm md:text-base max-w-xl">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export const BreadcrumbBar = ({ items }) => (
  <nav aria-label="Breadcrumb" className="container-page py-2.5 sm:py-3 border-b border-ink-950/[0.06] bg-white/80">
    <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-400">
      {items.map((item, i) => (
        <li key={item.label} className="flex items-center gap-2">
          {i > 0 && <span className="text-ink-300">/</span>}
          {item.to ? (
            <Link to={item.to} className="hover:text-royal-600 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-700 font-medium">{item.label}</span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);
