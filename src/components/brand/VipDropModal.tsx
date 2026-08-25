"use client";

import React, { useState } from "react";
import { X, Sparkles, Send, Check, ShieldCheck, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VipDropModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipDropModal: React.FC<VipDropModalProps> = ({ isOpen, onClose }) => {
  const [contact, setContact] = useState("");
  const [channel, setChannel] = useState<"whatsapp" | "email">("whatsapp");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const handleReset = () => {
    setSubmitted(false);
    setContact("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-lg bg-[#0d0d10] border border-white/20 p-6 sm:p-8 shadow-2xl text-white z-10 space-y-6"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-mono text-[10px] sm:text-xs text-red-400 uppercase tracking-widest">
                  RESTRICTED ACCESS // DROP 05
                </span>
              </div>
              <h2 className="font-sans font-black text-2xl sm:text-3xl uppercase tracking-tight text-white">
                VIP MIDNIGHT ACCESS
              </h2>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Receive private password-protected early drop links on WhatsApp / Email 30 minutes before public release.
              </p>
            </div>

            {/* Drop Timer Notice */}
            <div className="bg-white/5 border border-white/10 p-3.5 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2 text-zinc-300">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>NEXT CAPSULE: MIDNIGHT PROTOCOL</span>
              </div>
              <span className="text-white font-bold">02:00 AM IST</span>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Channel Selector */}
                <div className="flex border border-white/10 p-1 bg-black/40">
                  <button
                    type="button"
                    onClick={() => setChannel("whatsapp")}
                    className={`flex-1 py-1.5 font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                      channel === "whatsapp"
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    WHATSAPP ALERT
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel("email")}
                    className={`flex-1 py-1.5 font-mono text-[10px] uppercase tracking-wider font-bold transition-colors ${
                      channel === "email"
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    EMAIL DISPATCH
                  </button>
                </div>

                {/* Input */}
                <div className="space-y-1.5">
                  <input
                    type={channel === "whatsapp" ? "tel" : "email"}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={channel === "whatsapp" ? "+91 98765 43210 (WhatsApp Number)" : "yourname@domain.com"}
                    required
                    className="w-full px-4 py-3.5 bg-black border border-white/20 text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white transition-colors"
                  />
                  <span className="font-mono text-[9px] text-zinc-500 block">
                    Zero spam. Only unreleased capsule links & private archive access.
                  </span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-2xl"
                >
                  {loading ? (
                    <span className="animate-pulse">ENCRYPTING ACCESS PASS...</span>
                  ) : (
                    <>
                      <span>UNLOCK VIP DROP PASS</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-sans font-black text-lg uppercase text-white">
                  VIP PASS CONFIRMED
                </h3>
                <p className="font-sans text-xs text-zinc-300">
                  You are registered for Drop 05. We will transmit your private midnight entry link to <strong className="text-white">{contact}</strong> before public release.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-2 px-6 py-2 bg-white/10 hover:bg-white hover:text-black border border-white/20 font-mono text-xs uppercase font-bold transition-colors"
                >
                  CLOSE
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
