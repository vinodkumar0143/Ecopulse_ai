import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Lightbulb, CheckCircle2 } from 'lucide-react';

const AIRecommendations = ({ recommendations = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/25 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold text-emerald-50">
                Actionable Eco Improvements
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#3EDC81]/20 text-[#3EDC81] border border-[#3EDC81]/30 font-bold uppercase tracking-wider">
                Top Priority
              </span>
            </div>
            <p className="text-xs text-emerald-300/60 mt-0.5">
              Prioritized measures to boost energy rating and reduce carbon emissions.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {recommendations.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02, x: 3 }}
            className="p-4 rounded-2xl bg-[#0d1811]/90 border border-emerald-500/15 flex items-start gap-3 transition-all duration-300"
          >
            <div className="w-6 h-6 rounded-full bg-[#3EDC81]/20 text-[#3EDC81] flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
              {index + 1}
            </div>
            <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">{item}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIRecommendations;
