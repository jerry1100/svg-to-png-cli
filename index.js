#!/usr/bin/env node

const puppeteer = require('puppeteer');
const path = require('path');
const { inputs, sizes } = require('./get-args');

inputs.forEach(async file => {
  const browser = await puppeteer.launch();
  await Promise.all(sizes.map(dimensions => generatePNG(browser, file, dimensions)));
  await browser.close();
});

async function generatePNG(browser, file, { width, height }) {
  const basename = path.basename(file, '.svg');
  const dimensions = height === undefined ? width : `${width}x${height}`;
  const pngName = `${basename}${dimensions}.png`;

  const page = await browser.newPage();
  await page.goto(`file://${file}`);
  await page.setViewport({ width, height: height === undefined ? width : height });
  await page.screenshot({ path: pngName, omitBackground: true });
}
