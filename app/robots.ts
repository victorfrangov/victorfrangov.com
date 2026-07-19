import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/static/", "/api/"],
      },
    ],
    sitemap: "https://victorfrangov.com/sitemap.xml",
    host: "https://victorfrangov.com",
  }
}
