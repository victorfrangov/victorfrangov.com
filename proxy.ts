import createMiddleware from "next-intl/middleware"

const intlMiddleware = createMiddleware({
    locales: ["en", "fr"],
    defaultLocale: "en",
})

// Next.js 16 proxy convention: export a single default `proxy(request)`
export default function proxy(request: Request) {
    const authHeader = request.headers.get("X-Custom-Auth")
    console.log("Auth Header:", req.headers['your-custom-header-name']);
    if (authHeader !== process.env.CLOUDFLARE_SECRET_KEY) {
        return new Response("Unauthorized Access", { status: 401 })
    }

    return intlMiddleware(request as any)
}

export const config = {
    // Exclude api, _next, _vercel and any file with an extension (e.g., .jpg, .css)
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}