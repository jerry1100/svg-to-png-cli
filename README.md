# svg-to-png-cli
Dead simple SVG to PNG converter using Puppeteer

## Getting Started

### Installation
```sh
npm install -g svg-to-png-cli
```

### Usage
```sh
# One SVG, one size (square)
svg-to-png -i icon1.svg -s 16

# One SVG, one size (custom)
svg-to-png -i icon1.svg -s 16x32

# One SVG, multiple sizes
svg-to-png -i icon1.svg -s 16x32 32x64 64x128

# Multiple SVGs, multiple sizes
svg-to-png -i icon1.svg icon2.svg icon3.svg -s 16x16 32x32 64x64
```
