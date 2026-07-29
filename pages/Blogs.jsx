import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, ChevronUp } from 'lucide-react';
import { dbService } from '../services/dbService.js';
import { PageHero, PageLoader, BreadcrumbBar } from '../components/PageHero.jsx';

export const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    dbService
      .getBlogs()
      .then((data) => setBlogs(data || []))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <PageLoader message="Loading insights…" />;

  return (
    <div className="page-shell">
      <BreadcrumbBar items={[{ label: 'Home', to: '/' }, { label: 'Blogs' }]} />
      <PageHero
        title="Insights"
        highlight="& updates"
        subtitle="Engineering thoughts and TGO technical announcements."
      />

      <section className="section-pad">
        <div className="container-page">
          <div className="nexus-grid gap-3 sm:gap-6 md:gap-8 lg:gap-10">
            {blogs.map((blog) => {
              const isExpanded = expandedId === blog.id;
              return (
                <motion.article
                  key={blog.id}
                  layout
                  className={`nexus-card min-w-0 flex flex-col ${
                    isExpanded ? 'col-span-2 ring-1 ring-royal-200' : ''
                  } ${isExpanded ? 'p-4 sm:p-6 md:p-8' : 'p-3 sm:p-6 md:p-8'}`}
                >
                  <div className="aspect-[4/3] sm:aspect-[16/9] rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-6 border border-ink-950/[0.06] shrink-0">
                    <img
                      src={blog.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 sm:gap-4 items-center mb-2 sm:mb-3 text-[10px] sm:text-sm text-ink-400 min-w-0">
                    <span className="flex items-center gap-1 truncate">
                      <Calendar size={12} className="shrink-0 sm:w-3.5 sm:h-3.5" />
                      <span className="truncate">{blog.date}</span>
                    </span>
                    <span className="hidden sm:flex items-center gap-1.5 truncate">
                      <User size={14} /> {blog.author}
                    </span>
                  </div>
                  <h2 className="text-sm sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-ink-950 leading-snug line-clamp-2">
                    {blog.title}
                  </h2>
                  <div className="text-ink-500 text-[11px] sm:text-sm md:text-base leading-relaxed mb-3 sm:mb-5 flex-grow min-w-0">
                    <AnimatePresence mode="wait">
                      {isExpanded ? (
                        <motion.div
                          key="full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-ink-700 whitespace-pre-wrap text-sm sm:text-base"
                        >
                          {blog.content}
                        </motion.div>
                      ) : (
                        <motion.p key="excerpt" className="line-clamp-3 sm:line-clamp-4">
                          {blog.excerpt}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : blog.id)}
                    className="inline-flex items-center gap-1.5 text-royal-600 font-semibold text-[11px] sm:text-sm hover:text-royal-700 transition-colors mt-auto"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp size={16} /> Less
                      </>
                    ) : (
                      <>
                        More <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </motion.article>
              );
            })}
          </div>
          {blogs.length === 0 && (
            <p className="text-center text-ink-400 py-12 text-sm">No articles published yet.</p>
          )}
        </div>
      </section>
    </div>
  );
};
