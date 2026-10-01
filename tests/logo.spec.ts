import { test, expect } from '@playwright/test'
import { testConfig } from './test.config'

/**
 * Header branding
 *
 * The charity has no logo yet, so the header's home link shows the charity
 * name as text. The template shipped Free For Charity's logo here, which must
 * never be presented as this charity's.
 */
test.describe('Header branding', () => {
  test('shows the charity name as the home link', async ({ page }) => {
    await page.goto('/')
    const homeLink = page.locator('header a[href="/"]').first()
    await expect(homeLink).toContainText(testConfig.logo.headerText)
  })

  test('does not show a logo image in the header', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('header a[href="/"] img')).toHaveCount(0)
  })
})
