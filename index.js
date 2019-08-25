#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

const { inputs, sizes } = yargs
  .options({
    inputs: {
      alias: 'i',
      array: true,
      type: 'string',
      describe: 'File(s) to convert, e.g. icon.svg',
      demandOption: true,
    },
    sizes: {
      alias: 's',
      array: true,
      type: 'string',
      describe: 'Size(s) to generate, e.g. 32x32',
      demandOption: true,
    },
  })
  .coerce('inputs', inputs => inputs.map(validateAndTransformFile))
  .coerce('sizes', sizes => sizes.map(validateAndTransformSize))
  .argv;

console.log(inputs, sizes);

function validateAndTransformFile(file) {
  const resolvedFileName = path.resolve(file);

  if (!fs.existsSync(resolvedFileName)) {
    throw new Error(`Error: Could not find file "${resolvedFileName}"`);
  }

  if (path.extname(resolvedFileName) !== '.svg') {
    throw new Error(`Error: File is not an SVG "${resolvedFileName}"`);
  }

  return path.resolve(resolvedFileName);
}

function validateAndTransformSize(size) {
  const [width, height] = size.split('x').map(dimension => Number(dimension));

  if (width === undefined || height === undefined) {
    throw new Error(`Error: Missing width or height for size "${size}"`);
  }

  if (isNaN(width) || isNaN(height) || width < 1 || height < 1) {
    throw new Error(`Error: Invalid width or height for size "${size}"`);
  }

  return [width, height];
}
