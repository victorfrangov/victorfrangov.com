import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["en", "fr"],
  defaultLocale: "en",
})

export const config = {
  // Exclude api, _next, _vercel and any file with an extension (e.g., .jpg, .css)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}