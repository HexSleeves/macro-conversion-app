# Project Structure

## Root Directory

```
├── src/                    # Source code
├── public/                 # Static assets
├── .kiro/                  # Kiro configuration
├── node_modules/           # Dependencies
├── package.json            # Project configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
├── components.json         # Shadcn/ui configuration
└── README.md               # Documentation
```

## Source Structure (`src/`)

```
src/
├── components/             # Reusable React components
│   ├── ui/                # Shadcn/ui components (auto-generated)
│   └── Header.tsx         # App header component
├── lib/                   # Utility functions and helpers
│   └── utils.ts           # Common utilities (cn function)
├── routes/                # TanStack Router file-based routes
│   ├── __root.tsx         # Root layout component
│   └── index.tsx          # Home page route
├── main.tsx               # Application entry point
├── routeTree.gen.ts       # Auto-generated route tree
├── styles.css             # Global styles and Tailwind imports
├── logo.svg               # App logo
└── reportWebVitals.ts     # Performance monitoring
```

## Conventions

### File Naming

- Components: PascalCase (e.g., `Header.tsx`)
- Utilities: camelCase (e.g., `utils.ts`)
- Routes: lowercase with special TanStack naming (`__root.tsx`, `index.tsx`)

### Import Patterns

- Use `@/` alias for src imports: `import { cn } from '@/lib/utils'`
- Component imports: `import Header from '@/components/Header'`
- Route imports: `import { Link } from '@tanstack/react-router'`

### Component Structure

- Export default for main components
- Use TypeScript interfaces for props
- Leverage Tailwind classes with `cn()` utility for conditional styling

### Routing

- File-based routing in `src/routes/`
- Root layout in `__root.tsx` with `<Outlet />` for child routes
- Route components export via `createFileRoute()` or `createRoute()`
- Auto-generated route tree in `routeTree.gen.ts` (do not edit manually)

### Styling

- Tailwind CSS utility classes
- Use `cn()` function from `@/lib/utils` for conditional classes
- Shadcn/ui components follow design system patterns
- CSS variables for theming support
