const fs = require("fs");
const path = require("path");

const inPath = path.join(process.cwd(), "public", "icons", "sprite.svg");
const outDir = path.join(process.cwd(), "app", "generated");
const outPath = path.join(outDir, "sprite.ts");

const svg = fs.existsSync(inPath) ? fs.readFileSync(inPath, "utf8") : "";
const content = `const sprite: string = ${JSON.stringify(svg)};\nexport default sprite;\n`;

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, content, "utf8");
console.log("Wrote", outPath);