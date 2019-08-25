#!/usr/bin/env node

const yargs = require('yargs');
const path = require('path');

const { sizes, input } = yargs
  .alias('input', 'i')
  .array('input')
  .alias('sizes', 's')
  .array('sizes')
  .argv;

console.log(input, sizes);
