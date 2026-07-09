---
name: design-system-patterns
description: 'Reference industry-leading design systems (Atlassian, Carbon, Vitamin, Primer, Spectrum) and WebAwesome for best practices. Use when designing components, establishing patterns, or learning from proven UI library approaches. Covers accessibility, component APIs, theming, documentation, and architecture patterns.'
argument-hint: "Describe what you're designing (e.g., 'form inputs', 'dark theme strategy', 'button variants')"
user-invocable: true
---

# Design System Patterns

## Overview

Orchestra benefits from studying world-class design systems used by major companies. Each brings unique strengths in accessibility, component design, theming, and documentation. This skill provides patterns, APIs, and best practices extracted from industry leaders.

**Key principle**: Don't reinvent—learn from proven systems, adapt patterns, and apply to Orchestra's web component architecture.

## Major Design Systems Reference

### Atlassian Design System (ADS)

**Focus**: Enterprise product design, large-scale applications  
**Tech**: React components with TypeScript  
**Repository**: github.com/atlassian/atlaskit-mk-2

**Key Strengths**:

- ✅ **Comprehensive theming** — Light/dark/high-contrast modes with token-based approach
- ✅ **Accessibility-first** — WCAG 2.1 AA compliant, extensive ARIA patterns
- ✅ **Component API clarity** — Well-designed prop interfaces, clear component composition
- ✅ **Documentation** — Excellent Storybook setup with examples & accessibility tests
- ✅ **CSS-in-JS** — Emotion for scoped styling without CSS variables bleed

**Orchestra Relevance**:

```typescript
// ADS approach: Token-first styling with composition
const Button = styled.button`
  background: var(--ds-background-selected);
  color: var(--ds-text);
  padding: var(--ds-space-100) var(--ds-space-200);
  border-radius: var(--ds-border-radius-100);
  transition: background-color 150ms ease-in-out;
`

// How Orchestra applies:
// - Design tokens for all colors/spacing
// - Component composition (compound components)
// - Clear prop interfaces matching ADS patterns
```

**Patterns to Learn**:

- Icon + label composition (button with icon)
- Size variants (xs, sm, md, lg, xl)
- Semantic color intentions (primary, secondary, danger, success)
- Loading states for async operations
- Disabled state handling

---

### IBM Carbon Design System

**Focus**: Enterprise accessibility, scalability, modular architecture  
**Tech**: Web components (carbon-web-components) + React (carbon-react)  
**Repository**: github.com/carbon-design-system

**Key Strengths**:

- ✅ **Web Components foundation** — Uses web components as source, wraps for frameworks
- ✅ **Accessibility** — ARIA patterns, keyboard navigation, screen reader support
- ✅ **Design tokens** — Extensive semantic + component tokens (similar to Orchestra)
- ✅ **Spacing & grid system** — Consistent 4px baseline (8, 16, 24px multiples)
- ✅ **Color system** — Accessible color combinations, contrast checking

**Orchestra Relevance** (Direct parallel!):

```typescript
// Carbon structure matches Orchestra
// Source: Web Components (@carbon/web-components)
// Wrappers: React, Vue, Angular (auto-generated)
// Documentation: Storybook with Vitest

// Carbon spacing pattern
spacing: {
  xs: 2,      // 8px
  sm: 12,     // 12px
  md: 16,     // 16px
  lg: 24,     // 24px
  xl: 32      // 32px
}

// Orchestra application:
// - Use 4px or 8px baseline (consistency)
// - Semantic spacing (action.padding.primary, etc.)
// - Consistent multiples across all tokens
```

**Patterns to Learn**:

- Modal/dialog patterns (focus management, escape to close)
- Form input composition (label, error, hint text)
- Dropdown/select keyboard navigation (arrow keys, type-to-search)
- Toast/notification queuing
- Data table patterns (sorting, pagination, column selection)

---

### Vitamin Design System (by Decathlon)

**Focus**: Global reach, inclusive design, multi-brand support  
**Tech**: Vue 3 components, web components  
**Repository**: github.com/Decathlon/vitamin-web

**Key Strengths**:

- ✅ **Inclusive design** — Designed for global audiences, accessibility first
- ✅ **Multi-brand support** — Single component library, multiple brand tokens
- ✅ **Modern patterns** — Composition API, slots, progressive enhancement
- ✅ **Icon system** — Comprehensive SVG icon library with variants
- ✅ **Dark mode** — Native CSS variable support, smooth theme switching

**Orchestra Relevance**:

```typescript
// Vitamin approach: Brand theming with token swapping
// Single component + token overrides = multiple brands

// Orchestra application:
// - Support light/dark themes (✅ already doing)
// - Plan for future brand customization
// - Token organization: primitive → semantic → brand-specific

// Token override pattern:
:root {
  --orchestra-color-primary: var(--brand-primary, #7b55ad);
  --orchestra-color-secondary: var(--brand-secondary, #6c40c7);
}

.brand-custom {
  --brand-primary: #custom-color;
  --brand-secondary: #custom-color;
}
```

**Patterns to Learn**:

- Icon placement patterns (leading, trailing, only)
- Badge/label typography patterns
- Breadcrumb navigation
- Tag input (multiple selection, free-form)
- Popover/tooltip positioning

---

### GitHub Primer Design System

**Focus**: Developer experience, product consistency, open source  
**Tech**: Primer React + Primer ViewComponents (Rails)  
**Repository**: github.com/primer/react

**Key Strengths**:

- ✅ **Developer ergonomics** — Intuitive prop names, clear composition patterns
- ✅ **Compound components** — `<Select><Select.Option>` patterns
- ✅ **Consistent theming** — Auto light/dark with accent color support
- ✅ **Spacing system** — Consistent stacking (gap utilities, margin scale)
- ✅ **Clear documentation** — Examples for every variant

**Orchestra Relevance**:

```typescript
// Primer approach: Compound components for flexibility
// <Button.Group>
//   <Button>Option 1</Button>
//   <Button>Option 2</Button>
// </Button.Group>

// Orchestra potential:
// While not required for web components, compound patterns useful for:
// - Form field groups
// - Button groups
// - Dropdown menus (trigger + items)

// Example for Orchestra:
// <orchestra-select>
//   <orchestra-select-option value="1">Option 1</orchestra-select-option>
//   <orchestra-select-option value="2">Option 2</orchestra-select-option>
// </orchestra-select>
```

**Patterns to Learn**:

- State variants (loading, disabled, error, success)
- Icon + text combinations
- Subtle vs. emphasized interaction patterns
- Segmented controls (radio group visual)
- Avatar + status indicators

---

### Adobe Spectrum Design System

**Focus**: Consistency across Adobe products, enterprise workflows  
**Tech**: React Aria hooks + Spectrum React components  
**Repository**: github.com/adobe/react-spectrum

**Key Strengths**:

- ✅ **React Aria** — Headless component logic (ARIA, keyboard, focus)
- ✅ **Accessibility** — Best-in-class ARIA patterns (menus, combobox, etc.)
- ✅ **Internationalization (i18n)** — Multi-language, RTL support
- ✅ **Color system** — Advanced color contrast, high-contrast mode
- ✅ **Complex components** — Date picker, combobox with filtering

**Orchestra Relevance**:

```typescript
// React Aria approach: Separate behavior (hooks) from styling
// Orchestra can learn from:
// - Keyboard interaction patterns
// - Focus management strategies
// - ARIA attribute application

// For web components (Stencil):
// Use @Listen for keyboard events
// Implement focus management with delegatesFocus
// Apply ARIA attributes matching React Aria patterns

@Component({
  tag: 'orchestra-combobox',
  shadow: { delegatesFocus: true },
})
export class OrchestraCombobox {
  // Apply React Aria patterns:
  // - Arrow Up/Down for selection
  // - Enter to confirm
  // - Escape to close
  // - Type to filter

  @Listen('keydown')
  handleKeyDown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp':
      case 'Enter':
      case 'Escape':
      // React Aria patterns
    }
  }
}
```

**Patterns to Learn**:

- Combobox with filtering (keyboard navigation + filtering)
- Date picker (calendar grid, keyboard nav)
- Listbox patterns
- Menu & submenu patterns
- Slider with range selection

---

### Shopify Polaris Design System

**Focus**: E-commerce, merchant experience, resource-constrained environments  
**Tech**: React components with TypeScript  
**Repository**: github.com/Shopify/polaris

**Key Strengths**:

- ✅ **Practical patterns** — Components designed for real merchant tasks
- ✅ **Mobile-first** — Responsive, touch-friendly defaults
- ✅ **Illustrations** — Consistent illustration style system
- ✅ **Error handling** — Clear validation & error patterns
- ✅ **Predictable API** — Consistent prop names across components

**Orchestra Relevance**:

```typescript
// Polaris approach: Form-centric design
// Applications like Orchestra benefit from:
// - Clear error display patterns
// - Required field indicators
// - Help text placement

// Pattern example:
<orchestra-form-input
  label="Email"
  type="email"
  required
  helpText="We'll never share your email"
  error={hasError ? "Invalid email format" : undefined}
/>

// Validation patterns:
// 1. On blur (early feedback)
// 2. On submit (comprehensive)
// 3. Real-time (if helpful, not annoying)
```

**Patterns to Learn**:

- Form field groups (fieldset patterns)
- Resource lists with actions
- Table with bulk selection
- Page layout (header, footer, sidebar)
- Empty state patterns

---

## WebAwesome: Web Component Reference

**What it is**: WebAwesome is a foundational web component library demonstrating best practices for custom elements.

**Repository**: github.com/web-awesome/web-awesome  
**Tech**: Web Components (Lit, vanilla)

**Key Strengths**:

- ✅ **Pure web components** — No framework dependency, works everywhere
- ✅ **Shadow DOM patterns** — Proper style encapsulation examples
- ✅ **Accessibility** — ARIA patterns in plain web components
- ✅ **Simplicity** — Clean, understandable code for learning
- ✅ **Documentation** — Examples for every pattern

**Relevance to Orchestra**:

```typescript
// WebAwesome approach: Minimal, focused components
// Strong patterns for:

// 1. Slot usage (Light DOM composition)
<orchestra-button>
  <svg slot="icon">...</svg>
  Click me
</orchestra-button>

// 2. Event handling (custom events)
export class OrchestraButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('orchestra-click', {
        bubbles: true,
        composed: true,
        detail: { /* data */ }
      }));
    });
  }
}

// 3. Observing attributes
static get observedAttributes() {
  return ['disabled', 'variant'];
}

attributeChangedCallback(name, oldVal, newVal) {
  // Handle changes
}

// 4. Shadow DOM styling
static styles = css`
  :host {
    --button-color: var(--orchestra-color-primary);
  }
  button {
    background: var(--button-color);
  }
`;
```

**Patterns to Study**:

- Custom element lifecycle (`connectedCallback`, `disconnectedCallback`)
- Slot patterns (named slots, default slots)
- Custom events (bubbling, composed)
- Attribute observation & reflection
- CSS custom property scoping

---

## Pattern Categories Across Systems

### 1. Button Variants

**Common across all systems**:

```
- Primary (main action)
- Secondary (alternative action)
- Tertiary (low emphasis)
- Danger (destructive action)
- Ghost/Text-only (minimal)

Sizes:
- Small (dense, limited space)
- Medium (default, most common)
- Large (prominence, mobile)

States:
- Default/Enabled
- Hover (visual feedback)
- Active/Pressed
- Disabled (unavailable)
- Loading (async operation)
```

**Orchestra Implementation** (See [stencil-components](../stencil-components/SKILL.md)):

```typescript
@Prop() variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' = 'primary';
@Prop() size?: 'small' | 'medium' | 'large' = 'medium';
@Prop() disabled?: boolean = false;
@Prop() loading?: boolean = false;
```

### 2. Form Input Patterns

**Common across all systems**:

```
- Label (always present, above input)
- Input element (text, email, password, etc.)
- Placeholder (hint text)
- Error message (validation feedback)
- Help text (additional context)
- Disabled state
- Required indicator

Advanced:
- Character count
- Real-time validation
- Success state
- Icon support (prefix/suffix)
```

**Orchestra Pattern**:

```typescript
<orchestra-form-input
  label="Email"
  type="email"
  placeholder="your@email.com"
  required
  helpText="Enter your work email"
  error={error}
  maxLength={100}
  disabled={disabled}
/>
```

### 3. Icon Patterns

**Common across all systems**:

```
- Semantic icons (chevron, check, close, etc.)
- Button icons (leading, trailing)
- Icon + text combinations
- Icon-only (with aria-label)
- Size variations (16px, 24px, 32px)
- Color variations (default, success, warning, danger)
```

**Orchestra Pattern** (via [stencil-components](../stencil-components/SKILL.md)):

```typescript
// Icon in button
<orchestra-button variant="primary" icon="check" iconPosition="start">
  Confirm
</orchestra-button>

// Icon-only with label
<orchestra-button variant="ghost" icon="close" ariaLabel="Close" />
```

### 4. Accessibility Patterns

**Common across all systems**:

```
- Keyboard navigation (arrow keys, Tab, Enter, Escape)
- ARIA attributes (role, aria-label, aria-describedby)
- Focus management (focus traps, initial focus)
- High contrast support
- Screen reader testing
- Color not as only indicator
```

**Orchestra Implementation**:

```typescript
// Focus delegation for buttons
@Component({
  shadow: { delegatesFocus: true }
})

// ARIA support
@Prop() ariaLabel?: string;
@Prop() ariaDescribedBy?: string;
@Prop() role?: string = 'button';

// Keyboard navigation
@Listen('keydown')
handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    this.activate();
  }
}
```

### 5. Dark Mode/Theming

**Common across all systems**:

```
- CSS custom properties (design tokens)
- Light/dark theme support
- High contrast mode support
- Smooth transitions
- Consistent color hierarchy
```

**Orchestra Pattern** (See [themes](../themes/SKILL.md)):

```css
/* Light theme (default) */
:root,
:host,
.orchestra-theme--light {
  --orchestra-color-primary: #7b55ad;
  --orchestra-color-surface: #ffffff;
  --orchestra-color-text: #0d0c10;
}

/* Dark theme */
:host(.orchestra-theme--dark),
.orchestra-theme--dark {
  --orchestra-color-primary: #9066d9;
  --orchestra-color-surface: #1a1820;
  --orchestra-color-text: #f5f4f7;
}
```

---

## How to Learn from Design Systems

### 1. Component Analysis Framework

When studying a design system component:

```
1. **API Design**
   - What props/properties?
   - What events/callbacks?
   - What states?

2. **Accessibility**
   - What ARIA roles?
   - Keyboard navigation?
   - Screen reader support?

3. **Styling**
   - Design tokens used?
   - CSS variables or CSS-in-JS?
   - Dark mode support?

4. **Documentation**
   - Usage examples?
   - Do's and don'ts?
   - Accessibility notes?

5. **Code Quality**
   - TypeScript types?
   - Error handling?
   - Performance considerations?
```

### 2. Practical Steps

**Step 1: Study existing implementation**

```bash
# Example: Compare button implementations
# 1. Open Atlassian ADS Button code
# 2. Open IBM Carbon Button code
# 3. Open WebAwesome Button code
# Note similarities and differences
```

**Step 2: Extract patterns**

```
Common Button API across systems:
- variant (primary, secondary, etc.)
- size (small, medium, large)
- disabled (boolean)
- onClick handler
- Icon support
- Loading state
```

**Step 3: Apply to Orchestra**

```typescript
// Orchestra Button combines best patterns:
@Prop() variant?: 'primary' | 'secondary' | 'tertiary';
@Prop() size?: 'small' | 'medium' | 'large';
@Prop() disabled?: boolean;
@Prop() loading?: boolean;
@Prop() iconName?: string;
@Prop() iconPosition?: 'start' | 'end';
// See stencil-components SKILL for full implementation
```

**Step 4: Test & iterate**

```bash
# Write stories (storybook-setup)
# Add tests (story-testing)
# Test accessibility (manual + automated)
```

---

## Resource Links

### Design Systems

| System         | URL                      | Tech                  | Notes            |
| -------------- | ------------------------ | --------------------- | ---------------- |
| **Atlassian**  | atlassian.design         | React                 | Enterprise UI    |
| **IBM Carbon** | carbondesignsystem.com   | Web Components        | Enterprise scale |
| **Vitamin**    | decathlon.design/vitamin | Vue 3                 | Global reach     |
| **Primer**     | primer.style             | React                 | Developer UX     |
| **Spectrum**   | spectrum.adobe.com       | React Aria            | Complex patterns |
| **Polaris**    | polaris.shopify.com      | React                 | E-commerce       |
| **Material**   | material.io              | Flutter, Android, Web | Google's system  |

### Web Component References

| Reference      | URL             | Focus                         |
| -------------- | --------------- | ----------------------------- |
| **WebAwesome** | web-awesome.org | Foundational patterns         |
| **Shoelace**   | shoelace.style  | Batteries-included components |
| **Lion**       | lion-web.org    | Accessible components         |
| **FAST**       | fast.design     | Adaptive theming              |

### Learning Resources

- [Web Components Best Practices](https://www.webcomponents.org//)
- [MDN: Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Storybook Accessibility Testing](https://storybook.js.org/docs/writing-tests/accessibility)

---

## Efficiency Tips

When researching design systems with LLMs:

- Ask about specific components or patterns, not entire systems
- Request API comparison tables instead of full documentation
- Focus on patterns applicable to web components
- Reference [stencil-components](../stencil-components/SKILL.md) for implementation details
- Use [token-optimization](../token-optimization/SKILL.md) to search design system repos efficiently

Store learnings in `/memories/repo/`:

```markdown
# Component Patterns Learned

## Button (from multiple systems)

- Variants: primary, secondary, tertiary, danger
- Sizes: small, medium, large
- Icon support: leading/trailing
- States: hover, active, disabled, loading

## Key differences:

- Atlassian: CSS-in-JS, emphasis on theming
- Carbon: Web components foundation
- Primer: Compound component patterns
- Spectrum: Complex keyboard interactions
```

## References

- [token-optimization](../token-optimization/SKILL.md) — Efficient system exploration
- [stencil-components](../stencil-components/SKILL.md) — Orchestra component implementation
- [themes](../themes/SKILL.md) — Token structure & theming
- [story-testing](../story-testing/SKILL.md) — Testing patterns
- [code-conventions](../code-conventions/SKILL.md) — Naming & standards
