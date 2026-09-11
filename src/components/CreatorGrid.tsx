"use client";

import React, { useState, useMemo } from "react";
import { CREATORS, Creator } from "@/data/naanoData";
import { useCampaign } from "@/context/CampaignContext";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Check,
  Plus,
  ShieldCheck,
  Eye,
  MousePointerClick,
  Users,
  Search,
  SlidersHorizontal,
  Flame,
  Sparkles,
} from "lucide-react";

export default function CreatorGrid() {
  const { toggleCreator, isCreatorSelected, triggerConfetti } = useCampaign();
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filterCategories = [
    { id: "all", label: "All Voices" },
    { id: "ai", label: "B2B & AI" },
    { id: "sales", label: "Sales & RevOps" },
    { id: "gtm", label: "GTM & Strategy" },
    { id: "saas", label: "Founder & SaaS" },
  ];

  const filteredCreators = useMemo(() => {
    return CREATORS.filter((creator) => {
      // Category filter
      let matchesCat = true;
      if (selectedFilter === "ai") {
        matchesCat = creator.niche.toLowerCase().includes("ai") || creator.topics.some((t) => t.toLowerCase().includes("ai"));
      } else if (selectedFilter === "sales") {
        matchesCat = creator.niche.toLowerCase().includes("sales") || creator.topics.some((t) => t.toLowerCase().includes("sales"));
      } else if (selectedFilter === "gtm") {
        matchesCat = creator.niche.toLowerCase().includes("gtm") || creator.topics.some((t) => t.toLowerCase().includes("gtm"));
      } else if (selectedFilter === "saas") {
        matchesCat = creator.niche.toLowerCase().includes("saas") || creator.topics.some((t) => t.toLowerCase().includes("saas"));
      }

      // Search query filter
      const matchesSearch =
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCat && matchesSearch;
    });
  }, [selectedFilter, searchQuery]);

  const handleToggle = (creator: Creator) => {
    const wasSelected = isCreatorSelected(creator.id);
    toggleCreator(creator);
    if (!wasSelected) {
      triggerConfetti();
    }
  };

  return (
    <section id="creators" className="py-24 relative bg-[#070a12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-3">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Verified Creator Marketplace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Curated High-Impact B2B Voices
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Hand-verified creators with certified audience authority. Review transparent conversion data from past campaigns.
            </p>
          </div>

          {/* Search bar & filter pills */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, niche, topic..."
                className="w-full sm:w-64 pl-10 pr-4 py-2 text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap transition-all duration-150 ${
                selectedFilter === cat.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Creator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredCreators.map((creator) => {
            const selected = isCreatorSelected(creator.id);

            return (
              <div
                key={creator.id}
                className={`glass-card rounded-2xl p-6 relative flex flex-col justify-between transition-all duration-200 ${
                  selected
                    ? "border-indigo-500 ring-2 ring-indigo-500/50 bg-slate-900/90 shadow-xl shadow-indigo-500/10"
                    : "border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-black/40"
                }`}
              >
                <div>
                  {/* Top Row: Avatar, Name, Verified Badge & Fit Score */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="relative">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-14 h-14 rounded-xl object-cover border border-slate-700 shadow-md"
                        />
                        {creator.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-0.5 shadow-sm">
                            <ShieldCheck className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-bold text-white tracking-tight">
                            {creator.name}
                          </h3>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">
                          {creator.role} • {creator.niche}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
                          <Users className="w-3.5 h-3.5 text-slate-500" />
                          <span className="font-semibold text-slate-300">
                            {creator.followersFormatted}
                          </span>
                          <span>followers</span>
                        </div>
                      </div>
                    </div>

                    {/* Fit Score Badge */}
                    <div className="flex flex-col items-end">
                      <div className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>{creator.fitScore}% Fit</span>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5">ICP Match</span>
                    </div>
                  </div>

                  {/* Topics Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {creator.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-800/80 text-slate-400 border border-slate-700/60"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Sample Post Teardown */}
                  {creator.samplePost && (
                    <div className="rounded-xl bg-slate-950/60 border border-slate-800/80 p-3.5 mb-5 space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/80 pb-2">
                        <span className="font-semibold uppercase tracking-wider text-slate-300">
                          Verified Case Example
                        </span>
                        <span>{creator.samplePost.publishedDate}</span>
                      </div>

                      <p className="text-xs text-slate-300 line-clamp-2 italic leading-relaxed">
                        &ldquo;{creator.samplePost.content}&rdquo;
                      </p>

                      {/* Performance Metric Badges */}
                      <div className="grid grid-cols-3 gap-2 pt-1">
                        <div className="bg-slate-900/90 rounded-lg p-2 text-center border border-slate-800">
                          <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
                            <Eye className="w-3 h-3 text-slate-400" />
                            <span>Imp.</span>
                          </div>
                          <div className="text-xs font-bold text-white mt-0.5">
                            {formatNumber(creator.samplePost.impressions)}
                          </div>
                        </div>

                        <div className="bg-slate-900/90 rounded-lg p-2 text-center border border-slate-800">
                          <div className="flex items-center justify-center gap-1 text-slate-400 text-[10px]">
                            <MousePointerClick className="w-3 h-3 text-indigo-400" />
                            <span>Clicks</span>
                          </div>
                          <div className="text-xs font-bold text-indigo-300 mt-0.5">
                            {creator.samplePost.clicks}
                          </div>
                        </div>

                        <div className="bg-slate-900/90 rounded-lg p-2 text-center border border-slate-800">
                          <div className="flex items-center justify-center gap-1 text-emerald-400 text-[10px]">
                            <Sparkles className="w-3 h-3 text-emerald-400" />
                            <span>Leads</span>
                          </div>
                          <div className="text-xs font-bold text-emerald-400 mt-0.5">
                            {creator.samplePost.leads}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer: Price & Quick Add Button */}
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 block">Performance Rate</span>
                    <span className="text-lg font-black text-white">
                      {formatCurrency(creator.pricePerPost)}
                    </span>
                    <span className="text-xs text-slate-400"> / post</span>
                  </div>

                  <button
                    onClick={() => handleToggle(creator)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                      selected
                        ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30"
                        : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 hover:scale-[1.02] active:scale-[0.98]"
                    }`}
                  >
                    {selected ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Brief</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCreators.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-base">
              No creators found matching &ldquo;{searchQuery}&rdquo;. Try another search term or filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
