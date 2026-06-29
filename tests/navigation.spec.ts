import { test, expect } from '@playwright/test';

/**
 * RoV SN Tournament Official - Navigation E2E Tests
 * Tests for all public pages and navigation functionality
 */

test.describe('Navigation', () => {
    test('should have all main navigation links', async ({ page }) => {
        await page.goto('/', { timeout: 60000 });

        // Check all navigation links exist
        const nav = page.locator('nav');
        await expect(nav).toBeVisible();
        await expect(nav.getByRole('link', { name: /หน้าแรก|Home/i }).first()).toBeVisible();
        await expect(nav.getByRole('link', { name: /ตารางแข่ง|Fixtures/i }).first()).toBeVisible();
        await expect(nav.getByRole('link', { name: /ตารางคะแนน|Standings/i }).first()).toBeVisible();
        await expect(nav.getByRole('link', { name: /สถิติ|Stats/i }).first()).toBeVisible();
        await expect(nav.getByRole('link', { name: /ทีม|Clubs/i }).first()).toBeVisible();
        await expect(nav.getByRole('link', { name: /รูปแบบแข่ง|Format/i }).first()).toBeVisible();
    });

    test('should navigate to all pages correctly', async ({ page }) => {
        await page.goto('/', { timeout: 60000 });

        // Helper to click nav link by path
        const clickNavLink = async (path: string) => {
            // Target links specifically within the navigation menu using href
            await page.locator(`nav a[href="${path}"]`).first().click();
        };

        // Navigate to Fixtures
        await clickNavLink('/fixtures');
        await expect(page).toHaveURL(/.*fixtures/, { timeout: 25000 });

        // Navigate to Standings
        await clickNavLink('/standings');
        await expect(page).toHaveURL(/.*standings/, { timeout: 25000 });

        // Navigate to Stats
        await clickNavLink('/stats');
        await expect(page).toHaveURL(/.*stats/, { timeout: 25000 });

        // Navigate to Clubs
        await clickNavLink('/clubs');
        await expect(page).toHaveURL(/.*clubs/, { timeout: 25000 });

        // Navigate to Format
        await clickNavLink('/format');
        await expect(page).toHaveURL(/.*format/, { timeout: 25000 });

        // Navigate back to Home
        await page.waitForTimeout(1000);
        await clickNavLink('/');
        await expect(page).toHaveURL('/', { timeout: 25000 });
    });
});
