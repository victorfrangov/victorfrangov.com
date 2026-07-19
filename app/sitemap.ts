import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://victorfrangov.com"
  const locales = ["en", "fr"]
  const now = new Date()

  return locales.map((locale) => ({
    url: `${base}/${locale}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 1,
  }))
}