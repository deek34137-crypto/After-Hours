"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Clock, Send, Check } from "lucide-react";
import { BrandClock } from "@/components/brand/BrandClock";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="border-b border-white/10 pb-8 mb-12 space-y-3">
        <div className="flex items-center gap-2">
          <BrandClock />
        </div>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          CLIENT CONCIERGE
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm max-w-xl">
          Questions regarding your drop order, size exchanges, or private archive releases? Reach our night concierge team.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-[#0c0c0e] border border-white/10 p-6 sm:p-10 space-y-6">
          <h2 className="font-sans font-bold text-lg uppercase tracking-tight text-white border-b border-white/10 pb-4">
            SEND A TRANSMISSION
          </h2>

          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-sans font-bold text-base uppercase text-white">
                TRANSMISSION RECEIVED
              </h3>
              <p className="text-zinc-400 text-xs font-sans max-w-sm mx-auto">
                Our concierge responds to inquiries within 12-24 hours. Check your inbox for updates.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-4 px-6 py-2 border border-white/20 font-mono text-xs uppercase tracking-widest text-zinc-300 hover:text-white"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase text-[10px] tracking-wider block">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.G. ARJUN SHARMA"
                    className="w-full bg-white/5 border border-white/15 px-3 py-3 text-white uppercase focus:outline-none focus:border-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-400 uppercase text-[10px] tracking-wider block">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="YOUR@EMAIL.COM"
                    className="w-full bg-white/5 border border-white/15 px-3 py-3 text-white uppercase focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase text-[10px] tracking-wider block">
                  ORDER ID (OPTIONAL)
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="E.G. #AH-8291"
                  className="w-full bg-white/5 border border-white/15 px-3 py-3 text-white uppercase focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-400 uppercase text-[10px] tracking-wider block">
                  MESSAGE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="WRITE YOUR INQUIRY..."
                  className="w-full bg-white/5 border border-white/15 px-3 py-3 text-white uppercase focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>TRANSMIT MESSAGE</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Support Channels & FAQ */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#0e0e12] border border-white/10 p-6 sm:p-8 space-y-6">
            <h3 className="font-sans font-bold text-base uppercase tracking-tight text-white">
              DIRECT CHANNELS
            </h3>

            <div className="space-y-4 font-mono text-xs text-zinc-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-zinc-400 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[10px]">EMAIL CONCIERGE</span>
                  <a href="mailto:support@afterhours.com" className="hover:underline text-white font-bold">
                    concierge@afterhours.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-zinc-400 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[10px]">WHATSAPP CONCIERGE</span>
                  <span className="text-white font-bold">+91 (0) 98200 AFTER</span>
                  <p className="text-[10px] text-zinc-500">Mon - Sat: 11:00 AM – 02:00 AM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-zinc-400 mt-0.5" />
                <div>
                  <span className="text-zinc-500 block text-[10px]">RESPONSE WINDOW</span>
                  <span className="text-white">Under 12 Hours</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0e0e12] border border-white/10 p-6 sm:p-8 space-y-4">
            <h3 className="font-sans font-bold text-base uppercase tracking-tight text-white">
              EXCHANGE ASSISTANCE
            </h3>
            <p className="text-zinc-400 font-sans text-xs leading-relaxed">
              Ordered the wrong size? We offer doorstep pickup exchanges across 19,000+ Indian pin codes within 7 days of delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
