import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

const RiskIndicator = ({ riskLevel = 'Low' }) => {
  const getRiskConfig = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return {
          label: 'High Emission Risk',
          bg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
          dot: 'bg-rose-400',
          Icon: ShieldAlert,
        };
      case 'medium':
        return {
          label: 'Moderate Risk',
          bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
          dot: 'bg-amber-400',
          Icon: AlertTriangle,
        };
      default:
        return {
          label: 'Low Environmental Risk',
          bg: 'bg-[#3EDC81]/15 border-[#3EDC81]/40 text-[#3EDC81]',
          dot: 'bg-[#3EDC81]',
          Icon: ShieldCheck,
        };
    }
  };

  const config = getRiskConfig(riskLevel);
  const IconComponent = config.Icon;

  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider ${config.bg}`}>
      <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`} />
      <IconComponent className="w-3.5 h-3.5" />
      <span>{config.label}</span>
    </div>
  );
};

export default RiskIndicator;
