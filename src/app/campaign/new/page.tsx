"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCampaign } from "@/context/CampaignContext";
import { CREATORS, Creator, AnalyticsCampaign, CreatorPerformanceRecord } from "@/data/naanoData";
import { formatCurrency, formatNumber } from "@/lib/utils";
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Link2,
  Trash2,
  Plus,
  Zap,
  Target,
  FileEdit,
  DollarSign,
  ShieldCheck,
  Flame,
  HelpCircle,
} from "lucide-react";

export default function NewCampaignPage() {
  const router = useRouter();
  const {
    selectedCreators,
    addCreator,
    removeCreator,
    isCreatorSelected,
    totalBudget,
    totalEstimatedReach,
    totalEstimatedLeads,
    selectedCount,
    triggerConfetti,
    isHydrated,
  } = useCampaign();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Goals
  const [productName, setProductName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [objective, setObjective] = useState<"Free Trial Starts" | "Demo Signups" | "Brand Awareness">(
    "Free Trial Starts"
  );
  const [targetIcp, setTargetIcp] = useState("VPs of Sales & RevOps Leaders");

  // Step 2: Content Angles
  const [keyMessaging, setKeyMessaging] = useState("");
  const [guidelinesDos, setGuidelinesDos] = useState("Highlight specific product workflows and native ROI proof. Include direct teardown screenshot or carousel.");
  const [guidelinesDonts, setGuidelinesDonts] = useState("Avoid generic promotional corporate jargon. Do not mention competitor brand names directly.");
  const [targetLink, setTargetLink] = useState("");

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-fill defaults if user is testing
  useEffect(() => {
    if (!productName && !websiteUrl) {
      setProductName("OutboundEngine AI");
      setWebsiteUrl("https://outboundengine.io");
      setTargetLink("https://outboundengine.io/demo");
      setKeyMessaging("Automate high-intent outbound prospecting with AI without sacrificing personal executive touch.");
    }
  }, [productName, websiteUrl]);

  // Compute clean UTM link
  const cleanUtmLink = useMemo(() => {
    const base = targetLink || websiteUrl || "https://yourproduct.com";
    const separator = base.includes("?") ? "&" : "?";
    const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "campaign";
    return `${base}${separator}utm_source=naano&utm_medium=linkedin_creator&utm_campaign=${slug}`;
  }, [targetLink, websiteUrl, productName]);

  // Step Navigation Handlers
  const handleNextFromStep1 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!productName.trim()) newErrors.productName = "Product name is required";
    if (!websiteUrl.trim()) newErrors.websiteUrl = "Target website URL is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromStep2 = () => {
    const newErrors: { [key: string]: string } = {};
    if (!keyMessaging.trim()) newErrors.keyMessaging = "Key messaging is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Launch Campaign Action
  const handleLaunchCampaign = () => {
    if (selectedCount === 0) {
      setErrors({ roster: "Please select at least 1 creator for your campaign." });
      return;
    }

    setIsSubmitting(true);
    triggerConfetti();

    // Map selected creators to performance records
    const creatorRecords: CreatorPerformanceRecord[] = selectedCreators.map((creator) => ({
      creatorId: creator.id,
      creatorName: creator.name,
      creatorRole: creator.role,
      creatorAvatar: creator.avatar,
      creatorNiche: creator.niche,
      angle: creator.samplePost?.content?.slice(0, 50) + "..." || `Product review for ${productName}`,
      status: "Active",
      impressions: creator.samplePost?.impressions || creator.followers,
      clicks: creator.samplePost?.clicks || Math.round(creator.followers * 0.02),
      leads: creator.samplePost?.leads || Math.round(creator.followers * 0.003),
      cpl: Number(
        (
          creator.pricePerPost /
          Math.max(1, creator.samplePost?.leads || Math.round(creator.followers * 0.003))
        ).toFixed(2)
      ),
      spend: creator.pricePerPost,
      previewSnippet: creator.samplePost?.content || "Verified authentic sponsored LinkedIn narrative.",
    }));

    const newCampaignId = "camp-" + Date.now();
    const newCampaignRecord: AnalyticsCampaign = {
      id: newCampaignId,
      title: `${productName} — ${objective}`,
      productName,
      objective,
      status: "Active",
      startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      totalSpend: totalBudget,
      attributedClicks: creatorRecords.reduce((acc, c) => acc + c.clicks, 0),
      leadsGenerated: creatorRecords.reduce((acc, c) => acc + c.leads, 0),
      blendedCac: Number(
        (
          totalBudget /
          Math.max(1, creatorRecords.reduce((acc, c) => acc + c.leads, 0))
        ).toFixed(2)
      ),
      pipelineValue: Math.round(creatorRecords.reduce((acc, c) => acc + c.leads, 0) * 450),
      creators: creatorRecords,
    };

    // Save to localStorage safely
    try {
      const existing = localStorage.getItem("naano_active_campaigns_v1");
      const list: AnalyticsCampaign[] = existing ? JSON.parse(existing) : [];
      list.unshift(newCampaignRecord);
      localStorage.setItem("naano_active_campaigns_v1", JSON.stringify(list));
      localStorage.setItem("naano_current_campaign_id_v1", newCampaignId);
    } catch (e) {
      console.warn("Could not write to localStorage", e);
    }

    setTimeout(() => {
      router.push(`/analytics?campaign=${newCampaignId}&new=true`);
    }, 1200);
  };

  const recommendedDefaults = CREATORS.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Creator Marketplace</span>
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Campaign Brief Builder
              </h1>
              <p className="text-slate-400 text-sm mt-1">
                Configure your GTM objectives, creator creative angles, and automated tracking links.
              </p>
            </div>

            {/* Stepper Indicators */}
            <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
              {[
                { step: 1, label: "Goals" },
                { step: 2, label: "Angles & UTM" },
                { step: 3, label: "Roster Review" },
              ].map((s) => (
                <button
                  key={s.step}
                  onClick={() => {
                    if (s.step < currentStep) setCurrentStep(s.step as 1 | 2 | 3);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    currentStep === s.step
                      ? "bg-indigo-600 text-white shadow"
                      : currentStep > s.step
                      ? "text-emerald-400 hover:bg-slate-800"
                      : "text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {currentStep > s.step ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
                      {s.step}
                    </span>
                  )}
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Wizard Step 1: Campaign Goals */}
        {currentStep === 1 && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <span>Step 1: Campaign Goals & Target Audience</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Define the core objectives that creators will optimize their messaging around.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Product Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Product / Company Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g. Acme AI"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                {errors.productName && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.productName}
                  </p>
                )}
              </div>

              {/* Website URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Target Website URL <span className="text-rose-400">*</span>
                </label>
                <input
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  placeholder="https://acme.io"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
                {errors.websiteUrl && (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.websiteUrl}
                  </p>
                )}
              </div>
            </div>

            {/* Campaign Objective Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                Primary Campaign Objective
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "Free Trial Starts",
                    title: "Free Trial Starts",
                    desc: "Drive direct self-serve signups with product-led hooks",
                  },
                  {
                    id: "Demo Signups",
                    title: "Demo Signups",
                    desc: "Book qualified enterprise pipeline calls with decision-makers",
                  },
                  {
                    id: "Brand Awareness",
                    title: "Brand Awareness",
                    desc: "Establish category leadership and high-intent industry mindshare",
                  },
                ].map((obj) => (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => setObjective(obj.id as any)}
                    className={`p-4 rounded-xl text-left border transition-all ${
                      objective === obj.id
                        ? "bg-indigo-950/60 border-indigo-500 text-white ring-1 ring-indigo-500"
                        : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{obj.title}</span>
                      {objective === obj.id && <CheckCircle2 className="w-4 h-4 text-indigo-400" />}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{obj.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Target ICP */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Target Ideal Customer Profile (ICP)
              </label>
              <input
                type="text"
                value={targetIcp}
                onChange={(e) => setTargetIcp(e.target.value)}
                placeholder="e.g. VPs of Sales, CTOs, B2B SaaS Founders"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNextFromStep1}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all"
              >
                <span>Continue to Content Angles</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Wizard Step 2: Content Angles & UTM Generator */}
        {currentStep === 2 && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileEdit className="w-5 h-5 text-indigo-400" />
                <span>Step 2: Creative Angles & Attribution Links</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Equip creators with compelling messaging hooks, explicit guidelines, and auto-generated UTM tracking.
              </p>
            </div>

            {/* Key Messaging Points */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Core Value Proposition / Key Hook <span className="text-rose-400">*</span>
              </label>
              <textarea
                rows={3}
                value={keyMessaging}
                onChange={(e) => setKeyMessaging(e.target.value)}
                placeholder="What is the breakthrough takeaway? e.g. How we decreased enterprise lead acquisition cost by 64% with transparent AI workflows."
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
              />
              {errors.keyMessaging && (
                <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.keyMessaging}
                </p>
              )}
            </div>

            {/* Dos and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Creative Dos</span>
                </label>
                <textarea
                  rows={3}
                  value={guidelinesDos}
                  onChange={(e) => setGuidelinesDos(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-rose-400 mb-2 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Creative Don&apos;ts</span>
                </label>
                <textarea
                  rows={3}
                  value={guidelinesDonts}
                  onChange={(e) => setGuidelinesDonts(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700/80 rounded-xl text-white text-xs leading-relaxed"
                />
              </div>
            </div>

            {/* Destination Link with Auto UTM Engine */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                  <Link2 className="w-4 h-4 text-indigo-400" />
                  <span>Auto-Generated Performance Tracking Link</span>
                </label>
                <span className="text-[11px] text-emerald-400 font-medium">Attribution Active</span>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">
                  Custom landing page URL (optional override)
                </label>
                <input
                  type="url"
                  value={targetLink}
                  onChange={(e) => setTargetLink(e.target.value)}
                  placeholder={websiteUrl || "https://acme.io/signup"}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 break-all font-mono text-[11px] text-indigo-200">
                {cleanUtmLink}
              </div>
              <p className="text-[11px] text-slate-500">
                Creators will natively embed this tracked link to automatically route pipeline into your analytics dashboard.
              </p>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-md shadow-indigo-600/30 transition-all"
              >
                <span>Review Creator Roster & Budget</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Wizard Step 3: Roster & Budget Review */}
        {currentStep === 3 && (
          <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-fadeIn">
            <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  <span>Step 3: Creator Roster & Financial Summary</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Finalize your creator lineup and projected pipeline forecast before initiating creator activations.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Selected Voices:</span>
                <span className="font-bold text-white px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-700">
                  {selectedCount}
                </span>
              </div>
            </div>

            {/* Selected Creators List */}
            {selectedCount > 0 ? (
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                  Active Creator Roster
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedCreators.map((creator) => (
                    <div
                      key={creator.id}
                      className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-700"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-sm">{creator.name}</span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40">
                              {creator.fitScore}% Fit
                            </span>
                          </div>
                          <span className="text-xs text-slate-400 block">
                            {creator.role} • {creator.niche}
                          </span>
                          <span className="text-[11px] text-slate-500 mt-0.5 block">
                            Est. {formatNumber(creator.samplePost?.impressions || creator.followers)} reach • ~
                            {creator.samplePost?.leads || 25} leads
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className="font-black text-white text-sm">
                          {formatCurrency(creator.pricePerPost)}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeCreator(creator.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition-colors"
                          title="Remove from brief"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* If no creators selected yet, prompt user with instant add recommended defaults */
              <div className="p-6 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-indigo-900/60 border border-indigo-700 flex items-center justify-center mx-auto text-indigo-300">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">No Creators Selected Yet</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-1">
                    Add top recommended verified voices for your campaign or browse the marketplace.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
                  {recommendedDefaults.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <img
                          src={rec.avatar}
                          alt={rec.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <span className="font-bold text-white text-xs block">{rec.name}</span>
                          <span className="text-[10px] text-emerald-400">{rec.fitScore}% Fit</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800">
                        <span className="font-bold text-white text-xs">
                          {formatCurrency(rec.pricePerPost)}
                        </span>
                        <button
                          type="button"
                          onClick={() => addCreator(rec)}
                          className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                        >
                          + Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {errors.roster && (
              <p className="text-xs text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.roster}
              </p>
            )}

            {/* Financial & Pipeline Forecast Card */}
            <div className="rounded-2xl bg-slate-950 p-5 sm:p-6 border border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Total Creator Spend
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {formatCurrency(totalBudget)}
                </span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">0% Platform Fee (Promo)</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Est. Impressions
                </span>
                <span className="text-2xl font-black text-indigo-300 mt-1 block">
                  ~{formatNumber(totalEstimatedReach)}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Organic feed reach</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Est. Qualified Leads
                </span>
                <span className="text-2xl font-black text-emerald-400 mt-1 block">
                  ~{totalEstimatedLeads || 35}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Attributed pipeline</span>
              </div>

              <div>
                <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                  Projected Blended CAC
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {totalEstimatedLeads > 0
                    ? formatCurrency(Math.round(totalBudget / totalEstimatedLeads))
                    : "$14.50"}
                </span>
                <span className="text-[10px] text-emerald-400 mt-0.5 block">-62% vs LinkedIn Ads</span>
              </div>
            </div>

            {/* Wizard Navigation & Final Launch Button */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleLaunchCampaign}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-emerald-200 animate-pulse" />
                <span>{isSubmitting ? "Launching Campaign..." : "Launch Campaign & Activate Voices"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
