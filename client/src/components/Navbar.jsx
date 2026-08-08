import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Leaf, BarChart3, PlusCircle, Home as HomeIcon, LogIn, UserPlus, LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Assess Building', path: '/assess', icon: PlusCircle },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3EDC81] to-emerald-600 flex items-center justify-center shadow-lg shadow-[#3EDC81]/20"
            >
              <Leaf className="w-6 h-6 text-emerald-950 stroke-[2.5]" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight gradient-heading">
                GreenSphere AI
              </span>
              <span className="text-[10px] text-[#3EDC81]/80 tracking-widest uppercase font-semibold">
                Building Sustainability Engine
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;

              return (
                <Link key={link.path} to={link.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-[#3EDC81] font-semibold'
                        : 'text-emerald-100/70 hover:text-[#3EDC81]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-[#3EDC81]/15 border border-[#3EDC81]/30 rounded-xl"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 z-10 ${isActive ? 'text-[#3EDC81]' : ''}`} />
                    <span className="z-10">{link.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Auth Section Right */}
          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/20 text-emerald-200 text-xs font-semibold">
                  <UserIcon className="w-3.5 h-3.5 text-[#3EDC81]" />
                  <span>{user.name}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/20 text-emerald-200 hover:text-[#3EDC81] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(62, 220, 129, 0.4)' }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-xl bg-[#3EDC81] text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-[#3EDC81]/20 cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Sign Up</span>
                  </motion.button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
