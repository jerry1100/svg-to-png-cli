#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');

const { sizes, input } = yargs
  .options({
    input: {
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
  .argv;

console.log(input, sizes);
