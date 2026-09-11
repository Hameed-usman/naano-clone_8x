export interface SamplePost {
  content: string;
  impressions: number;
  clicks: number;
  leads: number;
  publishedDate?: string;
}

export interface Creator {
  id: string;
  name: string;
  role: string;
  niche: string;
  avatar: string;
  followers: number;
  followersFormatted: string;
  fitScore: number;
  verified: boolean;
  pricePerPost: number;
  samplePost: SamplePost;
  topics: string[];
  linkedinUrl?: string;
}

export interface Campaign {
  id: string;
  title: string;
  selectedCreators: Creator[];
  totalBudget: number;
  estimatedReach: number;
  estimatedLeads: number;
  createdAt: string;
}

export interface CaseStudy {
  id: string;
  company: string;
  logo: string;
  tagline: string;
  description: string;
  creatorsActivated: number;
  qualifiedClicks: number;
  trialsStarted: number;
  cacReduction: string;
  conversionRate: string;
  quote: {
    text: string;
    author: string;
    role: string;
  };
}

export interface MetricStat {
  id: string;
  label: string;
  value: string;
  description: string;
  highlight?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  badge?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  ctaVariant: "primary" | "secondary";
  popular?: boolean;
}

export const CREATORS: Creator[] = [
  {
    id: "thomas-higadere",
    name: "Thomas Higadère",
    role: "Creator",
    niche: "B2B & AI",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    followers: 34000,
    followersFormatted: "34K",
    fitScore: 96,
    verified: true,
    pricePerPost: 650,
    topics: ["B2B SaaS", "AI Workflows", "WealthTech", "Outbound"],
    samplePost: {
      content: "How AI changed our prospecting workflow for wealth managers. The exact prompt stack and routing logic that booked 18 enterprise demos in 7 days:",
      impressions: 42800,
      clicks: 312,
      leads: 18,
      publishedDate: "Last week",
    },
  },
  {
    id: "robin-tempe",
    name: "Robin Tempe",
    role: "Creator",
    niche: "Sales & AI",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    followers: 12000,
    followersFormatted: "12K",
    fitScore: 91,
    verified: true,
    pricePerPost: 400,
    topics: ["Sales Automation", "AI Prospecting", "SDR Playbooks"],
    samplePost: {
      content: "I run my entire prospecting workflow through an AI. Here's the transparent 4-step framework we used to hit 50 qualified trials with zero cold calls:",
      impressions: 9000,
      clicks: 100,
      leads: 50,
      publishedDate: "2 weeks ago",
    },
  },
  {
    id: "eric-djavid",
    name: "Eric Djavid",
    role: "Sales Leader",
    niche: "B2B",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    followers: 40000,
    followersFormatted: "40K",
    fitScore: 94,
    verified: true,
    pricePerPost: 800,
    topics: ["B2B Pipeline", "Enterprise Sales", "RevOps", "Leadership"],
    samplePost: {
      content: "Most sales teams spend 80% of their time on the wrong leads. Here is the qualification matrix our enterprise teams use before setting up a single discovery call:",
      impressions: 20000,
      clicks: 350,
      leads: 80,
      publishedDate: "3 days ago",
    },
  },
  {
    id: "marina-panova",
    name: "Marina Panova",
    role: "Content Creator",
    niche: "B2B",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    followers: 34000,
    followersFormatted: "34K",
    fitScore: 89,
    verified: true,
    pricePerPost: 750,
    topics: ["LinkedIn Growth", "Executive Branding", "Demand Gen"],
    samplePost: {
      content: "How I build my 30-day LinkedIn content system: step-by-step swipe file for tech founders looking to convert readers into high-ticket pipeline.",
      impressions: 100000,
      clicks: 1600,
      leads: 320,
      publishedDate: "5 days ago",
    },
  },
  {
    id: "aya-bennani",
    name: "Aya Bennani",
    role: "GTM Strategy",
    niche: "GTM Strategy",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    followers: 18000,
    followersFormatted: "18K",
    fitScore: 88,
    verified: true,
    pricePerPost: 450,
    topics: ["PLG Motions", "B2B Positioning", "Product Marketing"],
    samplePost: {
      content: "Why PLG motions stall without executive creator distribution: analyzing 14 SaaS launches and what top 1% go-to-market teams do differently.",
      impressions: 16000,
      clicks: 210,
      leads: 42,
      publishedDate: "1 week ago",
    },
  },
  {
    id: "raphael-cohen",
    name: "Raphael Cohen",
    role: "Founder & SaaS",
    niche: "Founder & SaaS",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    followers: 28000,
    followersFormatted: "28K",
    fitScore: 93,
    verified: true,
    pricePerPost: 600,
    topics: ["Bootstrapping", "SaaS Metrics", "B2B Distribution"],
    samplePost: {
      content: "Zero to $1M ARR: The playbook we used for organic B2B virality without spending a dime on Google Adwords. Direct breakdown with conversion analytics.",
      impressions: 36000,
      clicks: 480,
      leads: 95,
      publishedDate: "4 days ago",
    },
  },
];

export const PLATFORM_STATS: MetricStat[] = [
  {
    id: "stat-impressions",
    label: "Impressions",
    value: "5M+",
    description: "High-intent B2B professionals reached across organic LinkedIn feeds",
    highlight: true,
  },
  {
    id: "stat-leads",
    label: "Leads Generated",
    value: "7K+",
    description: "Attributed qualified trials, demo requests, and inbound pipeline",
    highlight: true,
  },
  {
    id: "stat-creators",
    label: "Verified Creators",
    value: "479+",
    description: "Vetted industry practitioners with authentic executive followings",
  },
  {
    id: "stat-posts",
    label: "Posts Published",
    value: "1,200+",
    description: "High-performing native sponsored narratives executed seamlessly",
  },
];

export const CASE_STUDY_BLOGSEO: CaseStudy = {
  id: "blogseo-ai",
  company: "BlogSEO",
  logo: "BlogSEO AI",
  tagline: "Generating 125 qualified SaaS trials in 14 days",
  description:
    "BlogSEO partnered with Naano to identify niche AI workflow and content engineering creators. Through authentic, proof-driven carousel posts, they converted passive LinkedIn readers into active product trialists.",
  creatorsActivated: 2,
  qualifiedClicks: 725,
  trialsStarted: 125,
  cacReduction: "-64% vs Paid Social",
  conversionRate: "17.2% Click-to-Trial",
  quote: {
    text: "Naano delivered a lower CAC than our LinkedIn Ads campaigns while generating prospects who already understood our product philosophy before signing up.",
    author: "Marc K.",
    role: "Head of Growth, BlogSEO",
  },
};

export const TESTIMONIAL_DAVID: Testimonial = {
  quote:
    "Naano transformed how we approach B2B distribution. The ability to filter creators by verified fit score, approve briefs in one click, and measure real lead conversions gives our clients an undeniable competitive advantage.",
  author: "David Zmirov",
  role: "CEO",
  company: "Zmirov Communication",
  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  badge: "Verified Enterprise Partner",
};

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "self-serve",
    name: "Self-Serve",
    badge: "Pay As You Go",
    price: "€0",
    period: "/ month",
    description: "Perfect for fast-growing startups testing B2B creator distribution with complete autonomy.",
    features: [
      "Access to 479+ vetted B2B creators",
      "Algorithmic ICP fit scoring",
      "Standard 15% platform booking fee",
      "Direct in-app brief builder & messaging",
      "Real-time UTM & attribution tracking",
      "Community support",
    ],
    ctaText: "Get Started Free",
    ctaVariant: "secondary",
    popular: false,
  },
  {
    id: "managed",
    name: "Managed Campaigns",
    badge: "Enterprise Concierge",
    price: "Custom",
    period: "tailored quote",
    description: "Dedicated strategy, creator talent scouting, and end-to-end campaign execution for revenue teams.",
    features: [
      "Everything in Self-Serve",
      "Dedicated senior GTM strategist",
      "Custom creator curation & price negotiation",
      "Turnkey brief writing & creative copy review",
      "Guaranteed impression & pipeline SLAs",
      "Native CRM lead routing (HubSpot, Salesforce)",
      "Priority SLA & dedicated Slack channel",
    ],
    ctaText: "Book Strategy Call",
    ctaVariant: "primary",
    popular: true,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Select Voices",
    description:
      "Filter vetted B2B creators by niche, audience seniority, and verified fit percentage. No vanity metrics—only real industry authorities.",
    metric: "479+ Verified Voices",
  },
  {
    step: "02",
    title: "Craft Brief",
    description:
      "Submit standardized creative briefs with your key message, product assets, and unique tracking links. Creators produce authentic native posts.",
    metric: "Turnkey Approvals",
  },
  {
    step: "03",
    title: "Track Attributed Leads",
    description:
      "Monitor impressions, qualified outbound clicks, trial signups, and pipeline contribution with end-to-end performance attribution.",
    metric: "Real Revenue ROI",
  },
];

export const TRUST_LOGOS = [
  { name: "Zmirov Communication", label: "ZMIROV" },
  { name: "BlogSEO", label: "BlogSEO AI" },
  { name: "OutboundEngine", label: "OUTBOUND.IO" },
  { name: "SaaSscale", label: "SAASCALE" },
  { name: "RevScale", label: "REVSCALE" },
];
