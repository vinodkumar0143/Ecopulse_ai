import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  Droplets,
  Recycle,
  Sparkles,
  Award,
  Building2,
  Maximize2,
  Calendar,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { getBuildings, getAIAnalysis } from '../services/api';
import AIScoreExplanation from '../components/AIScoreExplanation';
import AIRecommendations from '../components/AIRecommendations';
import CostSavingsCard from '../components/CostSavingsCard';
import ImpactCard from '../components/ImpactCard';
import PredictionDashboard from '../components/PredictionDashboard';

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [assessment, setAssessment] = useState(location.state?.newAssessment || null);
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(!location.state?.newAssessment);
  const [aiLoading, setAiLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.newAssessment) {
      fetchLatestAssessment();
    } else {
      fetchAIInsights(location.state.newAssessment);
    }
  }, []);

  const fetchLatestAssessment = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBuildings();
      if (res.data?.data && res.data.data.length > 0) {
        const latest = res.data.data[0];
        setAssessment(latest);
        fetchAIInsights(latest);
      } else {
        setAssessment(null);
        setAiLoading(false);
      }
    } catch (err) {
      setError('Something went wrong connecting to backend API. Please try again.');
      setAiLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchAIInsights = async (buildingObj) => {
    try {
      setAiLoading(true);
      const res = await getAIAnalysis({
        type: buildingObj.type,
        area: buildingObj.area,
        energyUsage: buildingObj.energyUsage,
        waterUsage: buildingObj.waterUsage,
        materials: buildingObj.materials,
        sustainabilityScore: buildingObj.sustainabilityScore,
      });

      if (res.data?.data) {
        setAiData(res.data.data);
      }
    } catch (e) {
      console.log('AI Analysis fallback enabled');
    } finally {
      setAiLoading(false);
    }
  };

  // Skeleton UI Loader Component
  if (loading) {
    return (
      <div className="space-y-8 py-4 max-w-7xl mx-auto">
        <div className="h-8 w-64 bg-emerald-950/40 border border-emerald-500/10 rounded-xl animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-64 glass-card rounded-3xl animate-pulse p-6 bg-emerald-950/20" />
          <div className="h-64 glass-card rounded-3xl animate-pulse p-6 bg-emerald-950/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 glass-card rounded-2xl animate-pulse bg-emerald-950/20" />
          <div className="h-32 glass-card rounded-2xl animate-pulse bg-emerald-950/20" />
          <div className="h-32 glass-card rounded-2xl animate-pulse bg-emerald-950/20" />
        </div>
      </div>
    );
  }

  // Error Banner State
  if (error) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="glass-card p-10 rounded-3xl border border-red-500/30 shadow-2xl space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
          <h3 className="text-xl font-bold text-red-200">{error}</h3>
          <button
            onClick={fetchLatestAssessment}
            className="px-6 py-3 rounded-xl bg-[#3EDC81] text-slate-950 font-bold text-xs inline-flex items-center gap-2 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        </div>
      </div>
    );
  }

  // Empty Fallback State
  if (!assessment) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-6">
        <div className="glass-card p-10 rounded-3xl border border-emerald-500/20 shadow-2xl">
          <Building2 className="w-16 h-16 text-emerald-400/40 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-emerald-100">No Assessment Found</h2>
          <p className="text-sm text-emerald-300/70 mt-2 mb-6">
            Generate your first building sustainability evaluation to view analytics and AI insights.
          </p>
          <button
            onClick={() => navigate('/assess')}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#3EDC81] to-emerald-500 text-slate-950 font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-[#3EDC81]/20 hover:scale-105 transition-all duration-300 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Assess New Building</span>
          </button>
        </div>
      </div>
    );
  }

  const score = assessment.sustainabilityScore ?? 0;
  const metrics = assessment.efficiencyMetrics || {
    energyEfficiency: 80,
    waterEfficiency: 80,
    materialEfficiency: 60,
  };

  // Score interpretation
  const getScoreInterpretation = (val) => {
    if (val >= 80) {
      return {
        label: 'Excellent',
        badgeBg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
        strokeColor: '#3EDC81',
        glowColor: 'rgba(62, 220, 129, 0.4)',
        icon: CheckCircle2,
      };
    }
    if (val >= 50) {
      return {
        label: 'Moderate',
        badgeBg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
        strokeColor: '#f59e0b',
        glowColor: 'rgba(245, 158, 11, 0.4)',
        icon: TrendingUp,
      };
    }
    return {
      label: 'Needs Improvement',
      badgeBg: 'bg-rose-500/15 border-rose-500/40 text-rose-300',
      strokeColor: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      icon: AlertTriangle,
    };
  };

  const interpretation = getScoreInterpretation(score);
  const StatusIcon = interpretation.icon;

  // Chart Data
  const barChartData = [
    { name: 'Energy', score: metrics.energyEfficiency, fill: '#3EDC81' },
    { name: 'Water', score: metrics.waterEfficiency, fill: '#06b6d4' },
    { name: 'Material', score: metrics.materialEfficiency, fill: '#8b5cf6' },
  ];

  const pieChartData = [
    { name: 'Energy (40%)', value: 40, color: '#3EDC81' },
    { name: 'Water (30%)', value: 30, color: '#06b6d4' },
    { name: 'Material (30%)', value: 30, color: '#8b5cf6' },
  ];

  // SVG Gauge calculations
  const strokeWidth = 14;
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 py-4 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3EDC81]/10 border border-[#3EDC81]/30 text-[#3EDC81] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ECOPULSE AI Analytics Platform</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold gradient-heading">
            Environmental Impact Analytics
          </h1>
        </div>

        <button
          onClick={() => navigate('/assess')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3EDC81] to-emerald-500 text-slate-950 font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-[#3EDC81]/20 hover:scale-105 transition-all duration-300 cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Assess Another Building</span>
        </button>
      </div>

      {/* Grid Row 1: Score Gauge Card & Building Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Score Gauge Card */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-[#3EDC81]/30 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-around gap-6"
        >
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none"
            style={{ background: interpretation.glowColor }}
          />

          <div className="relative w-52 h-52 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r={radius}
                className="text-emerald-950/60 stroke-current"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <motion.circle
                cx="100"
                cy="100"
                r={radius}
                stroke={interpretation.strokeColor}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-5xl font-black gradient-heading tracking-tight">
                {score}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300/70 mt-1">
                Out of 100
              </span>
            </div>
          </div>

          <div className="space-y-4 text-center sm:text-left z-10 max-w-sm">
            <div
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${interpretation.badgeBg} text-xs font-bold uppercase tracking-wider`}
            >
              <StatusIcon className="w-4 h-4" />
              <span>{interpretation.label} Performance</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-50">
              Overall Sustainability Index
            </h2>
            <p className="text-xs text-emerald-200/70 leading-relaxed">
              Weighted 40/30/30 evaluation across energy consumption, water efficiency, and material recyclability.
            </p>
          </div>
        </motion.div>

        {/* Building Summary */}
        <motion.div
          variants={itemVariants}
          className="glass-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-emerald-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-[#3EDC81]" />
                Building Profile
              </h3>
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#3EDC81]/10 text-[#3EDC81] font-semibold uppercase tracking-wider border border-[#3EDC81]/30">
                {assessment.type}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between py-2 border-b border-emerald-900/40">
                <span className="text-emerald-300/60 flex items-center gap-2">
                  <Maximize2 className="w-3.5 h-3.5 text-[#3EDC81]" /> Total Area
                </span>
                <span className="font-semibold text-emerald-100">{assessment.area} sq ft</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-emerald-900/40">
                <span className="text-emerald-300/60 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#3EDC81]" /> Energy Usage
                </span>
                <span className="font-semibold text-emerald-100">{assessment.energyUsage} kWh</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-emerald-900/40">
                <span className="text-emerald-300/60 flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-[#3EDC81]" /> Water Usage
                </span>
                <span className="font-semibold text-emerald-100">{assessment.waterUsage} Gal/L</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-emerald-900/40">
                <span className="text-emerald-300/60 flex items-center gap-2">
                  <Recycle className="w-3.5 h-3.5 text-[#3EDC81]" /> Materials
                </span>
                <span className="font-semibold text-emerald-100 capitalize">{assessment.materials}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 text-[11px] text-[#3EDC81]/70 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              Assessed on {new Date(assessment.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Grid Row 2: Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Energy Card */}
        <motion.div variants={itemVariants} className="glass-card glass-card-hover p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#3EDC81]/10 border border-[#3EDC81]/30 flex items-center justify-center text-[#3EDC81]">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-emerald-100">{metrics.energyEfficiency}%</span>
          </div>
          <h4 className="text-sm font-semibold text-emerald-200 mb-1">Energy Efficiency</h4>
          <p className="text-[11px] text-emerald-300/60 mb-3">Weighting: 40%</p>
          <div className="w-full bg-emerald-950/80 rounded-full h-2 overflow-hidden border border-emerald-500/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metrics.energyEfficiency}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-[#3EDC81] h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Water Card */}
        <motion.div variants={itemVariants} className="glass-card glass-card-hover p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Droplets className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-cyan-100">{metrics.waterEfficiency}%</span>
          </div>
          <h4 className="text-sm font-semibold text-cyan-200 mb-1">Water Efficiency</h4>
          <p className="text-[11px] text-cyan-300/60 mb-3">Weighting: 30%</p>
          <div className="w-full bg-cyan-950/80 rounded-full h-2 overflow-hidden border border-cyan-500/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metrics.waterEfficiency}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-cyan-400 h-full rounded-full"
            />
          </div>
        </motion.div>

        {/* Material Card */}
        <motion.div variants={itemVariants} className="glass-card glass-card-hover p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Recycle className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-purple-100">{metrics.materialEfficiency}%</span>
          </div>
          <h4 className="text-sm font-semibold text-purple-200 mb-1">Material Efficiency</h4>
          <p className="text-[11px] text-purple-300/60 mb-3">Weighting: 30%</p>
          <div className="w-full bg-purple-950/80 rounded-full h-2 overflow-hidden border border-purple-500/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metrics.materialEfficiency}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="bg-purple-400 h-full rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Grid Row 3: Smart Predictive Forecasting Dashboard */}
      <PredictionDashboard buildingData={assessment} />

      {/* Grid Row 4: AI Score Synthesis & Impact Cards */}
      {aiLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-44 glass-card rounded-3xl animate-pulse bg-emerald-950/20" />
          <div className="h-44 glass-card rounded-3xl animate-pulse bg-emerald-950/20" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* AI Score Explanation */}
          <AIScoreExplanation
            scoreExplanation={aiData?.scoreExplanation}
            score={score}
          />

          {/* AI Recommendations */}
          <AIRecommendations
            recommendations={aiData?.recommendations || assessment.recommendations}
          />

          {/* Financial Cost Savings & Environmental CO2 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CostSavingsCard costSavings={aiData?.costSavings} />
            <ImpactCard
              environmentalImpact={aiData?.environmentalImpact}
              improvementTips={aiData?.improvementTips}
            />
          </div>
        </div>
      )}

      {/* Grid Row 5: Recharts Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="glass-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
          <h3 className="text-base font-bold text-emerald-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#3EDC81]" />
            Category Efficiency Breakdown
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#6ee7b7" fontSize={12} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#6ee7b7" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1811',
                    borderColor: 'rgba(62, 220, 129, 0.3)',
                    borderRadius: '12px',
                    color: '#ecfdf5',
                  }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {barChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass-card p-6 rounded-3xl border border-emerald-500/20 shadow-xl">
          <h3 className="text-base font-bold text-emerald-100 mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#3EDC81]" />
            Scoring Engine Weight Distribution
          </h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0d1811',
                    borderColor: 'rgba(62, 220, 129, 0.3)',
                    borderRadius: '12px',
                    color: '#ecfdf5',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
