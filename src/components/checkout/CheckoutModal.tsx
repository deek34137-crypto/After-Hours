"use client";

import React, { useState, useRef } from "react";
import { X, ShieldCheck, Lock, Truck, CreditCard, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useRouter } from "next/navigation";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cart, subtotal, clearCart } = useCart();
  const { formatPrice, currency, currencyDetails } = useCurrency();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<"payu" | "cod">("payu");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    pincode: "",
  });

  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const [payuData, setPayuData] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const isFreeShipping = subtotal >= 1999;
  const shippingFee = isFreeShipping ? 0 : 100;
  const finalTotal = subtotal + shippingFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!formData.firstName || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      setError("Please fill in all required delivery fields.");
      return;
    }

    setLoading(true);

    if (paymentMethod === "cod") {
      // Cash on delivery simulation
      setTimeout(() => {
        setLoading(false);
        clearCart();
        onClose();
        router.push(`/order-success?txnid=COD_${Date.now()}&amount=${finalTotal}&mode=COD&status=success`);
      }, 1000);
      return;
    }

    // PayU Payment Gateway initiation
    try {
      const productNames = cart.map((i) => i.product.name).join(", ").substring(0, 90);
      const res = await fetch("/api/payu/hash", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: finalTotal,
          productinfo: productNames || "AFTER HOURS Streetwear Order",
          firstname: formData.firstName,
          email: formData.email,
          phone: formData.phone,
          udf1: `${formData.city}, ${formData.state} - ${formData.pincode}`,
          udf2: formData.address,
        }),
      });

      const data = await res.json();

      if (!data.success || !data.hash) {
        throw new Error(data.error || "Could not generate payment gateway hash");
      }

      setPayuData(data);

      // Auto-submit to PayU endpoint
      setTimeout(() => {
        if (hiddenFormRef.current) {
          hiddenFormRef.current.submit();
        }
      }, 100);
    } catch (err: any) {
      console.error("PayU initialization error:", err);
      setError(err.message || "Payment Gateway connection failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Checkout Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-xl bg-[#0b0b0e] border-l border-white/10 text-white flex flex-col justify-between shadow-2xl h-full z-10 overflow-y-auto"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#0b0b0e]/95 backdrop-blur-md z-10">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                <h2 className="font-sans font-black tracking-tight text-lg uppercase">
                  PAYU SECURE CHECKOUT
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8 flex-1">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-red-400 font-mono text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-zinc-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  <span>01 // CONTACT INFORMATION</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                      FIRST NAME *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Kabir"
                      required
                      className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                      LAST NAME
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Verma"
                      className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="kabir@gmail.com"
                      required
                      className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                      MOBILE / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="9876543210"
                      required
                      className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Shipping Address */}
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-zinc-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  <span>02 // SHIPPING ADDRESS</span>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                    STREET ADDRESS & HOUSE / FLAT NO. *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="B-402, Skyline Residency, Linking Road"
                    required
                    className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white uppercase"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                      PINCODE *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="400050"
                      maxLength={6}
                      required
                      className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                      CITY *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Mumbai"
                      required
                      className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] text-zinc-400 uppercase block mb-1">
                      STATE *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Maharashtra"
                      required
                      className="w-full px-3.5 py-2.5 bg-black border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-white uppercase"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Payment Method */}
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs text-zinc-400 uppercase tracking-widest border-b border-white/10 pb-2">
                  <span>03 // PAYMENT METHOD</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* PayU Option */}
                  <label
                    className={`p-4 border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                      paymentMethod === "payu"
                        ? "bg-white/10 border-white text-white"
                        : "bg-black/40 border-white/15 text-zinc-400 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
                        PAYU ONLINE PAY
                      </span>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="payu"
                        checked={paymentMethod === "payu"}
                        onChange={() => setPaymentMethod("payu")}
                        className="accent-white"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400">
                      UPI, Google Pay, PhonePe, Cards & NetBanking
                    </span>
                  </label>

                  {/* COD Option */}
                  <label
                    className={`p-4 border cursor-pointer flex flex-col justify-between space-y-2 transition-all ${
                      paymentMethod === "cod"
                        ? "bg-white/10 border-white text-white"
                        : "bg-black/40 border-white/15 text-zinc-400 hover:border-white/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-xs uppercase flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-amber-400" />
                        CASH ON DELIVERY
                      </span>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={() => setPaymentMethod("cod")}
                        className="accent-white"
                      />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400">
                      Pay cash upon courier delivery
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Summary Breakdown */}
              <div className="p-4 bg-white/5 border border-white/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>ITEMS ({cart.length})</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>ESTIMATED DISPATCH</span>
                  <span>{isFreeShipping ? "FREE" : formatPrice(100)}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                  <span>TOTAL PAYABLE</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading || cart.length === 0}
                className="w-full py-4 bg-white text-black font-mono font-bold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-2xl disabled:opacity-50"
              >
                {loading ? (
                  <span className="animate-pulse">CONNECTING TO SECURE PAYU GATEWAY...</span>
                ) : (
                  <>
                    <span>
                      {paymentMethod === "payu"
                        ? `PAY ${formatPrice(finalTotal)} VIA PAYU`
                        : `CONFIRM COD ORDER (${formatPrice(finalTotal)})`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Hidden PayU Form for Redirect */}
            {payuData && (
              <form
                ref={hiddenFormRef}
                action={payuData.action}
                method="POST"
                className="hidden"
              >
                <input type="hidden" name="key" value={payuData.key} />
                <input type="hidden" name="txnid" value={payuData.txnid} />
                <input type="hidden" name="amount" value={payuData.amount} />
                <input type="hidden" name="productinfo" value={payuData.productinfo} />
                <input type="hidden" name="firstname" value={payuData.firstname} />
                <input type="hidden" name="email" value={payuData.email} />
                <input type="hidden" name="phone" value={payuData.phone} />
                <input type="hidden" name="surl" value={payuData.surl} />
                <input type="hidden" name="furl" value={payuData.furl} />
                <input type="hidden" name="hash" value={payuData.hash} />
                <input type="hidden" name="udf1" value={payuData.udf1 || ""} />
                <input type="hidden" name="udf2" value={payuData.udf2 || ""} />
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
