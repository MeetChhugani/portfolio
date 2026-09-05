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
  title: "Meet Chhugani | Python Backend Developer & AI Engineer",
  description:
    "Portfolio of Meet Chhugani — Python Developer specializing in FastAPI backend microservices, PostgreSQL databases, Docker containerization, and production AI integrations.",
  keywords: [
    "Meet Chhugani",
    "Python Developer",
    "Backend Developer",
    "FastAPI",
    "Django",
    "PostgreSQL",
    "Docker",
    "Machine Learning",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Meet Chhugani", url: "https://github.com/MeetChhugani" }],
  creator: "Meet Chhugani",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Meet Chhugani | Python Backend Developer & AI Engineer",
    description:
      "Python Developer & AI Engineer specializing in FastAPI async microservices, PostgreSQL, Docker, Groq LLaMA LLM pipelines, and SHAP explainable ML.",
    url: "https://meetchhugani.vercel.app",
    siteName: "Meet Chhugani Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meet Chhugani | Python Developer",
    description:
      "Python Backend Developer & AI Engineer specializing in FastAPI, PostgreSQL, Docker, and ML systems.",
    creator: "@MeetChhugani",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meet Chhugani",
  jobTitle: "Python Backend Developer & AI Engineer",
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
    "Python",
    "FastAPI",
    "Django",
    "PostgreSQL",
    "Redis",
    "Docker",
    "Machine Learning",
    "Scikit-learn",
    "XGBoost",
    "SHAP",
    "REST APIs",
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
