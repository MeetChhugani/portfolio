import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "./drawer-styles.css";
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
  title: "Meet Chhugani | AI Engineer · Applied ML",
  description:
    "Portfolio of Meet Chhugani — AI Engineer building applied ML, RAG and LLM systems in Python, from explainable models and evaluation pipelines to production inference.",
  keywords: [
    "Meet Chhugani",
    "AI Engineer",
    "Applied ML",
    "Machine Learning Engineer",
    "RAG",
    "LLM",
    "PyTorch",
    "Python",
    "AI Portfolio",
  ],
  authors: [{ name: "Meet Chhugani", url: "https://github.com/MeetChhugani" }],
  creator: "Meet Chhugani",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meet Chhugani | AI Engineer · Applied ML",
    description:
      "AI Engineer specializing in applied ML, RAG pipelines, LLM applications, explainable models and production Python inference.",
    url: "https://meetchhugani.vercel.app",
    siteName: "Meet Chhugani Portfolio",
    locale: "en_US",
    type: "website",
    images: ["https://meetchhugani.vercel.app/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Chhugani | AI Engineer",
    description:
      "AI Engineer building applied ML, RAG and LLM systems in Python — explainable models, evaluation and production inference.",
    creator: "@MeetChhugani",
    images: ["https://meetchhugani.vercel.app/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meet Chhugani",
  jobTitle: "AI Engineer",
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
    "Machine Learning",
    "PyTorch",
    "Scikit-learn",
    "XGBoost",
    "SHAP",
    "RAG",
    "LLM Applications",
    "Natural Language Processing",
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
    <html
      lang="en"
      className={`${outfit.variable} ${plusJakarta.variable} ${shareTech.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased selection:bg-[#d4ff24] selection:text-[#030407]"
      >
        <RoleProvider>{children}</RoleProvider>
      </body>
    </html>
  );
}
