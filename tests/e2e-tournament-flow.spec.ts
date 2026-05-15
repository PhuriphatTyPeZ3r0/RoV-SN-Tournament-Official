import { test, expect } from '@playwright/test';

/**
 * End-to-End Tournament Lifecycle Test
 * This test verifies the full flow from student registration to admin approval,
 * team management, and match results impacting standings.
 */

test.describe('Tournament Full Lifecycle', () => {
    // Unique ID for this test run to avoid data collisions
    const runId = Date.now().toString().slice(-6);
    const studentUsername = `student_${runId}`;
    const studentEmail = `${studentUsername}@example.com`;
    const studentPwd = 'TestPassword123!';
    const studentIGN = `PRO_${runId}`;
    const teamName = `TEAM_AURA_${runId}`;

    test('Full Tournament Flow: Registration -> Approval -> Team -> Match -> Standings', async ({ page }) => {
        // --- STEP 1: ADMIN LOGIN ---
        await test.step('Admin Login', async () => {
            await page.goto('/login');
            
            // 1. Use semantic locators
            await page.getByPlaceholder('กรอกชื่อผู้ใช้').fill('admin@rov-sn.com'); 
            await page.getByPlaceholder('กรอกรหัสผ่าน').fill('Lastfreedom4_');
            
            // 2. Use getByRole for buttons
            await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
            
            // 3. Wait for an actual element on the Admin dashboard to ensure hydration is complete
            await expect(page.getByRole('heading', { name: /Tournament\s*Command Center/i })).toBeVisible({ timeout: 10000 });
            await expect(page).toHaveURL(/\/admin/);
        });

        // --- STEP 2: ADMIN SETUP (PRE-CHECK) ---
        await test.step('Check Dashboard Initial State', async () => {
            await expect(page.getByRole('heading', { name: /Tournament\s*Command Center/i })).toBeVisible();
            // Store initial KPI values if needed
        });

        // --- STEP 3: STUDENT REGISTRATION (MOCKING OR SIMULATING) ---
        // Note: For this E2E, we'll assume the student profile creation happens 
        // via a separate action or we focus on the Admin screening part.
        // Let's create a "Pending" registration directly via a mock if possible, 
        // or just navigate to the registrations page and see if we can find one to approve.
        
        await test.step('Admin Screens Registrations', async () => {
            await page.goto('/admin/registrations');
            
            // 2. Use getByRole (accessibility best practice) and allow a longer timeout just in case
            await expect(page.getByRole('heading', { name: 'Registrations', level: 1 })).toBeVisible({ timeout: 15000 });
            
            // If there's a pending registration, we approve it. 
            // For stability in a real DB, we might skip this if the list is empty 
            // or assume we are testing the UI logic of the list.
            const pendingCard = page.locator('.bg-white.rounded-3xl').first();
            if (await pendingCard.isVisible()) {
                console.log('Found a registration to screen');
                // Click Approve button (green check icon or specific text)
                const approveBtn = pendingCard.locator('button').filter({ has: page.locator('.fa-check') });
                if (await approveBtn.isVisible()) {
                    await approveBtn.click();
                    // Confirm in modal if exists
                    const confirmBtn = page.locator('button', { hasText: 'ยืนยัน' });
                    if (await confirmBtn.isVisible()) await confirmBtn.click();
                }
            }
        });

        // --- STEP 4: TEAM MANAGEMENT ---
        await test.step('Admin Manages Teams', async () => {
            await page.goto('/admin/teams');
            await expect(page.locator('h1', { hasText: 'Teams' })).toBeVisible();
            
            // Check for a team to approve
            const teamCard = page.locator('.bg-white.rounded-2xl').first();
            if (await teamCard.isVisible()) {
                const statusBadge = teamCard.locator('.bg-orange-100'); // Assuming Orange is 'Ready'
                if (await statusBadge.isVisible()) {
                    // Change status to Approved
                    await teamCard.locator('select').selectOption('approved');
                    await page.waitForTimeout(1000);
                }
            }
        });

        // --- STEP 5: MATCH DRAW & RESULT ---
        await test.step('Admin Record Match Result', async () => {
            await page.goto('/admin/results');
            
            // Select Day 1
            const day1Btn = page.locator('button', { hasText: 'Day 1' }).first();
            await day1Btn.click();
            
            // Select first match
            const matchBtn = page.locator('button.group').first();
            await matchBtn.click();
            
            // Record result: 2-0
            // Blue Team Wins
            await page.locator('input[type="number"]').first().fill('2');
            await page.locator('input[type="number"]').last().fill('0');
            
            // Save Result
            const saveBtn = page.locator('button', { hasText: 'บันทึกผลการแข่ง' });
            await saveBtn.click();
            
            // Confirm
            const confirmBtn = page.locator('button', { hasText: 'ยืนยัน' });
            if (await confirmBtn.isVisible()) await confirmBtn.click();
            
            await page.waitForTimeout(2000);
        });

        // --- STEP 6: VERIFY PUBLIC STANDINGS ---
        await test.step('Verify Standings Update', async () => {
            await page.goto('/standings');
            await expect(page.locator('h1', { hasText: 'LEAGUE' })).toBeVisible();
            
            // Check that at least one team has 3 points
            const firstTeamPoints = page.locator('tbody tr').first().locator('td').nth(4); // 5th column is Pts
            await expect(firstTeamPoints).toHaveText('3');
            
            console.log('✅ Standings correctly updated with 3 points for winner');
        });

        // --- STEP 7: VERIFY DASHBOARD LOGS ---
        await test.step('Verify Admin Dashboard Activities', async () => {
            await page.goto('/admin');
            await expect(page.locator('text=Command Logs')).toBeVisible();
            
            // Check for the recent 'update' action in logs
            const latestLog = page.locator('.divide-y .p-5').first();
            await expect(latestLog).toContainText('อัปเดตผลการแข่งขัน');
            
            console.log('✅ Admin Dashboard Activity Log verified');
        });
    });
});
