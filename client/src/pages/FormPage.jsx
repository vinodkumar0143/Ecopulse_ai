import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Building2,
  Maximize2,
  Zap,
  Droplets,
  Recycle,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { createBuilding } from '../services/api';

const FormPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'residential',
    area: '',
    energyUsage: '',
    waterUsage: '',
    materials: 'eco-friendly',
  });

  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Real-time validation
  const errors = useMemo(() => {
    const errs = {};

    if (!formData.type) {
      errs.type = 'Building type is required';
    }

    if (!formData.area) {
      errs.area = 'Building area is required';
    } else if (Number(formData.area) < 10 || Number(formData.area) > 100000) {
      errs.area = 'Area must be between 10 and 100,000 sq ft/m²';
    }

    if (formData.energyUsage === '') {
      errs.energyUsage = 'Energy usage is required';
    } else if (Number(formData.energyUsage) < 0) {
      errs.energyUsage = 'Energy usage cannot be negative';
    }

    if (formData.waterUsage === '') {
      errs.waterUsage = 'Water usage is required';
    } else if (Number(formData.waterUsage) < 0) {
      errs.waterUsage = 'Water usage cannot be negative';
    }

    if (!formData.materials) {
      errs.materials = 'Material classification is required';
    }

    return errs;
  }, [formData]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      type: true,
      area: true,
      energyUsage: true,
      waterUsage: true,
      materials: true,
    });

    if (!isValid) {
      toast.error('Please complete all required form fields correctly.');
      return;
    }

    setLoading(true);
    setApiError(null);
    const toastId = toast.loading('Calculating building sustainability index...');

    try {
      const payload = {
        type: formData.type,
        area: Number(formData.area),
        energyUsage: Number(formData.energyUsage),
        waterUsage: Number(formData.waterUsage),
        materials: formData.materials,
      };

      const response = await createBuilding(payload);
      setSuccess(true);
      toast.success('Building Assessment Generated Successfully! 🚀', { id: toastId });

      setTimeout(() => {
        navigate('/dashboard', {
          state: { newAssessment: response.data.data },
        });
      }, 800);
    } catch (err) {
      const message =
        err.response?.data?.message || 'Something went wrong. Please check backend connection and try again.';
      setApiError(message);
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto py-6 px-2 sm:px-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="glass-card p-6 sm:p-10 rounded-3xl border border-emerald-500/25 shadow-2xl relative overflow-hidden"
      >
        {/* Ambient background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sustainability Scoring Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold gradient-heading">
            Building Parameter Assessment
          </h2>
          <p className="text-sm text-emerald-200/70 mt-1">
            Provide property parameters to calculate environmental sustainability score (0–100) and tailored recommendations.
          </p>
        </motion.div>

        {/* Global Error Banner */}
        <AnimatePresence>
          {apiError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm flex items-center gap-3 shadow-lg"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-400" />
              <span>{apiError}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Assessment Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Building Type */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-400" />
              Building Type
            </label>
            <div className="relative">
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className="w-full bg-[#0d1811] text-emerald-100 border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 appearance-none text-sm font-medium cursor-pointer disabled:opacity-60"
              >
                <option value="residential">Residential Building</option>
                <option value="commercial">Commercial Office & Complex</option>
                <option value="industrial">Industrial & Logistics Facility</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400 text-xs font-bold">
                ▼
              </div>
            </div>
            {touched.type && errors.type && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.type}
              </p>
            )}
          </motion.div>

          {/* 2. Building Area */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Maximize2 className="w-4 h-4 text-emerald-400" />
              Building Area (sq ft / m²)
            </label>
            <input
              type="number"
              name="area"
              placeholder="e.g. 1500"
              value={formData.area}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={`w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border ${
                touched.area && errors.area
                  ? 'border-red-500/50 focus:ring-red-500/20'
                  : 'border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20'
              } rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-medium disabled:opacity-60`}
            />
            {touched.area && errors.area && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.area}
              </p>
            )}
          </motion.div>

          {/* 3. Energy Usage */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              Monthly Energy Consumption (kWh)
            </label>
            <input
              type="number"
              name="energyUsage"
              placeholder="e.g. 350"
              value={formData.energyUsage}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={`w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border ${
                touched.energyUsage && errors.energyUsage
                  ? 'border-red-500/50 focus:ring-red-500/20'
                  : 'border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20'
              } rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-medium disabled:opacity-60`}
            />
            {touched.energyUsage && errors.energyUsage && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.energyUsage}
              </p>
            )}
          </motion.div>

          {/* 4. Water Usage */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Droplets className="w-4 h-4 text-emerald-400" />
              Monthly Water Consumption (Gallons / Liters)
            </label>
            <input
              type="number"
              name="waterUsage"
              placeholder="e.g. 250"
              value={formData.waterUsage}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={loading}
              className={`w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border ${
                touched.waterUsage && errors.waterUsage
                  ? 'border-red-500/50 focus:ring-red-500/20'
                  : 'border-emerald-500/20 focus:border-emerald-400 focus:ring-emerald-400/20'
              } rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 transition-all duration-300 text-sm font-medium disabled:opacity-60`}
            />
            {touched.waterUsage && errors.waterUsage && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.waterUsage}
              </p>
            )}
          </motion.div>

          {/* 5. Material Classification */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
              <Recycle className="w-4 h-4 text-emerald-400" />
              Building Material Classification
            </label>
            <div className="relative">
              <select
                name="materials"
                value={formData.materials}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={loading}
                className="w-full bg-[#0d1811] text-emerald-100 border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-300 appearance-none text-sm font-medium cursor-pointer disabled:opacity-60"
              >
                <option value="eco-friendly">Eco-Friendly (Certified / Recycled Materials)</option>
                <option value="moderate">Moderate (Standard Composite Materials)</option>
                <option value="non-eco">Non-Eco (High Embodied Energy / Non-Recyclable)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400 text-xs font-bold">
                ▼
              </div>
            </div>
            {touched.materials && errors.materials && (
              <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.materials}
              </p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants} className="pt-4">
            <motion.button
              type="submit"
              disabled={loading || success}
              whileHover={!loading && isValid ? { scale: 1.02, boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' } : {}}
              whileTap={!loading && isValid ? { scale: 0.98 } : {}}
              className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-lg cursor-pointer ${
                success
                  ? 'bg-emerald-600 text-white'
                  : isValid && !loading
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-emerald-500/20'
                  : 'bg-emerald-950/60 text-emerald-600 border border-emerald-900/50 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin text-slate-950" />
                  <span>Analyzing Sustainability...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-white" />
                  <span>Assessment Generated! Redirecting...</span>
                </>
              ) : (
                <>
                  <span>Analyze Sustainability</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default FormPage;
