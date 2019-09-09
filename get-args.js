const yargs = require('yargs');
const path = require('path');
const fs = require('fs');

module.exports = yargs
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
      describe: 'Size(s) to generate, e.g. 32, or 32x48',
      demandOption: true,
    },
  })
  .coerce('inputs', inputs => inputs.map(validateAndTransformFile))
  .coerce('sizes', sizes => sizes.map(validateAndTransformSize))
  .argv;

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

  if (width === undefined) {
    throw new Error('Error: Size needs at least a width');
  }

  if (!isValidSize(width)) {
    throw new Error(`Error: Invalid width for size "${size}"`);
  }

  if (height !== undefined && !isValidSize(height)) {
    throw new Error(`Error: Invalid height for size "${size}"`);
  }

  return { width, height };
}

function isValidSize(number) {
  return !isNaN(number) && number > 0;
}
