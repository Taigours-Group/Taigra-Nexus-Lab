
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronRight, Info, CheckCircle } from 'lucide-react';
import { TUTORIAL_STEPS } from '../constants.js';
import { getCookieConsent, hasConsentDecision } from '../utils/cookieConsent.js';

export const Tutorial = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (localStorage.getItem('tt_tutorial_completed')) return;

    const consent = getCookieConsent();
    if (hasConsentDecision() && !consent?.preferences) return;

    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      const target = document.getElementById(TUTORIAL_STEPS[next].target);
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem('tt_tutorial_completed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm pointer-events-auto"
        onClick={handleComplete}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md nexus-card p-6 md:p-8 shadow-2xl pointer-events-auto ring-1 ring-royal-100"
        role="dialog"
        aria-labelledby="tutorial-title"
      >
        <button
          type="button"
          onClick={handleComplete}
          className="absolute top-4 right-4 p-1 text-ink-400 hover:text-ink-950 rounded-lg transition-colors"
          aria-label="Dismiss tour"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-royal-50 rounded-lg ring-1 ring-royal-100">
            <Info className="text-royal-600 w-4 h-4" />
          </div>
          <span className="text-xs font-semibold text-royal-600 uppercase tracking-wider">
            Quick tour · {currentStep + 1}/{TUTORIAL_STEPS.length}
          </span>
        </div>

        <h3 id="tutorial-title" className="text-xl font-bold text-ink-950 mb-2">
          {step.title}
        </h3>
        <p className="text-ink-500 text-sm leading-relaxed mb-6">{step.content}</p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-1.5">
            {TUTORIAL_STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentStep ? 'w-6 bg-royal-600' : 'w-2 bg-ink-200'
                }`}
              />
            ))}
          </div>
          <button type="button" onClick={handleNext} className="btn-primary text-sm !py-2.5 !px-5">
            {currentStep === TUTORIAL_STEPS.length - 1 ? (
              <>Done <CheckCircle size={16} /></>
            ) : (
              <>Next <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
