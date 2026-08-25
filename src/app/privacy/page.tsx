import React from "react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="border-b border-white/10 pb-6 space-y-2">
        <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">
          LEGAL & DATA PROTECTION
        </span>
        <h1 className="font-sans font-black text-3xl sm:text-5xl uppercase tracking-tight text-white">
          PRIVACY POLICY
        </h1>
        <p className="text-zinc-400 font-sans text-xs sm:text-sm">
          Last updated: August 2026. How AFTER HOURS collects, protects, and handles your information.
        </p>
      </div>

      <div className="space-y-6 font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            1. INFORMATION WE COLLECT
          </h2>
          <p>
            When you purchase from AFTER HOURS (`afterhours.com`), we collect personal details necessary to fulfill your shipment: your name, shipping address, contact phone number, and email. We do not store full credit card numbers or banking passwords — payments are handled securely through PCI-DSS certified Indian gateways (Razorpay / Cashfree).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            2. USE OF DATA
          </h2>
          <p>
            Your information is used solely for order processing, logistics coordination with courier partners, dispatch alerts, and drop notifications if you subscribed to our VIP newsletter. We do not sell or rent your personal data to third-party advertisers.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            3. COOKIES & LOCAL STORAGE
          </h2>
          <p>
            We use browser storage to remember your active shopping bag, saved wishlist pieces, and UI preferences across sessions.
          </p>
        </section>
      </div>
    </div>
  );
}
