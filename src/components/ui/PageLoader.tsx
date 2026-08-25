"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const PageLoader: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99998] bg-[#080808] flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Brand name reveal */}
          <div className="overflow-hidden">
            <motion.h1
              className="font-sans font-black text-white text-4xl sm:text-6xl tracking-[0.15em] uppercase"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
            >
              AFTER HOURS
            </motion.h1>
          </div>

          {/* Thin line loader */}
          <motion.div
            className="mt-8 h-[1px] bg-white/20 w-48 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-white"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="mt-4 font-mono text-[10px] text-zinc-500 uppercase tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
          >
            FOR THE HOURS THAT MATTER
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
