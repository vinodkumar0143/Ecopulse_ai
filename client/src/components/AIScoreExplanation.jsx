import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

const AIScoreExplanation = ({ scoreExplanation, score }) => {
  const getBadgeStyle = (val) => {
    if (val >= 80) return { label: 'High Efficiency', color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30', Icon: CheckCircle2 };
    if (val >= 50) return { label: 'Moderate Efficiency', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30', Icon: TrendingUp };
    return { label: 'Sub-Optimal Efficiency', color: 'text-rose-400 bg-rose-500/10 border-rose-500/30', Icon: AlertTriangle };
  };

  const badge = getBadgeStyle(score || 75);
  const StatusIcon = badge.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card p-6 sm:p-8 rounded-3xl border border-[#3EDC81]/30 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#3EDC81]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#3EDC81]/10 border border-[#3EDC81]/30 flex items-center justify-center text-[#3EDC81]">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-emerald-50 flex items-center gap-2">
              AI Score Synthesis
            </h3>
            <p className="text-xs text-emerald-300/60">Algorithmic environmental impact explanation</p>
          </div>
        </div>

        <div className={`px-3 py-1 rounded-full border text-xs font-bold flex items-center gap-1.5 ${badge.color}`}>
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{badge.label}</span>
        </div>
      </div>

      <p className="text-sm text-emerald-100/90 leading-relaxed font-medium bg-[#0d1811]/70 p-4 rounded-2xl border border-emerald-500/15">
        {scoreExplanation || 'Analyzing building environmental metrics and material baseline...'}
      </p>
    </motion.div>
  );
};

export default AIScoreExplanation;
