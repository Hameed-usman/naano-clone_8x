"use client";

import React from "react";
import { ArrowRight, ShieldCheck, TrendingUp, Users, Target, BarChart3, CheckCircle2 } from "lucide-react";
import { PLATFORM_STATS } from "@/data/naanoData";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background Gradients & Grid Pattern */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-indigo-600/15 via-violet-600/10 to-transparent blur-3xl opacity-75 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-emerald-500/10 blur-3xl opacity-50 rounded-full" />
        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.7) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Tagline Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide shadow-sm shadow-indigo-950/50 hover:border-indigo-500/50 transition-colors">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>The B2B Influencer Performance Network</span>
            <span className="text-indigo-400/60">•</span>
            <span className="text-emerald-400 font-medium">LinkedIn Vetted</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Turn Trusted B2B Voices into Your{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-indigo-400 to-violet-300">
              Highest-Performing Pipeline
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Partner with vetted industry leaders on LinkedIn. Filter by verified audience fit, deploy native sponsored
            narratives, and track qualified trials down to the euro.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="#creators"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base shadow-xl shadow-indigo-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Creators</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#case-studies"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-base border border-slate-700/80 transition-all duration-200 hover:border-slate-600"
            >
              <span>See BlogSEO Results</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </a>
          </div>

          {/* Quick Value Proof Bullets */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No agency retainers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Algorithmic ICP Fit %</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Attributed trials & revenue</span>
            </div>
          </div>
        </div>

        {/* Live Platform Stats Ticker */}
        <div className="mt-16 sm:mt-20">
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl shadow-black/40">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
              {PLATFORM_STATS.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`flex flex-col items-center text-center ${index > 0 ? "pt-4 sm:pt-0 sm:pl-6" : ""}`}
                >
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-baseline gap-1">
                    {stat.value}
                    {stat.highlight && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block mb-1" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-indigo-300 mt-1 uppercase tracking-wider text-[11px]">
                    {stat.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 max-w-[200px] leading-snug">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
