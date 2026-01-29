---
name: cube-ui
description: Generate UI components and pages following the Cube A Labs design system with automatic framework detection, responsive variants, dark mode, animations, and accessibility
---

# Cube UI Generator

Generate UI components and pages following the Cube A Labs design system with **automatic framework detection**.

## Instructions

When the user invokes this skill, follow this interactive flow:

---

## Step 0: Framework Detection (Auto)

**IMPORTANT: Always run this step first before asking any questions.**

Read `package.json` in the project root and detect the framework:

```
Detection Rules (check dependencies and devDependencies):

1. NEXT.JS     → "next" exists
2. REACT+VITE  → "react" + "vite" exist (no "next")
3. REACT+CRA   → "react" + "react-scripts" exist
4. ANGULAR     → "@angular/core" exists
5. VUE         → "vue" exists
6. SVELTE      → "svelte" exists
7. ASTRO       → "astro" exists
8. PLAIN HTML  → No framework detected (or no package.json)
```

After detection, inform the user:
```
Detected: [Framework Name]
Styling: [Tailwind CSS / CSS Modules / Plain CSS / SCSS]
TypeScript: [Yes / No]

Proceeding with [Framework]-specific templates...
```

If multiple frameworks detected or uncertain, ask:
```
I detected multiple possibilities. Which framework are you using?
1. Next.js
2. React (Vite)
3. React (CRA)
4. Angular
5. Vue 3
6. Svelte
7. Plain HTML/CSS/JS
```

---

## Step 1: Determine UI Type

Ask the user:
```
What would you like to create?

1. **Component** - Reusable UI component (card, button, modal, form, etc.)
2. **Page** - Full page layout (listing, detail, dashboard, etc.)
3. **Preset** - Quick-start from a template
```

If they choose **Preset**, offer these options:
- **Marketplace Card** - Product/agent card with image, logo, title, tagline, category badge, CTA
- **Admin Data Table** - Sortable, filterable table with pagination and status badges
- **Form Layout** - Form section with validation states, error handling, submit button

---

## Step 2: Gather Requirements

For **Components**, ask:
1. What is the component name? (e.g., ProductCard, UserProfile)
2. What props should it accept? (list the main props)
3. Should it include: (multi-select)
   - Loading state (skeleton/spinner/shimmer)
   - Dark mode variant
   - Hover animations
   - Click interactions

For **Pages**, ask:
1. What is the page name/route?
2. What sections should it include?
3. Does it need filtering/search?
4. Does it need pagination?

---

## Step 3: Ask for File Location

Suggest location based on **detected framework**:

| Framework | Components | Pages |
|-----------|-----------|-------|
| Next.js | `src/components/[Name].tsx` | `src/app/[route]/page.tsx` |
| React (Vite) | `src/components/[Name].tsx` | `src/pages/[Name].tsx` |
| React (CRA) | `src/components/[Name].tsx` | `src/pages/[Name].tsx` |
| Angular | `src/app/components/[name]/[name].component.ts` | `src/app/pages/[name]/[name].component.ts` |
| Vue | `src/components/[Name].vue` | `src/views/[Name].vue` |
| Svelte | `src/lib/components/[Name].svelte` | `src/routes/[route]/+page.svelte` |
| Plain HTML | `components/[name].html` + `css/[name].css` | `pages/[name].html` |

Always ask:
```
Where should I create this file?
Suggested: [framework-specific suggestion]

Enter custom path or press enter for suggested location:
```

---

## Step 4: Generate Framework-Specific Code

Generate all files as a **full package** based on detected framework.

---

## Framework-Specific Templates

### NEXT.JS Templates

**File extensions:** `.tsx`
**Routing:** App Router (`next/link`, `next/image`)
**Output files:**
- `ComponentName.tsx`
- `ComponentName.types.ts`
- `index.ts`
- `ComponentName.test.tsx`

```tsx
// Next.js Component
import Image from 'next/image';
import Link from 'next/link';
import type { ComponentProps } from './Component.types';

export const Component = ({ ...props }: ComponentProps) => {
  return (
    <div className="...">
      <Image src={src} alt={alt} fill />
      <Link href="/path">Link</Link>
    </div>
  );
};

export default Component;
```

---

### REACT (Vite/CRA) Templates

**File extensions:** `.tsx` or `.jsx`
**Routing:** React Router (`react-router-dom`)
**Images:** Standard `<img>` tags
**Output files:**
- `ComponentName.tsx`
- `ComponentName.types.ts`
- `index.ts`
- `ComponentName.test.tsx`

```tsx
// React Component
import { Link } from 'react-router-dom';
import type { ComponentProps } from './Component.types';

export const Component = ({ ...props }: ComponentProps) => {
  return (
    <div className="...">
      <img src={src} alt={alt} className="w-full h-auto object-cover" />
      <Link to="/path">Link</Link>
    </div>
  );
};

export default Component;
```

---

### ANGULAR Templates

**File extensions:** `.component.ts`, `.component.html`, `.component.scss`
**Routing:** Angular Router (`routerLink`)
**Output files:**
- `component-name.component.ts`
- `component-name.component.html`
- `component-name.component.scss`
- `component-name.component.spec.ts`

```typescript
// Angular Component
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-component-name',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './component-name.component.html',
  styleUrl: './component-name.component.scss'
})
export class ComponentNameComponent {
  @Input() item!: Item;
  @Input() variant: 'default' | 'featured' = 'default';
  @Input() isLoading = false;
}
```

```html
<!-- Angular Template -->
<article class="card-lift group bg-[#fafafa] border border-[#dadada] rounded-lg overflow-hidden">
  <div class="aspect-video relative overflow-hidden">
    <img [src]="item.image" [alt]="item.name" class="object-cover w-full h-full" />
  </div>
  <div class="p-5">
    <h3 class="font-bold text-[17px] text-[#111111]">{{ item.name }}</h3>
    <p class="text-[#444444] text-sm">{{ item.description }}</p>
    <a [routerLink]="['/items', item.slug]" class="expanding-underline">View</a>
  </div>
</article>
```

---

### VUE 3 Templates

**File extensions:** `.vue`
**Routing:** Vue Router (`router-link`)
**Output files:**
- `ComponentName.vue`
- `types.ts` (shared types)
- `ComponentName.spec.ts`

```vue
<!-- Vue 3 Component (Composition API) -->
<script setup lang="ts">
import { RouterLink } from 'vue-router';

interface Props {
  item: Item;
  variant?: 'default' | 'featured';
  isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  isLoading: false
});
</script>

<template>
  <article class="card-lift group bg-[#fafafa] border border-[#dadada] rounded-lg overflow-hidden">
    <div class="aspect-video relative overflow-hidden">
      <img :src="item.image" :alt="item.name" class="object-cover w-full h-full" />
    </div>
    <div class="p-5">
      <h3 class="font-bold text-[17px] text-[#111111]">{{ item.name }}</h3>
      <p class="text-[#444444] text-sm">{{ item.description }}</p>
      <RouterLink :to="`/items/${item.slug}`" class="expanding-underline">
        View
      </RouterLink>
    </div>
  </article>
</template>

<style scoped>
.card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}
</style>
```

---

### SVELTE Templates

**File extensions:** `.svelte`
**Routing:** SvelteKit (`$app/navigation`, `<a href>`)
**Output files:**
- `ComponentName.svelte`
- `types.ts`
- `ComponentName.test.ts`

```svelte
<!-- Svelte Component -->
<script lang="ts">
  import type { Item } from './types';

  export let item: Item;
  export let variant: 'default' | 'featured' = 'default';
  export let isLoading = false;
</script>

<article class="card-lift group bg-[#fafafa] border border-[#dadada] rounded-lg overflow-hidden">
  <div class="aspect-video relative overflow-hidden">
    <img src={item.image} alt={item.name} class="object-cover w-full h-full" />
  </div>
  <div class="p-5">
    <h3 class="font-bold text-[17px] text-[#111111]">{item.name}</h3>
    <p class="text-[#444444] text-sm">{item.description}</p>
    <a href="/items/{item.slug}" class="expanding-underline">View</a>
  </div>
</article>

<style>
  .card-lift {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .card-lift:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  }
</style>
```

---

### PLAIN HTML/CSS/JS Templates

**File extensions:** `.html`, `.css`, `.js`
**No framework dependencies**
**Output files:**
- `component-name.html` (partial/template)
- `component-name.css`
- `component-name.js`

```html
<!-- HTML Component Template -->
<article class="card-lift" data-component="item-card">
  <div class="card-image">
    <img src="" alt="" class="card-img" />
  </div>
  <div class="card-content">
    <h3 class="card-title"></h3>
    <p class="card-description"></p>
    <a href="#" class="card-link expanding-underline">View</a>
  </div>
</article>
```

```css
/* CSS for component */
.card-lift {
  background: #fafafa;
  border: 1px solid #dadada;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

.card-image {
  aspect-ratio: 16/9;
  position: relative;
  overflow: hidden;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.25rem;
}

.card-title {
  font-weight: bold;
  font-size: 17px;
  color: #111111;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #444444;
  font-size: 0.875rem;
}
```

```javascript
// JavaScript for component
class ItemCard {
  constructor(element, data) {
    this.element = element;
    this.render(data);
  }

  render(data) {
    this.element.querySelector('.card-img').src = data.image;
    this.element.querySelector('.card-img').alt = data.name;
    this.element.querySelector('.card-title').textContent = data.name;
    this.element.querySelector('.card-description').textContent = data.description;
    this.element.querySelector('.card-link').href = `/items/${data.slug}`;
  }
}

// Usage: new ItemCard(document.querySelector('[data-component="item-card"]'), itemData);
```

---

## Design System Reference

### Color Palette (Use Tailwind Config Names)

```
Primary Text:    text-primary     (#111111)
Secondary Text:  text-secondary   (#444444)
Background:      bg-white         (#FFFFFF)
Subtle BG:       bg-subtle        (#FAFAFA)
Borders:         border-line      (#DADADA)
Accent:          bg-accent        (#1A1A1A)
```

If Tailwind config isn't extended, use these literals:
```
text-[#111111]  - Primary text
text-[#444444]  - Secondary text
bg-[#fafafa]    - Subtle backgrounds
border-[#dadada] - Borders/dividers
bg-[#1a1a1a]    - Accent/buttons
```

For **Plain CSS** projects, use CSS variables:
```css
:root {
  --color-primary: #111111;
  --color-secondary: #444444;
  --color-background: #ffffff;
  --color-subtle: #fafafa;
  --color-border: #dadada;
  --color-accent: #1a1a1a;
}
```

### Typography

**Tailwind (React/Next/Vue/Svelte):**
```tsx
// Headings
<h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
<h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#111111]">
<h3 className="text-xl font-bold text-[#111111]">

// Labels (uppercase)
<span className="text-[14px] uppercase tracking-[0.12em] text-[#444444]">

// Body text
<p className="text-[17px] text-[#444444] leading-relaxed">
```

**Angular (use [ngClass] or direct class):**
```html
<h1 class="text-4xl md:text-5xl font-bold tracking-tight text-[#111111]">
```

**Plain CSS:**
```css
h1 { font-size: 2.25rem; font-weight: bold; letter-spacing: -0.025em; color: #111111; }
h2 { font-size: 1.5rem; font-weight: bold; color: #111111; }
.label { font-size: 14px; text-transform: uppercase; letter-spacing: 0.12em; color: #444444; }
.body-text { font-size: 17px; color: #444444; line-height: 1.625; }
```

### Animation Classes

Include these CSS classes (works in all frameworks):

```css
/* Card hover lift */
.card-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
}

/* Expanding underline for links */
.expanding-underline {
  position: relative;
}
.expanding-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #111111;
  transition: width 0.3s ease;
}
.expanding-underline:hover::after {
  width: 100%;
}

/* Fade in on scroll */
.fade-in-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Border slide from left */
.border-slide {
  position: relative;
  padding-left: 1rem;
}
.border-slide::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 0;
  background: #111111;
  transition: height 0.3s ease;
}
.border-slide:hover::before {
  height: 100%;
}

/* Arrow slide on hover */
.arrow-slide {
  transition: transform 0.3s ease;
}
.group:hover .arrow-slide {
  transform: translateX(4px);
}

/* Smooth transition utility */
.smooth-transition {
  transition: all 0.3s ease;
}
```

### Loading States

#### Skeleton Screen (All Frameworks)

**React/Next.js/Vue/Svelte (Tailwind):**
```tsx
const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-[#dadada]/50 rounded ${className}`} />
);
```

**Angular:**
```typescript
@Component({
  selector: 'app-skeleton',
  template: `<div class="animate-pulse bg-[#dadada]/50 rounded" [ngClass]="className"></div>`,
  standalone: true,
  imports: [CommonModule]
})
export class SkeletonComponent {
  @Input() className = '';
}
```

**Plain CSS:**
```css
.skeleton {
  background: rgba(218, 218, 218, 0.5);
  border-radius: 0.25rem;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

#### Shimmer Effect
```css
.shimmer {
  position: relative;
  overflow: hidden;
  background: #fafafa;
}
.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  animation: shimmer 2s infinite;
}
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
```

#### Spinner
```css
.spinner {
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid #dadada;
  border-top-color: #111111;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

### Responsive Breakpoints

**Tailwind (React/Next/Vue/Svelte/Angular with Tailwind):**
```tsx
className="
  px-4 md:px-6 lg:px-8
  text-sm md:text-base lg:text-lg
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
"
```

**Plain CSS:**
```css
.container { padding: 1rem; }
@media (min-width: 768px) { .container { padding: 1.5rem; } }
@media (min-width: 1024px) { .container { padding: 2rem; } }

.grid { display: grid; grid-template-columns: 1fr; gap: 1rem; }
@media (min-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
```

### Dark Mode

**Tailwind:**
```tsx
className="
  bg-white dark:bg-[#111111]
  text-[#111111] dark:text-white
  border-[#dadada] dark:border-[#333333]
"
```

**Plain CSS:**
```css
.card { background: #ffffff; color: #111111; }
@media (prefers-color-scheme: dark) {
  .card { background: #111111; color: #ffffff; }
}
/* Or with class toggle */
.dark .card { background: #111111; color: #ffffff; }
```

### Accessibility Requirements

Always include (syntax varies by framework):

**React/Next.js:**
```tsx
<button
  aria-label="Descriptive action"
  tabIndex={0}
  onKeyDown={(e) => e.key === 'Enter' && onClick()}
>
```

**Angular:**
```html
<button
  [attr.aria-label]="'Descriptive action'"
  (keydown.enter)="onClick()"
>
```

**Vue:**
```vue
<button
  :aria-label="'Descriptive action'"
  @keydown.enter="onClick"
>
```

**Svelte:**
```svelte
<button
  aria-label="Descriptive action"
  on:keydown={(e) => e.key === 'Enter' && onClick()}
>
```

**Plain HTML:**
```html
<button
  aria-label="Descriptive action"
  tabindex="0"
  onclick="handleClick()"
  onkeydown="if(event.key==='Enter')handleClick()"
>
```

---

## Preset Templates by Framework

### Marketplace Card

Use the framework-specific syntax from above. Core structure:
- Aspect-ratio image container with type badge
- Logo + title row
- Tagline with line clamp
- Category badge + view link

### Admin Data Table

Generate with:
- Sortable column headers
- Row hover states
- Pagination controls
- Loading skeleton state
- Framework-specific state management

### Form Layout

Generate with:
- Form section wrapper
- Input fields with labels
- Error states and messages
- Submit button with loading state
- Framework-specific form handling (React Hook Form, Angular Reactive Forms, etc.)

---

## Output Format

After generating components, always provide:

1. **Detected framework** - What was detected and used
2. **File list** - All files created with their paths
3. **Usage example** - How to import and use the component
4. **Props/Inputs documentation** - Quick reference for all props
5. **Next steps** - Suggestions for customization or integration

Example output format:
```
Framework: Next.js (detected from package.json)
TypeScript: Yes
Styling: Tailwind CSS

Created files:
- src/components/labs/ItemCard/ItemCard.tsx
- src/components/labs/ItemCard/ItemCard.types.ts
- src/components/labs/ItemCard/index.ts
- src/components/labs/ItemCard/ItemCard.test.tsx

Usage:
import { ItemCard } from '@/components/labs/ItemCard';
<ItemCard item={item} variant="featured" />

Next steps:
1. Add animation classes to your globals.css
2. Connect to your data fetching logic
```

---

## Naming Convention Detection

Before creating files, scan the existing codebase to match naming patterns:

1. Check existing component files for PascalCase vs kebab-case
2. Check if components use default exports or named exports
3. Check existing folder structure (flat vs nested)
4. Match the detected patterns in generated code

**Framework-specific conventions:**
| Framework | Component Names | File Names |
|-----------|----------------|------------|
| Next.js | PascalCase | PascalCase.tsx |
| React | PascalCase | PascalCase.tsx |
| Angular | PascalCase (class) | kebab-case.component.ts |
| Vue | PascalCase | PascalCase.vue |
| Svelte | PascalCase | PascalCase.svelte |
| Plain HTML | N/A | kebab-case.html |

---

## Styling System Detection

Also detect styling approach from package.json:

| Check | Styling System |
|-------|---------------|
| `tailwindcss` in deps | Tailwind CSS |
| `sass` or `scss` in deps | SCSS |
| `styled-components` in deps | Styled Components |
| `@emotion/react` in deps | Emotion |
| `.module.css` files exist | CSS Modules |
| None of above | Plain CSS |

Adapt generated code to use the detected styling system.
