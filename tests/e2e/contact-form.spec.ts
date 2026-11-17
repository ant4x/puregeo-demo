import { expect, test } from "@playwright/test";

test("visitor sends a question through the contact form", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toBeVisible();

  const accept = page.getByRole("button", { name: "Accept" });
  if (await accept.isVisible({ timeout: 3000 }).catch(() => false)) {
    await accept.click();
  }

  const form = page.locator("#contact-form");
  await form.scrollIntoViewIfNeeded();
  await form.getByLabel("Name").fill("Test Visitor");
  await form.getByLabel("Email").fill("visitor@example.com");
  await form.getByLabel("Question").fill("Is there a family room for the August departure?");
  await form.getByRole("checkbox").check();
  await form.getByRole("button", { name: "Send" }).click();

  await expect(page.getByText("Thank you! Your message has been sent.")).toBeVisible();
});

test("contact endpoint rejects an invalid email", async ({ request }) => {
  const res = await request.post("/api/contact", {
    data: { name: "Test", email: "not-an-email", question: "Hello" },
  });
  expect(res.status()).toBe(422);
});
