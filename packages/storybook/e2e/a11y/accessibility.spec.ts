import { expect, test } from 'playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto(
    '/iframe.html?id=accessibility-consumer-interface--preferences&viewMode=story',
  )
})

test('button activates once per keyboard press', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Save changes', exact: true })
  await expect(button).toBeVisible()
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('checkbox', { name: 'Accept privacy policy' }),
  ).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(button).toBeFocused()

  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText('Saved 1 time')
  await page.keyboard.press('Space')
  await expect(page.getByRole('status')).toHaveText('Saved 2 times')
})

test('pointer activation updates the visible result', async ({ page }) => {
  await page.getByRole('button', { name: 'Save changes' }).click()
  await expect(page.getByRole('status')).toHaveText('Saved 1 time')
})

test('checkbox is discoverable by role and visible label', async ({ page }) => {
  const checkbox = page.getByRole('checkbox', {
    name: 'Accept privacy policy',
    exact: true,
  })
  const labeledCheckbox = page.getByLabel('Accept privacy policy', {
    exact: true,
  })
  await expect(checkbox).not.toBeChecked()
  await labeledCheckbox.check()
  await expect(checkbox).toBeChecked()
  await checkbox.press('Space')
  await expect(labeledCheckbox).not.toBeChecked()
  await page.getByText('Accept privacy policy', { exact: true }).click()
  await expect(checkbox).toBeChecked()
})

test('informative icon is discoverable as a named image', async ({ page }) => {
  await expect(
    page.getByRole('img', { name: 'Completed', exact: true }),
  ).toBeVisible()
  await expect(page.getByRole('img')).toHaveCount(1)
})

test('decorative icon is absent from role queries', async ({ page }) => {
  await expect(page.locator('orchestra-icon')).toHaveCount(2)
  await expect(page.getByRole('img')).toHaveCount(1)
})

test('disabled controls expose their unavailable state', async ({ page }) => {
  await expect(
    page.getByRole('button', { name: 'Unavailable action' }),
  ).toBeDisabled()
})
