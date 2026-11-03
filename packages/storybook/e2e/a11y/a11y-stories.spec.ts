import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from 'playwright/test'

const BLOCKING_IMPACTS = ['critical', 'serious']
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']

test('stories have no critical or serious WCAG 2.2 AA violations', async ({
  page,
  request,
}) => {
  test.setTimeout(10 * 60_000)

  const response = await request.get('/index.json')
  const index = (await response.json()) as {
    entries: Record<string, { id: string; type: string }>
  }
  const storyIds = Object.values(index.entries)
    .filter((entry) => entry.type === 'story')
    .map((entry) => entry.id)

  const failures: string[] = []

  for (const id of storyIds) {
    await page.goto(`/iframe.html?id=${id}&viewMode=story`)
    await page.waitForLoadState('networkidle')

    const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze()

    for (const violation of results.violations) {
      if (BLOCKING_IMPACTS.includes(violation.impact ?? '')) {
        failures.push(
          `${id}: ${violation.id} (${violation.impact}) on ${violation.nodes.length} node(s)`,
        )
      }
    }
  }

  expect(failures).toEqual([])
})
