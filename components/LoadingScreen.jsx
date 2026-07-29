import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BRAND_NAME, PARENT_COMPANY } from '../constants.js';
import { LogoPulse } from './Logo.jsx';

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + 8 + Math.random() * 6, 100);
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(188, 50, 50, 0.06), transparent)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <LogoPulse variant="dark" size={64} className="mb-6" />
        <h1 className="text-xl font-bold text-ink-950 tracking-tight">{BRAND_NAME}</h1>
        <p className="text-ink-400 text-xs mt-1 mb-8">{PARENT_COMPANY}</p>

        <div className="w-56 h-1 bg-ink-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-royal-600 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-ink-300 text-xs mt-3 font-mono">{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
