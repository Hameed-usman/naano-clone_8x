import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustProofBar from "@/components/TrustProofBar";
import HowItWorks from "@/components/HowItWorks";
import CreatorGrid from "@/components/CreatorGrid";
import CaseStudySection from "@/components/CaseStudySection";
import PricingSection from "@/components/PricingSection";
import CampaignDrawer from "@/components/CampaignDrawer";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col relative selection:bg-indigo-500 selection:text-white">
      {/* Sticky Header with Dynamic Campaign Badge */}
      <Navbar />

      {/* Hero with Platform Stats Ticker */}
      <HeroSection />

      {/* Social Proof & Testimonial */}
      <TrustProofBar />

      {/* 3-Step Process */}
      <HowItWorks />

      {/* Live Creator Grid & Filtering */}
      <CreatorGrid />

      {/* BlogSEO Case Study Teardown */}
      <CaseStudySection />

      {/* Transparent Pricing (Self-Serve vs Managed) */}
      <PricingSection />

      {/* Floating Campaign Drawer when creators are selected */}
      <CampaignDrawer />

      {/* Footer */}
      <Footer />
    </main>
  );
}
