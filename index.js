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
  .check(({ inputs, sizes }) => validateInputs(inputs) && validateSizes(sizes))
  .argv;

console.log(inputs, sizes);

function validateInputs(inputs) {
  const nonExistentFile = inputs.find(file => !fs.existsSync(file));

  if (nonExistentFile) {
    throw new Error(`Error: Could not find file "${nonExistentFile}"`);
  }

  return true;
}

function validateSizes(sizes) {
  const splitSizes = sizes.map(size => size.split('x'));

  const sizeWithMissingDimensions = splitSizes.find(size => size.length < 2);

  if (sizeWithMissingDimensions) {
    throw new Error(`Error: Missing width or height for size "${sizeWithMissingDimensions}"`);
  }

  const sizeWithInvalidDimensions = splitSizes.find(dimensions => !isValidDimensions(dimensions));

  if (sizeWithInvalidDimensions) {
    throw new Error(`Error: Invalid width or height for size "${sizeWithInvalidDimensions.join('x')}"`);
  }

  return true;
}

function isValidDimensions([width, height]) {
  return !isNaN(width) && !isNaN(height) && Number(width) > 0 && Number(height) > 0;
}
