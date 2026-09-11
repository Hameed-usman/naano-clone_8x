"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEFAULT_ANALYTICS_CAMPAIGNS, AnalyticsCampaign, CreatorPerformanceRecord } from "@/data/naanoData";
import { formatCurrency, formatNumber } from "@/lib/utils";
import confetti from "canvas-confetti";
import {
  TrendingUp,
  MousePointerClick,
  Users,
  Target,
  DollarSign,
  Share2,
  Download,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Send,
  Eye,
  X,
  Sparkles,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

function AnalyticsContent() {
  const searchParams = useSearchParams();
  const campaignParam = searchParams.get("campaign");
  const isNewCampaign = searchParams.get("new");

  const [campaigns, setCampaigns] = useState<AnalyticsCampaign[]>(DEFAULT_ANALYTICS_CAMPAIGNS);
  const [selectedCampaignId, setSelectedCampaignId] = useState<string>(
    campaignParam || DEFAULT_ANALYTICS_CAMPAIGNS[0].id
  );
  const [previewPost, setPreviewPost] = useState<CreatorPerformanceRecord | null>(null);
  const [showCelebration, setShowCelebration] = useState(isNewCampaign === "true");

  // Load user campaigns from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("naano_active_campaigns_v1");
      if (stored) {
        const parsed: AnalyticsCampaign[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom user campaigns at top of the list
          setCampaigns([...parsed, ...DEFAULT_ANALYTICS_CAMPAIGNS]);
          if (campaignParam) {
            setSelectedCampaignId(campaignParam);
          } else {
            setSelectedCampaignId(parsed[0].id);
          }
        }
      }
    } catch (e) {
      console.warn("Failed to load campaigns from storage", e);
    }
  }, [campaignParam]);

  // Confetti on celebration
  useEffect(() => {
    if (showCelebration) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  }, [showCelebration]);

  const activeCampaign = useMemo(() => {
    return campaigns.find((c) => c.id === selectedCampaignId) || campaigns[0];
  }, [campaigns, selectedCampaignId]);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* New Campaign Notification Banner */}
        {showCelebration && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/90 to-emerald-950/90 border border-emerald-500/40 text-emerald-300 flex items-center justify-between shadow-xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  🚀 Campaign Activated: {activeCampaign.title}
                </h3>
                <p className="text-xs text-emerald-300/80 mt-0.5">
                  Briefs delivered to {activeCampaign.creators.length} verified creators. Real-time UTM lead tracking is now live.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCelebration(false)}
              className="p-1 text-emerald-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Dashboard Header & Campaign Switcher */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Live Revenue Attribution Engine
              </span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Campaign Attribution Analytics
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Deterministic click and trial conversion tracking attributed to verified LinkedIn creators.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Campaign Select Dropdown */}
            <div className="relative">
              <select
                value={activeCampaign.id}
                onChange={(e) => setSelectedCampaignId(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-sm"
              >
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.status})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <Link
              href="/campaign/new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-indigo-600/25 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </Link>
          </div>
        </div>

        {/* Executive Overview KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {/* Spend */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Spend</span>
              <div className="p-1 rounded-lg bg-slate-800 text-slate-300">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(activeCampaign.totalSpend)}
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">
                {activeCampaign.creators.length} creators deployed
              </span>
            </div>
          </div>

          {/* Attributed Clicks */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Attributed Clicks</span>
              <div className="p-1 rounded-lg bg-indigo-950 text-indigo-400">
                <MousePointerClick className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-indigo-300">
                {formatNumber(activeCampaign.attributedClicks)}
              </div>
              <span className="text-[10px] text-indigo-400 mt-1 block">
                Verified UTM inbound
              </span>
            </div>
          </div>

          {/* Leads / Trials */}
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-slate-900/90 flex flex-col justify-between">
            <div className="flex items-center justify-between text-emerald-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Trials / Leads</span>
              <div className="p-1 rounded-lg bg-emerald-950 text-emerald-400">
                <Users className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">
                {activeCampaign.leadsGenerated}
              </div>
              <span className="text-[10px] text-emerald-300/80 mt-1 block">
                {(
                  (activeCampaign.leadsGenerated / Math.max(1, activeCampaign.attributedClicks)) *
                  100
                ).toFixed(1)}
                % Conversion Rate
              </span>
            </div>
          </div>

          {/* Blended CAC */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Blended CAC</span>
              <div className="p-1 rounded-lg bg-slate-800 text-emerald-400">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(activeCampaign.blendedCac)}
              </div>
              <span className="text-[10px] text-emerald-400 mt-1 block">
                vs $48.50 paid ads baseline
              </span>
            </div>
          </div>

          {/* Pipeline Value */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 col-span-2 md:col-span-1 flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Est. Pipeline</span>
              <div className="p-1 rounded-lg bg-indigo-950 text-indigo-400">
                <Target className="w-3.5 h-3.5" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                {formatCurrency(activeCampaign.pipelineValue)}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {(activeCampaign.pipelineValue / Math.max(1, activeCampaign.totalSpend)).toFixed(1)}x ROAS Multiple
              </span>
            </div>
          </div>
        </div>

        {/* Creator Performance Attribution Table */}
        <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Creator Performance Breakdown
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Detailed attribution breakdown per creator voice for {activeCampaign.title}.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Objective:</span>
              <span className="px-2.5 py-1 rounded-md bg-indigo-950 border border-indigo-800 text-xs font-semibold text-indigo-300">
                {activeCampaign.objective}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                  <th className="py-3.5 px-6">Creator</th>
                  <th className="py-3.5 px-6">Creative Angle / Hook</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Impressions</th>
                  <th className="py-3.5 px-4 text-right">Clicks</th>
                  <th className="py-3.5 px-4 text-right">Leads</th>
                  <th className="py-3.5 px-4 text-right">CPL</th>
                  <th className="py-3.5 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
                {activeCampaign.creators.map((record) => (
                  <tr key={record.creatorId} className="hover:bg-slate-900/40 transition-colors">
                    {/* Creator Info */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={record.creatorAvatar}
                          alt={record.creatorName}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <span className="font-bold text-white block">{record.creatorName}</span>
                          <span className="text-[11px] text-slate-400">
                            {record.creatorRole} • {record.creatorNiche}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Creative Angle */}
                    <td className="py-4 px-6 max-w-xs">
                      <span className="text-slate-300 line-clamp-2 italic font-normal">
                        &ldquo;{record.angle}&rdquo;
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          record.status === "Active"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                            : record.status === "Delivered"
                            ? "bg-indigo-950/80 text-indigo-300 border border-indigo-500/40"
                            : "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            record.status === "Active"
                              ? "bg-emerald-400 animate-pulse"
                              : record.status === "Delivered"
                              ? "bg-indigo-400"
                              : "bg-amber-400"
                          }`}
                        />
                        <span>{record.status}</span>
                      </span>
                    </td>

                    {/* Impressions */}
                    <td className="py-4 px-4 text-right font-medium text-slate-200">
                      {formatNumber(record.impressions)}
                    </td>

                    {/* Clicks */}
                    <td className="py-4 px-4 text-right font-bold text-indigo-300">
                      {record.clicks}
                    </td>

                    {/* Leads */}
                    <td className="py-4 px-4 text-right font-black text-emerald-400">
                      {record.leads}
                    </td>

                    {/* CPL */}
                    <td className="py-4 px-4 text-right font-bold text-white">
                      {formatCurrency(record.cpl)}
                    </td>

                    {/* Preview Button */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => setPreviewPost(record)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Post Preview Modal */}
        {previewPost && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
            <div className="glass-card max-w-lg w-full rounded-2xl p-6 border border-slate-700 shadow-2xl relative">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src={previewPost.creatorAvatar}
                    alt={previewPost.creatorName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-600"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{previewPost.creatorName}</h3>
                    <span className="text-xs text-slate-400">{previewPost.creatorRole} • LinkedIn Verified</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewPost(null)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-3 mb-4">
                <p>{previewPost.previewSnippet}</p>
                <div className="p-2.5 rounded bg-indigo-950/60 border border-indigo-800/60 text-xs font-mono text-indigo-300 flex items-center justify-between">
                  <span>Tracked Link: https://naano.link/{previewPost.creatorId}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Rate</span>
                  <span className="font-bold text-white">{formatCurrency(previewPost.spend)}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Impressions</span>
                  <span className="font-bold text-slate-200">{formatNumber(previewPost.impressions)}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 text-[10px] block">Clicks</span>
                  <span className="font-bold text-indigo-300">{previewPost.clicks}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-emerald-400 text-[10px] block">Leads</span>
                  <span className="font-bold text-emerald-400">{previewPost.leads}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
                <button
                  onClick={() => setPreviewPost(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-semibold hover:bg-slate-700"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function AnalyticsDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090d16] flex items-center justify-center text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-sm font-medium">Loading attribution dashboard...</span>
          </div>
        </div>
      }
    >
      <AnalyticsContent />
    </Suspense>
  );
}
