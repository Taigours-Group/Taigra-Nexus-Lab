import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PARENT_COMPANY, BRAND_NAME } from '../constants.js';

// Optimized floating particles using CSS (no JS re-renders)
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Pre-defined particles with CSS animations */}
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-blue-400/40"
        style={{
          left: `${10 + i * 11}%`,
          top: `${15 + (i % 4) * 20}%`,
          width: i % 3 === 0 ? '2px' : '3px',
          height: i % 3 === 0 ? '2px' : '3px',
          animation: `float ${8 + i * 0.5}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
          boxShadow: '0 0 6px rgba(59, 130, 246, 0.5)',
        }}
      />
    ))}
  </div>
);

// Single scanning line with CSS
const ScanningLine = () => (
  <div 
    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent pointer-events-none"
    style={{
      animation: 'scan 3s linear infinite',
    }}
  />
);

// Pulsing glow around logo using CSS
const PulsingGlow = () => (
  <div 
    className="absolute rounded-full border border-blue-500/20 pointer-events-none"
    style={{
      width: '140px',
      height: '140px',
      animation: 'pulse-ring 3s ease-out infinite',
    }}
  />
);

// Corner tech brackets with CSS
const CornerBrackets = () => (
  <div className="absolute inset-0 pointer-events-none p-8">
    {/* Top-left */}
    <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-blue-500/30" />
    {/* Top-right */}
    <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-blue-500/30" />
    {/* Bottom-left */}
    <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-blue-500/30" />
    {/* Bottom-right */}
    <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-blue-500/30" />
  </div>
);

// Data stream effect using CSS
const DataStream = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[0, 1, 2].map((i) => (
      <div
        key={i}
        className="absolute w-px bg-gradient-to-b from-transparent via-blue-500/15 to-transparent"
        style={{
          left: `${25 + i * 25}%`,
          height: '40%',
          animation: `data-flow ${4 + i * 0.5}s linear infinite`,
          animationDelay: `${i * 1.2}s`,
        }}
      />
    ))}
  </div>
);

// Add keyframe styles via style tag
const LoadingStyles = () => (
  <style>{`
    @keyframes float {
      0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
      50% { transform: translateY(-30px) scale(1.2); opacity: 0.8; }
    }
    @keyframes scan {
      0% { top: 0%; opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(1.8); opacity: 0; }
    }
    @keyframes data-flow {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(250%); }
    }
    @keyframes glow-pulse {
      0%, 100% { opacity: 0.15; transform: scale(1); }
      50% { opacity: 0.25; transform: scale(1.1); }
    }
  `}</style>
);

export const LoadingScreen = ({ onComplete, forceShow = false }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const startTime = React.useRef(Date.now());
  const intervalRef = React.useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTime.current;
      
      if (forceShow && elapsed < 5000) {
        setProgress(prev => {
          const next = prev + (Math.random() * 8 + 4);
          return Math.min(next, 94);
        });
        return;
      }
      
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        const next = prev + (Math.random() * 10 + 5);
        if (next >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          setIsExiting(true);
          setTimeout(onComplete, 700);
          return 100;
        }
        return next;
      });
    };

    intervalRef.current = setInterval(updateProgress, 80);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [onComplete, forceShow]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.01 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#020204] overflow-hidden"
    >
      <LoadingStyles />
      
      {/* CSS-powered animated elements */}
      <FloatingParticles />
      <ScanningLine />
      <DataStream />
      <CornerBrackets />

      {/* Optimized ambient glows - using CSS for main animation */}
      <div 
        className="absolute pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '350px',
          background: 'radial-gradient(ellipse, rgba(30, 58, 138, 0.2) 0%, transparent 70%)',
          animation: 'glow-pulse 5s ease-in-out infinite',
        }}
      />
      
      <div 
        className="absolute pointer-events-none"
        style={{
          bottom: '25%',
          right: '20%',
          width: '300px',
          height: '250px',
          background: 'radial-gradient(ellipse, rgba(8, 145, 178, 0.1) 0%, transparent 70%)',
          animation: 'glow-pulse 7s ease-in-out infinite',
          animationDelay: '1s',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with CSS pulsing ring */}
        <div className="relative mb-8">
          <PulsingGlow />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://res.cloudinary.com/dbjjzyrr3/image/upload/v1772696070/Taigra_Nexus_Labs_logo.png" 
              alt={BRAND_NAME}
              className="w-14 h-14 md:w-16 md:h-16 rounded-xl"
            />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            {BRAND_NAME}
          </h1>
          <p className="text-blue-400/60 text-xs mt-2 tracking-[0.2em] uppercase">
            {PARENT_COMPANY}
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="w-56 md:w-64"
        >
          <div className="h-px bg-white/[0.08] rounded-full overflow-hidden mb-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/30 text-[10px] tracking-widest">LOADING</span>
            <span className="text-white/50 text-xs font-mono">{Math.round(progress)}%</span>
          </div>
        </motion.div>

        {/* Simple loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex gap-1 mt-4"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-1 h-3 bg-blue-500/60 rounded-full"
            />
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6"
      >
        <p className="text-white/15 text-[9px] tracking-wider">© 2026 {BRAND_NAME}</p>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;

