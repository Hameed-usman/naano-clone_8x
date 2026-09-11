"use client";

import React from "react";
import Image from "next/image";
import { TESTIMONIAL_DAVID, TRUST_LOGOS } from "@/data/naanoData";
import { Quote, Star, ShieldCheck } from "lucide-react";

export default function TrustProofBar() {
  return (
    <section className="py-14 border-y border-slate-800/80 bg-[#0b0f19]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand logos row */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
            Trusted by growth leaders and enterprise GTM teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70 grayscale hover:grayscale-0 transition-all duration-300">
            {TRUST_LOGOS.map((logo) => (
              <div
                key={logo.name}
                className="text-slate-400 hover:text-white font-bold tracking-wider text-sm sm:text-base flex items-center gap-2 transition-colors cursor-default"
              >
                <div className="w-2 h-2 rounded bg-indigo-500/60" />
                <span>{logo.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Testimonial Card */}
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-700/60 relative overflow-hidden bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-indigo-950/30">
            <div className="absolute top-4 right-4 text-indigo-500/20">
              <Quote className="w-16 h-16" />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={TESTIMONIAL_DAVID.avatar}
                  alt={TESTIMONIAL_DAVID.author}
                  className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500/40 shadow-lg"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Quote & Author Info */}
              <div className="space-y-2 flex-grow">
                <div className="flex items-center gap-1 text-amber-400 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-medium">Enterprise Review</span>
                </div>
                <p className="text-sm sm:text-base text-slate-200 italic leading-relaxed">
                  &ldquo;{TESTIMONIAL_DAVID.quote}&rdquo;
                </p>
                <div className="flex items-center gap-2 pt-1 text-xs sm:text-sm">
                  <span className="font-semibold text-white">{TESTIMONIAL_DAVID.author}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-indigo-300 font-medium">
                    {TESTIMONIAL_DAVID.role}, {TESTIMONIAL_DAVID.company}
                  </span>
                  {TESTIMONIAL_DAVID.badge && (
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 ml-2">
                      {TESTIMONIAL_DAVID.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
