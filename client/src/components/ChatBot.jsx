import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Sparkles, Bot, Minimize2 } from 'lucide-react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { sendChatMessage } from '../services/api';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I am ECOPULSE AI Assistant. Ask me anything about building energy efficiency, water reduction, or sustainability ratings!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, loading]);

  const handleSendMessage = async (text) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await sendChatMessage(text);
      const replyText = res.data?.reply || "I'm having trouble connecting right now. Please try again shortly.";

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'AI assistant is currently unavailable. Please check backend connection and try again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(62, 220, 129, 0.5)' }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#3EDC81] to-emerald-600 text-slate-950 flex items-center justify-center shadow-2xl shadow-[#3EDC81]/30 cursor-pointer border border-[#3EDC81]/40"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="w-6 h-6 stroke-[2.5]" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="relative">
              <MessageSquare className="w-6 h-6 stroke-[2.5]" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#3EDC81] animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#3EDC81] border border-black" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Modal Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 h-[500px] max-h-[80vh] glass-card rounded-3xl border border-[#3EDC81]/30 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#0d1811]/90 border-b border-emerald-900/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3EDC81] to-emerald-600 flex items-center justify-center shadow-md shadow-[#3EDC81]/20">
                  <Bot className="w-5 h-5 text-emerald-950" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold gradient-heading flex items-center gap-1.5">
                    ECOPULSE AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-[#3EDC81]" />
                  </h3>
                  <p className="text-[10px] text-emerald-300/60 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3EDC81] animate-pulse" />
                    Online & Context-Aware
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-emerald-400/60 hover:text-emerald-200 p-1.5 rounded-lg hover:bg-emerald-950/60 transition-colors cursor-pointer"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Message List */}
            <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-2">
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  sender={msg.sender}
                  text={msg.text}
                  timestamp={msg.timestamp}
                />
              ))}

              {/* Typing Indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-emerald-300/70 text-xs py-2 px-3 bg-[#0d1811] rounded-xl border border-emerald-500/15 w-max"
                >
                  <span className="w-2 h-2 rounded-full bg-[#3EDC81] animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#3EDC81] animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-[#3EDC81] animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] font-medium ml-1">ECOPULSE AI is thinking...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Footer */}
            <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
