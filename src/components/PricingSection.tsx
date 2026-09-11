"use client";

import React from "react";
import { PRICING_TIERS } from "@/data/naanoData";
import { Check, Sparkles, ArrowRight, Shield } from "lucide-react";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative bg-[#070a12] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
            Simple Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Transparent Pricing Built for ROI
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Start free with self-serve pay-per-post, or partner with our senior team for full turnkey campaign execution.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-200 ${
                tier.popular
                  ? "bg-slate-900 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/10"
                  : "bg-slate-900/60 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 right-8 px-3.5 py-1 rounded-full bg-indigo-600 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Most Selected</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                  {tier.badge && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-black text-white tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    {tier.period}
                  </span>
                </div>

                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-3.5 pt-4 border-t border-slate-800">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 block mb-2">
                    What&apos;s Included:
                  </span>
                  {tier.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 mt-0.5 flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6">
                <a
                  href="#creators"
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    tier.ctaVariant === "primary"
                      ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98]"
                      : "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
