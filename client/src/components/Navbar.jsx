import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, BarChart3, PlusCircle, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

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
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20"
            >
              <Leaf className="w-6 h-6 text-emerald-950 stroke-[2.5]" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight gradient-heading">
                EcoPulse
              </span>
              <span className="text-[10px] text-emerald-400/80 tracking-widest uppercase font-semibold">
                Green Assessment Platform
              </span>
            </div>
          </Link>

          {/* Navigation Items */}
          <nav className="flex items-center gap-2">
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
                        ? 'text-emerald-300 font-semibold'
                        : 'text-emerald-100/70 hover:text-emerald-300'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavBg"
                        className="absolute inset-0 bg-emerald-500/15 border border-emerald-500/30 rounded-xl"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className={`w-4 h-4 z-10 ${isActive ? 'text-emerald-400' : ''}`} />
                    <span className="z-10">{link.name}</span>
                  </motion.div>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
