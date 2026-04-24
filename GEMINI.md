# Project Context: jcarlov.eth Portfolio

This document provides foundational instructions and context for Gemini CLI when working on this repository.

## Project Overview
This is a modern, Web3-enabled personal portfolio and blog for **Juan Carlos Vásquez**. The project highlights expertise in Artificial Intelligence (Skinner), software consultancy (Yultic), and blockchain development.

### Core Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Library:** React 19
- **Styling:** Tailwind CSS 4 (using OKLCH colors and modern `@theme` syntax)
- **Language:** TypeScript
- **Web3:** RainbowKit, Wagmi, Viem (Target Chain: Base)
- **Deployment:** Static Export (`output: "export"`) optimized for IPFS/ENS.

## Architecture & Conventions
- **Routing:** Uses Next.js App Router. Main landing at `/`, portfolio at `/portfolio`.
- **Styling:** Uses Tailwind 4. Custom animations (gold-shimmer, gradient-mesh) are defined in `app/globals.css`.
- **Components:** Modular structure in `components/`. UI primitives (buttons, cards) are in `components/ui/`.
- **Web3 Integration:** Managed via `components/web3-provider.tsx`. Requires `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` for full functionality.
- **IPFS Compatibility:** 
    - `next.config.ts` uses `trailingSlash: true` to ensure folder-based indexing (e.g., `/portfolio/index.html`).
    - Assets should use relative paths (e.g., `yo.jpeg` instead of `/yo.jpeg`) to load correctly via IPFS gateways.

## Building and Running
- **Development:** `npm run dev`
- **Build (Static Export):** `npm run build`
    - Generates output in the `out/` directory.
- **Linting:** `npm run lint`

## Development Guidelines
- **TypeScript:** Always maintain strict type safety. A `next-env.d.ts` file exists to handle CSS module declarations.
- **Styling:** Use Tailwind utility classes. For custom luxury-tech aesthetics, refer to the OKLCH variables in `globals.css`.
- **IPFS Safety:** When adding new images or internal links, ensure they are compatible with static relative paths. Avoid absolute paths starting with `/`.
- **Web3:** When modifying blockchain interactions, ensure compatibility with the `Base` chain as configured in the provider.

## Key Files
- `next.config.ts`: Deployment and build configuration.
- `app/layout.tsx`: Root layout with font and Web3 provider setup.
- `app/globals.css`: Tailwind 4 theme and global styles.
- `components/web3-provider.tsx`: RainbowKit and Wagmi configuration.
