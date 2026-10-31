import{u as a,j as e,f as o,h as r}from"./blocks-D_1oDeJu.js";import"./preload-helper-PPVm8Dsz.js";import"./react-DkC3XXtW.js";import"./iframe-Bil4wEDn.js";import"./lit-X1EjRepF.js";import"./react-dom-CPA3uLtk.js";import"./react/jsx-runtime-DldvXD6N.js";const i=`# Orchestra Design System

Orchestra is a design system monorepo built around Stencil web components, design tokens, and framework wrappers for React, Vue, and Angular.

## Repository structure

\`\`\`text
orchestra/
├── packages/
│   ├── core/                 # Stencil web components and component runtime
│   ├── themes/               # Token sources and generated theme bundles
│   ├── icons-library/        # Generated icon exports from SVG assets
│   ├── storybook/            # Storybook docs, stories, and component tests
│   ├── react/                # React wrapper package
│   ├── vue/                  # Vue wrapper package
│   ├── angular/              # Angular wrapper package
│   └── ...
├── .github/
│   ├── instructions/
│   ├── skills/
│   └── workflows/
├── package.json
├── lerna.json
├── tsconfig.json
├── eslint.config.mjs
├── README.md
└── LICENSE.txt
\`\`\`

## Design system principles

The repo follows a layered design-system model:

- Notes: raw values and primitive inputs
- Notations: token meaning and shared semantic structure
- Staves: reusable component primitives
- Scores and movements: composed patterns and page-level implementations
- Conductor: governance, tooling, and release workflows

This model is reflected in the package responsibilities: token ownership sits in the themes package, component implementation lives in the core package, and framework-specific wrappers are generated from the Stencil source.

## Canonical repo references

The repo’s source-of-truth documentation is intentionally small and explicit:

- [README.md](README.md) — repo overview and package map
- [packages/core/README.md](packages/core/README.md) — Stencil component runtime and implementation details
- [packages/themes/README.md](packages/themes/README.md) — token architecture and generated theme bundles
- [packages/storybook/README.md](packages/storybook/README.md) — stories, testing, and examples
- [.github/skills](.github/skills) — task-specific AI guidance for repo workflows
- [AGENTS.md](AGENTS.md) — repo-wide AI operating rules

If a package name, script, or package relationship changes, update the matching canonical docs in the same patch.

## Requirements

- Node.js 24+
- npm

## Quick start

\`\`\`bash
npm install
npm run build
npm run dev
\`\`\`

## Root scripts

\`\`\`bash
npm run dev             # run Storybook + core watch tasks
npm run build           # build tokens, then all workspaces
npm run build:tokens    # build theme package only
npm run lint            # run repo linting
npm run check:docs      # verify docs and AI guidance stay aligned
npm run check:api       # check core API changes against origin/main (after building core)
npm run check:design-tokens # check core component CSS for raw design values
npm run test            # run Storybook/Vitest once
npm run test:components # run Storybook component tests once
npm run test:integration # run consumer-facing Playwright tests
npm run test:all        # run Storybook tests, then Playwright tests
npm run release         # release-it workflow
\`\`\`

Build packages with \`npm run build\` before running tests. CI builds packages
in each test job and runs Storybook and Playwright suites in parallel, with
independent results. For Storybook watch mode, run
\`npm run test:components --workspace=@orchestra-design-system/storybook\`.

## Documentation sync check

Run \`npm run check:docs\` before shipping documentation or instruction updates. The script verifies the repo’s main source-of-truth files still describe the same package names, structure, and workflow boundaries.

## Package docs

- [packages/core/README.md](packages/core/README.md) — core Stencil components
- [packages/themes/README.md](packages/themes/README.md) — theme tokens and generated CSS bundles
- [packages/icons-library/README.md](packages/icons-library/README.md) — generated icon exports
- [packages/storybook/README.md](packages/storybook/README.md) — Storybook docs and interaction tests
- [packages/react/README.md](packages/react/README.md) — React wrapper usage
- [packages/vue/README.md](packages/vue/README.md) — Vue wrapper usage
- [packages/angular/README.md](packages/angular/README.md) — Angular wrapper usage

## Development workflow

1. Implement or update a Stencil component in [packages/core](packages/core).
2. Adjust theme tokens in [packages/themes](packages/themes) when visual primitives change.
3. Add or update Storybook examples in [packages/storybook](packages/storybook).
4. Build and verify with the repo scripts at the root.

## License

MIT
`;function s(n){return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Overview/Introduction"}),`
`,e.jsx(r,{children:i})]})}function k(n={}){const{wrapper:t}={...a(),...n.components};return t?e.jsx(t,{...n,children:e.jsx(s,{...n})}):s()}export{k as default};
//# sourceMappingURL=introduction-DkRqnJaw.js.map
