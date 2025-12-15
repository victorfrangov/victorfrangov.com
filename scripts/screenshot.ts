import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  await page.goto("https://victorfrangov.com", { waitUntil: "networkidle" });

  // Optional cleanup
  await page.addStyleTag({ content: `
    ::-webkit-scrollbar { display: none; }
    * { caret-color: transparent !important; }
  `});

  // Wait for hero to settle
  await page.waitForTimeout(800);

  await page.screenshot({
    path: "marketing-hero.png",
    fullPage: false,
    omitBackground: false
  });

  await browser.close();
}
run();