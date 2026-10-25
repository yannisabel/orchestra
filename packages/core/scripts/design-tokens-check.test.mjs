import assert from 'node:assert/strict'
import test from 'node:test'

import { findRawDesignValues, renderReport } from './design-tokens-check.mjs'

test('finds raw colors and dimensions in design-related declarations', () => {
  const css = `:host {
  color: #fff;
  padding-inline: 1rem;
  border-radius: 0.25rem;
  box-shadow: 0 0 0 2px rgb(0 0 0 / 20%);
}`

  const findings = findRawDesignValues(css, 'src/components/sample/sample.css')

  assert.deepEqual(
    findings.map(({ line, property, rawValue, category }) => ({
      line,
      property,
      rawValue,
      category,
    })),
    [
      {
        line: 2,
        property: 'color',
        rawValue: '#fff',
        category: 'color',
      },
      {
        line: 3,
        property: 'padding-inline',
        rawValue: '1rem',
        category: 'spacing',
      },
      {
        line: 4,
        property: 'border-radius',
        rawValue: '0.25rem',
        category: 'radius',
      },
      {
        line: 5,
        property: 'box-shadow',
        rawValue: 'rgb(0 0 0 / 20%)',
        category: 'color',
      },
      {
        line: 5,
        property: 'box-shadow',
        rawValue: '2px',
        category: 'shadow',
      },
    ],
  )
})

test('ignores comments, token references, var fallbacks, and structural values', () => {
  const css = `:host {
  /* color: #fff; */
  color: var(--orchestra-color-text-primary, #111);
  padding: var(--orchestra-spacing-action-primary-small, 0.25rem);
  width: 100%;
  margin: 0;
  line-height: 1.5;
  transition: all 150ms ease;
  color: currentColor;
}`

  assert.deepEqual(
    findRawDesignValues(css, 'sample.css').map(({ property, rawValue }) => ({
      property,
      rawValue,
    })),
    [],
  )
})

test('reports named CSS colors and local custom-property dimensions', () => {
  const findings = findRawDesignValues(
    ':host { --outline-width: 2px; background-color: transparent; }',
    'sample.css',
  )

  assert.deepEqual(
    findings.map(({ property, rawValue, category }) => ({
      property,
      rawValue,
      category,
    })),
    [
      {
        property: '--outline-width',
        rawValue: '2px',
        category: 'size',
      },
      {
        property: 'background-color',
        rawValue: 'transparent',
        category: 'color',
      },
    ],
  )
})

test('renders an escaped Markdown table and a clean report', () => {
  const report = renderReport(
    [
      {
        file: 'src/components/a|b.css',
        line: 4,
        property: 'color',
        rawValue: '#fff',
        category: 'color',
      },
    ],
    2,
  )

  assert.match(
    report,
    /Found 1 potential raw design value in 2 component stylesheets/,
  )
  assert.match(report, /a\\\|b\.css/)
  assert.match(report, /\| 4 \| `color` \| `#fff` \| color \|/)
  assert.match(
    renderReport([], 3),
    /No potential raw design values found in 3 component stylesheets/,
  )
})
