# @orchestra-design-system/themes

Theme entry points for the Orchestra design system.

This package is the recommended public entry point for applications and Storybook. It owns primitive, semantic, and component token sources and generates ready-to-use light and dark theme bundles.

## Design Tokens Architecture

Tokens follow a three-tier structure, moving from raw, meaningless values to fully contextualized, component-specific values. This mirrors the **Notes → Notations** flow described in the Orchestra anatomy.

```
Primitive → Semantic → Component (when needed)
```

| Tier          | Orchestra role | Purpose                                                                           |
| ------------- | -------------- | --------------------------------------------------------------------------------- |
| **Primitive** | Notes          | Raw values with no meaning (a color, a spacing unit, a font size)                 |
| **Semantic**  | Notations      | Adds meaning and context — _what is this value for_                               |
| **Component** | Notations      | Adds specificity when a component needs to deviate from or extend semantic tokens |

A token should only exist at the component tier if the semantic tier doesn't already cover the need — this keeps the system lean and avoids duplicating meaning that already exists one layer down.

### Naming convention

```
Primitive:  orchestra – [type] – [value]
Semantic:   orchestra – [type] – [domain] – [variant] – [target] – [state]
Component:  orchestra – [component] – [variant] – [target] – [property] – [state]
```

### Segment reference

**Type** — _the category of value_

| Value     | Use for                                        |
| --------- | ---------------------------------------------- |
| `color`   | Colors (backgrounds, text, borders, icons)     |
| `font`    | Typography (family, size, weight, line-height) |
| `radius`  | Corner radius                                  |
| `spacing` | Margins, padding, gaps                         |

**Component** — _which component the token applies to_
This is used only on the component level design tokens. It takes the name of the component itself.

**Domain** — _what area of the product this token belongs to_

| Value       | Use for                                                  |
| ----------- | -------------------------------------------------------- |
| `global`    | Values shared across all domains                         |
| `neutral`   | Neutral UI elements only contqining or displaying things |
| `action`    | Interactive/actionable elements (buttons, links)         |
| `selection` | Selection states (checkboxes, radios, active items)      |
| `edition`   | Editing contexts (inputs, forms)                         |

**Variant** — _the visual weight/priority of the element_

| Value       | Use for          |
| ----------- | ---------------- |
| `primary`   | Highest emphasis |
| `secondary` | Medium emphasis  |
| `tertiary`  | Lowest emphasis  |

**Target** — _which part of the element the token applies to_

| Value        | Use for                                           |
| ------------ | ------------------------------------------------- |
| `container`  | The outer wrapper/background area                 |
| `content`    | Text, icons, inner content                        |
| `border`     | Border color/style                                |
| `radius`     | Corner radius                                     |
| `decoration` | Supplementary visual elements (dividers, accents) |

**Component** — _which CSS property the token applies to_
This is used only on the component level design tokens. It takes the name of the CSS property.

**State** — _the interaction state_

| Value      | Use for                  |
| ---------- | ------------------------ |
| `default`  | Resting state            |
| `hover`    | Pointer hover            |
| `active`   | Pressed/engaged          |
| `disabled` | Non-interactive          |
| `readonly` | Visible but not editable |

### Worked example

A real token chain from the button component, moving through all three tiers:

```
Primitive:  number.full
              ↓ given meaning in the action radius domain
Semantic:   radius.action.primary.container
              ↓ scoped to the button component
Component:  button.primary.container.radius
              ↓ consumed by the button styles
CSS usage:  var(--orchestra-button-primary-container-radius)
```

- **Primitive** — raw radius value with no UI meaning by itself.
- **Semantic** — adds meaning: this is the radius for a primary action container.
- **Component** — binds that semantic intent to the button implementation.
- **Usage in code** — this is used directly in the button styles in `packages/core/src/components/button/button.css`.

### Decision guide

When naming a new token, ask:

1. **Does it carry meaning yet?** No → primitive.
2. **Can an existing semantic token express this in any component?** Yes → use it, don't create a component token.
3. **Does only one specific component need this exact value?** Yes → component token, scoped to that component's variant/target/property/state.

### Where tokens live

Primitive and semantic tokens are defined in [`packages/themes`](packages/themes/README.md). Component tokens (when needed) live alongside their component in [`packages/core`](packages/core/README.md).

---

**Open items to confirm:**

1. Full `type` list — confirm whether `shadow`, `border-width`, `opacity`, `z-index`, etc. are in use.
2. File path for component tokens — confirm whether they live in `packages/core` or are co-located per-component elsewhere.

## How it works

- Token sources live in `tokens/`.
- The build uses Style Dictionary to generate CSS variables per theme.
- Consumers should import this package, not internal token build files.

## Usage

```css
@import '@orchestra-design-system/themes/light.css';
@import '@orchestra-design-system/themes/dark.css';
```

## Files

- dist/css/light.css
- dist/css/dark.css

## Build

```bash
npm run build
```
