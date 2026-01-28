# Cube A Labs MCP Server

Model Context Protocol server that exposes Cube A Labs skills to AI agents like Claude Code.

## What is this?

This MCP server allows AI coding agents to automatically discover and use Cube A Labs skills:
- **Favicon Generator** - Complete favicon sets with PWA support
- **Cube UI Generator** - Framework-aware UI component generation
- **Sitemap Generator** - SEO-optimized XML sitemaps

## Installation

### Option 1: NPM (Recommended)

```bash
npm install -g @cubealabs/mcp-server
```

### Option 2: NPX (No Install)

Configure Claude Code to use npx:

```json
{
  "mcpServers": {
    "cubealabs": {
      "command": "npx",
      "args": ["-y", "@cubealabs/mcp-server"]
    }
  }
}
```

## Configuration

### Claude Code

Add to your Claude Code settings (`~/.config/claude/config.json` or use `/mcp config`):

```json
{
  "mcpServers": {
    "cubealabs": {
      "command": "cubealabs-mcp"
    }
  }
}
```

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "cubealabs": {
      "command": "cubealabs-mcp"
    }
  }
}
```

### Other MCP Clients

Any MCP-compatible client can connect using stdio transport:

```bash
cubealabs-mcp
```

## Available Tools

The server exposes three tools:

### `cubealabs_favicon`
Generate complete favicon sets from any logo with PWA support, all icon sizes, and framework integration.

**Use cases:**
- Setting up favicons for new projects
- Adding PWA icons to existing apps
- Generating dark mode favicon variants
- Framework-specific integration (Next.js, React, Vue, etc.)

### `cubealabs_cube_ui`
Generate UI components with automatic framework detection.

**Use cases:**
- Creating new components (cards, buttons, forms)
- Building page layouts
- Generating responsive, accessible components
- Framework-specific code generation

### `cubealabs_sitemap`
Generate SEO-optimized XML sitemaps with route discovery.

**Use cases:**
- Creating sitemaps for Google Search Console
- Automatic route discovery from file system
- Handling dynamic routes
- Framework-specific sitemap generation

## How It Works

1. AI agent requests available tools from the MCP server
2. Server responds with list of Cube A Labs skills
3. AI agent selects appropriate skill based on user request
4. Server provides skill instructions to the AI agent
5. AI agent executes skill following the instructions

## Development

Build the server:

```bash
npm install
npm run build
```

Test locally:

```bash
npm run dev
```

## Links

- [GitHub Repository](https://github.com/Muddi00seven/skills)
- [NPM Package](https://www.npmjs.com/package/@cubealabs/mcp-server)
- [MCP Documentation](https://github.com/modelcontextprotocol/servers)

## License

MIT © Cube A Labs
