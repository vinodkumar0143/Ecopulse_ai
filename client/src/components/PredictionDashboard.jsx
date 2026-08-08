import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Zap, Globe, Sparkles, Lightbulb, Loader2 } from 'lucide-react';
import RiskIndicator from './RiskIndicator';
import PredictionChart from './PredictionChart';
import { getForecast } from '../services/api';

const PredictionDashboard = ({ buildingData }) => {
  const [timeframe, setTimeframe] = useState('7d');
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictionData();
  }, [timeframe, buildingData]);

  const fetchPredictionData = async () => {
    try {
      setLoading(true);
      const payload = {
        energyUsage: buildingData?.energyUsage || 400,
        waterUsage: buildingData?.waterUsage || 250,
        carbonScore: buildingData?.sustainabilityScore || 75,
        area: buildingData?.area || 1500,
        type: buildingData?.type || 'commercial',
        timeframe,
      };

      const res = await getForecast(payload);
      if (res.data?.data) {
        setForecast(res.data.data);
      }
    } catch (e) {
      console.log('Prediction fallback enabled');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-card p-6 sm:p-8 rounded-3xl border border-[#3EDC81]/30 shadow-2xl space-y-6 relative overflow-hidden"
    >
      {/* Glow ambient background */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#3EDC81]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Timeframe Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/40 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3EDC81] to-emerald-600 flex items-center justify-center text-slate-950 shadow-md shadow-[#3EDC81]/20">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold gradient-heading">
                Smart Predictive Forecasting
              </h3>
              <Sparkles className="w-4 h-4 text-[#3EDC81]" />
            </div>
            <p className="text-xs text-emerald-300/60 mt-0.5">
              Machine learning trend trajectory & energy consumption model
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RiskIndicator riskLevel={forecast?.riskLevel} />

          {/* Timeframe Toggle Switch */}
          <div className="flex items-center bg-[#0d1811] p-1 rounded-xl border border-emerald-500/20">
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeframe === '7d'
                  ? 'bg-[#3EDC81] text-slate-950 shadow-md'
                  : 'text-emerald-300/70 hover:text-emerald-100'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeframe('30d')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                timeframe === '30d'
                  ? 'bg-[#3EDC81] text-slate-950 shadow-md'
                  : 'text-emerald-300/70 hover:text-emerald-100'
              }`}
            >
              30 Days
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-[#3EDC81]" />
          <p className="text-xs text-emerald-300/70">Computing predictive algorithms & trends...</p>
        </div>
      ) : (
        <>
          {/* Summary Banner & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-4 rounded-2xl bg-[#0d1811]/90 border border-emerald-500/15">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#3EDC81]" />
                Forecast Summary ({timeframe === '30d' ? '30-Day Model' : '7-Day Model'})
              </h4>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                {forecast?.predictionSummary}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#0d1811]/90 border border-emerald-500/15 space-y-2 flex flex-col justify-center">
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-300/60 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#3EDC81]" /> Projected Energy
                </span>
                <span className="font-bold text-emerald-100">{forecast?.projectedTotalEnergy} kWh</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-emerald-300/60 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-cyan-400" /> Projected Carbon
                </span>
                <span className="font-bold text-emerald-100">{forecast?.projectedTotalCarbon} kg CO2e</span>
              </div>
            </div>
          </div>

          {/* Line Chart Component */}
          <PredictionChart
            energyTrend={forecast?.energyTrend}
            futureCarbon={forecast?.futureCarbon}
          />

          {/* Future Recommendations List */}
          {forecast?.suggestions && forecast.suggestions.length > 0 && (
            <div className="pt-3 border-t border-emerald-900/30">
              <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-[#3EDC81]" />
                Targeted Mitigation Measures for Projected Risk
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {forecast.suggestions.map((suggestion, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0d1811]/70 border border-emerald-500/15 text-xs text-emerald-100/90 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3EDC81] flex-shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{suggestion}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default PredictionDashboard;
