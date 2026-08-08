import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';
import AuthCard from '../components/AuthCard';
import { loginUser } from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);
    const toastId = toast.loading('Authenticating credentials...');

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      const { token, user } = response.data;

      // Save token and user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      toast.success(`Welcome back, ${user.name}! 🚀`, { id: toastId });

      setTimeout(() => {
        navigate('/dashboard');
      }, 700);
    } catch (err) {
      const message = err.response?.data?.message || 'Invalid email or password credentials';
      toast.error(message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error('Please enter your registered email address');
      return;
    }
    toast.success('Password reset link sent to your email inbox! 📧');
    setShowForgotModal(false);
    setForgotEmail('');
  };

  return (
    <>
      <AuthCard
        title="Sign In to GreenSphere"
        subtitle="Access real-time building sustainability analytics and AI insights"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#3EDC81]" />
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#3EDC81] focus:ring-2 focus:ring-[#3EDC81]/20 transition-all duration-300 text-sm font-medium disabled:opacity-60"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#3EDC81]" />
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-xs font-semibold text-[#3EDC81] hover:underline cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border border-emerald-500/20 rounded-xl pl-4 pr-11 py-3.5 focus:outline-none focus:border-[#3EDC81] focus:ring-2 focus:ring-[#3EDC81]/20 transition-all duration-300 text-sm font-medium disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-400/60 hover:text-[#3EDC81] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2.5 text-xs text-emerald-200/80 cursor-pointer select-none">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded border-emerald-500/30 bg-[#0d1811] text-[#3EDC81] focus:ring-[#3EDC81]/20 accent-[#3EDC81]"
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
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
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Platform</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-emerald-300/70 border-t border-emerald-900/40 pt-5">
          Don't have an account yet?{' '}
          <Link to="/signup" className="font-bold text-[#3EDC81] hover:underline">
            Create Account
          </Link>
        </div>
      </AuthCard>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm glass-card p-6 rounded-2xl border border-emerald-500/30 relative"
            >
              <button
                onClick={() => setShowForgotModal(false)}
                className="absolute right-4 top-4 text-emerald-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <h3 className="text-lg font-bold gradient-heading mb-2">Reset Your Password</h3>
              <p className="text-xs text-emerald-300/70 mb-4">
                Enter your email address and we'll send you instructions to reset your password.
              </p>
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border border-emerald-500/20 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-[#3EDC81]"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-xs bg-[#3EDC81] text-slate-950 hover:bg-emerald-400 transition-colors cursor-pointer"
                >
                  Send Reset Link
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Login;
