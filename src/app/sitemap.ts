import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://meetchhugani.vercel.app",
      lastModified: new Date("2026-07-22"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];
}
