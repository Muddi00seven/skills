# @cubealabs/sitemap

🗺️ **Generate SEO-optimized XML sitemaps with framework detection**

Automatically crawl your project, detect routes, and generate Google Search Console-ready sitemaps with proper metadata.

## Features

- ✅ **Auto Route Discovery**: Scans file system for routes
- ✅ **Framework Detection**: Supports Next.js, React, Vue, Angular, Svelte, Astro
- ✅ **Dynamic Routes**: Handle parameterized routes
- ✅ **Metadata**: lastmod, changefreq, priority
- ✅ **Large Sitemaps**: Automatic splitting at 50k URLs
- ✅ **robots.txt**: Auto-update robots.txt
- ✅ **Validation**: Built-in XML validation
- ✅ **Automation**: Build scripts, git hooks, CI/CD

## Installation

```bash
npm install @cubealabs/sitemap
```

## Usage with Claude Code

This is a Claude Code skill. Install it and use with:

```bash
/sitemap
```

Follow the interactive prompts to generate your sitemap.

## What Gets Generated

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://example.com/blog</loc>
    <lastmod>2024-01-10</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

Plus updated `robots.txt` with sitemap reference.

## Supported Frameworks

- Next.js (App & Pages Router)
- React (Vite, CRA)
- Angular
- Vue / Nuxt
- Svelte / SvelteKit
- Astro
- Gatsby
- Remix
- Plain HTML

## Features

### Automatic Route Discovery
Scans your project structure and finds all pages/routes:
- Next.js: `app/**/page.tsx` or `pages/**/*.tsx`
- SvelteKit: `src/routes/**/+page.svelte`
- Astro: `src/pages/**/*.astro`
- And more...

### Dynamic Routes
Handles parameterized routes like:
- `/blog/[slug]`
- `/products/[id]`

Options to skip, provide samples, or fetch from API/CMS.

### Metadata
Smart defaults based on route patterns:
- Homepage: priority 1.0, daily updates
- Section pages: priority 0.8, weekly
- Content pages: priority 0.6, monthly

### Automation
Set up automatic regeneration:
- On build
- Pre-commit git hook
- Scheduled CI/CD workflow

## Quick Start

1. Run `/sitemap` in Claude Code
2. Confirm detected framework and routes
3. Provide your site URL
4. Review and generate
5. Submit to Google Search Console

## Google Search Console

After generation, submit at:
https://search.google.com/search-console

Navigate to Sitemaps → Enter `/sitemap.xml` → Submit

## License

MIT © Cube A Labs

## More Skills

Check out other [Cube A Labs skills](https://github.com/Muddi00seven/skills):
- [@cubealabs/favicon](../favicon) - Favicon generator
- [@cubealabs/cube-ui](../cube-ui) - UI component generator
