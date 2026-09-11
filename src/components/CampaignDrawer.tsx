"use client";

import React, { useState } from "react";
import { useCampaign } from "@/context/CampaignContext";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Sparkles,
  Trash2,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Eye,
  Users,
  CheckCircle2,
  X,
  Send,
} from "lucide-react";

export default function CampaignDrawer() {
  const {
    selectedCreators,
    selectedCount,
    totalBudget,
    totalEstimatedReach,
    totalEstimatedLeads,
    removeCreator,
    clearSelection,
    isHydrated,
    triggerConfetti,
  } = useCampaign();

  const [expanded, setExpanded] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isHydrated || selectedCount === 0) {
    return null;
  }

  const handleLaunchBrief = () => {
    triggerConfetti();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div id="campaign-brief" className="fixed bottom-4 left-0 right-0 z-40 px-4 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        {/* Main Floating Bar */}
        <div className="glass-card rounded-2xl border-2 border-indigo-500/50 bg-[#0c1220]/95 backdrop-blur-xl shadow-2xl shadow-indigo-950/60 p-4 sm:p-5 transition-all duration-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Left: Selected count + Avatars */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex -space-x-2.5 overflow-hidden">
                {selectedCreators.slice(0, 4).map((c) => (
                  <img
                    key={c.id}
                    src={c.avatar}
                    alt={c.name}
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-indigo-500 object-cover"
                  />
                ))}
                {selectedCreators.length > 4 && (
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-900 ring-2 ring-indigo-500 text-xs font-bold text-white">
                    +{selectedCreators.length - 4}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    Campaign Brief: {selectedCount} {selectedCount === 1 ? "Voice" : "Voices"}
                  </span>
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-0.5 underline decoration-indigo-400/50"
                  >
                    {expanded ? "Hide Details" : "View Breakdown"}
                    {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>Reach: ~{formatNumber(totalEstimatedReach)}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">Est. Leads: ~{totalEstimatedLeads}</span>
                </div>
              </div>
            </div>

            {/* Right: Total Budget & Actions */}
            <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Estimated Budget</span>
                <span className="text-xl font-black text-white">{formatCurrency(totalBudget)}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearSelection}
                  title="Clear selection"
                  className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={handleLaunchBrief}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Campaign Brief</span>
                </button>
              </div>
            </div>
          </div>

          {/* Success Banner */}
          {submitted && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>
                  Campaign brief draft initiated for {selectedCount} creator{selectedCount > 1 ? "s" : ""}! Estimated pipeline: ~{totalEstimatedLeads} leads.
                </span>
              </div>
              <button onClick={() => setSubmitted(false)} className="text-emerald-400 hover:text-emerald-200">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Expanded Drawer Details */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-slate-800 max-h-60 overflow-y-auto space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Selected Creator Breakdown
              </span>
              {selectedCreators.map((creator) => (
                <div
                  key={creator.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-bold text-white block">{creator.name}</span>
                      <span className="text-slate-400 text-[11px]">
                        {creator.niche} • {creator.fitScore}% Fit
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-slate-200">
                      {formatCurrency(creator.pricePerPost)}
                    </span>
                    <button
                      onClick={() => removeCreator(creator.id)}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
