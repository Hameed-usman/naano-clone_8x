"use client";

import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#060910] text-slate-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Zap className="w-4 h-4 fill-white" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">naano</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The B2B Influencer Performance Network. We help high-growth SaaS and enterprise tech companies turn trusted LinkedIn voices into predictable inbound pipeline.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational (479+ Creators Live)</span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#creators" className="hover:text-white transition-colors">
                  Creator Marketplace
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">
                  Transparent Pricing
                </a>
              </li>
              <li>
                <a href="#case-studies" className="hover:text-white transition-colors">
                  Case Studies & ROI
                </a>
              </li>
            </ul>
          </div>

          {/* Niches */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Creator Niches
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#creators" className="hover:text-white transition-colors">
                  B2B & AI Engineers
                </a>
              </li>
              <li>
                <a href="#creators" className="hover:text-white transition-colors">
                  Sales & RevOps Leaders
                </a>
              </li>
              <li>
                <a href="#creators" className="hover:text-white transition-colors">
                  GTM & Product Marketing
                </a>
              </li>
              <li>
                <a href="#creators" className="hover:text-white transition-colors">
                  Tech Founders & SaaS
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Security & Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>Verified Follower Auditing</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                <span>100% Guaranteed SLA</span>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Naano Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered with precision for B2B performance marketing.
          </p>
        </div>
      </div>
    </footer>
  );
}
