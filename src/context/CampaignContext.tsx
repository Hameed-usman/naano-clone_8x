"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { Creator } from "@/data/naanoData";
import confetti from "canvas-confetti";

interface CampaignContextType {
  selectedCreators: Creator[];
  isHydrated: boolean;
  addCreator: (creator: Creator) => void;
  removeCreator: (id: string) => void;
  toggleCreator: (creator: Creator) => void;
  clearSelection: () => void;
  isCreatorSelected: (id: string) => boolean;
  totalBudget: number;
  totalEstimatedReach: number;
  totalEstimatedLeads: number;
  selectedCount: number;
  triggerConfetti: () => void;
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "naano_selected_creators_v1";

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [selectedCreators, setSelectedCreators] = useState<Creator[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Safely restore state from localStorage after hydration
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelectedCreators(parsed);
        }
      }
    } catch (e) {
      console.warn("Failed to load campaign from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Safely persist to localStorage on change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(selectedCreators));
    } catch (e) {
      console.warn("Failed to save campaign to localStorage", e);
    }
  }, [selectedCreators, isHydrated]);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.8 },
        colors: ["#6366f1", "#818cf8", "#10b981", "#38bdf8"],
      });
    } catch {
      // Fallback gracefully if canvas context isn't supported
    }
  }, []);

  const addCreator = useCallback((creator: Creator) => {
    setSelectedCreators((prev) => {
      if (prev.some((c) => c.id === creator.id)) return prev;
      return [...prev, creator];
    });
  }, []);

  const removeCreator = useCallback((id: string) => {
    setSelectedCreators((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const toggleCreator = useCallback((creator: Creator) => {
    setSelectedCreators((prev) => {
      const exists = prev.some((c) => c.id === creator.id);
      if (exists) {
        return prev.filter((c) => c.id !== creator.id);
      } else {
        return [...prev, creator];
      }
    });
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCreators([]);
  }, []);

  const isCreatorSelected = useCallback(
    (id: string) => {
      return selectedCreators.some((c) => c.id === id);
    },
    [selectedCreators]
  );

  const totalBudget = useMemo(() => {
    return selectedCreators.reduce((acc, c) => acc + c.pricePerPost, 0);
  }, [selectedCreators]);

  const totalEstimatedReach = useMemo(() => {
    return selectedCreators.reduce((acc, c) => acc + (c.samplePost?.impressions || c.followers || 0), 0);
  }, [selectedCreators]);

  const totalEstimatedLeads = useMemo(() => {
    return selectedCreators.reduce((acc, c) => acc + (c.samplePost?.leads || 0), 0);
  }, [selectedCreators]);

  const value = {
    selectedCreators,
    isHydrated,
    addCreator,
    removeCreator,
    toggleCreator,
    clearSelection,
    isCreatorSelected,
    totalBudget,
    totalEstimatedReach,
    totalEstimatedLeads,
    selectedCount: selectedCreators.length,
    triggerConfetti,
  };

  return <CampaignContext.Provider value={value}>{children}</CampaignContext.Provider>;
}

export function useCampaign() {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error("useCampaign must be used within a CampaignProvider");
  }
  return context;
}
