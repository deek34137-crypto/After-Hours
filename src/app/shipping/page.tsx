import React from "react";
import { Truck, ShieldCheck, Clock, MapPin } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
          LOGISTICS & FULFILLMENT
        </span>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          SHIPPING POLICY
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm">
          Transparent, fast delivery across India. Free shipping on all orders above ₹1,999.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
        <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2">
          <Truck className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white uppercase">FREE OVER ₹1,999</h3>
          <p className="text-zinc-400 text-[11px]">Standard flat shipping ₹100 for orders under ₹1,999.</p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2">
          <Clock className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white uppercase">24-HOUR DISPATCH</h3>
          <p className="text-zinc-400 text-[11px]">Orders placed before 4:00 PM IST are handed to couriers same day.</p>
        </div>
        <div className="p-6 bg-white/[0.02] border border-white/10 space-y-2">
          <MapPin className="w-5 h-5 text-white" />
          <h3 className="font-bold text-white uppercase">19,000+ PIN CODES</h3>
          <p className="text-zinc-400 text-[11px]">Pan-India coverage powered by BlueDart, Delhivery & Bluedart Air.</p>
        </div>
      </div>

      <div className="space-y-8 font-sans text-sm text-zinc-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            1. ESTIMATED DELIVERY TIMELINES
          </h2>
          <ul className="list-disc list-inside space-y-2 text-zinc-400 text-xs sm:text-sm">
            <li><strong>Delhi NCR & Mumbai Metro:</strong> 1 to 2 business days.</li>
            <li><strong>Bengaluru, Hyderabad, Chennai, Pune, Kolkata:</strong> 2 to 3 business days.</li>
            <li><strong>Rest of India (Tier 2 & Tier 3 cities):</strong> 3 to 5 business days.</li>
            <li><strong>North East & J&K:</strong> 5 to 7 business days.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            2. ORDER TRACKING
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Once your order leaves our fulfillment center in Mumbai, you will receive an automated WhatsApp and SMS notification with a real-time tracking link and expected delivery date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-mono text-sm font-bold text-white uppercase tracking-wider">
            3. CASH ON DELIVERY (COD)
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Cash on Delivery is available across eligible pin codes in India for orders up to ₹5,000. An OTP verification is required upon courier delivery.
          </p>
        </section>
      </div>
    </div>
  );
}
