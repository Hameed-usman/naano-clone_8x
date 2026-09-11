"use client";

import React from "react";
import { HOW_IT_WORKS_STEPS } from "@/data/naanoData";
import { UserCheck, FileText, LineChart, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const icons = [
    <UserCheck key="1" className="w-6 h-6 text-indigo-400" />,
    <FileText key="2" className="w-6 h-6 text-indigo-400" />,
    <LineChart key="3" className="w-6 h-6 text-emerald-400" />,
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-indigo-400 tracking-wider uppercase">
            Turnkey Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How Naano Works
          </h2>
          <p className="text-slate-400 text-base">
            From discovering qualified voices to attributed pipeline in three streamlined steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden md:block absolute top-1/2 left-[18%] right-[18%] h-[2px] -translate-y-12 bg-gradient-to-r from-indigo-500/20 via-indigo-500/40 to-emerald-500/20 -z-0" />

          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="glass-card rounded-2xl p-7 relative z-10 glass-card-hover border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center shadow-inner">
                    {icons[idx]}
                  </div>
                  <span className="text-3xl font-black text-slate-700 select-none">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Core Metric:</span>
                <span className="text-indigo-400 font-semibold px-2.5 py-1 rounded-md bg-indigo-950/60 border border-indigo-800/50">
                  {step.metric}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
