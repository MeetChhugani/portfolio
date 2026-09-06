import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { RoleProvider } from "@/context/RoleContext";

const outfit = Space_Grotesk({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const plusJakarta = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const shareTech = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://meetchhugani.vercel.app"),
  title: "Meet Chhugani | AI/ML Engineer",
  description:
    "AI/ML Engineer building intelligent applications with Generative AI, RAG, NLP and Machine Learning.",
  keywords: [
    "Meet Chhugani",
    "AI/ML Engineer",
    "Generative AI",
    "RAG",
    "NLP",
    "Machine Learning",
    "Python",
    "FastAPI",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Meet Chhugani", url: "https://github.com/MeetChhugani" }],
  creator: "Meet Chhugani",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meet Chhugani | AI/ML Engineer",
    description: "AI/ML Engineer building intelligent AI applications.",
    url: "https://meetchhugani.vercel.app/",
    siteName: "Meet Chhugani Portfolio",
    locale: "en_US",
    type: "website",
    images: ["https://meetchhugani.vercel.app/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Chhugani | AI/ML Engineer",
    description: "AI/ML Engineer building intelligent AI applications.",
    creator: "@MeetChhugani",
    images: ["https://meetchhugani.vercel.app/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meet Chhugani",
  jobTitle: "AI/ML Engineer",
  url: "https://meetchhugani.vercel.app",
  sameAs: [
    "https://github.com/MeetChhugani",
    "https://linkedin.com/in/meet-chhugani",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Gyanmanjari Innovative University",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "Generative AI",
    "RAG",
    "NLP",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Docker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${plusJakarta.variable} ${shareTech.variable} antialiased selection:bg-emerald-500/20 selection:text-emerald-300`}
      >
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  );
}
