# svg-to-png-cli
Dead simple SVG to PNG converter using Puppeteer

## Getting Started

### Installation
```sh
npm install -g svg-to-png-cli
```

### Usage
```sh
# One SVG, one dimension
svg-to-png -i icon1.svg -s 16x16

# One SVG, multiple dimensions
svg-to-png -i icon1.svg -s 16x16 32x32 64x64

# Multiple SVGs, multiple dimensions
svg-to-png -i icon1.svg icon2.svg icon3.svg -s 16x16 32x32 64x64
```
