import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import ChatBot from './ChatBot';

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
    <div className="min-h-screen bg-[#09110c] text-emerald-50 relative overflow-x-hidden flex flex-col font-sans selection:bg-[#3EDC81] selection:text-slate-950">
      {/* Interactive Mouse Glow Follower */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(62, 220, 129, 0.06), transparent 80%)`,
        }}
      />

      {/* Floating Ambient Background Orbs */}
      <div className="fixed top-1/4 -left-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-1/4 -right-32 w-96 h-96 bg-teal-500/10 rounded-full blur-[128px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {children}
      </main>

      {/* Global AI Chatbot Floating Widget */}
      <ChatBot />

      {/* Footer */}
      <footer className="border-t border-emerald-900/30 bg-[#070d09]/80 backdrop-blur-md relative z-10 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs text-emerald-400/60 font-medium">
            © {new Date().getFullYear()} ECOPULSE AI — Sustainable Building Intelligence & Environmental Scoring System
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
