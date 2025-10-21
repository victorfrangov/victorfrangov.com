import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => {
  const selected = locale ?? 'en' // fallback to avoid ./undefined.json
  return {
    locale: selected,
    messages: (await import(`../messages/${selected}.json`)).default,
  }
})