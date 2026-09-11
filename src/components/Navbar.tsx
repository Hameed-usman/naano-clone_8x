"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCampaign } from "@/context/CampaignContext";
import { Zap, ArrowRight, Sparkles, Menu, X } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function Navbar() {
  const { selectedCount, totalBudget, isHydrated, triggerConfetti } = useCampaign();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLaunchClick = (e: React.MouseEvent) => {
    if (selectedCount > 0) {
      triggerConfetti();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#090d16]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                naano
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium -mt-1 tracking-wider uppercase">
                Creator Network
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#creators"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              Marketplace
            </a>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              How It Works
            </a>
            <a
              href="#case-studies"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              Case Studies
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              Pricing
            </a>
            <a
              href="#analytics"
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-150"
            >
              Analytics
            </a>
          </nav>

          {/* Action CTA */}
          <div className="hidden md:flex items-center gap-4">
            {isHydrated && selectedCount > 0 ? (
              <a
                href="#campaign-brief"
                onClick={handleLaunchClick}
                className="relative inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-md shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-indigo-200 animate-pulse" />
                <span>Launch Campaign</span>
                <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold bg-white text-indigo-700 rounded-full">
                  {selectedCount}
                </span>
                <span className="text-xs text-indigo-200 border-l border-indigo-400/40 pl-2">
                  {formatCurrency(totalBudget)}
                </span>
              </a>
            ) : (
              <a
                href="#creators"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/80 transition-all duration-200 hover:border-slate-600"
              >
                <span>Explore Creators</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center gap-2">
            {isHydrated && selectedCount > 0 && (
              <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs font-bold bg-indigo-600 text-white rounded-full">
                {selectedCount}
              </span>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1220] border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <a
            href="#creators"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            Marketplace
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            How It Works
          </a>
          <a
            href="#case-studies"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            Case Studies
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-slate-300 hover:text-white py-1"
          >
            Pricing
          </a>
          <div className="pt-2">
            <a
              href="#creators"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
            >
              <span>Explore Creators</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
