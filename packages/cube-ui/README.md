# @cubealabs/cube-ui

⚡ **Generate UI components with automatic framework detection**

Stop writing boilerplate. Generate production-ready components for Next.js, React, Vue, Angular, Svelte, and more with proper TypeScript, styling, and accessibility.

## Features

- ✅ **Auto Framework Detection**: Detects Next.js, React, Vue, Angular, Svelte
- ✅ **TypeScript First**: Proper types and interfaces
- ✅ **Responsive**: Mobile-first with Tailwind breakpoints
- ✅ **Dark Mode**: Built-in dark mode support
- ✅ **Animations**: Card lifts, expanding underlines, fades
- ✅ **Loading States**: Skeletons, shimmers, spinners
- ✅ **Accessible**: ARIA labels, keyboard navigation
- ✅ **Design System**: Cube A Labs minimalist design

## Installation

```bash
npm install @cubealabs/cube-ui
```

## Usage with Claude Code

This is a Claude Code skill. Install it and use with:

```bash
/cube-ui
```

Follow the interactive prompts to generate components.

## What You Can Generate

### Components
- Cards (product, user, content)
- Buttons (primary, secondary, ghost)
- Forms (inputs, validation, submit)
- Modals & Dialogs
- Navigation (header, sidebar, tabs)
- Data Display (tables, lists, grids)

### Pages
- Landing pages
- Dashboard layouts
- Listing pages with filters
- Detail pages
- Admin panels

### Presets
- Marketplace Card
- Admin Data Table
- Form Layout

## Supported Frameworks

- Next.js (App & Pages Router)
- React (Vite, CRA)
- Angular (Standalone Components)
- Vue 3 (Composition API)
- Svelte / SvelteKit
- Astro
- Plain HTML/CSS/JS

## Supported Styling

- Tailwind CSS (preferred)
- CSS Modules
- SCSS/Sass
- Styled Components
- Emotion
- Plain CSS

## Example Output

**Next.js Component:**
```tsx
import Image from 'next/image';
import type { ProductCardProps } from './ProductCard.types';

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="card-lift bg-white rounded-lg overflow-hidden">
      <Image src={product.image} alt={product.name} fill />
      <h3 className="text-xl font-bold">{product.name}</h3>
    </article>
  );
};
```

Complete with TypeScript types, tests, and framework-specific patterns.

## Design System

Uses Cube A Labs minimalist design:
- Primary: `#111111`
- Secondary: `#444444`
- Subtle: `#FAFAFA`
- Borders: `#DADADA`

With smooth animations and clean typography.

## License

MIT © Cube A Labs

## More Skills

Check out other [Cube A Labs skills](https://github.com/Muddi00seven/skills):
- [@cubealabs/favicon](../favicon) - Favicon generator
- [@cubealabs/sitemap](../sitemap) - SEO sitemap generator
