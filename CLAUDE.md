# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Management & Development

- **Install dependencies**: `bun install`
- **Start development server**: `bun run dev` or `bun run start` (runs on port 3000)
- **Build for production**: `bun run build` (runs vite build + tsc)
- **Preview production build**: `bun run serve`

### Testing

- **Run all tests**: `bun run test` (uses Vitest)
- **Run tests for a single file**: `bun run test src/path/to/file.test.ts`

### Code Quality

- **Run linter/formatter**: `bun run check` (uses Biome)
- **Run linter with auto-fix**: `bun run check:write`
- **Run linter with unsafe fixes**: `bun run check:unsafe`

### Adding UI Components

- **Add Shadcn components**: `pnpx shadcn@latest add [component-name]`

## Architecture Overview

### Core Application Structure

This is a **macro cooking calculator** built with React and TypeScript that helps users calculate nutritional information for foods before and after cooking.

### Key Technologies

- **Framework**: React 19 with TypeScript
- **Routing**: TanStack Router (file-based routing in `src/routes/`)
- **Styling**: Tailwind CSS v4 with Shadcn/ui components
- **State Management**: React state (no global state store currently - empty `src/stores/` directory)
- **Forms**: React Hook Form with Zod validation
- **Testing**: Vitest with React Testing Library
- **Build Tool**: Vite
- **Code Quality**: Biome (linting and formatting)

### Application Domain

The app calculates macro nutrients (calories, protein, carbs, fat, fiber) for foods, accounting for weight changes during cooking. Core calculations include:

- Cooking loss percentage calculation
- Macro adjustment based on weight changes
- Nutrient density per 100g (raw vs cooked)
- Weight unit conversions (g, oz, lb, kg)

### Project Structure

- **Components**: Located in `src/components/` with co-located tests in `__tests__/`
  - `MacroCalculator.tsx` - Main calculator component
  - `FoodForm.tsx` - Form for inputting food data
  - `MacroDisplay.tsx` - Displays calculated results
  - `SavedFoods.tsx` - Manages saved food entries
  - `ui/` - Shadcn/ui components
- **Types**: Core types defined in `src/lib/types.ts` (FoodData, MacroData, CalculationResults, etc.)
- **Business Logic**: Calculations and utilities in `src/lib/`
  - `calculations.ts` - Core macro calculation functions
  - `validations.ts` - Form validation logic
  - `weightUtils.ts` - Unit conversion utilities
- **Routing**: File-based routing with `__root.tsx` containing Header layout

### Code Conventions

- **Styling**: Uses Tailwind CSS with tab indentation (configured in Biome)
- **Imports**: Path alias `@/*` maps to `src/*`
- **Code Style**: Enforced by Biome with double quotes for JavaScript
- **TypeScript**: Strict mode enabled with comprehensive type checking
- **Testing**: Tests co-located with components and utilities

### Key Configuration Files

- `biome.json` - Biome linter/formatter configuration
- `vite.config.ts` - Vite build configuration with TanStack Router plugin
- `vitest.config.ts` - Test configuration with jsdom environment
- `tsconfig.json` - TypeScript configuration with strict settings
