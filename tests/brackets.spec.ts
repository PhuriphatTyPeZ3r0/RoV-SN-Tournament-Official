import { test, expect } from '@playwright/test';

/**
 * RoV SN Tournament Official - Brackets Page E2E Tests
 * Tests for tournament knockout bracket tree display
 */

test.describe('Brackets Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/brackets');
    });

    test('should load brackets page', async ({ page }) => {
        await expect(page).toHaveURL(/.*brackets/);
    });

    test('should display page header', async ({ page }) => {
        const header = page.locator('h1').first();
        await expect(header).toBeVisible();
    });

    test('should display bracket tree container or empty state', async ({ page }) => {
        const mainContainer = page.locator('main, [class*="content"], [class*="container"]').first();
        await expect(mainContainer).toBeVisible();
    });
});
