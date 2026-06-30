import type { MetadataRoute } from "next";
import {
  procedureCities,
  getAllCategoryIds,
  getProceduresByCategory,
} from "@/lib/data/procedures";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://medtour.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/procedures`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  for (const city of procedureCities) {
    entries.push({
      url: `${siteUrl}/procedures/${city}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    });

    for (const category of getAllCategoryIds()) {
      entries.push({
        url: `${siteUrl}/procedures/${city}/${category}`,
        lastModified,
        changeFrequency: "monthly",
        priority: 0.75,
      });

      for (const procedure of getProceduresByCategory(category)) {
        entries.push({
          url: `${siteUrl}/procedures/${city}/${category}/${procedure.id}`,
          lastModified,
          changeFrequency: "monthly",
          priority: 0.65,
        });
      }
    }
  }

  return entries;
}
