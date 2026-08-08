import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Leaf, ShieldAlert } from 'lucide-react';

const ImpactCard = ({ environmentalImpact, improvementTips = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="glass-card p-6 rounded-3xl border border-cyan-500/25 shadow-xl relative overflow-hidden flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Globe className="w-5 h-5" />
          </div>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/15 text-cyan-300 font-bold uppercase tracking-wider border border-cyan-500/30">
            🌍 Carbon Footprint
          </span>
        </div>

        <h3 className="text-base font-bold text-cyan-100 mb-2 flex items-center gap-1.5">
          <Leaf className="w-4 h-4 text-cyan-400" />
          Environmental CO2 Analysis
        </h3>

        <p className="text-xs text-emerald-100/90 leading-relaxed font-medium bg-[#0d1811]/80 p-4 rounded-2xl border border-cyan-500/15 mb-4">
          {environmentalImpact || 'Calculating greenhouse gas emission reductions...'}
        </p>

        {improvementTips.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Quick Optimization Tips:</h4>
            <div className="grid grid-cols-1 gap-2">
              {improvementTips.map((tip, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-emerald-200/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-cyan-900/30 text-[11px] text-cyan-300/70 font-semibold flex items-center gap-1">
        <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
        <span>Aligned with ISO 14064 Carbon Accounting Standards</span>
      </div>
    </motion.div>
  );
};

export default ImpactCard;
