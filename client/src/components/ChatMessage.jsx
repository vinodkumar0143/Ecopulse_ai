import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';

const ChatMessage = ({ sender, text, timestamp }) => {
  const isAI = sender === 'ai';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-2.5 mb-3.5 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#3EDC81] to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-[#3EDC81]/20 mt-0.5">
          <Sparkles className="w-4 h-4 text-emerald-950" />
        </div>
      )}

      <div className={`max-w-[82%] space-y-1 ${isAI ? 'items-start' : 'items-end'}`}>
        <div
          className={`p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-lg ${
            isAI
              ? 'bg-[#0d1811] text-emerald-50 border border-emerald-500/20 rounded-tl-sm'
              : 'bg-[#3EDC81] text-slate-950 font-semibold rounded-tr-sm'
          }`}
        >
          {text}
        </div>
        <div
          className={`text-[9px] font-semibold text-emerald-300/50 px-1 ${
            isAI ? 'text-left' : 'text-right'
          }`}
        >
          {timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {!isAI && (
        <div className="w-7 h-7 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
          <User className="w-4 h-4 text-emerald-300" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;
