---
name: themes
description: 'Manage Orchestra design tokens for flexible UI theming. Use when adding new token categories, extending themes (dark/light), or understanding token structure. Covers token hierarchy (primitive/semantic/component), CSS variable generation, theme switching, and Style Dictionary configuration.'
argument-hint: "Describe what you're adding (e.g., 'new color category', 'spacing tokens', 'dark theme override')"
user-invocable: true
---

# Design Tokens

## Overview

Orchestra uses **Style Dictionary v5** to manage design tokens in a hierarchical, maintainable structure. Tokens flow through three levels (Primitive → Semantic → Component) and are transformed into CSS custom properties (`light.css` and `dark.css`) for use in components.

**Key principle**: Tokens are declarative DTCG format (Design Token Community Group) that generates theme-aware CSS variables automatically.

## Token Hierarchy

### Level 1: Primitive Tokens

Raw design values—colors, spacing, typography. **Not exported to CSS** (used as references only).

```json
// packages/themes/tokens/primitive.json
{
  "color": {
    "purple": {
      "50": { "$type": "color", "$value": "#feeaff" },
      "100": { "$type": "color", "$value": "#e8d1ff" },
      "200": { "$type": "color", "$value": "#d1b3ff" }
    },
    "grey": {
      "950": { "$type": "color", "$value": "#0d0c10" },
      "900": { "$type": "color", "$value": "#1a1820" }
    }
  },
  "spacing": {
    "xs": { "$type": "dimension", "$value": "0.25rem" },
    "sm": { "$type": "dimension", "$value": "0.5rem" },
    "md": { "$type": "dimension", "$value": "1rem" }
  },
  "radius": {
    "sm": { "$type": "dimension", "$value": "0.25rem" },
    "md": { "$type": "dimension", "$value": "0.5rem" },
    "lg": { "$type": "dimension", "$value": "1rem" }
  }
}
```

### Level 2: Semantic Tokens

Meaningful references tied to **states and actions**. These reference primitives and are exported to CSS.

```json
// packages/themes/tokens/semantic.light.json (dark values live in semantic.dark.json)
{
  "color": {
    "action": {
      "primary": {
        "container": {
          "default": { "$type": "color", "$value": "{color.purple.600}" },
          "hover": { "$type": "color", "$value": "{color.purple.700}" },
          "active": { "$type": "color", "$value": "{color.purple.800}" },
          "disabled": { "$type": "color", "$value": "{color.grey.800}" }
        },
        "content": {
          "default": { "$type": "color", "$value": "{color.grey.50}" },
          "hover": { "$type": "color", "$value": "{color.grey.50}" },
          "disabled": { "$type": "color", "$value": "{color.grey.600}" }
        }
      },
      "secondary": {
        // Similar structure for secondary variant
      }
    },
    "outline": { "$type": "color", "$value": "{color.blue.500}" },
    "background": { "$type": "color", "$value": "{color.grey.50}" },
    "text": { "$type": "color", "$value": "{color.grey.950}" }
  },
  "spacing": {
    "action": {
      "primary": {
        "container": {
          "padding-block": { "$type": "dimension", "$value": "{spacing.md}" },
          "padding-inline": { "$type": "dimension", "$value": "{spacing.lg}" }
        }
      }
    }
  },
  "radius": {
    "action": {
      "primary": {
        "container": { "$type": "dimension", "$value": "{radius.md}" }
      }
    }
  }
}
```

### Level 3: Component Tokens

Component-specific overrides and compositions. Reference semantic tokens and define component-level defaults.

```json
// packages/themes/tokens/component.light.json (dark values live in component.dark.json)
{
  "button": {
    "primary": {
      "container": {
        "radius": {
          "$type": "dimension",
          "$value": "{radius.action.primary.container}"
        },
        "padding": {
          "$type": "dimension",
          "$value": "{spacing.action.primary.container.padding-block}"
        }
      },
      "focus": {
        "outer-ring": {
          "color": { "$type": "color", "$value": "{color.outline}" },
          "width": { "$type": "dimension", "$value": "2px" }
        }
      }
    }
  },
  "focus": {
    "outer-ring": {
      "color": { "$type": "color", "$value": "{color.outline}" },
      "offset": { "$type": "dimension", "$value": "2px" },
      "width": { "$type": "dimension", "$value": "2px" }
    }
  }
}
```

## CSS Variable Naming Convention

Generated CSS variables follow this pattern:

```
--orchestra-{category}-{property}-{state}
```

**Examples**:

```css
--orchestra-color-action-primary-container-default
--orchestra-color-action-primary-container-hover
--orchestra-button-primary-container-radius
--orchestra-spacing-action-primary-container-padding-block
```

**Rules**:

- All lowercase, kebab-case
- Primitives are **NOT included** (filtered out during generation)
- Semantic and component tokens **ARE included**
- States (hover, active, disabled, focus) are part of the name

## Theme Support

### Light Theme (Default)

**Files**: `packages/themes/tokens/primitive.json` + `semantic.light.json` + `component.light.json`

Generated to: `packages/themes/dist/css/light.css`

Scoped to:

```css
:root,
:host,
.orchestra-theme--light {
  color-scheme: light;
}
:root,
:host,
.orchestra-theme--light {
  --orchestra-color-action-primary-container-default: #7b55ad;
  /* ... all tokens */
}
```

### Dark Theme

**Files**: `packages/themes/tokens/primitive.json` + `semantic.dark.json` + `component.dark.json`

Define only the tokens that differ in dark mode. Values use the same DTCG format and reference primitives:

```json
{
  "color": {
    "action": {
      "primary": {
        "container": {
          "default": { "$type": "color", "$value": "{color.purple.500}" }
        }
      }
    },
    "background": { "$type": "color", "$value": "{color.grey.950}" }
  }
}
```

Generated to: `packages/themes/dist/css/dark.css`

Scoped to:

```css
:host,
.orchestra-theme--dark {
  --orchestra-color-action-primary-container-default: #9066d9;
  --orchestra-color-background: #0d0c10;
  /* ... dark overrides */
}
```

**Theme switching** (in component):

```typescript
// Light (default)
<orchestra-button>Light Button</orchestra-button>

// Dark
<div class="orchestra-theme--dark">
  <orchestra-button>Dark Button</orchestra-button>
</div>
```

## Build & Generation

### Build Script

**File**: `packages/themes/build.mjs` (run by `npm run build` in `packages/themes`)

It registers the `name/kebab-no-alias-no-component` and `sizePxToRem` transforms, then emits one CSS file per theme. Primitives are filtered out of the output.

### Build Commands

```bash
# Full build (light + dark), from the repo root
npm run build:design-tokens

# Monitor token naming and light/dark parity after the build
npm run monitoring:themes
```

**Output**:

```
packages/themes/dist/
└── css/
    ├── light.css
    └── dark.css
```

Package entry points: `@orchestra-design-system/themes/light.css` and `@orchestra-design-system/themes/dark.css`.

## Token Design Rules

Separate rules that the monitoring tool can check from decisions that need design judgment.

### Rules the monitor can check

The current monitor is implemented in `packages/themes/monitoring.mjs` and runs with `npm run monitoring:themes` after the build. It checks that:

- Primitive, semantic, and component token names start with a root allowed for that tier, and later segments match configured words or patterns.
- Semantic and component token paths are present in both light and dark theme outputs.
- A token does not directly alias another token in the same tier.

The monitor does not enforce the order of later name segments, require every naming column to be present, or decide whether a component token adds useful meaning. Update `PRIMITIVE_COLUMNS`, `SEMANTIC_COLUMNS`, or `COMPONENT_COLUMNS` in `monitoring.mjs` when the allowed naming vocabulary changes.

### Rules that need design judgment

- Create a component token only when it expresses component-specific meaning or provides an intentional way to configure that component independently.
- If a semantic token already expresses the needed meaning and supports the system's intended reuse, use it directly rather than adding a component token only as an alias.
- Consider whether components need to vary independently. For example, a button may need different inline and block padding while a checkbox uses uniform padding. A component token is meaningful when it allows that real distinction to change without affecting another component.
- Do not add component tokens only for a hypothetical future need. Keep a component token when its independent configuration is an actual design requirement.

An alias from a component token to a semantic token is not, by itself, proof of redundancy. Review its purpose and use: it may be an intentional component-level override point. The monitor can report structure and usage, but this decision remains with a human reviewer.

## Adding New Tokens

### Step 1: Identify the Level

- **Primitive**: Raw colors, spacing, typography values → Add to `primitive.json`
- **Semantic**: Actions, states, semantic meaning → Add to `semantic.light.json` and `semantic.dark.json`
- **Component**: Component-specific → Add to `component.light.json` and `component.dark.json`

### Step 2: Use DTCG Format

```json
{
  "$type": "color|dimension|fontWeight|etc",
  "$value": "#hexcolor or {reference} or value",
  "$description": "Human-readable description (optional)"
}
```

### Step 3: Reference Existing Tokens

Reference a lower-tier token when it expresses the intended meaning, rather than duplicating its raw value. A component token may use a direct value when it represents an intentional component-specific setting that needs to vary independently.

```json
{
  "color": {
    "success": { "$value": "{color.green.600}" } // ✅ Reference primitive
  }
}
```

**Avoid duplicating a primitive value in a semantic token**:

```json
{
  "color": {
    "success": { "$value": "#22c55e" } // ❌ Hardcode value
  }
}
```

### Step 4: Rebuild & Test

```bash
npm run build:design-tokens

# Verify output in packages/themes/dist/css/
# Light: <link rel="stylesheet" href="@orchestra-design-system/themes/light.css" />
# Dark: <link rel="stylesheet" href="@orchestra-design-system/themes/dark.css" />
```

## Complete Example: Adding a "Warning" Color

### 1. Add to Primitive (`primitive.json`)

```json
{
  "color": {
    "amber": {
      "50": { "$type": "color", "$value": "#fffbeb" },
      "600": { "$type": "color", "$value": "#d97706" },
      "700": { "$type": "color", "$value": "#b45309" },
      "800": { "$type": "color", "$value": "#92400e" }
    }
  }
}
```

### 2. Add to Semantic (`semantic.light.json` and `semantic.dark.json`)

```json
{
  "color": {
    "action": {
      "warning": {
        "container": {
          "default": { "$type": "color", "$value": "{color.amber.600}" },
          "hover": { "$type": "color", "$value": "{color.amber.700}" },
          "active": { "$type": "color", "$value": "{color.amber.800}" }
        },
        "content": {
          "default": { "$type": "color", "$value": "{color.grey.950}" },
          "hover": { "$type": "color", "$value": "{color.grey.950}" }
        }
      }
    }
  }
}
```

### 3. Add Dark Override (`semantic.dark.json`)

```json
{
  "color": {
    "action": {
      "warning": {
        "container": {
          "default": { "$type": "color", "$value": "{color.amber.500}" },
          "hover": { "$type": "color", "$value": "{color.amber.600}" }
        }
      }
    }
  }
}
```

### 4. Build & Use in Component

```bash
npm run build --workspace=@orchestra-design-system/themes
```

**Now available in CSS**:

```css
var(--orchestra-color-action-warning-container-default)
var(--orchestra-color-action-warning-container-hover)
var(--orchestra-color-action-warning-content-default)
```

## Token Structure Best Practices

| Do ✅                                              | Don't ❌                               |
| -------------------------------------------------- | -------------------------------------- |
| Group by semantic meaning                          | Use component names in semantic tokens |
| Reference lower levels                             | Hardcode values in higher levels       |
| Name by intent (primary, success, warning)         | Name by color (purple, red, blue)      |
| Include state variations (hover, active, disabled) | Single token per concept               |
| Document complex tokens with `$description`        | Leave tokens undocumented              |
| Test light & dark themes together                  | Only test one theme                    |

## Token Composition for Components

### Button with Multiple States

```json
{
  "button": {
    "primary": {
      "sizes": {
        "small": { "padding": "{spacing.xs}", "fontSize": "{font.size.sm}" },
        "medium": { "padding": "{spacing.md}", "fontSize": "{font.size.md}" },
        "large": { "padding": "{spacing.lg}", "fontSize": "{font.size.lg}" }
      }
    }
  }
}
```

**Usage in Stencil component** (see [stencil-components](../stencil-components/SKILL.md)):

```css
[part='button'][data-size='small'] {
  padding: var(--orchestra-button-primary-sizes-small-padding);
}
```

## Efficiency Tips

When working with LLMs, be specific about token-related tasks:

- Ask for specific token file locations (primitive/semantic/component) to avoid scanning entire files
- Reference this skill instead of pasting token file structures
- Use [token-optimization](../token-optimization/SKILL.md) to gather token info efficiently

## References

- [token-optimization](../token-optimization/SKILL.md) — Efficient token exploration
- [Design Token Community Group](https://tr.designtokens.org/)
- [Style Dictionary v5 Documentation](https://styledictionary.com/)
- [Theme build script](../../../packages/themes/build.mjs)
- [stencil-components](../stencil-components/SKILL.md) — How to use tokens in components
