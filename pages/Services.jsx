import React, { useState, useEffect } from 'react';
import { Monitor, Code2, Cpu, Settings, Database, Cloud, Shield, Terminal } from 'lucide-react';
import { dbService } from '../services/dbService.js';
import { PageHero, PageLoader, BreadcrumbBar } from '../components/PageHero.jsx';

const ICON_MAP = {
  Monitor, Code2, Cpu, Settings, Database, Cloud, Shield, Terminal,
};

const TECH_STACK = ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'TensorFlow', 'TypeScript'];

export const Services = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dbService
      .getServices()
      .then((data) => setServices(data || []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <PageLoader message="Loading capabilities…" />;

  return (
    <div className="page-shell">
      <BreadcrumbBar items={[{ label: 'Home', to: '/' }, { label: 'Services' }]} />
      <PageHero
        title="Our"
        highlight="capabilities"
        subtitle="From full-stack development to complex orchestration — the tools that drive growth."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="nexus-grid gap-3 sm:gap-6 md:gap-8">
            {services.map((service, idx) => {
              const Icon = ICON_MAP[service.icon] || Code2;
              return (
                <article
                  key={service.id || idx}
                  className="nexus-card p-3 sm:p-6 md:p-8 flex flex-col gap-2 sm:gap-4 md:gap-6 group min-w-0"
                >
                  <div className="p-2 sm:p-4 w-fit bg-blue-500/10 rounded-lg sm:rounded-xl ring-1 ring-blue-500/20 group-hover:bg-blue-500/20 transition-colors shrink-0">
                    <Icon className="text-blue-400 w-5 h-5 sm:w-8 sm:h-8" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 md:mb-3 text-white line-clamp-2 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-[10px] sm:text-sm md:text-base leading-relaxed mb-2 sm:mb-4 line-clamp-4 sm:line-clamp-none">
                      {service.description}
                    </p>
                    <span className="inline-block text-[9px] sm:text-xs font-semibold uppercase tracking-wide text-blue-400 bg-blue-500/10 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-blue-500/20 truncate max-w-full">
                      {service.category}
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {services.length === 0 && (
            <p className="text-center text-slate-500 py-12 text-sm">No services listed yet.</p>
          )}

          <div className="mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-white/[0.06]">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-10 text-center text-white">
              Tech stack specialization
            </h2>
            <div className="nexus-grid nexus-grid--tech gap-2 sm:gap-3">
              {TECH_STACK.map((tech) => (
                <div
                  key={tech}
                  className="nexus-card py-3 px-2 sm:py-4 sm:px-3 text-center text-[10px] sm:text-sm font-medium text-slate-400 hover:text-white transition-colors min-w-0"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
