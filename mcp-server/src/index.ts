#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load skill instructions
const faviconSkill = readFileSync(
  join(__dirname, '../../packages/favicon/skill.md'),
  'utf-8'
);
const cubeUiSkill = readFileSync(
  join(__dirname, '../../packages/cube-ui/skill.md'),
  'utf-8'
);
const sitemapSkill = readFileSync(
  join(__dirname, '../../packages/sitemap/skill.md'),
  'utf-8'
);

// Define tools
const tools: Tool[] = [
  {
    name: 'cubealabs_favicon',
    description:
      'Generate complete favicon set from any logo image with PWA support, all icon sizes (16x16 to 512x512), manifest files, and framework-specific integration for Next.js, React, Vue, Angular, Svelte, and more. Includes dark mode variants, Safari pinned tabs, and Windows tiles.',
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          description: 'Action to perform: "generate" to start favicon generation',
          enum: ['generate'],
        },
      },
      required: ['action'],
    },
  },
  {
    name: 'cubealabs_cube_ui',
    description:
      'Generate UI components and pages with automatic framework detection (Next.js, React, Vue, Angular, Svelte). Creates production-ready components with TypeScript, responsive design, dark mode, animations, loading states, and accessibility. Follows Cube A Labs minimalist design system.',
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          description: 'Action to perform: "generate" to start component generation',
          enum: ['generate'],
        },
      },
      required: ['action'],
    },
  },
  {
    name: 'cubealabs_sitemap',
    description:
      'Generate SEO-optimized XML sitemap with automatic framework detection and route discovery. Crawls your project structure, handles dynamic routes, adds metadata (lastmod, changefreq, priority), and creates Google Search Console-ready sitemaps. Supports Next.js, React, Vue, Angular, Svelte, Astro, and more.',
    inputSchema: {
      type: 'object',
      properties: {
        action: {
          type: 'string',
          description: 'Action to perform: "generate" to start sitemap generation',
          enum: ['generate'],
        },
      },
      required: ['action'],
    },
  },
];

// Create server
const server = new Server(
  {
    name: 'cubealabs-skills',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Handle tool list requests
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name } = request.params;

  switch (name) {
    case 'cubealabs_favicon':
      return {
        content: [
          {
            type: 'text',
            text: `# Favicon Generator Skill Activated\n\n${faviconSkill}\n\n---\n\nYou are now in Favicon Generator mode. Follow the instructions in the skill documentation above to generate a complete favicon set for the user's project.`,
          },
        ],
      };

    case 'cubealabs_cube_ui':
      return {
        content: [
          {
            type: 'text',
            text: `# Cube UI Generator Skill Activated\n\n${cubeUiSkill}\n\n---\n\nYou are now in Cube UI Generator mode. Follow the instructions in the skill documentation above to generate UI components for the user's project.`,
          },
        ],
      };

    case 'cubealabs_sitemap':
      return {
        content: [
          {
            type: 'text',
            text: `# Sitemap Generator Skill Activated\n\n${sitemapSkill}\n\n---\n\nYou are now in Sitemap Generator mode. Follow the instructions in the skill documentation above to generate an SEO-optimized XML sitemap for the user's project.`,
          },
        ],
      };

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Cube A Labs MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
