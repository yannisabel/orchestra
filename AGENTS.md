# AGENTS.md

## Mission

This file defines the operating rules for AI agents working in the Orchestra monorepo. It covers:

- Building and maintaining Stencil web components with consistent design tokens
- Managing framework wrappers (React, Vue, Angular) aligned to the core source of truth
- Navigating the monorepo structure and enforcing package boundaries
- Writing tests, stories, and documentation following Orchestra conventions
- Optimizing workflow with targeted edits, verified fixes, and minimal scope creep

Orchestra is built around Stencil web components, design tokens, and framework wrappers, with a single source of truth in the core package.

## Communication style

- No greetings, restated requests, or closing summaries
- One clarifying question max, only if blocking
- Diffs/patches over full file reprints; no unchanged context repeated
- Bullets over prose for 2+ points; no decorative formatting
- Return only the requested artifact; avoid unnecessary explanation
- Targeted reads/greps over broad scans; stop after verification, don't over-explore
- Replace em dashes (—) with hyphens (-) in all output for keyboard compatibility
- Treat the repo docs as the canonical source of truth: root README, package READMEs, and active skill files should agree on package names, scripts, and structure
- When package layout, scripts, or framework names change, update the matching README and skill docs in the same change

## Repository map

- `packages/core/` — Stencil components and runtime behavior; source of truth
- `packages/themes/` — token sources and generated theme bundles
- `packages/icons-library/` — generated icon exports
- `packages/storybook/` — Storybook stories, examples, and interaction tests
- `packages/react/` — React wrapper package
- `packages/vue/` — Vue wrapper package
- `packages/angular/` — Angular wrapper package
- `README.md` — canonical repo overview
- `.github/instructions/` — repo-specific coding and behavior rules
- `.github/skills/` — task-specific workflow guidance

## Naming conventions

- **Files**: kebab-case (e.g., `my-button.tsx`)
- **Classes/Exports**: PascalCase (e.g., `MyButton`, `MyClass`)
- **Hooks**: `use*` prefix (e.g., `useTheme`)
- **Design Tokens**: primitive -> semantic -> component hierarchy
- **Component Tags**: `orchestra-{name}` (e.g., `orchestra-button`)

## Essential commands

Run from repository root unless otherwise noted.

```bash
# Build
npm run build                              # All packages
npm run build --workspace=@orchestra/core  # Core only

# Test & Lint
npm run test                               # Storybook/Vitest tests
npm run lint                               # Oxlint fix
npm run lint:check                         # Oxlint check
npm run check:docs                         # Validate docs-API sync

# Development
npm run dev                                # Storybook dev server
cd packages/storybook && npm run dev       # Storybook dev server (alternative)
```

## Working rules

- Prefer targeted reads and narrow edits over broad sweeps.
- Keep package boundaries intact: logic belongs in `packages/core`, token work belongs in `packages/themes`, and wrapper changes belong in the relevant framework package.
- Do not broaden scope without a clear reason.
- Update the matching docs when package layout, scripts, or public APIs change.
- Favor small, verifiable fixes over exploratory rewrites.
- Use `grep_search`/`semantic_search` with specific patterns instead of reading entire files; parallelize independent reads.
- Use `vscode_listCodeUsages()` to find symbol references without full file scans.
- Use a read-only subagent for unfamiliar code paths to avoid context bloat.

## Before editing

1. Check the relevant package README or source-of-truth docs before making assumptions.
2. Read only the exact component, story, or test files needed for the task.
3. Keep changes minimal and consistent with the repo's existing patterns.

## Validation

Run the smallest relevant verification command after a change:

- `npm run check:docs` when updating docs, package layout, or AI guidance
- `npm run lint` or `npm run lint:check` for code quality checks
- `npm run test` for Storybook/Vitest verification when changing UI behavior
- `npm run build` only when the change affects build output or cross-package wiring

## Guardrails

- Do not add new frameworks or packages without an explicit requirement.
- Do not modify generated output unless the source-of-truth change was intentional.
- Do not touch unrelated packages during a focused fix.
- Preserve accessibility, design-token usage, and Stencil conventions already used in the repo.
- Do not repeat context in follow-up questions (use `/memories/repo/`).
- Do not read entire files when grep/semantic search would work.
- Do not assume naming or structure without checking source files.

## Detailed guidance

Use the repo's existing files under `.github` for detailed implementation rules:

- `.github/instructions/` for scoped conventions (e.g. component conventions, npm audit workflow)
- `.github/skills/` for workflow-specific guidance and examples

## Expected agent output

For normal tasks, return:

1. What changed
2. Why the change was needed
3. Files touched
4. Verification performed
5. Any remaining risk or follow-up item

Keep the summary concise and evidence-based.
