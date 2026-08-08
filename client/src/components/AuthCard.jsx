import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Leaf } from 'lucide-react';

const AuthCard = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md glass-card p-8 sm:p-10 rounded-3xl border border-[#3EDC81]/30 shadow-2xl relative overflow-hidden"
      >
        {/* Glow ambient radial backgrounds */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#3EDC81]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Badge & Header */}
        <div className="text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3EDC81]/10 border border-[#3EDC81]/30 text-[#3EDC81] text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GreenSphere AI Security</span>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3EDC81] to-emerald-600 flex items-center justify-center shadow-lg shadow-[#3EDC81]/20">
              <Leaf className="w-5 h-5 text-emerald-950 stroke-[2.5]" />
            </div>
            <h2 className="text-3xl font-extrabold gradient-heading tracking-tight">
              {title}
            </h2>
          </div>

          <p className="text-xs text-emerald-200/70">{subtitle}</p>
        </div>

        {/* Form Body */}
        <div className="relative z-10">{children}</div>
      </motion.div>
    </div>
  );
};

export default AuthCard;
