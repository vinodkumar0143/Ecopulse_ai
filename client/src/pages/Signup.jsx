import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import { signupUser } from '../services/api';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password strength meter calculation
  const passwordStrength = useMemo(() => {
    const pwd = formData.password;
    if (!pwd) return { score: 0, label: '', color: '' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 33, label: 'Weak', color: 'bg-rose-500' };
    if (score <= 4) return { score: 66, label: 'Medium', color: 'bg-amber-400' };
    return { score: 100, label: 'Strong', color: 'bg-[#3EDC81]' };
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error('Please complete all required fields');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Creating your GreenSphere account...');

    try {
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      // Save token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Account Created Successfully! 🚀', { id: toastId });

      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to create account. User may already exist.';
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Create GreenSphere Account"
      subtitle="Join the sustainable building intelligence platform"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#3EDC81]" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Alex Green"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border border-emerald-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3EDC81] focus:ring-2 focus:ring-[#3EDC81]/20 transition-all duration-300 text-sm font-medium disabled:opacity-60"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#3EDC81]" />
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border border-emerald-500/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#3EDC81] focus:ring-2 focus:ring-[#3EDC81]/20 transition-all duration-300 text-sm font-medium disabled:opacity-60"
          />
        </div>

        {/* Password Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#3EDC81]" />
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Min. 6 characters"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border border-emerald-500/20 rounded-xl pl-4 pr-11 py-3 focus:outline-none focus:border-[#3EDC81] focus:ring-2 focus:ring-[#3EDC81]/20 transition-all duration-300 text-sm font-medium disabled:opacity-60"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60 hover:text-[#3EDC81] transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] font-semibold text-emerald-300/70">
                <span>Strength</span>
                <span className="capitalize">{passwordStrength.label}</span>
              </div>
              <div className="w-full bg-emerald-950/80 rounded-full h-1.5 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password Input */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#3EDC81]" />
            Confirm Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            className={`w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border ${
              formData.confirmPassword && formData.confirmPassword !== formData.password
                ? 'border-red-500/50'
                : 'border-emerald-500/20'
            } rounded-xl px-4 py-3 focus:outline-none focus:border-[#3EDC81] focus:ring-2 focus:ring-[#3EDC81]/20 transition-all duration-300 text-sm font-medium disabled:opacity-60`}
          />
          {formData.confirmPassword && formData.confirmPassword !== formData.password && (
            <p className="text-[11px] text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> Passwords do not match
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { scale: 1.02, boxShadow: '0 0 25px rgba(62, 220, 129, 0.4)' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#3EDC81] to-emerald-500 text-slate-950 hover:from-emerald-400 hover:to-teal-300 shadow-lg shadow-[#3EDC81]/20 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Create Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        </div>
      </form>

      <div className="mt-5 text-center text-xs text-emerald-300/70 border-t border-emerald-900/40 pt-4">
        Already have an account?{' '}
        <Link to="/login" className="font-bold text-[#3EDC81] hover:underline">
          Sign In
        </Link>
      </div>
    </AuthCard>
  );
};

export default Signup;
