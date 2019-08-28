#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const { inputs, sizes } = require('./get-args');

inputs.forEach(async file => {
  const browser = await puppeteer.launch();
  await Promise.all(sizes.map(dimensions => takeScreenshot(browser, file, dimensions)));
  await browser.close();
});

async function takeScreenshot(browser, file, { width, height }) {
  const outPath = path.join(__dirname, `${path.basename(file, '.svg')}_${width}x${height}.png`);
  const page = await browser.newPage();
  await page.goto(`file://${file}`);
  await page.setViewport({ width, height });
  await page.screenshot({ path: outPath, omitBackground: true });
}
