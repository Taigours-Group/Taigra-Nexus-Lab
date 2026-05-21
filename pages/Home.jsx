
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { dbService } from '../services/dbService.js';
import { BRAND_NAME, PARENT_COMPANY } from '../constants.js';
import { SectionHeading } from '../components/PageHero.jsx';

const BANNER_URL =
  'https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772699969/Taigra_Nexus_Labs_Banner_empty.png';
const HUB_IMAGE =
  'https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696074/Taigra_Nexus_Labs_Banner.png';

const Hero = () => (
  <section
    id="hero"
    className="relative overflow-hidden min-h-[80vh] sm:min-h-[88vh] flex items-center border-b border-white/[0.06]"
  >
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url('${BANNER_URL}')` }}
      aria-hidden
    />
    <div className="absolute inset-0 bg-gradient-to-b from-nexus-950/75 via-nexus-950/90 to-nexus-950" />
    <div className="absolute inset-0 hero-grid-bg opacity-40 pointer-events-none" aria-hidden />

    <div className="container-page py-16 sm:py-20 md:py-28 relative z-10 w-full">
      <div className="max-w-3xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-[10px] sm:text-xs font-semibold mb-4 sm:mb-6 uppercase tracking-wider"
        >
          Official tech arm of {PARENT_COMPANY}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-[1.12]"
        >
          Building the digital backbone of{' '}
          <span className="text-blue-500">global enterprises</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="text-sm sm:text-base md:text-lg text-slate-300 mb-8 sm:mb-10 leading-relaxed px-1"
        >
          {BRAND_NAME} engineers high-performance software, automation, and digital ecosystems
          for the TGO conglomerate and its partners.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link to="/projects" className="btn-primary text-sm sm:text-base">
            View projects <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <Link to="/contact" className="btn-secondary text-sm sm:text-base">
            Contact us
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

const TGOSection = () => (
  <section id="tgo-section" className="section-pad border-b border-white/[0.06] bg-nexus-900/50">
    <div className="container-page">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">About us</h2>
          <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
            We design powerful digital systems, custom software, and scalable technology
            solutions that help organizations operate smarter and grow faster.
          </p>
          <div className="nexus-grid gap-3 sm:gap-4">
            <div className="nexus-card p-3 sm:p-5 md:p-6">
              <ShieldCheck className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />
              <h4 className="font-semibold mb-1 sm:mb-2 text-white text-sm sm:text-base">Total control</h4>
              <p className="text-[11px] sm:text-sm text-slate-500 leading-snug">Security-first infrastructure for all TGO assets.</p>
            </div>
            <div className="nexus-card p-3 sm:p-5 md:p-6">
              <Zap className="text-blue-500 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />
              <h4 className="font-semibold mb-1 sm:mb-2 text-white text-sm sm:text-base">High efficiency</h4>
              <p className="text-[11px] sm:text-sm text-slate-500 leading-snug">Automated systems optimizing corporate output.</p>
            </div>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors">
            Learn more <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="relative min-w-0">
          <img
            src={HUB_IMAGE}
            alt={`${BRAND_NAME} hub`}
            className="rounded-xl sm:rounded-2xl w-full ring-1 ring-white/10 shadow-2xl"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  </section>
);

const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    dbService.getProjects().then((data) => {
      setProjects((data || []).filter((p) => p.featured).slice(0, 3));
    });
  }, []);

  return (
    <section id="featured-projects" className="section-pad">
      <div className="container-page">
        <SectionHeading
          title="Selected systems"
          subtitle="Pioneering projects delivered for the group."
          action={
            <Link
              to="/projects"
              className="text-blue-400 flex items-center gap-2 hover:text-blue-300 text-sm font-semibold shrink-0"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          }
        />
        <div className="nexus-grid nexus-grid--3">
          {projects.map((project) => (
            <Link
              key={project.id}
              to="/projects"
              className="group nexus-card overflow-hidden block min-w-0"
            >
              <div className="relative aspect-[5/4] sm:aspect-[4/3] overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-nexus-950/80 backdrop-blur px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold text-white border border-white/10 max-w-[85%] truncate">
                  {project.clientType}
                </span>
              </div>
              <div className="nexus-grid-card-body">
                <h3 className="text-xs sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-1 sm:mb-2 line-clamp-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-slate-500 text-[10px] sm:text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {projects.length === 0 && (
          <p className="text-center text-slate-500 text-sm">Featured projects will appear here soon.</p>
        )}
      </div>
    </section>
  );
};

export const Home = () => (
  <div className="page-shell">
    <Hero />
    <TGOSection />
    <FeaturedProjects />
  </div>
);
