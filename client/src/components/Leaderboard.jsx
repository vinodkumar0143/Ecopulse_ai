import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Medal, Flame, Sparkles } from 'lucide-react';

const Leaderboard = ({ leaderboard = [] }) => {
  const getRankBadge = (rank) => {
    if (rank === 1) return <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />;
    if (rank === 2) return <Trophy className="w-4 h-4 text-slate-300 fill-slate-300" />;
    if (rank === 3) return <Medal className="w-4 h-4 text-amber-600 fill-amber-600" />;
    return <span className="text-xs font-bold text-emerald-400/80">#{rank}</span>;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55 }}
      className="glass-card p-6 sm:p-8 rounded-3xl border border-[#3EDC81]/30 shadow-2xl space-y-5 relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-900/40 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
            <Trophy className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-extrabold gradient-heading">
                Global Eco Leaderboard
              </h3>
              <Sparkles className="w-4 h-4 text-[#3EDC81]" />
            </div>
            <p className="text-xs text-emerald-300/60 mt-0.5">
              Top 10 sustainability leaders ranked by Eco XP
            </p>
          </div>
        </div>

        <span className="text-xs font-bold text-[#3EDC81] px-3.5 py-1.5 rounded-full bg-[#3EDC81]/10 border border-[#3EDC81]/30 self-start sm:self-auto">
          🔥 Live Rankings
        </span>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-emerald-900/40 text-[11px] font-bold text-emerald-300/60 uppercase tracking-wider">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4 text-center">Level</th>
              <th className="py-3 px-4 text-center">Streak</th>
              <th className="py-3 px-4 text-right">Eco Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-900/30 text-xs">
            {leaderboard.map((user, idx) => {
              const isCurrentUser = user.name?.includes('(You)');
              const rankNum = user.rank || idx + 1;

              return (
                <motion.tr
                  key={user._id || idx}
                  whileHover={{ scale: 1.01, backgroundColor: 'rgba(62, 220, 129, 0.05)' }}
                  className={`transition-colors ${
                    isCurrentUser ? 'bg-[#3EDC81]/15 font-bold text-[#3EDC81]' : 'text-emerald-100/90'
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold flex items-center gap-2">
                    {getRankBadge(rankNum)}
                  </td>
                  <td className="py-3.5 px-4 font-semibold">
                    <div className="flex items-center gap-2">
                      <span>{user.name}</span>
                      {isCurrentUser && (
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#3EDC81]/20 text-[#3EDC81] border border-[#3EDC81]/40 font-bold uppercase">
                          YOU
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950 border border-emerald-500/20 text-[11px] font-bold">
                      Lvl {user.level || 1}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                      <Flame className="w-3.5 h-3.5" />
                      {user.streak || 1}d
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-[#3EDC81]">
                    {user.points} XP
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Leaderboard;
