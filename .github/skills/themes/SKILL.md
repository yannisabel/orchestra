---
name: themes
description: 'Manage Orchestra design tokens for flexible UI theming. Use when adding new token categories, extending themes (dark/light), or understanding token structure. Covers token hierarchy (primitive/semantic/component), CSS variable generation, theme switching, and Style Dictionary configuration.'
argument-hint: "Describe what you're adding (e.g., 'new color category', 'spacing tokens', 'dark theme override')"
user-invocable: true
---

# Design Tokens

## Overview

Orchestra uses **Style Dictionary v5.1.1** to manage design tokens in a hierarchical, maintainable structure. Tokens flow through three levels (Primitive → Semantic → Component) and are transformed into CSS variables, JSON, and JS exports for use in components.

**Key principle**: Tokens are declarative DTCG format (Design Token Community Group) that generates theme-aware CSS variables automatically.

## Token Hierarchy

### Level 1: Primitive Tokens

Raw design values—colors, spacing, typography. **Not exported to CSS** (used as references only).

```json
// packages/themes/tokens/primitive.json
{
  "vibrant": {
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
// packages/themes/tokens/semantic.json
{
  "color": {
    "action": {
      "primary": {
        "container": {
          "default": { "$type": "color", "$value": "{vibrant.purple.600}" },
          "hover": { "$type": "color", "$value": "{vibrant.purple.700}" },
          "active": { "$type": "color", "$value": "{vibrant.purple.800}" },
          "disabled": { "$type": "color", "$value": "{vibrant.grey.800}" }
        },
        "content": {
          "default": { "$type": "color", "$value": "{vibrant.grey.50}" },
          "hover": { "$type": "color", "$value": "{vibrant.grey.50}" },
          "disabled": { "$type": "color", "$value": "{vibrant.grey.600}" }
        }
      },
      "secondary": {
        // Similar structure for secondary variant
      }
    },
    "outline": { "$type": "color", "$value": "{vibrant.blue.500}" },
    "background": { "$type": "color", "$value": "{vibrant.grey.50}" },
    "text": { "$type": "color", "$value": "{vibrant.grey.950}" }
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
// packages/themes/tokens/component.json
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

**File**: `packages/themes/tokens/primitive.json` + `packages/themes/tokens/semantic.json`

Generated to: `dist/css/variables.light.css`

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

**File**: `packages/themes/tokens/gen-tokens.dark.json5`

Override only the tokens that differ in dark mode:

```json5
{
  color: {
    action: {
      primary: {
        container: {
          default: { $value: '{vibrant.purple.500}' }, // Lighter in dark
          hover: { $value: '{vibrant.purple.600}' },
        },
      },
    },
    background: { $value: '{vibrant.grey.950}' }, // Dark background
    text: { $value: '{vibrant.grey.50}' }, // Light text
  },
}
```

Generated to: `dist/css/variables.dark.css`

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

### Style Dictionary Configuration

**File**: `packages/themes/sd.config.js`

```javascript
const StyleDictionary = require('style-dictionary')
const fs = require('fs')

// Define transformers (px → rem, custom naming)
StyleDictionary.registerTransform({
  name: 'name/kebab-no-alias-no-component',
  type: 'name',
  transformer: (token) => {
    // Filters out alias & component levels, converts to kebab-case
    const path = token.path
      .filter((p) => p !== 'alias' && p !== 'component')
      .join('-')
      .toLowerCase()
    return `orchestra-${path}`
  },
})

// Build light theme
const lightConfig = {
  source: [
    'tokens/primitive.json',
    'tokens/semantic.json',
    'tokens/component.json',
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      files: [{ destination: 'dist/css/variables.light.css' }],
    },
  },
}

// Build dark theme (merge with primitives)
const darkConfig = {
  source: [
    'tokens/primitive.json',
    'tokens/semantic.json',
    'tokens/gen-tokens.dark.json5',
  ],
  platforms: {
    css: { files: [{ destination: 'dist/css/variables.dark.css' }] },
  },
}

new StyleDictionary(lightConfig).buildAllPlatforms()
new StyleDictionary(darkConfig).buildAllPlatforms()
```

### Build Commands

```bash
# Full build (light + dark)
npm run build --workspace=@orchestra-design-system/themes

# Watch mode
npm run watch --workspace=@orchestra-design-system/themes
```

**Output**:

```
packages/themes/dist/
├── css/
│   ├── variables.light.css
│   └── variables.dark.css
├── json/
│   ├── tokens.light.json
│   └── tokens.dark.json
└── js/
    ├── tokens.light.js
    └── tokens.dark.js
```

## Adding New Tokens

### Step 1: Identify the Level

- **Primitive**: Raw colors, spacing, typography values → Add to `primitive.json`
- **Semantic**: Actions, states, semantic meaning → Add to `semantic.json`
- **Component**: Component-specific → Add to `component.json`

### Step 2: Use DTCG Format

```json
{
  "$type": "color|dimension|fontWeight|etc",
  "$value": "#hexcolor or {reference} or value",
  "$description": "Human-readable description (optional)"
}
```

### Step 3: Reference Existing Tokens

Always reference lower levels:

```json
{
  "color": {
    "success": { "$value": "{vibrant.green.600}" } // ✅ Reference primitive
  }
}
```

**Don't do this**:

```json
{
  "color": {
    "success": { "$value": "#22c55e" } // ❌ Hardcode value
  }
}
```

### Step 4: Rebuild & Test

```bash
npm run build --workspace=@orchestra-design-system/themes

# Verify output in packages/core/src/themes/
# Light: <link rel="stylesheet" href="light.css" />
# Dark: <link rel="stylesheet" href="dark.css" />
```

## Complete Example: Adding a "Warning" Color

### 1. Add to Primitive (`primitive.json`)

```json
{
  "vibrant": {
    "amber": {
      "50": { "$type": "color", "$value": "#fffbeb" },
      "600": { "$type": "color", "$value": "#d97706" },
      "700": { "$type": "color", "$value": "#b45309" },
      "800": { "$type": "color", "$value": "#92400e" }
    }
  }
}
```

### 2. Add to Semantic (`semantic.json`)

```json
{
  "color": {
    "action": {
      "warning": {
        "container": {
          "default": { "$type": "color", "$value": "{vibrant.amber.600}" },
          "hover": { "$type": "color", "$value": "{vibrant.amber.700}" },
          "active": { "$type": "color", "$value": "{vibrant.amber.800}" }
        },
        "content": {
          "default": { "$type": "color", "$value": "{vibrant.grey.950}" },
          "hover": { "$type": "color", "$value": "{vibrant.grey.950}" }
        }
      }
    }
  }
}
```

### 3. Add Dark Override (`gen-tokens.dark.json5`)

```json5
{
  color: {
    action: {
      warning: {
        container: {
          default: { $value: '{vibrant.amber.500}' }, // Lighter in dark mode
          hover: { $value: '{vibrant.amber.600}' },
        },
      },
    },
  },
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
.button--primary.button--small {
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
- [Orchestra Token Generator](../../packages/themes/sd.config.js)
- [stencil-components](../stencil-components/SKILL.md) — How to use tokens in components
