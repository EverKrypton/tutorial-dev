const { chromium } = require("playwright-core");

(async () => {
  const b = await chromium.launch({ executablePath: "/root/.cache/ms-playwright/chromium-1248/chrome-linux64/chrome", args: ["--no-sandbox"] });

  const c = await b.newPage();
  await c.goto(`${process.env.SITE_URL}/descargas/_portada.html`, { waitUntil: "networkidle" });
  await c.emulateMedia({ media: "print" });
  await c.waitForTimeout(400);
  await c.pdf({ path: process.env.PDF_COVER, format: "A4", printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } });
  await c.close();

  const p = await b.newPage();
  await p.goto(`${process.env.SITE_URL}/descargas/_libro.html`, { waitUntil: "networkidle" });
  await p.emulateMedia({ media: "print" });
  await p.waitForTimeout(700);
  await p.pdf({
    path: process.env.PDF_BODY,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `<div style="width:100%;font-size:7pt;color:#8b919b;font-family:Helvetica,Arial,sans-serif;padding:0 16mm;display:flex;justify-content:space-between;"><span>tutorial.dev</span><span style="font-family:Courier,monospace">curso completo · 2026</span></div>`,
    footerTemplate: `<div style="width:100%;font-size:7pt;color:#8b919b;font-family:Helvetica,Arial,sans-serif;padding:0 16mm;display:flex;justify-content:space-between;"><span>De la primera etiqueta al primer deploy</span><span style="font-family:Courier,monospace"><span class="pageNumber"></span> / <span class="totalPages"></span></span></div>`,
    margin: { top: "18mm", bottom: "20mm", left: "16mm", right: "16mm" },
  });
  await b.close();
})();
