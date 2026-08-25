"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ShoppingBag, Heart } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type?: "success" | "info" | "bag" | "wishlist";
}

interface ToastContextType {
  showToast: (message: string, type?: "success" | "info" | "bag" | "wishlist") => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: "success" | "info" | "bag" | "wishlist" = "info") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[10000] flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-black/95 text-white border border-white/20 backdrop-blur-md px-4 py-3 shadow-2xl flex items-center gap-3 font-sans text-xs tracking-wider uppercase pointer-events-auto"
            >
              {t.type === "bag" && <ShoppingBag className="w-4 h-4 text-white" />}
              {t.type === "wishlist" && <Heart className="w-4 h-4 text-red-400 fill-red-400" />}
              {t.type === "success" && <Check className="w-4 h-4 text-emerald-400" />}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
