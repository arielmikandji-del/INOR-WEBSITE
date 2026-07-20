import type { MetadataRoute } from "next";

const siteUrl = "https://www.inor.uk";

// Allow all crawlers everywhere and point them at the sitemap. Nothing on this
// single-page site is private, so there are no disallow rules.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
