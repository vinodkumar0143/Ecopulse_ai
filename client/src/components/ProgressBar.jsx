import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Award } from 'lucide-react';

const ProgressBar = ({ points = 240, level = 2 }) => {
  const getLevelTarget = (lvl) => {
    if (lvl === 1) return { min: 0, max: 100, next: 2 };
    if (lvl === 2) return { min: 100, max: 300, next: 3 };
    if (lvl === 3) return { min: 300, max: 600, next: 4 };
    return { min: 600, max: 1000, next: 'MAX' };
  };

  const target = getLevelTarget(level);
  const currentXP = Math.max(0, points - target.min);
  const neededXP = target.max - target.min;
  const percentage = Math.min(100, Math.round((currentXP / neededXP) * 100));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#3EDC81]/15 border border-[#3EDC81]/30 flex items-center justify-center text-[#3EDC81]">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-100">
                Next Level Progress
              </h3>
              <p className="text-[11px] text-emerald-300/60">
                Level {level} → Level {target.next}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-[#3EDC81] px-3 py-1 rounded-full bg-[#3EDC81]/10 border border-[#3EDC81]/30">
            {percentage}% Complete
          </span>
        </div>

        <div className="space-y-2 mt-4">
          <div className="flex items-center justify-between text-xs font-semibold text-emerald-200/80">
            <span>Current: {points} XP</span>
            <span>Next Level: {target.max} XP</span>
          </div>

          <div className="w-full bg-emerald-950/80 rounded-full h-3 overflow-hidden border border-emerald-500/20 p-0.5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-[#3EDC81] to-emerald-400 rounded-full shadow-lg shadow-[#3EDC81]/30"
            />
          </div>
        </div>
      </div>

      <div className="pt-3 text-[11px] text-emerald-300/70 flex items-center gap-1.5 mt-2">
        <Award className="w-3.5 h-3.5 text-[#3EDC81]" />
        <span>Earn +50 XP on your next low-carbon building assessment!</span>
      </div>
    </motion.div>
  );
};

export default ProgressBar;
