"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const words1 = ["FOR", "THE", "HOURS"];
const words2 = ["THAT", "MATTER."];

export const FullScreenHero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06, delayChildren: 1.9 } },
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[88vh] sm:h-[92vh] lg:h-[96vh] flex items-end pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 bg-black overflow-hidden select-none"
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src="https://cdn.shopify.com/s/files/1/0812/2948/0182/files/thorn_back_00cd96c8-24f7-41ae-895d-42eb018f4c4c.webp?v=1787495872"
          alt="AFTER HOURS Red Studio Nocturnal Campaign"
          fill
          priority
          className="object-cover object-top brightness-[0.72] contrast-[1.1]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </motion.div>

      {/* Top Badge */}
      <motion.div
        className="absolute top-6 left-4 sm:left-8 lg:left-12 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 0.5 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] sm:text-xs uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>DROP 03 // NOCTURNAL EXPEDITION</span>
        </div>
      </motion.div>

      {/* Main Content with scroll parallax */}
      <motion.div
        className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        style={{ y: contentY, opacity }}
      >
        <div className="space-y-5 max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            className="font-mono text-xs sm:text-sm text-zinc-400 tracking-[0.25em] uppercase"
            initial={{ opacity: 0, letterSpacing: "0.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.25em" }}
            transition={{ delay: 1.85, duration: 0.7 }}
          >
            MUMBAI • 02:17 AM • THE NIGHT IS YOURS
          </motion.p>

          {/* Headline with word-by-word reveal */}
          <div className="font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] uppercase tracking-[-0.04em] text-white leading-[0.92]">
            {/* Line 1 */}
            <motion.div
              className="flex gap-[0.25em] overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {words1.map((w) => (
                <motion.span key={w} variants={wordVariants} className="inline-block">
                  {w}
                </motion.span>
              ))}
            </motion.div>

            {/* Line 2 */}
            <motion.div
              className="flex gap-[0.25em] overflow-hidden"
              variants={containerVariants}
              initial="hidden"
              animate="show"
              style={{ transition: "0.1s" }}
            >
              {words2.map((w) => (
                <motion.span
                  key={w}
                  variants={wordVariants}
                  className={`inline-block ${w === "MATTER." ? "text-zinc-400" : "text-white"}`}
                >
                  {w}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Subline */}
          <motion.p
            className="text-zinc-300 text-sm sm:text-base font-sans max-w-lg leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 2.4 }}
          >
            Raw silhouettes, heavyweight cotton, and modular utility built for the hours when routine dissolves.
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 font-mono text-xs uppercase tracking-widest"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/shop"
              className="px-8 py-4 bg-white text-black font-bold hover:bg-zinc-200 transition-colors text-center flex items-center justify-center gap-2 shadow-2xl"
            >
              <span>SHOP DROP 03</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/collections"
              className="px-6 py-4 bg-black/60 backdrop-blur-md border border-white/25 text-white hover:bg-white/10 transition-colors text-center block"
            >
              VIEW LOOKBOOK
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Prompt */}
      <motion.div
        className="absolute bottom-4 right-8 hidden lg:flex items-center gap-2 text-zinc-500 font-mono text-[10px] tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 0.5 }}
      >
        <span>SCROLL DOWN</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};
