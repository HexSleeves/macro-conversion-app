# Technology Stack

## Core Technologies

- **React 19** - Latest React with modern features
- **TypeScript 5.7** - Strict type checking enabled
- **Vite 6** - Build tool and dev server
- **Bun** - Package manager and runtime

## Key Libraries

- **TanStack Router** - File-based routing with type safety
- **Tailwind CSS 4** - Utility-first styling
- **Shadcn/ui** - Component library (New York style)
- **Lucide React** - Icon library
- **Vitest** - Testing framework with jsdom

## Utility Libraries

- `clsx` + `tailwind-merge` - Conditional CSS classes
- `class-variance-authority` - Component variants
- `web-vitals` - Performance monitoring

## Development Setup

### Common Commands

```bash
# Install dependencies
bun install

# Start development server (port 3000)
bun run dev
# or
bun run start

# Build for production
bun run build

# Run tests
bun run test

# Preview production build
bun run serve
```

### Adding Shadcn Components

```bash
pnpx shadcn@latest add button
```

## Configuration Notes

- Path aliases: `@/*` maps to `./src/*`
- Strict TypeScript with unused variable checking
- Auto code splitting enabled for routes
- CSS variables enabled for theming
- Base color: zinc
