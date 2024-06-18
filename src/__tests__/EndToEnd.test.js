import puppeteer from "puppeteer";

describe("show/hide event details", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".event");
  });

  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".event .details-btn");
    const eventDetails = await page.$(".event .details");
    expect(eventDetails).toBeNull();
  });
});

describe("Filter Events by City", () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 0,
      timeout: 0,
    });
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");
    await page.waitForSelector(".city");
  });

  afterAll(() => {
    browser.close();
  });

  test("I see upcoming events for all cities by default up to the default limit (32)", async () => {
    const events = await page.$$eval("#event-list .event", (events) => {
      return events.map((event) => ({
        summary: event.querySelector("h2").innerText,
        location: event.querySelector("p").innerText,
      }));
    });

    expect(events.length).toBeGreaterThan(0);
    expect(events.length).toBeLessThanOrEqual(32);

    const cities = events.map((event) => event.location);
    const uniqueCities = [...new Set(cities)];
    expect(uniqueCities.length).toBeGreaterThan(1);
  });

  test("User will see list cities that match what they typed so far", async () => {
    await page.type(".city", "be");
    await page.waitForSelector(".suggestions");
    const matchingCities = await page.$$eval(".suggestions li", (items) =>
      items.map((item) => item.textContent),
    );
    expect(matchingCities).toContain("Berlin, Germany");
  });

  test("When user clicks on a possible city the user will see all events from that city", async () => {
    // clear "be" from previous test
    await page.evaluate(() => {
      document.querySelector(".city").value = "";
    });
    await page.type(".city", "be");
    await page.waitForSelector(".suggestions");
    await page.click(".suggestions li", { text: "Berlin, Germany" });
    await page.waitForSelector("#event-list");
    const events = await page.$$eval("#event-list .event", (events) =>
      events.map((event) => event.querySelector("p").textContent),
    );
    events.forEach((location) => {
      expect(location).toBe("Berlin, Germany");
    });
  });
});

jest.setTimeout(30000);
