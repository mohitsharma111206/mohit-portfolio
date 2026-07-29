const puppeteer = require('puppeteer-core');
const path = require('path');

(async () => {
  try {
    const browser = await puppeteer.launch({ executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' });
    const page = await browser.newPage();
    const filePath = path.resolve(__dirname, 'public', 'resume.html');
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
    
    // Inject some CSS to ensure it fits in 2 pages and looks professional
    await page.evaluate(() => {
      const style = document.createElement('style');
      style.innerHTML = `
        @page { size: A4; margin: 15mm; }
        body { font-size: 11pt !important; line-height: 1.4 !important; }
        h1 { font-size: 20pt !important; margin-bottom: 5px !important; padding-bottom: 5px !important; }
        h2 { font-size: 14pt !important; margin-top: 15px !important; margin-bottom: 8px !important; }
        .job { page-break-inside: avoid; margin-bottom: 15px !important; }
        ul { margin-top: 3px !important; margin-bottom: 5px !important; }
        li { margin-bottom: 3px !important; }
        .meta { margin-bottom: 15px !important; font-size: 10pt !important; }
      `;
      document.head.appendChild(style);
    });

    await page.pdf({
      path: path.resolve(__dirname, 'public', 'resume.pdf'),
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: false,
    });

    await browser.close();
    console.log("PDF generated successfully at public/resume.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
})();
