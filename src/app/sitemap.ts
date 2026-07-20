import type { MetadataRoute } from "next";

// Canonical host. Must stay in sync with `metadataBase` in layout.tsx and the
// live redirect target: inor.uk issues a 308 to www.inor.uk, so www is the
// single canonical origin Google should see.
const siteUrl = "https://www.inor.uk";

// Single-page marketing site: the homepage is the only indexable URL (the
// Services / Careers / Contact sections are in-page anchors, not separate
// routes, so they are not listed as distinct sitemap entries).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
