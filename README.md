# React Vite Template

The tiny 16kb app that could.

- Started with the official Vite React Typescript template
- Swaps React for Preact under the hood via resolve.alias, so small bundle size and totally inter-compatible
  - Why use React at all? Because Vitest and Storybook dislike Preact.
- linting and formatting c/o eslint + prettier
- path alias for ~ --> ./src
- Vitest testing
- Storybook previewing
- slimr for css-in-js
- stackr router - a tiny SPA-first router that supports route stacks (like react-native-navigation but small and for web)
- ureact/useSWR - a tiny stale-while-refresh hook that fetches data and returns the cached data while you wait
- Global Html Tag components that are loaded with chakra-like css props, zx, \_hover,\_active, css and style shorthands

Roadmap: <https://github.com/users/bdombro/projects/2>
