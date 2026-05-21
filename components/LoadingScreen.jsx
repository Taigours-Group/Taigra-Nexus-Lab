import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BRAND_NAME, PARENT_COMPANY } from '../constants.js';

const LOGO_URL =
  'https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696070/Taigra_Nexus_Labs_logo.png';

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
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-nexus-950"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 40%, rgba(59, 130, 246, 0.12), transparent)',
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6">
        <img src={LOGO_URL} alt="" className="w-14 h-14 rounded-xl mb-6 ring-1 ring-white/10" />
        <h1 className="text-xl font-bold text-white tracking-tight">{BRAND_NAME}</h1>
        <p className="text-slate-500 text-xs mt-1 mb-8">{PARENT_COMPANY}</p>

        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-slate-600 text-xs mt-3 font-mono">{Math.round(progress)}%</p>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
