#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

const { inputs, sizes } = yargs
  .options({
    inputs: {
      alias: 'i',
      array: true,
      describe: 'File(s) to convert, e.g. icon.svg',
      demandOption: true,
    },
    sizes: {
      alias: 's',
      array: true,
      describe: 'Size(s) to generate, e.g. 32x32',
      demandOption: true,
    },
  })
  .check(({ inputs, sizes }) => validateInputs(inputs))
  .argv;

console.log(inputs, sizes);

function validateInputs(inputs) {
  const nonExistentFile = inputs.find(file => !fs.existsSync(file));

  if (nonExistentFile) {
    throw new Error(`Error: Could not find file "${nonExistentFile}"`);
  }

  return true;
}
