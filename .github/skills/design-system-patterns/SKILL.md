---
name: design-system-patterns
description: "External design-system reference (Atlassian, Carbon, Primer, Spectrum, etc.) for inspiration when designing new component APIs. Use only for pattern ideas - not a source of truth for Orchestra's actual implementation."
argument-hint: "Describe what you're designing (e.g., 'form inputs', 'dark theme strategy', 'button variants')"
user-invocable: true
---

# Design System Patterns (External Reference)

> **This skill is inspirational reference material, not repo truth.** None of the
> code snippets below exist in Orchestra. For Orchestra's actual component API,
> tokens, and conventions, use [stencil-components](../stencil-components/SKILL.md),
> [themes](../themes/SKILL.md), and read the real component source under
> `packages/core/src/components/`. Use this skill only when deciding on a new
> component's API shape and you want prior art.

## When to use this

- Designing a **new** component and want to compare how established systems
  shaped its props/states before committing to an Orchestra API.
- Deciding on a cross-cutting pattern (e.g. how error states are usually
  structured) with no existing Orchestra precedent to follow instead.

Do **not** use this to describe how Orchestra already works - check source first.

## Systems worth comparing

| System                                                                    | Tech                   | Notable for                                                                                                                |
| ------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Atlassian Design System](https://atlassian.design)                       | React                  | Token-first theming, compound components                                                                                   |
| [IBM Carbon](https://carbondesignsystem.com)                              | Web Components + React | Closest architectural parallel to Orchestra (WC source, framework wrappers)                                                |
| [GitHub Primer](https://primer.style)                                     | React                  | Compound components, developer ergonomics                                                                                  |
| [Adobe Spectrum](https://spectrum.adobe.com)                              | React Aria             | Accessibility/keyboard interaction patterns, headless behavior separated from styling                                      |
| [Shopify Polaris](https://polaris.shopify.com)                            | React                  | Form/validation UX patterns                                                                                                |
| [Shoelace](https://shoelace.style) / [WebAwesome](https://webawesome.com) | Web Components (Lit)   | Pure web-component patterns: slots, `attributeChangedCallback`, shadow DOM styling - most directly transferable to Stencil |

## Common cross-system patterns to consider

**Button-like components**: variants (primary/secondary/tertiary/danger/ghost),
sizes (small/medium/large), states (default/hover/active/disabled/loading).

**Form inputs**: label always visible, placeholder as hint (not label
replacement), error message + help text slots, required indicator, prefix/suffix
icon slots.

**Accessibility baseline** seen across all of them: full keyboard operability
(Tab/Enter/Escape/Arrows), ARIA roles matching native semantics where possible,
focus management on open/close, color never the sole state indicator.

**Theming**: CSS custom properties for all visual values, light/dark parity,
component tokens as the last layer over semantic tokens (matches Orchestra's
[primitive -> semantic -> component hierarchy](../themes/SKILL.md)).

## How to use this in practice

1. Check whether Orchestra already has a precedent (`grep_search` similar
   components under `packages/core/src/components/`).
2. If not, skim 1-2 relevant systems above for how they named props/states.
3. Translate to Orchestra conventions: Stencil `@Prop()`/`@Event()`, kebab-case
   tag (`orchestra-*`), design tokens instead of hardcoded values, ARIA per
   [stencil-components](../stencil-components/SKILL.md).
4. Write the component, stories, and tests per
   [stencil-components](../stencil-components/SKILL.md) and
   [story-testing](../story-testing/SKILL.md) - not per this skill.
