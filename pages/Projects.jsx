import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { dbService } from '../services/dbService.js';
import { ClientType } from '../types.js';
import { PageHero, PageLoader, BreadcrumbBar } from '../components/PageHero.jsx';

export const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [allProjects, setAllProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dbService
      .getProjects()
      .then((data) => setAllProjects(data || []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const filteredProjects =
    filter === 'All' ? allProjects : allProjects.filter((p) => p.clientType === filter);

  if (isLoading) return <PageLoader message="Loading projects…" />;

  const filterTypes = ['All', ...Object.values(ClientType)];

  return (
    <div className="page-shell">
      <BreadcrumbBar items={[{ label: 'Home', to: '/' }, { label: 'Projects' }]} />
      <PageHero
        title="Engineering"
        highlight="excellence"
        subtitle="Systems, platforms, and tools built for the TGO ecosystem and beyond."
      />

      <section className="py-12 md:py-24">
        <div className="container-page">
          <div
            id="project"
            className="filter-scroll mb-8 md:mb-14"
            role="tablist"
            aria-label="Filter projects"
          >
            {filterTypes.map((type) => (
              <button
                key={type}
                type="button"
                role="tab"
                aria-selected={filter === type}
                onClick={() => setFilter(type)}
                className={`shrink-0 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-sm font-semibold border transition-all ${
                  filter === type
                    ? 'bg-royal-600 border-royal-600 text-white shadow-lg shadow-royal-600/25'
                    : 'bg-white border-ink-950/10 text-ink-500 hover:border-royal-200 hover:text-ink-950'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <div className="nexus-grid nexus-grid--3">
            {filteredProjects.map((project, idx) => (
              <motion.article
                key={project.id || idx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.3) }}
                className="nexus-card overflow-hidden flex flex-col group min-w-0"
              >
                <div className="relative aspect-[5/4] sm:aspect-video overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute bottom-1.5 left-1.5 sm:bottom-3 sm:left-3 text-[9px] sm:text-xs font-semibold uppercase tracking-wide text-royal-700 bg-white/90 backdrop-blur px-1.5 py-0.5 sm:px-2.5 sm:py-1 rounded border border-royal-100 max-w-[90%] truncate">
                    {project.clientType}
                  </span>
                </div>
                <div className="nexus-grid-card-body flex flex-col flex-grow min-w-0">
                  <h3 className="text-xs sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-ink-950 group-hover:text-royal-600 transition-colors line-clamp-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-ink-500 text-[10px] sm:text-sm mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>
                  {project.techStack?.length > 0 && (
                    <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded-md bg-ink-50 text-ink-600 border border-ink-950/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full !py-2 !text-[10px] sm:!py-3 sm:!text-sm gap-1"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />
                      <span className="truncate">Demo</span>
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <p className="text-center text-ink-400 py-16 text-sm">No projects match this filter.</p>
          )}
        </div>
      </section>
    </div>
  );
};
