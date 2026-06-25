import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://medtour.kz";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const sections = [
    "",
    "#why-kazakhstan",
    "#platform",
    "#search",
    "#concierge",
    "#treatments",
    "#partners",
    "#hotels",
    "#packages",
    "#tourism",
    "#how-it-works",
    "#contact-center",
  ];

  return sections.map((path) => ({
    url: `${siteUrl}/${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
