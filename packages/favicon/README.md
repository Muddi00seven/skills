# @cubealabs/favicon

🎨 **Generate complete favicon sets from any logo with PWA support**

Automatically detect your framework and generate all favicon sizes, PWA manifests, and integration code. Supports Next.js, React, Angular, Vue, Svelte, and more.

## Features

- ✅ **All Icon Sizes**: 16x16 to 512x512, ICO, Apple Touch, Android Chrome
- ✅ **PWA Support**: Web manifest, maskable icons, theme colors
- ✅ **Framework Detection**: Auto-detects Next.js, React, Vue, Angular, etc.
- ✅ **Dark Mode**: Optional dark mode favicon variants
- ✅ **Safari Pinned Tab**: Monochrome SVG generation
- ✅ **Windows Tiles**: Microsoft browserconfig.xml

## Installation

```bash
npm install @cubealabs/favicon
```

## Usage with Claude Code

This is a Claude Code skill. Install it and use with:

```bash
/favicon
```

Follow the interactive prompts to generate your complete favicon set.

## What Gets Generated

```
Generated Files:
├── favicon.ico (16, 32, 48)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png (180x180)
├── android-chrome-192x192.png
├── android-chrome-512x512.png
├── icon-512x512-maskable.png
├── safari-pinned-tab.svg
├── site.webmanifest
└── browserconfig.xml
```

Plus framework-specific integration code for your HTML/JSX files.

## Supported Frameworks

- Next.js (App & Pages Router)
- React (Vite, CRA)
- Angular
- Vue / Nuxt
- Svelte / SvelteKit
- Astro
- Gatsby
- Plain HTML

## Examples

**Input:**
- Logo file: `public/logo.svg`
- Theme color: `#1A1A1A`
- Dark mode: Yes

**Output:**
- All favicon sizes generated
- PWA manifest with theme colors
- Framework-specific meta tags
- Dark mode variants

## License

MIT © Cube A Labs

## More Skills

Check out other [Cube A Labs skills](https://github.com/Muddi00seven/skills):
- [@cubealabs/cube-ui](../cube-ui) - UI component generator
- [@cubealabs/sitemap](../sitemap) - SEO sitemap generator
