---
name: sitemap
description: Generate a complete XML sitemap for Google Search Console with auto-detection, metadata support, and framework-specific integration
---

# Sitemap Generator

Generate a complete XML sitemap for your website with automatic framework detection, metadata support, and Google Search Console optimization.

## Instructions

When the user invokes this skill, follow this flow:

---

## Step 1: Framework & Environment Detection (Auto)

**Run this first to understand the project structure.**

### Detect Framework
Read `package.json` and detect:

```
1. NEXT.JS (App Router)    → "next" exists + app/ directory
2. NEXT.JS (Pages Router)  → "next" exists + pages/ directory
3. REACT+VITE             → "react" + "vite" exist
4. REACT+CRA              → "react" + "react-scripts" exist
5. ANGULAR                → "@angular/core" exists
6. VUE                    → "vue" exists
7. SVELTE                 → "svelte" exists
8. NUXT                   → "nuxt" exists
9. ASTRO                  → "astro" exists
10. GATSBY                → "gatsby" exists
11. REMIX                 → "@remix-run/react" exists
12. PLAIN HTML            → No framework detected
```

### Detect Route/Page Structure
Based on framework, determine where pages/routes are located:

| Framework | Route Location | Pattern |
|-----------|---------------|---------|
| Next.js (App) | `app/` or `src/app/` | `**/page.{tsx,ts,jsx,js}` |
| Next.js (Pages) | `pages/` or `src/pages/` | `**/*.{tsx,ts,jsx,js}` |
| React (Vite/CRA) | `src/` | Analyze React Router config |
| Angular | `src/app/` | Read routing modules |
| Vue/Nuxt | `pages/` or `src/pages/` | `**/*.vue` |
| Svelte/SvelteKit | `src/routes/` | `+page.{svelte,ts,js}` |
| Astro | `src/pages/` | `**/*.{astro,md,mdx}` |
| Gatsby | `src/pages/` | `**/*.{js,jsx,tsx}` |
| Remix | `app/routes/` | `**/*.{tsx,jsx}` |
| Plain HTML | `.` or `src/` | `**/*.html` |

### Detect Output Directory
Based on framework, determine sitemap output path:

| Framework | Output Directory |
|-----------|-----------------|
| Next.js | `public/` |
| React (Vite/CRA) | `public/` |
| Angular | `src/` (added to assets) |
| Vue/Nuxt | `public/` or `static/` |
| Svelte/SvelteKit | `static/` |
| Astro | `public/` |
| Gatsby | `static/` |
| Remix | `public/` |
| Plain HTML | `./` (root) |

### Detect Base URL
Look for base URL in order:

1. `package.json` → `homepage` field
2. `.env` / `.env.local` → `NEXT_PUBLIC_SITE_URL`, `VITE_SITE_URL`, `PUBLIC_SITE_URL`
3. Framework config files (next.config.js, astro.config.mjs, etc.)
4. Ask user if not found

Report detection results:
```
Detected Environment:
- Framework: [Framework Name]
- Routes Directory: [Path to routes/pages]
- Output: [Sitemap output path]
- Base URL: [Domain or "Not found - will ask"]
```

---

## Step 2: Ask Configuration Questions

### Base URL (if not detected)
Ask the user with NO options, just text input:
```
What is your website's base URL?

Examples:
- https://example.com
- https://www.mysite.com
- https://subdomain.example.com

This will be used as the base for all URLs in the sitemap.
```

**Validation:**
- Must start with `http://` or `https://`
- Must not end with trailing slash (remove if present)
- Must be a valid URL format

### Routes to Include
Use AskUserQuestion tool:
```
Which routes should be included in the sitemap?

Options:
1. All routes (Recommended) - Include all discovered pages/routes
2. Only public routes - Exclude auth-protected pages (login, dashboard, profile, etc.)
3. Custom filter - I'll specify patterns to include/exclude
```

If user selects "Custom filter", ask:
```
Provide patterns to:

Include (comma-separated glob patterns):
Example: /, /blog/*, /products/*

Exclude (comma-separated glob patterns):
Example: /admin/*, /api/*, /auth/*
```

### Additional Pages
Ask:
```
Do you have any additional pages not in the file system to include?

Examples:
- Server-generated pages
- CMS pages
- External redirects

(Enter comma-separated paths, or press Enter to skip)
```

---

## Step 3: Crawl File System for Routes

Based on detected framework, scan for route files:

### Next.js (App Router)
```javascript
const glob = require('glob');
const path = require('path');

function getNextAppRoutes(baseDir = 'app') {
  // Find all page.tsx, page.ts, page.jsx, page.js files
  const pageFiles = glob.sync(`${baseDir}/**/page.{tsx,ts,jsx,js}`, {
    ignore: ['**/node_modules/**', '**/.next/**', '**/api/**']
  });

  return pageFiles.map(file => {
    // Convert file path to URL path
    // app/page.tsx -> /
    // app/blog/page.tsx -> /blog
    // app/blog/[slug]/page.tsx -> /blog/[slug] (handle separately)
    let route = file
      .replace(baseDir, '')
      .replace(/\/page\.(tsx|ts|jsx|js)$/, '')
      .replace(/\\/g, '/');

    return route || '/';
  });
}
```

### Next.js (Pages Router)
```javascript
function getNextPagesRoutes(baseDir = 'pages') {
  const pageFiles = glob.sync(`${baseDir}/**/*.{tsx,ts,jsx,js}`, {
    ignore: [
      '**/node_modules/**',
      '**/_app.*',
      '**/_document.*',
      '**/_error.*',
      '**/api/**'
    ]
  });

  return pageFiles.map(file => {
    let route = file
      .replace(baseDir, '')
      .replace(/\.(tsx|ts|jsx|js)$/, '')
      .replace(/\/index$/, '')
      .replace(/\\/g, '/');

    return route || '/';
  });
}
```

### SvelteKit
```javascript
function getSvelteKitRoutes(baseDir = 'src/routes') {
  const pageFiles = glob.sync(`${baseDir}/**/+page.{svelte,ts,js}`, {
    ignore: ['**/node_modules/**']
  });

  return pageFiles.map(file => {
    let route = file
      .replace(baseDir, '')
      .replace(/\/\+page\.(svelte|ts|js)$/, '')
      .replace(/\\/g, '/');

    return route || '/';
  });
}
```

### Astro
```javascript
function getAstroRoutes(baseDir = 'src/pages') {
  const pageFiles = glob.sync(`${baseDir}/**/*.{astro,md,mdx}`, {
    ignore: ['**/node_modules/**']
  });

  return pageFiles.map(file => {
    let route = file
      .replace(baseDir, '')
      .replace(/\.(astro|md|mdx)$/, '')
      .replace(/\/index$/, '')
      .replace(/\\/g, '/');

    return route || '/';
  });
}
```

### Static HTML
```javascript
function getStaticHtmlRoutes(baseDir = '.') {
  const htmlFiles = glob.sync(`${baseDir}/**/*.html`, {
    ignore: ['**/node_modules/**', '**/dist/**', '**/build/**']
  });

  return htmlFiles.map(file => {
    let route = file
      .replace(baseDir, '')
      .replace(/\.html$/, '')
      .replace(/\/index$/, '')
      .replace(/\\/g, '/');

    return route || '/';
  });
}
```

### Handle Dynamic Routes

For routes with parameters like:
- Next.js: `/blog/[slug]`
- SvelteKit: `/blog/[slug]`
- Astro: `/blog/[slug]`

**Ask the user:**
```
Found dynamic routes:
- /blog/[slug]
- /products/[id]

How should these be handled?

Options:
1. Skip dynamic routes - Exclude them from sitemap
2. Provide sample values - I'll provide actual paths to include
3. Fetch from API/CMS - Query database for actual values
```

If option 2, ask:
```
Provide actual paths for dynamic routes (comma-separated):

Example:
/blog/first-post, /blog/second-post, /products/item-1
```

If option 3, ask:
```
Provide API endpoint or data source to fetch dynamic route values:

Example:
- https://api.example.com/posts
- ./data/posts.json
- npm run fetch-routes
```

---

## Step 4: Collect Metadata for Each Route

For each discovered route, collect metadata:

### Last Modified Date
```javascript
const fs = require('fs');

function getLastModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0]; // YYYY-MM-DD format
  } catch (err) {
    return new Date().toISOString().split('T')[0]; // fallback to current date
  }
}
```

### Change Frequency
Based on route pattern, suggest:

| Route Pattern | Suggested Frequency |
|--------------|-------------------|
| `/` (homepage) | `daily` |
| `/blog/*`, `/news/*` | `weekly` |
| `/products/*`, `/services/*` | `weekly` |
| `/about`, `/contact`, `/privacy` | `monthly` |
| Other | `monthly` |

### Priority
Based on route pattern, suggest:

| Route Pattern | Suggested Priority |
|--------------|------------------|
| `/` (homepage) | `1.0` |
| Main sections (`/blog`, `/products`) | `0.8` |
| Content pages (`/blog/*`, `/products/*`) | `0.6` |
| Static pages (`/about`, `/contact`) | `0.5` |
| Other | `0.5` |

**Allow user to customize:**
```
Do you want to customize metadata for specific routes?

Options:
1. Use defaults (Recommended) - Auto-assigned based on route patterns
2. Customize - I'll specify custom values for specific routes
```

---

## Step 5: Generate XML Sitemap

### Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
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

### Generation Script

```javascript
const fs = require('fs');
const path = require('path');

function generateSitemap(routes, baseUrl, outputPath) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  routes.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${baseUrl}${route.path}</loc>\n`;

    if (route.lastmod) {
      xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    }

    if (route.changefreq) {
      xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    }

    if (route.priority) {
      xml += `    <priority>${route.priority}</priority>\n`;
    }

    xml += '  </url>\n';
  });

  xml += '</urlset>';

  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Sitemap generated at: ${outputPath}`);
}
```

### Handle Large Sitemaps (50,000+ URLs)

If routes exceed 50,000, create sitemap index:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-1.xml</loc>
    <lastmod>2024-01-15</lastmod>
  </sitemap>
  <sitemap>
    <loc>https://example.com/sitemap-2.xml</loc>
    <lastmod>2024-01-15</lastmod>
  </sitemap>
</sitemapindex>
```

Split routes across multiple files (max 50,000 per file).

---

## Step 6: Framework-Specific Integration

### Next.js

#### Option 1: Static sitemap.xml (Simple)
Just save to `public/sitemap.xml` - it will be served at `/sitemap.xml`.

#### Option 2: Dynamic API Route (Advanced)
Create `app/sitemap.ts` or `pages/api/sitemap.xml.ts`:

```typescript
// app/sitemap.ts (App Router)
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://example.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://example.com/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];
}
```

```typescript
// pages/api/sitemap.xml.ts (Pages Router)
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(xml);
  res.end();
}
```

### React (Vite/CRA)
Save to `public/sitemap.xml` - it will be served at `/sitemap.xml`.

### Angular
1. Save to `src/sitemap.xml`
2. Update `angular.json`:

```json
{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              "src/sitemap.xml"
            ]
          }
        }
      }
    }
  }
}
```

### Astro
Save to `public/sitemap.xml` or use Astro's sitemap integration:

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.com',
  integrations: [sitemap()],
});
```

### SvelteKit
Save to `static/sitemap.xml` - it will be served at `/sitemap.xml`.

### Nuxt
1. Save to `public/sitemap.xml` or use `@nuxtjs/sitemap` module:

```javascript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    hostname: 'https://example.com',
    gzip: true,
  },
});
```

### Static HTML
Save to `sitemap.xml` in the root directory.

---

## Step 7: Update robots.txt

Check if `robots.txt` exists in the output directory. If yes, update it. If no, create it.

### robots.txt Content

```txt
# Allow all crawlers
User-agent: *
Allow: /

# Sitemap
Sitemap: https://example.com/sitemap.xml
```

If user has custom robots.txt, just append:
```txt
Sitemap: https://example.com/sitemap.xml
```

---

## Step 8: Validation & Testing

After generating sitemap, validate it:

### Validation Script

```javascript
const fs = require('fs');
const { parseString } = require('xml2js');

function validateSitemap(sitemapPath) {
  const xml = fs.readFileSync(sitemapPath, 'utf8');

  parseString(xml, (err, result) => {
    if (err) {
      console.error('❌ Invalid XML:', err.message);
      return;
    }

    const urls = result.urlset.url || [];
    console.log(`✅ Valid sitemap with ${urls.length} URLs`);

    // Check for issues
    urls.forEach((url, i) => {
      const loc = url.loc[0];

      // Check URL format
      if (!loc.startsWith('http://') && !loc.startsWith('https://')) {
        console.warn(`⚠️  URL ${i + 1}: Invalid protocol - ${loc}`);
      }

      // Check priority range
      if (url.priority && (url.priority[0] < 0 || url.priority[0] > 1)) {
        console.warn(`⚠️  URL ${i + 1}: Priority out of range (0.0-1.0) - ${url.priority[0]}`);
      }

      // Check changefreq values
      const validFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
      if (url.changefreq && !validFreqs.includes(url.changefreq[0])) {
        console.warn(`⚠️  URL ${i + 1}: Invalid changefreq - ${url.changefreq[0]}`);
      }
    });
  });
}
```

---

## Step 9: Google Search Console Setup Instructions

Provide instructions to submit the sitemap:

```
Sitemap Generation Complete!

Framework: [Detected Framework]
Base URL: [Site URL]
Output Path: [Sitemap path]
Total URLs: [Count]

Generated Files:
├── sitemap.xml ([Count] URLs)
└── robots.txt (updated with sitemap reference)

Next Steps - Submit to Google Search Console:

1. Go to: https://search.google.com/search-console
2. Select your property or add a new one
3. Navigate to: Sitemaps (in left sidebar)
4. Enter sitemap URL: [Base URL]/sitemap.xml
5. Click "Submit"

Validation:
- Test sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Google validator: https://search.google.com/test/sitemap

Optional - Submit to Other Search Engines:
- Bing Webmaster: https://www.bing.com/webmasters
- Yandex Webmaster: https://webmaster.yandex.com

Auto-Update Strategy:
[Provide framework-specific instructions for keeping sitemap up-to-date]
```

---

## Step 10: Setup Automation (Optional)

Ask user:
```
Do you want to automate sitemap generation?

Options:
1. No - Manual generation only
2. Build script - Regenerate on each build
3. Git hook - Regenerate on pre-commit
4. Scheduled - Setup cron job or CI workflow
```

### Build Script Integration

Add to `package.json`:
```json
{
  "scripts": {
    "generate:sitemap": "node scripts/generate-sitemap.js",
    "build": "npm run generate:sitemap && [existing build command]"
  }
}
```

### Git Hook (pre-commit)

Using Husky:
```bash
npx husky add .husky/pre-commit "npm run generate:sitemap"
```

### GitHub Actions Workflow

```yaml
# .github/workflows/sitemap.yml
name: Update Sitemap

on:
  schedule:
    - cron: '0 0 * * 0' # Weekly on Sunday
  workflow_dispatch: # Manual trigger

jobs:
  update-sitemap:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run generate:sitemap
      - name: Commit sitemap
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add public/sitemap.xml
          git commit -m "chore: update sitemap" || exit 0
          git push
```

---

## Output Format

After generating sitemap, provide:

```
Sitemap Generation Complete!

Framework: [Detected Framework]
Base URL: [Base URL]
Output: [Output Path]

Statistics:
- Total URLs: [Count]
- Dynamic routes resolved: [Count]
- Pages with lastmod: [Count]
- Average priority: [Value]

Generated Files:
├── sitemap.xml ([Size] KB)
└── robots.txt (updated)

Sample URLs:
- https://example.com/ (priority: 1.0, daily)
- https://example.com/blog (priority: 0.8, weekly)
- https://example.com/about (priority: 0.5, monthly)
[... show first 5 URLs]

Next Steps:
1. Submit to Google Search Console: https://search.google.com/search-console
2. Validate sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. Update sitemap when adding new pages
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Sitemap not accessible at /sitemap.xml | Check output directory, verify static file serving |
| Dynamic routes not included | Manually provide dynamic route values or fetch from API |
| 404 errors in Google Search Console | Verify all URLs are publicly accessible |
| lastmod dates not updating | Re-run generation script or set up automation |
| File size too large | Split into multiple sitemaps using sitemap index |
| URLs missing | Check route discovery patterns match your framework |

### Validation Commands

```bash
# Test sitemap accessibility
curl https://example.com/sitemap.xml

# Validate XML structure
xmllint --noout sitemap.xml

# Count URLs
grep -c "<loc>" sitemap.xml

# Check for common issues
grep -v "^https://" sitemap.xml | grep "<loc>"
```

---

## Advanced Features

### Multi-Language Sitemaps

For sites with multiple languages:

```xml
<url>
  <loc>https://example.com/en/page</loc>
  <xhtml:link rel="alternate" hreflang="en" href="https://example.com/en/page"/>
  <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/page"/>
  <xhtml:link rel="alternate" hreflang="fr" href="https://example.com/fr/page"/>
</url>
```

### Image Sitemaps

Include images in sitemap:

```xml
<url>
  <loc>https://example.com/page</loc>
  <image:image>
    <image:loc>https://example.com/image.jpg</image:loc>
    <image:title>Image Title</image:title>
  </image:image>
</url>
```

### Video Sitemaps

Include videos:

```xml
<url>
  <loc>https://example.com/page</loc>
  <video:video>
    <video:thumbnail_loc>https://example.com/thumb.jpg</video:thumbnail_loc>
    <video:title>Video Title</video:title>
    <video:description>Video Description</video:description>
  </video:video>
</url>
```

---

## Best Practices

1. **Keep it Updated**: Regenerate sitemap when adding/removing pages
2. **Prioritize Important Pages**: Use priority correctly (homepage > sections > content)
3. **Accurate Change Frequency**: Match actual update patterns
4. **Exclude Private Pages**: Don't include auth-protected or draft pages
5. **Use Absolute URLs**: Always use full URLs with protocol
6. **File Size Limit**: Keep under 50MB and 50,000 URLs per file
7. **Compress**: Consider gzip compression for large sitemaps
8. **robots.txt**: Always reference sitemap in robots.txt
9. **Monitor**: Check Google Search Console for errors regularly
10. **Test**: Validate sitemap before submitting to search engines
