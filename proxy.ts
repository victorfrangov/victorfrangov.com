import { NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

const intlMiddleware = createMiddleware({
    locales: ["en", "fr"],
    defaultLocale: "en",
})

// Next.js 16 proxy convention: export a single default `proxy(request)`
export default function proxy(request: Request) {
    const host = request.headers.get("host") || ""
    const url = new URL(request.url)

    // Handle requests to cv.victorfrangov.com subdomain
    if (host.startsWith("cv.")) {
        if (url.pathname === "/" || url.pathname === "") {
            return NextResponse.rewrite(new URL("/index.html", request.url))
        }
        if (url.pathname === "/fr" || url.pathname === "/fr/") {
            url.pathname = "/cv_fr.pdf"
            return NextResponse.redirect(url)
        }
        if (url.pathname === "/en" || url.pathname === "/en/") {
            url.pathname = "/cv_en.pdf"
            return NextResponse.redirect(url)
        }
    }

    return intlMiddleware(request as any)
}

export const config = {
    // Exclude api, _next, _vercel and any file with an extension (e.g., .jpg, .css, .pdf)
    matcher: ['/((?!api/stats|api|_next|_vercel|.*\\..*).*)'],
}