"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, Radio } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const MidnightRadio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAutoPlayed = useRef(false);

  useEffect(() => {
    // Primary: local file; Fallback: ambient stream
    const audio = new Audio("/audio/self-aware.mp3");
    audio.loop = true;
    audio.volume = volume;

    audio.onerror = () => {
      if (audio.src.includes("/audio/self-aware.mp3")) {
        audio.src =
          "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3";
        if (isPlaying) audio.play().catch(() => {});
      }
    };

    audioRef.current = audio;

    // Autoplay on mount — browsers allow if user hasn't interacted, but
    // many block it. We try silently and set state accordingly.
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        hasAutoPlayed.current = true;
      })
      .catch(() => {
        // Autoplay blocked — wait for first user interaction
        const onFirstInteraction = () => {
          if (!hasAutoPlayed.current && audioRef.current) {
            audioRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                hasAutoPlayed.current = true;
              })
              .catch(() => {});
          }
          window.removeEventListener("click", onFirstInteraction);
          window.removeEventListener("keydown", onFirstInteraction);
          window.removeEventListener("scroll", onFirstInteraction);
        };
        window.addEventListener("click", onFirstInteraction, { once: true });
        window.addEventListener("keydown", onFirstInteraction, { once: true });
        window.addEventListener("scroll", onFirstInteraction, { once: true });
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Audio play blocked:", err);
        });
    }
  };

  return (
    <div
      className="fixed bottom-4 right-4 z-40 select-none transition-opacity duration-500"
      style={{ opacity: isHovered || isExpanded ? 1 : 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative flex items-center">
        {/* Expanded Track Information Card */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-full mr-3 bottom-0 w-64 bg-[#0e0e12]/95 backdrop-blur-md border border-white/20 p-3.5 shadow-2xl space-y-2.5"
            >
              <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[9px] text-zinc-400 tracking-widest uppercase">
                    AFTER HOURS RADIO // 02:00 AM
                  </span>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-zinc-500 hover:text-white font-mono text-[10px] transition-colors"
                >
                  ✕
                </button>
              </div>

              <div>
                <div className="font-sans font-black text-xs text-white uppercase tracking-tight line-clamp-1">
                  Self Aware
                </div>
                <div className="font-mono text-[10px] text-zinc-400">
                  Temper City
                </div>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={togglePlay}
                  className="text-zinc-400 hover:text-white transition-colors"
                  aria-label="Mute or unmute"
                >
                  {isPlaying ? (
                    <Volume2 className="w-3.5 h-3.5" />
                  ) : (
                    <VolumeX className="w-3.5 h-3.5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isPlaying ? volume : 0}
                  onChange={(e) => {
                    const newVol = parseFloat(e.target.value);
                    setVolume(newVol);
                    if (!isPlaying && newVol > 0) togglePlay();
                  }}
                  className="w-full h-1 bg-zinc-800 accent-white rounded-none cursor-pointer"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Minimal Floating Controller Pill */}
        <div className="flex items-center bg-[#0a0a0d]/90 backdrop-blur-md border border-white/15 hover:border-white/40 transition-colors shadow-2xl p-1">
          <button
            onClick={togglePlay}
            className="flex items-center gap-2 px-2.5 py-1.5 text-zinc-300 hover:text-white transition-colors group"
            aria-label={isPlaying ? "Pause Ambient Audio" : "Play Ambient Audio"}
          >
            {/* Animated Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-3.5 w-3.5">
              <span
                className={`w-[2px] bg-white transition-all duration-300 ${
                  isPlaying
                    ? "h-full animate-[bounce_0.8s_ease-in-out_infinite]"
                    : "h-1 bg-zinc-500"
                }`}
              />
              <span
                className={`w-[2px] bg-white transition-all duration-300 ${
                  isPlaying
                    ? "h-2/3 animate-[bounce_0.6s_ease-in-out_infinite_0.2s]"
                    : "h-2 bg-zinc-500"
                }`}
              />
              <span
                className={`w-[2px] bg-white transition-all duration-300 ${
                  isPlaying
                    ? "h-4/5 animate-[bounce_0.9s_ease-in-out_infinite_0.4s]"
                    : "h-1 bg-zinc-500"
                }`}
              />
            </div>

            <span className="font-mono text-[10px] uppercase tracking-wider font-semibold">
              {isPlaying ? "SOUND ON" : "SOUND OFF"}
            </span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-1.5 py-1.5 border-l border-white/10 text-zinc-400 hover:text-white transition-colors"
            aria-label="Audio details"
          >
            <Radio className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
