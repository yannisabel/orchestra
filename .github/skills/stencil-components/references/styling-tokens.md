# Styling with Design Tokens

Reference detail for step 4 of [the build procedure](../SKILL.md#procedure-build-a-new-component). See also [themes](../../themes/SKILL.md) for the token hierarchy.

## CSS Variables

Use tokens in your component CSS:

```css
/* packages/core/src/components/button/button.css */
/* Parts for structure, data-* for state. No classes, no tag selectors. */

:host {
  --button-padding: var(--orchestra-button-primary-container-padding);
  --button-radius: var(--orchestra-button-primary-container-radius);
  display: inline-flex;
}

[part='button'] {
  border: 0;
  border-radius: var(--button-radius);
  padding: var(--button-padding);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
}

/* Variant: Primary */
[part='button'][data-variant='primary'] {
  background-color: var(--orchestra-color-action-primary-container-default);
  color: var(--orchestra-color-action-primary-content-default);
  border: 1px solid var(--orchestra-color-action-primary-border-default);
}

[part='button'][data-variant='primary']:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-hover);
  border-color: var(--orchestra-color-action-primary-border-hover);
}

[part='button'][data-variant='primary']:active:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-active);
}

/* Variant: Secondary */
[part='button'][data-variant='secondary'] {
  background-color: var(--orchestra-color-action-secondary-container-default);
  color: var(--orchestra-color-action-secondary-content-default);
}

[part='button'][data-variant='secondary']:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-secondary-container-hover);
}

/* Disabled state: the host exposes data-disabled */
[part='button'][data-disabled] {
  background-color: var(--orchestra-color-action-primary-container-disabled);
  color: var(--orchestra-color-action-primary-content-disabled);
  cursor: not-allowed;
}

/* Focus styles (accessibility) */
[part='button']:focus-visible {
  outline: 2px solid var(--orchestra-color-action-inner-ring);
  outline-offset: 2px;
}
```

**Key patterns**:

- Use `var(--orchestra-*)` for all colors, spacing, typography
- Select with `[part='...']` and style variants and states with `data-*` attribute selectors, e.g. `[part='button'][data-variant='primary']`
- Use native pseudo-classes for states: `:hover`, `:active`, `:disabled`, `:focus-visible`
- Transitions for smooth interactions (150-300ms)
- Do not hardcode colors or spacing
- Do not forget focus/accessibility states
