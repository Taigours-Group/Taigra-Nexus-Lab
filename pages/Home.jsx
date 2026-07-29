import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Code2,
  Cloud,
  Layers,
} from 'lucide-react';
import { dbService } from '../services/dbService.js';
import { BRAND_NAME, PARENT_COMPANY } from '../constants.js';
import { SectionHeading } from '../components/PageHero.jsx';
import { NexusScene } from '../components/ThreeScene.jsx';
import { LogoMark } from '../components/Logo.jsx';

const HUB_IMAGE =
  'https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696074/Taigra_Nexus_Labs_Banner.png';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

/* ---------------------------------------------------------------- Hero -- */
const Hero = () => (
  <section
    id="hero"
    className="relative overflow-hidden min-h-[82vh] sm:min-h-[88vh] flex items-center bg-white border-b border-ink-950/[0.06]"
  >
    {/* three.js nexus network */}
    <NexusScene />
    {/* soft white veil so text always wins */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgba(255,255,255,0.92),rgba(255,255,255,0.55))] pointer-events-none" />

    <div className="container-page py-16 sm:py-20 md:py-28 relative z-10 w-full">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-6 sm:mb-8"
        >
          <LogoMark variant="dark" size={64} animated />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-royal-50 border border-royal-100 text-royal-700 text-[10px] sm:text-xs font-semibold mb-4 sm:mb-6 uppercase tracking-wider"
        >
          Official tech arm of {PARENT_COMPANY}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink-950 mb-4 sm:mb-6 tracking-tight leading-[1.1]"
        >
          Building the digital backbone of{' '}
          <span className="text-royal-600">global enterprises</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="text-sm sm:text-base md:text-lg text-ink-600 mb-8 sm:mb-10 leading-relaxed px-1 max-w-2xl mx-auto"
        >
          {BRAND_NAME} engineers high-performance software, automation, and digital
          ecosystems for the TGO conglomerate and its partners.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
        >
          <Link to="/projects" className="btn-primary text-sm sm:text-base">
            View projects <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
          <Link to="/contact" className="btn-secondary text-sm sm:text-base">
            Talk to our team
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

/* --------------------------------------------------------- Trust strip -- */
const TRUST_STATS = [
  { value: '12+', label: 'TGO companies served' },
  { value: '14+', label: 'Platforms delivered' },
  { value: '99.99%', label: 'Uptime SLA' },
  { value: '24h', label: 'Response time' },
];

const TrustStrip = () => (
  <section className="border-b border-ink-950/[0.06] bg-ink-50/60">
    <div className="container-page py-8 sm:py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {TRUST_STATS.map((stat) => (
          <motion.div key={stat.label} {...fadeUp} className="text-center">
            <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink-950 mb-1">
              {stat.value}
            </div>
            <div className="text-[11px] sm:text-xs uppercase tracking-wide text-ink-500 font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* --------------------------------------------------------------- About -- */
const TGOSection = () => (
  <section id="tgo-section" className="section-pad border-b border-ink-950/[0.06]">
    <div className="container-page">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
        <motion.div {...fadeUp}>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-royal-600 mb-3">
            Who we are
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-ink-950">
            The technology core of the TGO ecosystem
          </h2>
          <p className="text-ink-600 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
            We design powerful digital systems, custom software, and scalable technology
            solutions that help organizations operate smarter and grow faster.
          </p>
          <div className="nexus-grid gap-3 sm:gap-4">
            <div className="nexus-card p-3 sm:p-5 md:p-6">
              <ShieldCheck className="text-royal-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />
              <h4 className="font-semibold mb-1 sm:mb-2 text-ink-950 text-sm sm:text-base">Total control</h4>
              <p className="text-[11px] sm:text-sm text-ink-500 leading-snug">Security-first infrastructure for all TGO assets.</p>
            </div>
            <div className="nexus-card p-3 sm:p-5 md:p-6">
              <Zap className="text-royal-600 w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3" />
              <h4 className="font-semibold mb-1 sm:mb-2 text-ink-950 text-sm sm:text-base">High efficiency</h4>
              <p className="text-[11px] sm:text-sm text-ink-500 leading-snug">Automated systems optimizing corporate output.</p>
            </div>
          </div>
          <Link to="/about" className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-royal-600 font-semibold text-sm hover:text-royal-700 transition-colors">
            Learn more about us <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
        <motion.div {...fadeUp} className="relative min-w-0">
          <img
            src={HUB_IMAGE}
            alt={`${BRAND_NAME} hub`}
            className="rounded-xl sm:rounded-2xl w-full ring-1 ring-ink-950/10 shadow-xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

/* -------------------------------------------------- Capability preview -- */
const CAPABILITIES = [
  { icon: Code2, title: 'Custom software', text: 'Web platforms, portals, and internal tools engineered to spec.' },
  { icon: Cloud, title: 'Cloud & hosting', text: 'Deployment, domains, and infrastructure managed end to end.' },
  { icon: Layers, title: 'System integration', text: 'Connecting data and workflows across the whole group.' },
  { icon: Building2, title: 'Enterprise support', text: 'Long-term maintenance and governance for every subsidiary.' },
];

const Capabilities = () => (
  <section className="section-pad border-b border-ink-950/[0.06] bg-ink-50/50">
    <div className="container-page">
      <SectionHeading
        title="What we do"
        subtitle="Focused capabilities, delivered with enterprise discipline."
        action={
          <Link
            to="/services"
            className="text-royal-600 flex items-center gap-2 hover:text-royal-700 text-sm font-semibold shrink-0"
          >
            All services <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
        {CAPABILITIES.map(({ icon: Icon, title, text }) => (
          <motion.div key={title} {...fadeUp} className="nexus-card p-5 sm:p-6 min-w-0">
            <div className="p-2.5 w-fit rounded-xl bg-royal-50 border border-royal-100 mb-4">
              <Icon className="text-royal-600 w-5 h-5" />
            </div>
            <h3 className="font-bold text-ink-950 text-sm sm:text-base mb-1.5">{title}</h3>
            <p className="text-ink-500 text-xs sm:text-sm leading-relaxed">{text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- Projects -- */
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
              className="text-royal-600 flex items-center gap-2 hover:text-royal-700 text-sm font-semibold shrink-0"
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
                <span className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 bg-white/90 backdrop-blur px-1.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-semibold text-ink-800 border border-ink-950/10 max-w-[85%] truncate">
                  {project.clientType}
                </span>
              </div>
              <div className="nexus-grid-card-body">
                <h3 className="text-xs sm:text-lg font-bold text-ink-950 group-hover:text-royal-600 transition-colors mb-1 sm:mb-2 line-clamp-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-ink-500 text-[10px] sm:text-sm line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {projects.length === 0 && (
          <p className="text-center text-ink-400 text-sm">Featured projects will appear here soon.</p>
        )}
      </div>
    </section>
  );
};

/* ----------------------------------------------------------- CTA band -- */
const CTABand = () => (
  <section className="relative overflow-hidden bg-royal-600">
    <div className="absolute -right-10 -bottom-16 opacity-[0.12] pointer-events-none" aria-hidden>
      <LogoMark variant="light" size={280} />
    </div>
    <div className="container-page py-14 sm:py-20 relative z-10">
      <div className="max-w-2xl">
        <motion.h2 {...fadeUp} className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
          Ready to build something that lasts?
        </motion.h2>
        <motion.p {...fadeUp} className="text-royal-100 text-sm sm:text-base md:text-lg mb-8 leading-relaxed">
          Tell us about your project — our engineers respond within one business day.
        </motion.p>
        <motion.div {...fadeUp} className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-royal-700 font-semibold text-sm sm:text-base hover:bg-royal-50 transition-colors shadow-lg"
          >
            Start a conversation <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl border border-white/40 text-white font-semibold text-sm sm:text-base hover:bg-white/10 transition-colors"
          >
            Explore services
          </Link>
        </motion.div>
      </div>
    </div>
  </section>
);

export const Home = () => (
  <div className="page-shell">
    <Hero />
    <TrustStrip />
    <TGOSection />
    <Capabilities />
    <FeaturedProjects />
    <CTABand />
  </div>
);
