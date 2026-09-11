import type { Metadata } from "next";
import "./globals.css";
import { CampaignProvider } from "@/context/CampaignContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://naano.com"),
  title: {
    default: "Naano — The B2B Influencer Performance Network",
    template: "%s | Naano",
  },
  description:
    "Scale qualified B2B pipeline with verified LinkedIn creator voices. Transparent performance pricing, verified algorithmic fit, and direct revenue attribution.",
  keywords: [
    "B2B influencer marketing",
    "LinkedIn creators",
    "B2B SaaS growth",
    "influencer performance network",
    "creator outbound",
    "demand generation",
    "pipeline attribution",
  ],
  authors: [{ name: "Naano Technologies" }],
  creator: "Naano",
  publisher: "Naano",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://naano.com",
  },
  openGraph: {
    title: "Naano — The B2B Influencer Performance Network",
    description:
      "Scale qualified B2B pipeline with verified industry creators. Transparent pricing, verified voices, and direct revenue attribution.",
    url: "https://naano.com",
    siteName: "Naano",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Naano B2B Influencer Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naano — The B2B Influencer Performance Network",
    description:
      "Turn trusted B2B voices into qualified pipeline. Transparent pricing, verified creator fit, and attributed leads.",
    images: ["https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80"],
    creator: "@naano_app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Naano",
  url: "https://naano.com",
  logo: "https://naano.com/logo.png",
  description: "The B2B Influencer Performance Network powering demand generation for high-growth tech companies.",
  sameAs: ["https://www.linkedin.com/company/naano-app"],
};

const jsonLdApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Naano Platform",
  operatingSystem: "Web-based",
  applicationCategory: "BusinessApplication",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "EUR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "128",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
        />
      </head>
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <CampaignProvider>{children}</CampaignProvider>
      </body>
    </html>
  );
}
