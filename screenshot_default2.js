import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1400, height: 900 });
  await page.goto('http://localhost:5173');
  await new Promise(r => setTimeout(r, 2000));
  
  await page.evaluate(() => {
    // Select the layout selector (it might be the second theme-selector now)
    const selects = document.querySelectorAll('.theme-selector');
    for (let select of selects) {
      if (select.querySelector('option[value="default"]')) {
        select.value = 'default';
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
  
  await new Promise(r => setTimeout(r, 1000));
  
  await page.screenshot({ 
      path: '/Users/kausthubsatluri/.gemini/antigravity/brain/dc4101c8-37b2-4392-b545-3e0615c0960e/default-layout-fixed.png',
      fullPage: true 
  });
  
  console.log('Screenshot taken.');
  await browser.close();
})();
