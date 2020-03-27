
describe("first puppeteer", () => {
  beforeAll(async() => {
    await page.goto('http://localhost:3000');
    await page.waitFor(2000);
  });

  test('first test', async () => {
    await expect(page).toMatch('Longo');
  });
});
