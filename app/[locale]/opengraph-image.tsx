import { ImageResponse } from "next/og"

export const alt = "Victor Frangov, full stack developer and EPFL computer science student"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const subtitle =
    locale === "fr"
      ? "Développeur full stack · Étudiant en informatique à l'EPFL"
      : "Full stack developer · Computer Science student at EPFL"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, opacity: 0.6 }}>VICTORFRANGOV.COM</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.95 }}>VICTOR</div>
          <div style={{ fontSize: 132, fontWeight: 800, letterSpacing: -6, lineHeight: 0.95 }}>FRANGOV</div>
          <div style={{ fontSize: 34, marginTop: 36, opacity: 0.8 }}>{subtitle}</div>
        </div>
      </div>
    ),
    size,
  )
}
