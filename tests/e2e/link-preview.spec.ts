import { expect, test } from "@playwright/test";

test("a shared link to the privacy policy previews that page, not the home page", async ({ page }) => {
  await page.goto("/rules");
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /\/rules$/);
});
