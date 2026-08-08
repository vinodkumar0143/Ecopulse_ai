import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

const BadgeCard = ({ badges = [] }) => {
  const defaultBadges = [
    { id: 'starter', name: 'Eco Starter', icon: '🌱', description: 'Earn 50 Eco Points', unlocked: true },
    { id: 'hero', name: 'Green Hero', icon: '🌍', description: 'Reach 150 Eco Points', unlocked: true },
    { id: 'pro', name: 'Sustainability Pro', icon: '🏆', description: 'Reach 300 Eco Points', unlocked: false },
    { id: 'master', name: 'Energy Master', icon: '⚡', description: 'Reach 600 Eco Points', unlocked: false },
  ];

  const displayBadges = badges.length > 0 ? badges : defaultBadges;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3EDC81]/15 border border-[#3EDC81]/30 flex items-center justify-center text-[#3EDC81]">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-emerald-50 flex items-center gap-2">
              Badge Showcase
            </h3>
            <p className="text-xs text-emerald-300/60">Unlocked eco achievements</p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#3EDC81] px-3 py-1 rounded-full bg-[#3EDC81]/10 border border-[#3EDC81]/30">
          {displayBadges.filter((b) => b.unlocked).length} / {displayBadges.length} Unlocked
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {displayBadges.map((badge, idx) => (
          <motion.div
            key={badge.id || idx}
            whileHover={{ scale: 1.05, y: -2 }}
            className={`p-4 rounded-2xl border text-center transition-all duration-300 relative ${
              badge.unlocked
                ? 'bg-[#0d1811]/90 border-[#3EDC81]/40 shadow-lg shadow-[#3EDC81]/10'
                : 'bg-emerald-950/20 border-emerald-900/30 opacity-60'
            }`}
          >
            {badge.unlocked ? (
              <div className="absolute top-2 right-2 text-[#3EDC81]">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            ) : (
              <div className="absolute top-2 right-2 text-emerald-600">
                <Lock className="w-3.5 h-3.5" />
              </div>
            )}

            <div className="text-3xl mb-2 flex items-center justify-center h-10">
              {badge.icon}
            </div>

            <h4 className="text-xs font-bold text-emerald-100 mb-1">{badge.name}</h4>
            <p className="text-[10px] text-emerald-300/60 leading-tight">{badge.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BadgeCard;
