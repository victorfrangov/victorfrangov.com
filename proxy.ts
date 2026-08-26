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
            const acceptLang = request.headers.get("accept-language") || ""
            const isFr = acceptLang.toLowerCase().includes("fr")
            return NextResponse.rewrite(new URL(isFr ? "/fr/cv" : "/en/cv", request.url))
        }
        if (url.pathname === "/fr" || url.pathname === "/fr/") {
            return NextResponse.redirect(new URL("/cv_fr.pdf", request.url))
        }
        if (url.pathname === "/en" || url.pathname === "/en/") {
            return NextResponse.redirect(new URL("/cv_en.pdf", request.url))
        }
    }

    return intlMiddleware(request as any)
}

export const config = {
    // Exclude api, _next, _vercel and any file with an extension (e.g., .jpg, .css, .pdf)
    matcher: ['/((?!api/stats|api|_next|_vercel|.*\\..*).*)'],
}