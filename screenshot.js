import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport for a desktop view
  await page.setViewport({ width: 1400, height: 900 });
  
  await page.goto('http://localhost:5173');
  
  // Wait for initial render
  await new Promise(r => setTimeout(r, 2000));
  
  // Switch to bento layout
  await page.evaluate(() => {
    const select = document.querySelector('.layout-selector');
    if (select) {
        select.value = 'bento';
        select.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
  
  // Wait for re-render and layout shift
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ 
      path: '/Users/kausthubsatluri/.gemini/antigravity/brain/d63dc23b-5a40-4522-b41c-d609f1e1e0fd/bento-current.png',
      fullPage: true 
  });
  
  console.log("Screenshot taken.");
  await browser.close();
})();
