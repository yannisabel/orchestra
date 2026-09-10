---
name: stencil-components
description: 'Build flexible, token-driven Stencil components for Orchestra. Use when creating new UI components or extending existing ones. Covers component structure, props/variants, styling with design tokens, accessibility (ARIA), keyboard navigation, and Shadow/Light DOM decisions.'
argument-hint: "Describe the component (e.g., 'button with variants', 'form input', 'dropdown')"
user-invocable: true
---

# Stencil Components

## Overview

Orchestra uses **Stencil** to build reusable web components with multiple output targets (React, Vue, Angular, vanilla JS). Components are token-driven (pulling values from [themes](../themes/SKILL.md)), support dark/light themes automatically, and are tested in Storybook (v10.4.6) with Vitest (v4.1.9).

**Build Pipeline for this repo**:

- **CSS**: Vite-based styling and token compilation for the core package
- **JS**: `packages/core/stencil.config.ts` builds the web component package plus framework output targets for React, Vue, and Angular
- **Testing**: Storybook + Vitest with play functions under `packages/storybook`
- **Documentation**: Storybook stories and generated readmes in the core package

**Relevant repo paths**:

- `packages/core/src/components` - Stencil component implementation
- `packages/core/stencil.config.ts` - output target configuration and build pipeline
- `packages/storybook` - stories and interaction tests
- `packages/react`, `packages/vue`, `packages/angular` - generated wrapper packages

**Key principle**: One component = One semantic element with variants, props for states, token-based styling, and full accessibility.

## File Structure

```
packages/core/src/components/[component-name]/
├── [component-name].tsx          # Component logic (Stencil)
├── [component-name].css          # Styling with tokens
└── readme.md                     # Generated from JSDoc
```

Tests are **not** colocated as `*.spec.ts` here - see [story-testing](../story-testing/SKILL.md).

## Shadow vs Light DOM

| Decision           | Use Shadow                | Use Light              |
| ------------------ | ------------------------- | ---------------------- |
| Isolated styles    | ✅ Default                | ❌ Global styles apply |
| Form association   | ❌ Limited                | ✅ Full support        |
| Content projection | ✅ Slots                  | ❌ Direct nesting      |
| Focus delegation   | ✅ `delegatesFocus: true` | ✅ Natural             |
| **When to use**    | Most components           | Form controls, buttons |

## Procedure: Build a New Component

1. Scaffold the file structure above under `packages/core/src/components/<name>/`.
2. Add the `@Component({ tag: 'orchestra-<name>', styleUrl, shadow, formAssociated })` decorator - pick shadow vs light per the table above.
3. Define props/events/watchers/listeners - see [component-lifecycle](./references/component-lifecycle.md) for the native-form-element pattern and full API (`@Prop`, `@Event`, `@Watch`, `@Listen`).
4. Style with design tokens - see [styling-tokens](./references/styling-tokens.md).
5. Add ARIA attributes and keyboard support - see [accessibility-keyboard](./references/accessibility-keyboard.md).
6. Write Storybook stories/tests per [story-testing](../story-testing/SKILL.md) - not colocated `*.spec.ts` (see [component-conventions](../../instructions/component-conventions.instructions.md)).
7. Build: `npm run build --workspace=@orchestra-design-system/core` (or `build:js`/`build:css` individually).

See [complete-example](./references/complete-example.md) for a full button component wired end to end.

## Anti-Patterns

| Problem                                   | Issue                     | Fix                                          |
| ----------------------------------------- | ------------------------- | -------------------------------------------- |
| Using hard-coded colors                   | No theme support          | Use design tokens only                       |
| `@Prop` with complex objects              | TypeScript issues         | Use primitives (string, number, boolean)     |
| No keyboard support                       | Inaccessible              | Use `@Listen()` for keyboard events          |
| Missing ARIA attributes                   | Screen readers fail       | Add `aria-label`, `aria-described-by`, roles |
| Shadow DOM for form controls              | Can't associate with form | Use `formAssociated: true, shadow: false`    |
| No focus management                       | Tab order breaks          | Use `delegatesFocus: true` or manual focus   |
| Inline JSX styles                         | Can't use tokens          | Move all styles to CSS file                  |
| Creating new DOM elements with `document` | Breaks reactivity         | Use JSX `render()` method                    |

## Efficiency Tips

When working with LLMs on component development:

- Use targeted requests for specific component types (button, form input, etc.)
- Reference existing component examples instead of pasting full code
- Use [token-optimization](../token-optimization/SKILL.md) to explore component patterns without loading full files
- Store component templates in `/memories/repo/` for reuse

## References

- [component-lifecycle](./references/component-lifecycle.md) - props, events, watchers, listeners, native form-element pattern
- [styling-tokens](./references/styling-tokens.md) - CSS variable/token styling patterns
- [accessibility-keyboard](./references/accessibility-keyboard.md) - ARIA attributes, patterns, keyboard navigation
- [complete-example](./references/complete-example.md) - full button component (tsx + css)
- [themes](../themes/SKILL.md) - token structure and theming
- [story-testing](../story-testing/SKILL.md) - testing in Storybook
- [code-conventions](../code-conventions/SKILL.md) - naming and TypeScript rules
- [token-optimization](../token-optimization/SKILL.md) - reduce context when building components
- [Stencil Documentation](https://stenciljs.com/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Web Components Best Practices](https://webcomponents.dev/)
