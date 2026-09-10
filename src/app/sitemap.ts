import { MetadataRoute } from "next";
import { DATA } from "@/data/resume";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DATA.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${DATA.url}/books`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${DATA.url}/philosophy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...["enlyghten", "popcorns", "vibe2value"].map((slug) => ({
      url: `${DATA.url}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
  ];
}
