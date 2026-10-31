import { expect, test } from 'playwright/test'

test.describe('orchestra-checkbox keyboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/iframe.html?id=components-orchestra-checkbox--default&viewMode=story',
    )
    await expect(
      page.getByRole('checkbox', { name: 'Accept terms and conditions' }),
    ).toBeVisible()
  })

  test('Tab moves focus to the checkbox', async ({ page }) => {
    await page.keyboard.press('Tab')
    await expect(
      page.getByRole('checkbox', { name: 'Accept terms and conditions' }),
    ).toBeFocused()
  })

  test('Space toggles the checkbox', async ({ page }) => {
    const checkbox = page.getByRole('checkbox', {
      name: 'Accept terms and conditions',
    })
    await page.keyboard.press('Tab')
    await expect(checkbox).not.toBeChecked()
    await page.keyboard.press('Space')
    await expect(checkbox).toBeChecked()
    await page.keyboard.press('Space')
    await expect(checkbox).not.toBeChecked()
  })
})
