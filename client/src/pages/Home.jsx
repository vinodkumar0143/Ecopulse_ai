import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, Droplets, Recycle, Sparkles } from 'lucide-react';
import { fadeIn, slideUp, scaleHover, staggerContainer } from '../animations/variants';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Zap,
      title: 'Energy Efficiency Analytics',
      desc: 'Evaluate energy usage intensity and grid dependency to compute accurate building metrics.',
    },
    {
      icon: Droplets,
      title: 'Water Resource Optimization',
      desc: 'Assess consumption rates and generate rainwater harvesting and low-flow recommendations.',
    },
    {
      icon: Recycle,
      title: 'Sustainable Material Scoring',
      desc: 'Analyze construction materials for environmental friendliness, lifecycle impact, and VOC levels.',
    },
    {
      icon: ShieldCheck,
      title: 'Smart Recommendation Engine',
      desc: 'Receive AI-driven actionable steps and tailored eco recommendations to elevate building scores.',
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-20 py-8"
    >
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto py-12 px-4 overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div variants={slideUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-emerald-500/30 mb-8">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-300 tracking-wide uppercase">
            Next-Gen Eco Platform
          </span>
        </motion.div>

        <motion.h1
          variants={slideUp}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight gradient-heading leading-[1.1] mb-6"
        >
          Sustainable Building Intelligence
        </motion.h1>

        <motion.p
          variants={slideUp}
          className="text-lg sm:text-xl text-emerald-200/70 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          Analyze, Score, Improve. Evaluate energy, water, and material consumption to calculate real-time sustainability scores and dynamic eco suggestions.
        </motion.p>

        <motion.div variants={slideUp} className="flex flex-wrap justify-center items-center gap-4">
          <motion.button
            variants={scaleHover}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/assess')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold text-base flex items-center gap-3 shadow-xl shadow-emerald-500/25 transition-all duration-300 cursor-pointer"
          >
            <span>Assess Building</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/dashboard')}
            className="px-8 py-4 rounded-2xl glass-card text-emerald-200 font-semibold text-base hover:text-white hover:border-emerald-500/40 transition-all duration-300 cursor-pointer"
          >
            View Dashboard
          </motion.button>
        </motion.div>
      </section>

      {/* Feature Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              variants={fadeIn}
              className="glass-card glass-card-hover p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-100 mb-2">{item.title}</h3>
                <p className="text-xs text-emerald-300/70 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </section>
    </motion.div>
  );
};

export default Home;
