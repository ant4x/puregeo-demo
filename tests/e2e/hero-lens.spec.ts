import { expect, test, type Page } from "@playwright/test";

/** Center of the lens mask inside the hero, or null while no lens is shown. */
function lensCenter(page: Page) {
  return page.evaluate(() => {
    const layer = [...document.querySelectorAll<HTMLElement>("#hero *")].find(
      (el) => el.style.maskImage && el.style.maskImage !== "none",
    );
    const match = layer?.style.maskImage.match(/at ([\d.]+)px ([\d.]+)px/);
    return match ? [Number(match[1]), Number(match[2])] : null;
  });
}

test("the lens stays under the cursor when the page scrolls", async ({ page, isMobile }) => {
  test.skip(isMobile, "the cursor lens is a desktop feature");
  await page.goto("/");
  await page.mouse.move(600, 300);
  await expect(page.locator("#hero img")).toHaveCount(2);
  await expect
    .poll(async () => {
      await page.mouse.move(600, 301);
      await page.mouse.move(600, 300);
      return lensCenter(page);
    })
    .toEqual([600, 300]);

  await page.mouse.wheel(0, 200);
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBe(200);

  await expect.poll(() => lensCenter(page)).toEqual([600, 500]);
});
