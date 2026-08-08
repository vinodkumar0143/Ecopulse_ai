import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

const Layout = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#09110c] text-emerald-50 selection:bg-emerald-500 selection:text-black relative overflow-x-hidden">
      {/* Ambient Interactive Mouse Tracker Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(16, 185, 129, 0.07), transparent 80%)`,
        }}
      />

      {/* Floating Animated Ambient Glow Orbs */}
      <div className="fixed top-10 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-10 right-10 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      {/* Glass Header */}
      <Navbar />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-emerald-900/40 py-6 text-center text-xs text-emerald-400/60 z-10 backdrop-blur-md">
        © 2026 EcoPulse Platform. Green Building Sustainability & Environmental Intelligence.
      </footer>
    </div>
  );
};

export default Layout;
