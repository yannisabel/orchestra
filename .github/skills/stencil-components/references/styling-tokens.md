# Styling with Design Tokens

Reference detail for step 4 of [the build procedure](../SKILL.md#procedure-build-a-new-component). See also [themes](../../themes/SKILL.md) for the token hierarchy.

## CSS Variables

Use tokens in your component CSS:

```css
/* packages/core/src/components/button/button.css */

:host {
  --button-padding: var(--orchestra-button-primary-container-padding);
  --button-radius: var(--orchestra-button-primary-container-radius);
  display: inline-flex;
}

.orchestra-button {
  border: 0;
  border-radius: var(--button-radius);
  padding: var(--button-padding);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease-in-out;
}

/* Variant: Primary */
.orchestra-button--primary {
  background-color: var(--orchestra-color-action-primary-container-default);
  color: var(--orchestra-color-action-primary-content-default);
  border: 1px solid var(--orchestra-color-action-primary-border-default);
}

.orchestra-button--primary:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-hover);
  border-color: var(--orchestra-color-action-primary-border-hover);
}

.orchestra-button--primary:active:not(:disabled) {
  background-color: var(--orchestra-color-action-primary-container-active);
}

.orchestra-button--primary:disabled {
  background-color: var(--orchestra-color-action-primary-container-disabled);
  color: var(--orchestra-color-action-primary-content-disabled);
  cursor: not-allowed;
  opacity: 0.6;
}

/* Variant: Secondary */
.orchestra-button--secondary {
  background-color: var(--orchestra-color-action-secondary-container-default);
  color: var(--orchestra-color-action-secondary-content-default);
}

.orchestra-button--secondary:hover:not(:disabled) {
  background-color: var(--orchestra-color-action-secondary-container-hover);
}

/* Size: Small */
.orchestra-button--small {
  padding: var(--orchestra-button-primary-sizes-small-padding);
  font-size: var(--orchestra-font-size-sm);
}

/* Size: Large */
.orchestra-button--large {
  padding: var(--orchestra-button-primary-sizes-large-padding);
  font-size: var(--orchestra-font-size-lg);
}

/* Focus styles (accessibility) */
.orchestra-button:focus-visible {
  outline: 2px solid var(--orchestra-color-outline);
  outline-offset: 2px;
}

/* Disabled state */
.orchestra-button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
```

**Key patterns**:

- ✅ Use `var(--orchestra-*)` for all colors, spacing, typography
- ✅ Define variants with class names: `.orchestra-button--primary`, `.orchestra-button--secondary`
- ✅ Use pseudo-classes for states: `:hover`, `:active`, `:disabled`, `:focus-visible`
- ✅ Transitions for smooth interactions (150-300ms)
- ❌ Don't hardcode colors or spacing
- ❌ Don't forget focus/accessibility states
