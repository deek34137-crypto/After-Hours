"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type CurrencyCode = "INR" | "USD" | "GBP" | "EUR" | "AED" | "CAD";

export interface CurrencyDetails {
  code: CurrencyCode;
  symbol: string;
  name: string;
  flag: string;
  rate: number; // INR multiplier: amountInINR * rate = amountInLocalCurrency
  freeShippingThreshold: number;
  locale: string;
  shippingLabel: string;
}

export const CURRENCIES: Record<CurrencyCode, CurrencyDetails> = {
  INR: {
    code: "INR",
    symbol: "₹",
    name: "Indian Rupee",
    flag: "🇮🇳",
    rate: 1,
    freeShippingThreshold: 1999,
    locale: "en-IN",
    shippingLabel: "Complimentary Pan-India Shipping over ₹1,999",
  },
  USD: {
    code: "USD",
    symbol: "$",
    name: "US Dollar",
    flag: "🇺🇸",
    rate: 0.0116, // ₹1000 = ~$11.60
    freeShippingThreshold: 60,
    locale: "en-US",
    shippingLabel: "Complimentary Global Express over $60",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "British Pound",
    flag: "🇬🇧",
    rate: 0.0092, // ₹1000 = ~£9.20
    freeShippingThreshold: 50,
    locale: "en-GB",
    shippingLabel: "Complimentary UK Express over £50",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "Euro",
    flag: "🇪🇺",
    rate: 0.0108, // ₹1000 = ~€10.80
    freeShippingThreshold: 55,
    locale: "de-DE",
    shippingLabel: "Complimentary EU Express over €55",
  },
  AED: {
    code: "AED",
    symbol: "AED",
    name: "UAE Dirham",
    flag: "🇦🇪",
    rate: 0.0425, // ₹1000 = ~42.5 AED
    freeShippingThreshold: 220,
    locale: "ar-AE",
    shippingLabel: "Complimentary Gulf Express over 220 AED",
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canadian Dollar",
    flag: "🇨🇦",
    rate: 0.016, // ₹1000 = ~C$16.00
    freeShippingThreshold: 80,
    locale: "en-CA",
    shippingLabel: "Complimentary Canada Express over C$80",
  },
};

interface CurrencyContextType {
  currency: CurrencyCode;
  currencyDetails: CurrencyDetails;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInINR: number) => string;
  convertPrice: (amountInINR: number) => number;
  freeShippingThreshold: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>("INR");
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-detect currency by timezone / locale or load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ah_currency") as CurrencyCode;
      if (saved && CURRENCIES[saved]) {
        setCurrencyState(saved);
      } else {
        // Automatic timezone detection
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        if (tz.includes("Calcutta") || tz.includes("Kolkata") || tz.includes("India")) {
          setCurrencyState("INR");
        } else if (tz.includes("New_York") || tz.includes("Los_Angeles") || tz.includes("Chicago") || tz.includes("America")) {
          setCurrencyState("USD");
        } else if (tz.includes("London") || tz.includes("Europe/London")) {
          setCurrencyState("GBP");
        } else if (tz.includes("Europe") || tz.includes("Berlin") || tz.includes("Paris") || tz.includes("Madrid")) {
          setCurrencyState("EUR");
        } else if (tz.includes("Dubai") || tz.includes("Abu_Dhabi") || tz.includes("Asia/Dubai")) {
          setCurrencyState("AED");
        } else if (tz.includes("Toronto") || tz.includes("Vancouver") || tz.includes("Montreal")) {
          setCurrencyState("CAD");
        }
      }
    } catch (e) {
      console.warn("Could not access currency preferences", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const setCurrency = (code: CurrencyCode) => {
    setCurrencyState(code);
    try {
      localStorage.setItem("ah_currency", code);
    } catch (e) {
      console.warn("Could not save currency preference", e);
    }
  };

  const currencyDetails = CURRENCIES[currency] || CURRENCIES.INR;

  const convertPrice = (amountInINR: number): number => {
    if (currency === "INR") return amountInINR;
    const converted = amountInINR * currencyDetails.rate;
    return Math.round(converted);
  };

  const formatPrice = (amountInINR: number): string => {
    const details = currencyDetails;
    if (details.code === "INR") {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(amountInINR);
    }

    const converted = convertPrice(amountInINR);

    if (details.code === "AED") {
      return `${converted} AED`;
    }

    try {
      return new Intl.NumberFormat(details.locale, {
        style: "currency",
        currency: details.code,
        maximumFractionDigits: 0,
      }).format(converted);
    } catch {
      return `${details.symbol}${converted}`;
    }
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        currencyDetails,
        setCurrency,
        formatPrice,
        convertPrice,
        freeShippingThreshold: currencyDetails.freeShippingThreshold,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
