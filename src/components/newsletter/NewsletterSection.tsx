"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Sparkles, MessageSquare } from "lucide-react";
import { VipDropModal } from "@/components/brand/VipDropModal";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full py-20 bg-[#09090b] border-t border-white/10 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-xl mx-auto text-center space-y-6">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
          PRIVATE ARCHIVE ACCESS
        </span>
        <h2 className="font-sans font-black text-3xl sm:text-4xl uppercase tracking-tight text-white">
          STAY AFTER HOURS
        </h2>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm leading-relaxed">
          No spam. No promotional noise. Only notification 15 minutes before new drops and secret vault releases.
        </p>

        {submitted ? (
          <div className="p-4 bg-white/5 border border-emerald-500/30 flex items-center justify-center gap-3 text-emerald-400 font-mono text-xs uppercase tracking-wider">
            <Check className="w-4 h-4" />
            <span>YOU ARE REGISTERED FOR DROP 05 NOTIFICATIONS</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ENTER YOUR EMAIL"
              required
              className="flex-1 px-4 py-3 bg-white/5 border border-white/15 text-white font-mono text-xs placeholder:text-zinc-600 focus:outline-none focus:border-white uppercase"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
            >
              <span>JOIN</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* WhatsApp / VIP Modal Trigger */}
        <div className="pt-2">
          <button
            onClick={() => setVipModalOpen(true)}
            className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white uppercase tracking-wider border-b border-zinc-700 hover:border-white pb-0.5 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>PREFER WHATSAPP? UNLOCK VIP DROP 05 ALERTS</span>
          </button>
        </div>

        <span className="font-mono text-[10px] text-zinc-600 block">
          BY JOINING, YOU AGREE TO OUR PRIVACY POLICY. OPT OUT AT ANY TIME.
        </span>
      </div>

      {/* VIP Modal */}
      <VipDropModal isOpen={vipModalOpen} onClose={() => setVipModalOpen(false)} />
    </section>
  );
};
