
import React from 'react';
import { Network, Target, Users, Landmark } from 'lucide-react';
import { BRAND_NAME, PARENT_COMPANY } from '../constants.js';
import { PageHero, BreadcrumbBar } from '../components/PageHero.jsx';

const Stats = [
  { label: 'Engineering hours', value: '120k+' },
  { label: 'SaaS platforms', value: '14+' },
  { label: 'Global nodes', value: '250+' },
  { label: 'Uptime SLA', value: '99.99%' },
];

export const About = () => (
  <div className="page-shell">
    <BreadcrumbBar items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
    <PageHero
      title="Digital architects for"
      highlight="the Taigours dynasty"
      subtitle={`Founded as the central nervous system of TGO, ${BRAND_NAME} manages billions of data points daily for the group and its partners.`}
    />

    <section className="section-pad border-b border-white/[0.06]">
      <div className="container-page">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          <div>
            <div className="inline-flex p-2.5 sm:p-3 bg-blue-500/10 rounded-xl mb-4 sm:mb-6 ring-1 ring-blue-500/20">
              <Landmark className="text-blue-400 w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-white">Hierarchy & heritage</h2>
            <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
              {BRAND_NAME} operates as the primary tech subsidiary of {PARENT_COMPANY}. Our mandate
              is to ensure every child company under TGO has cutting-edge infrastructure.
            </p>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-5 nexus-card">
                <div className="w-1 shrink-0 rounded-full bg-blue-500" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Central governance</h4>
                  <p className="text-[11px] sm:text-sm text-slate-500">Domains, hosting, and cybersecurity for TGO.</p>
                </div>
              </div>
              <div className="flex gap-3 sm:gap-4 p-3 sm:p-5 nexus-card">
                <div className="w-1 shrink-0 rounded-full bg-indigo-500" />
                <div className="min-w-0">
                  <h4 className="font-semibold text-white mb-0.5 sm:mb-1 text-sm sm:text-base">Subsidiary support</h4>
                  <p className="text-[11px] sm:text-sm text-slate-500">
                    Custom software for TGO Logistics, Real Estate, and FinTech.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative p-4 sm:p-8 md:p-10 nexus-card overflow-hidden min-w-0">
            <Network className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full text-blue-500/[0.04]" />
            <div className="relative z-10 nexus-grid gap-2 sm:gap-4">
              {Stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-3 sm:p-6 bg-nexus-950/60 rounded-lg sm:rounded-xl border border-white/[0.06] text-center min-w-0"
                >
                  <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className="text-[9px] sm:text-xs uppercase tracking-wide text-slate-500 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="section-pad">
      <div className="container-page">
        <div className="nexus-grid nexus-grid--3 gap-3 sm:gap-6 md:gap-8">
          {[
            { icon: Target, title: 'Our mission', text: 'Build secure, high-performance tools that empower TGO in global markets.' },
            { icon: Users, title: 'Our people', text: 'Engineers, designers, and strategists across global tech hubs.' },
            { icon: Landmark, title: 'Our values', text: 'Integrity, innovation, and commitment to the TGO legacy.' },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="nexus-card p-4 sm:p-8 md:p-10 min-w-0">
              <Icon className="text-blue-500 w-7 h-7 sm:w-9 sm:h-9 mb-4 sm:mb-6" />
              <h3 className="text-sm sm:text-xl font-bold mb-2 sm:mb-3 text-white">{title}</h3>
              <p className="text-slate-400 leading-relaxed text-[11px] sm:text-sm md:text-base">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
