import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const ChatInput = ({ onSendMessage, disabled }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text);
    setText('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-emerald-900/40 bg-[#070d09]/90">
      <div className="relative flex items-center">
        <input
          type="text"
          placeholder="Ask ECOPULSE AI about building sustainability..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="w-full bg-[#0d1811] text-emerald-100 placeholder-emerald-700/60 border border-emerald-500/20 rounded-xl pl-4 pr-12 py-3 text-xs focus:outline-none focus:border-[#3EDC81] focus:ring-2 focus:ring-[#3EDC81]/20 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!text.trim() || disabled}
          className="absolute right-2.5 p-2 rounded-lg bg-[#3EDC81] text-slate-950 hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-md shadow-[#3EDC81]/20"
        >
          {disabled ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
