import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, PiggyBank } from 'lucide-react';

const CostSavingsCard = ({ costSavings }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 rounded-3xl border border-amber-500/25 shadow-xl relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <PiggyBank className="w-5 h-5" />
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-300 font-bold uppercase tracking-wider border border-amber-500/30">
            💰 Financial Impact
          </span>
        </div>

        <h3 className="text-base font-bold text-amber-100 mb-2 flex items-center gap-1.5">
          <TrendingDown className="w-4 h-4 text-amber-400" />
          Utility Cost Reduction
        </h3>

        <p className="text-xs text-emerald-100/90 leading-relaxed font-medium bg-[#0d1811]/80 p-4 rounded-2xl border border-amber-500/15">
          {costSavings || 'Calculating potential annual financial ROI...'}
        </p>
      </div>

      <div className="pt-4 mt-2 border-t border-amber-900/30 text-[11px] text-amber-300/70 font-semibold flex items-center gap-1">
        <DollarSign className="w-3.5 h-3.5" />
        <span>Based on local commercial utility tariffs</span>
      </div>
    </motion.div>
  );
};

export default CostSavingsCard;
