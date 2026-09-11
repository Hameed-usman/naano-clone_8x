"use client";

import React from "react";
import { CASE_STUDY_BLOGSEO } from "@/data/naanoData";
import { TrendingUp, MousePointerClick, UserPlus, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";

export default function CaseStudySection() {
  const data = CASE_STUDY_BLOGSEO;

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden bg-[#090d16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Verified Customer Teardown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How BlogSEO Generated 125 SaaS Trials in 14 Days
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Replacing expensive LinkedIn Ads with two native AI thought leaders at 64% lower customer acquisition cost.
          </p>
        </div>

        {/* Highlight Card */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left summary & quote */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 font-bold text-xs">
                  {data.company} Case Study
                </span>
                <span className="text-xs text-slate-500">•</span>
                <span className="text-xs text-slate-400">14-Day Sprint</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
                &ldquo;Naano delivered a lower CAC than our LinkedIn Ads while generating users who already understood our product.&rdquo;
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {data.description}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400 text-sm">
                  MK
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{data.quote.author}</div>
                  <div className="text-xs text-slate-400">{data.quote.role}</div>
                </div>
              </div>
            </div>

            {/* Right KPI grid */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Creators</span>
                  <div className="p-1.5 rounded-lg bg-slate-800 text-indigo-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {data.creatorsActivated}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Niche AI specialists activated
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">Qualified Clicks</span>
                  <div className="p-1.5 rounded-lg bg-indigo-950 text-indigo-400">
                    <MousePointerClick className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-indigo-300">
                  {data.qualifiedClicks}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Unique high-intent visits
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-6 border border-emerald-500/30 flex flex-col justify-between shadow-lg bg-gradient-to-b from-emerald-950/20 to-slate-900/90">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Trials Started</span>
                  <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400">
                    <UserPlus className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-400">
                  {data.trialsStarted}
                </div>
                <div className="text-xs text-emerald-300/80 mt-1">
                  {data.conversionRate}
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-800 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between text-slate-400 mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider">CAC Efficiency</span>
                  <div className="p-1.5 rounded-lg bg-slate-800 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white">
                  -64%
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  vs LinkedIn Ads baseline
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
