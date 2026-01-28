# Cube A Labs Skills

> **Professional Claude Code skills that developers actually use**

Generate favicons, UI components, and sitemaps with AI-powered automation. Framework detection, best practices, zero config.

[![npm version](https://img.shields.io/npm/v/@cubealabs/favicon)](https://www.npmjs.com/package/@cubealabs/favicon)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MCP Compatible](https://img.shields.io/badge/MCP-Compatible-blue)](https://github.com/modelcontextprotocol/servers)

## 🚀 Quick Start

### Install via MCP (Recommended)

AI agents like Claude Code will auto-discover these skills:

```bash
npm install -g @cubealabs/mcp-server
```

Add to your Claude Code config:

```json
{
  "mcpServers": {
    "cubealabs": {
      "command": "cubealabs-mcp"
    }
  }
}
```

### Install Individual Skills

```bash
npm install @cubealabs/favicon
npm install @cubealabs/cube-ui
npm install @cubealabs/sitemap
```

## ✨ Skills

### 🎨 Favicon Generator

Generate complete favicon sets with PWA support.

**What it does:**
- ✅ All icon sizes (16x16 to 512x512)
- ✅ PWA manifests & maskable icons
- ✅ Framework integration (Next.js, React, Vue, Angular, Svelte)
- ✅ Dark mode variants
- ✅ Safari pinned tabs & Windows tiles

```bash
/favicon
```

[View Documentation →](./packages/favicon)

---

### ⚡ Cube UI Generator

Generate UI components with automatic framework detection.

**What it does:**
- ✅ Detects your framework automatically
- ✅ TypeScript-first with proper types
- ✅ Responsive & mobile-first
- ✅ Dark mode support
- ✅ Animations & loading states
- ✅ Fully accessible (ARIA, keyboard nav)

```bash
/cube-ui
```

[View Documentation →](./packages/cube-ui)

**Supported Frameworks:**
Next.js • React • Vue • Angular • Svelte • Astro • Plain HTML

---

### 🗺️ Sitemap Generator

Generate SEO-optimized XML sitemaps.

**What it does:**
- ✅ Auto route discovery
- ✅ Framework detection
- ✅ Dynamic route handling
- ✅ Google Search Console ready
- ✅ robots.txt integration
- ✅ Automatic metadata

```bash
/sitemap
```

[View Documentation →](./packages/sitemap)

---

## 🎯 Why Cube A Labs?

| Feature | Cube A Labs | Other Tools |
|---------|------------|-------------|
| **AI-Powered** | ✅ MCP integration | ❌ Manual CLI |
| **Framework Detection** | ✅ Automatic | ❌ Manual config |
| **TypeScript** | ✅ First-class | ⚠️ Limited |
| **Dark Mode** | ✅ Built-in | ❌ DIY |
| **Accessibility** | ✅ Included | ⚠️ Optional |
| **Zero Config** | ✅ Just works | ❌ Complex setup |

## 📦 Installation Options

### Option 1: MCP Server (AI Agents)

```bash
npm install -g @cubealabs/mcp-server
```

AI coding agents will automatically discover and suggest these skills.

### Option 2: Individual Packages

```bash
npm install @cubealabs/favicon
npm install @cubealabs/cube-ui
npm install @cubealabs/sitemap
```

### Option 3: Clone & Use

```bash
git clone https://github.com/Muddi00seven/skills.git
cd skills
npm install
```

## 🎬 Demo

### Favicon Generation
```
You: "Generate favicons for my Next.js app"

Claude: *detects Next.js*
        *finds logo.png*
        *generates all sizes*
        *creates manifest*
        *updates app/layout.tsx*

✅ Done in 5 seconds
```

### Component Generation
```
You: "Create a product card component"

Claude: *detects React + Vite*
        *detects Tailwind CSS*
        *generates TypeScript component*
        *adds responsive design*
        *includes dark mode*

✅ Production-ready component
```

### Sitemap Generation
```
You: "Generate sitemap for my site"

Claude: *detects Astro*
        *scans src/pages/*
        *resolves dynamic routes*
        *generates sitemap.xml*
        *updates robots.txt*

✅ SEO optimized
```

## 🏗️ Supported Frameworks

| Framework | Favicon | Cube UI | Sitemap |
|-----------|---------|---------|---------|
| Next.js (App Router) | ✅ | ✅ | ✅ |
| Next.js (Pages) | ✅ | ✅ | ✅ |
| React (Vite) | ✅ | ✅ | ✅ |
| React (CRA) | ✅ | ✅ | ✅ |
| Vue 3 | ✅ | ✅ | ✅ |
| Nuxt | ✅ | ✅ | ✅ |
| Angular | ✅ | ✅ | ✅ |
| Svelte | ✅ | ✅ | ✅ |
| SvelteKit | ✅ | ✅ | ✅ |
| Astro | ✅ | ✅ | ✅ |
| Gatsby | ✅ | ❌ | ✅ |
| Remix | ✅ | ❌ | ✅ |
| Plain HTML | ✅ | ✅ | ✅ |

## 🛠️ Tech Stack

- **Language:** TypeScript
- **MCP SDK:** [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/sdk)
- **Package Manager:** npm workspaces
- **License:** MIT

## 📚 Documentation

Each skill has detailed documentation:

- [Favicon Generator](./packages/favicon/README.md)
- [Cube UI Generator](./packages/cube-ui/README.md)
- [Sitemap Generator](./packages/sitemap/README.md)
- [MCP Server](./mcp-server/README.md)

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Development Setup

```bash
git clone https://github.com/Muddi00seven/skills.git
cd skills
npm install
npm run build
```

### Project Structure

```
skills/
├── packages/
│   ├── favicon/          # Favicon generator skill
│   ├── cube-ui/          # UI component generator
│   └── sitemap/          # Sitemap generator
├── mcp-server/           # MCP server for AI agents
└── .claude/              # Original skill definitions
```

## 🌟 Showcase

Built something cool with Cube A Labs skills? [Share it with us!](https://github.com/Muddi00seven/skills/issues/new)

## 📈 Roadmap

- [ ] Vue components library preset
- [ ] React Native support
- [ ] AI-powered component customization
- [ ] Dark mode theme generator
- [ ] Analytics integration skill
- [ ] Database schema generator
- [ ] API documentation generator

Vote on features: [GitHub Discussions](https://github.com/Muddi00seven/skills/discussions)

## 🐛 Issues & Feedback

Found a bug? Have a feature request?

- [Report an Issue](https://github.com/Muddi00seven/skills/issues/new)
- [Request a Feature](https://github.com/Muddi00seven/skills/issues/new?labels=enhancement)
- [Ask a Question](https://github.com/Muddi00seven/skills/discussions/new)

## 📄 License

MIT © [Cube A Labs](https://github.com/Muddi00seven)

## 🔗 Links

- [NPM Organization](https://www.npmjs.com/org/cubealabs)
- [GitHub Repository](https://github.com/Muddi00seven/skills)
- [MCP Servers Registry](https://github.com/modelcontextprotocol/servers)
- [Claude Code](https://code.claude.com)

---

<div align="center">

**Built with ❤️ by Cube A Labs**

[⭐ Star on GitHub](https://github.com/Muddi00seven/skills) • [📦 View on NPM](https://www.npmjs.com/org/cubealabs) • [🐛 Report Bug](https://github.com/Muddi00seven/skills/issues)

</div>
