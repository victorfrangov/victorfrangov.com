const fs = require("fs");
const path = require("path");
const fetch = globalThis.fetch; // Node 18+ has fetch

const ICON_OVERRIDES = {
  java: "https://www.vectorlogo.zone/logos/java/java-icon.svg",
  microsoftazure: "https://www.vectorlogo.zone/logos/microsoft_azure/microsoft_azure-icon.svg",
};

const SLUGS = [
  "nextdotjs","react","typescript","javascript","html5","css","tailwindcss","bootstrap","webpack","npm",
  "nodedotjs","flask","python","java","postgresql","firebase","tensorflow","pytorch","numpy","pandas","nvidia","opengl","ollama","c","cplusplus",
  "git","githubactions","vercel","googlecloud","microsoftazure","postman","insomnia","anaconda","gnubash","prettier","json",
  // entries with noIcon (Matplotlib, SDL3) are skipped since they have no slug
];

(async () => {
  const outDir = path.join(__dirname, "..", "public", "icons");
  fs.mkdirSync(outDir, { recursive: true });

  const uniqueSlugs = Array.from(new Set(SLUGS));

  for (const slug of uniqueSlugs) {
    try {
      const src = ICON_OVERRIDES[slug] ?? `https://cdn.simpleicons.org/${slug}`;
      console.log("Fetching", slug, "from", src);
      const res = await fetch(src);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      // Ensure it is svg-ish
      if (!text.trim().startsWith("<svg") && !text.includes("<svg")) {
        console.warn(`Warning: fetched content for ${slug} doesn't look like SVG`);
      }
      const filePath = path.join(outDir, `${slug}.svg`);
      fs.writeFileSync(filePath, text, "utf8");
      console.log("Saved", filePath);
    } catch (err) {
      console.error("Failed to fetch", slug, err.message || err);
    }
  }

  console.log("Done.");
})();