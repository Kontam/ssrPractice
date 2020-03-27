
describe("first puppeteer", () => {
  beforeAll(async() => {
    await page.goto('https://google.com');
    await page.waitFor(2000);
  });

  test('first test', async () => {
    await expect(page).toMatch('google');
  });
});
