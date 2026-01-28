---
name: favicon
description: Generate a complete favicon set from any logo image with PWA support, all icon sizes, manifest files, and framework-specific integration
---

# Favicon Generator

Generate a complete favicon set from any logo image with PWA support and framework integration.

## Instructions

When the user invokes this skill, follow this flow:

---

## Step 0: Ask for Logo Image (FIRST)

**IMPORTANT: Always ask this first before any detection or generation.**

Ask the user:
```
What is the path to your logo file?

Examples:
- public/logo.png
- src/assets/logo.svg
- ./logo.png

Supported formats: SVG, PNG, JPG, JPEG, WebP, AVIF, GIF, TIFF
Recommended: SVG or PNG (512x512 minimum) for best quality
```

**Validate the input:**
1. Check if file exists at the provided path
2. Check if format is supported
3. If file not found, suggest common locations:
   - `public/logo.png`
   - `src/assets/logo.png`
   - `assets/logo.png`
   - `static/logo.png`

**If validation fails**, ask again:
```
File not found at [path]. Please provide a valid path to your logo file.
```

**Once logo is confirmed**, proceed to detection.

---

## Step 1: Framework & Environment Detection (Auto)

Run this after logo path is confirmed.

### Detect Framework
Read `package.json` and detect:

```
1. NEXT.JS     → "next" exists
2. REACT+VITE  → "react" + "vite" exist
3. REACT+CRA   → "react" + "react-scripts" exist
4. ANGULAR     → "@angular/core" exists
5. VUE         → "vue" exists
6. SVELTE      → "svelte" exists
7. NUXT        → "nuxt" exists
8. ASTRO       → "astro" exists
9. GATSBY      → "gatsby" exists
10. PLAIN HTML → No framework detected
```

### Detect Output Directory
Based on framework, determine favicon output path:

| Framework | Output Directory |
|-----------|-----------------|
| Next.js | `public/` or `app/` (App Router) |
| React (Vite/CRA) | `public/` |
| Angular | `src/assets/` |
| Vue/Nuxt | `public/` or `static/` |
| Svelte/SvelteKit | `static/` |
| Astro | `public/` |
| Gatsby | `static/` |
| Plain HTML | `./` or `assets/` |

### Detect Available Tools
Check which tools are available for image processing:

```bash
# Check in order of preference
which sharp-cli || which convert || which magick || which sips
npm list sharp || npm list jimp
```

### Detect Design System Colors
Look for theme colors in order:

1. `tailwind.config.js` / `tailwind.config.ts` → extract `theme.colors`
2. `src/app/globals.css` or `styles/globals.css` → extract CSS variables
3. `src/styles/variables.scss` → extract SCSS variables
4. Ask user if not found

Report detection results:
```
Detected Environment:
- Framework: [Framework Name]
- Output: [Directory Path]
- Tools: [Available Tools]
- Theme Color: [Extracted Color or "Not found - will ask"]
```

---

## Step 2: Ask Configuration Questions

### Theme Color (if not detected)
```
What theme color should be used?
1. Extract from logo (auto-detect dominant color)
2. Enter hex code manually
3. Use default (#111111)
```

### Dark Mode Variant
```
Do you need a dark mode favicon variant?
1. Yes - Generate separate dark mode set
2. No - Single favicon for all modes
```

If yes, ask:
```
Provide dark mode logo path (or press enter to auto-invert):
```

### App Name (for manifest)
```
What is your app name? (for PWA manifest)
Default: [detected from package.json name field]
```

---

## Step 3: Generate Favicons (After user confirms)

### Size Matrix (Comprehensive)

Generate these sizes:

| Size | Filename | Purpose |
|------|----------|---------|
| 16x16 | `favicon-16x16.png` | Browser tab (standard) |
| 32x32 | `favicon-32x32.png` | Browser tab (retina) |
| 48x48 | `favicon-48x48.png` | Windows site icon |
| 64x64 | `favicon-64x64.png` | Windows site icon |
| 128x128 | `favicon-128x128.png` | Chrome Web Store |
| 180x180 | `apple-touch-icon.png` | iOS home screen |
| 192x192 | `android-chrome-192x192.png` | Android home screen |
| 256x256 | `favicon-256x256.png` | Large icon uses |
| 512x512 | `android-chrome-512x512.png` | Android splash screen |
| 512x512 | `icon-512x512-maskable.png` | PWA maskable icon |

Also generate:
| File | Purpose |
|------|---------|
| `favicon.ico` | Legacy browsers (contains 16, 32, 48) |
| `safari-pinned-tab.svg` | Safari pinned tab (monochrome SVG) |
| `mstile-150x150.png` | Windows tile |

### Generation Methods

#### Method 1: Sharp CLI (Preferred)
```bash
# Install if needed
npm install -g sharp-cli

# Generate PNGs
sharp -i logo.png -o favicon-16x16.png resize 16 16
sharp -i logo.png -o favicon-32x32.png resize 32 32
sharp -i logo.png -o favicon-48x48.png resize 48 48
sharp -i logo.png -o favicon-64x64.png resize 64 64
sharp -i logo.png -o favicon-128x128.png resize 128 128
sharp -i logo.png -o apple-touch-icon.png resize 180 180
sharp -i logo.png -o android-chrome-192x192.png resize 192 192
sharp -i logo.png -o favicon-256x256.png resize 256 256
sharp -i logo.png -o android-chrome-512x512.png resize 512 512
sharp -i logo.png -o mstile-150x150.png resize 150 150
```

#### Method 2: Node.js Script (Sharp)
```javascript
// scripts/generate-favicons.js
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = process.argv[2] || 'logo.png';
const OUTPUT_DIR = process.argv[3] || 'public';

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon-48x48.png' },
  { size: 64, name: 'favicon-64x64.png' },
  { size: 128, name: 'favicon-128x128.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 256, name: 'favicon-256x256.png' },
  { size: 512, name: 'android-chrome-512x512.png' },
  { size: 150, name: 'mstile-150x150.png' },
];

async function generateFavicons() {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const input = sharp(INPUT);

  for (const { size, name } of sizes) {
    await input
      .clone()
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(path.join(OUTPUT_DIR, name));

    console.log(`Generated: ${name}`);
  }

  // Generate maskable icon (with padding)
  await input
    .clone()
    .resize(410, 410, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 51, bottom: 51, left: 51, right: 51,
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .png()
    .toFile(path.join(OUTPUT_DIR, 'icon-512x512-maskable.png'));

  console.log('Generated: icon-512x512-maskable.png (maskable)');

  console.log('\nAll favicons generated successfully!');
}

generateFavicons().catch(console.error);
```

#### Method 3: ImageMagick
```bash
# Generate PNGs
convert logo.png -resize 16x16 favicon-16x16.png
convert logo.png -resize 32x32 favicon-32x32.png
convert logo.png -resize 48x48 favicon-48x48.png
convert logo.png -resize 180x180 apple-touch-icon.png
convert logo.png -resize 192x192 android-chrome-192x192.png
convert logo.png -resize 512x512 android-chrome-512x512.png
convert logo.png -resize 150x150 mstile-150x150.png

# Generate ICO (multi-size)
convert logo.png -define icon:auto-resize=64,48,32,16 favicon.ico
```

#### Method 4: macOS sips (Fallback)
```bash
# For macOS without other tools
sips -z 16 16 logo.png --out favicon-16x16.png
sips -z 32 32 logo.png --out favicon-32x32.png
sips -z 180 180 logo.png --out apple-touch-icon.png
sips -z 192 192 logo.png --out android-chrome-192x192.png
sips -z 512 512 logo.png --out android-chrome-512x512.png
```

### Generate favicon.ico

```javascript
// Using sharp + ico-endec
const sharp = require('sharp');
const { encode } = require('ico-endec');
const fs = require('fs');

async function generateIco(inputPath, outputPath) {
  const sizes = [16, 32, 48];
  const images = await Promise.all(
    sizes.map(size =>
      sharp(inputPath)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  const ico = encode(images.map((buffer, i) => ({
    width: sizes[i],
    height: sizes[i],
    data: buffer
  })));

  fs.writeFileSync(outputPath, ico);
}
```

### Generate Safari Pinned Tab SVG

If input is SVG, convert to monochrome:
```javascript
// Convert SVG to monochrome for Safari pinned tab
const fs = require('fs');

function createSafariPinnedTab(inputSvg, outputPath, color = '#111111') {
  let svg = fs.readFileSync(inputSvg, 'utf8');

  // Remove fill colors and set to currentColor
  svg = svg.replace(/fill="[^"]*"/g, `fill="${color}"`);
  svg = svg.replace(/stroke="[^"]*"/g, `stroke="${color}"`);

  fs.writeFileSync(outputPath, svg);
}
```

---

## Step 4: Generate Configuration Files

### site.webmanifest
```json
{
  "name": "[App Name]",
  "short_name": "[App Name]",
  "description": "[App Description]",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "[Theme Color]",
  "icons": [
    {
      "src": "/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/android-chrome-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

### browserconfig.xml (Windows)
```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
      <square150x150logo src="/mstile-150x150.png"/>
      <TileColor>[Theme Color]</TileColor>
    </tile>
  </msapplication>
</browserconfig>
```

---

## Step 5: Framework-Specific Integration

### Next.js (App Router)

Create/update `src/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '[App Name]',
  description: '[App Description]',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '[Theme Color]' },
    ],
  },
  manifest: '/site.webmanifest',
  themeColor: '[Theme Color]',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '[App Name]',
  },
};
```

### Next.js (Pages Router)

Create/update `pages/_document.tsx`:
```tsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="[Theme Color]" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="[Theme Color]" />
        <meta name="msapplication-TileColor" content="[Theme Color]" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### React (Vite/CRA)

Update `index.html`:
```html
<head>
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="shortcut icon" href="/favicon.ico" />

  <!-- Apple -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

  <!-- Safari Pinned Tab -->
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="[Theme Color]" />

  <!-- PWA -->
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="[Theme Color]" />

  <!-- Windows -->
  <meta name="msapplication-TileColor" content="[Theme Color]" />
  <meta name="msapplication-config" content="/browserconfig.xml" />
</head>
```

### Angular

Update `angular.json`:
```json
{
  "projects": {
    "[project-name]": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "src/assets/favicons/",
                "output": "/"
              }
            ]
          }
        }
      }
    }
  }
}
```

Update `src/index.html`:
```html
<head>
  <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png" />
  <link rel="manifest" href="site.webmanifest" />
  <meta name="theme-color" content="[Theme Color]" />
</head>
```

### Vue / Nuxt

Update `index.html` or `nuxt.config.ts`:
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      meta: [
        { name: 'theme-color', content: '[Theme Color]' },
        { name: 'msapplication-TileColor', content: '[Theme Color]' },
      ],
    },
  },
});
```

### Svelte / SvelteKit

Update `src/app.html`:
```html
<head>
  <link rel="icon" type="image/png" sizes="32x32" href="%sveltekit.assets%/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="%sveltekit.assets%/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="%sveltekit.assets%/apple-touch-icon.png" />
  <link rel="manifest" href="%sveltekit.assets%/site.webmanifest" />
  <meta name="theme-color" content="[Theme Color]" />
</head>
```

### Plain HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="shortcut icon" href="/favicon.ico">

  <!-- Apple Touch Icon -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

  <!-- Safari Pinned Tab -->
  <link rel="mask-icon" href="/safari-pinned-tab.svg" color="[Theme Color]">

  <!-- PWA Manifest -->
  <link rel="manifest" href="/site.webmanifest">

  <!-- Theme Color -->
  <meta name="theme-color" content="[Theme Color]">
  <meta name="theme-color" content="[Dark Theme Color]" media="(prefers-color-scheme: dark)">

  <!-- Windows -->
  <meta name="msapplication-TileColor" content="[Theme Color]">
  <meta name="msapplication-config" content="/browserconfig.xml">

  <title>[App Name]</title>
</head>
```

---

## Step 6: Dark Mode Variant (Optional)

If user requested dark mode support:

### Generate Dark Mode Icons
```javascript
// Generate inverted/dark versions
const sharp = require('sharp');

async function generateDarkFavicon(input, output) {
  await sharp(input)
    .negate({ alpha: false }) // Invert colors, keep transparency
    .resize(32, 32)
    .toFile(output);
}
```

### Add CSS Media Query
```html
<link rel="icon" href="/favicon-32x32.png" media="(prefers-color-scheme: light)">
<link rel="icon" href="/favicon-32x32-dark.png" media="(prefers-color-scheme: dark)">
```

### JavaScript Toggle (Alternative)
```javascript
// Dynamic favicon based on color scheme
function updateFavicon() {
  const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href = isDark ? '/favicon-dark.png' : '/favicon.png';
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
updateFavicon();
```

---

## Output Format

After generating favicons, provide:

```
Favicon Generation Complete!

Framework: [Detected Framework]
Theme Color: [Color Used]
Output Directory: [Path]

Generated Files:
├── favicon.ico (16, 32, 48)
├── favicon-16x16.png
├── favicon-32x32.png
├── favicon-48x48.png
├── favicon-64x64.png
├── favicon-128x128.png
├── favicon-256x256.png
├── apple-touch-icon.png (180x180)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── icon-512x512-maskable.png
├── safari-pinned-tab.svg
├── mstile-150x150.png
├── site.webmanifest
└── browserconfig.xml

Framework Integration:
- [Updated file with meta tags]

Next Steps:
1. Verify icons display correctly in browser
2. Test PWA installation on mobile
3. Validate with https://realfavicongenerator.net/favicon_checker
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Icons look blurry | Use SVG source or higher resolution PNG (512px+) |
| maskable icon cut off | Ensure 20% safe zone padding |
| favicon.ico not showing | Clear browser cache, check path |
| PWA not installable | Verify manifest paths are correct |
| Colors wrong in Safari | Safari pinned tab requires monochrome SVG |

### Validation Tools
- [RealFaviconGenerator Checker](https://realfavicongenerator.net/favicon_checker)
- [PWA Builder](https://www.pwabuilder.com/)
- Chrome DevTools → Application → Manifest
