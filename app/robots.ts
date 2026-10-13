import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Personal, per-visitor pages and API routes - nothing for search engines to index.
      disallow: ["/cart", "/checkout", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
