import { expect, test } from 'playwright/test'

type ButtonHost = HTMLElement & { disabled?: boolean }

test.describe('orchestra-button keyboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-orchestra-button--default&viewMode=story',
    )
    await expect(page.getByRole('button', { name: 'Button' })).toBeVisible()
    // The page does not start focused; Tab from BODY leaves the document without this click.
    await page.locator('body').click({ position: { x: 1, y: 1 } })
    await page.evaluate(() => {
      const host = document.querySelector('orchestra-button')
      const win = window as Window & { clicks?: number }
      win.clicks = 0
      host?.addEventListener(
        'click',
        () => (win.clicks = (win.clicks ?? 0) + 1),
      )
    })
  })

  test('Tab moves focus to the button', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Button' })).toBeFocused()
  })

  test('Enter activates the button once', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' })
    await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
    await page.keyboard.press('Enter')
    await expect
      .poll(() =>
        page.evaluate(() => (window as Window & { clicks?: number }).clicks),
      )
      .toBe(1)
  })

  test('Space activates the button once', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' })
    await page.keyboard.press('Tab')
    await expect(button).toBeFocused()
    await page.keyboard.press('Space')
    await expect
      .poll(() =>
        page.evaluate(() => (window as Window & { clicks?: number }).clicks),
      )
      .toBe(1)
  })

  test('disabled button is skipped by Tab', async ({ page }) => {
    await page.evaluate(() => {
      const host = document.querySelector('orchestra-button') as ButtonHost
      host.disabled = true
    })
    await page.keyboard.press('Tab')
    await expect(page.getByRole('button', { name: 'Button' })).not.toBeFocused()
  })
})
