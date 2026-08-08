import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Zap, Award } from 'lucide-react';

const ScoreCard = ({ points = 240, level = 2, streak = 4 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 rounded-3xl border border-[#3EDC81]/30 shadow-xl relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#3EDC81]/15 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#3EDC81]/15 border border-[#3EDC81]/30 flex items-center justify-center text-[#3EDC81]">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-emerald-50">
                Eco Points & Status
              </h3>
              <p className="text-[11px] text-emerald-300/60">Sustainability rewards</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Flame className="w-4 h-4 fill-amber-400" />
            <span>{streak} Day Streak!</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3.5 rounded-2xl bg-[#0d1811]/90 border border-emerald-500/15">
            <span className="text-[10px] font-bold text-emerald-300/60 uppercase tracking-wider block mb-1">
              Total Points
            </span>
            <span className="text-2xl font-black gradient-heading">
              {points} XP
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0d1811]/90 border border-emerald-500/15">
            <span className="text-[10px] font-bold text-emerald-300/60 uppercase tracking-wider block mb-1">
              Current Rank
            </span>
            <span className="text-2xl font-black text-[#3EDC81] flex items-center gap-1">
              Level {level}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreCard;
