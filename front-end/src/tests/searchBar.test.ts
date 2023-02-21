import puppeteer from "puppeteer";
import * as ReactGoogleMapsApi from "@react-google-maps/api";

let page: any;
let browser: any;

describe.only("Search Bar", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    jest.setTimeout(10000);
  });

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();

    await page.goto("http://localhost:3000");
  }, 10000);

  test("Loading map correctly", async () => {
    if (!page) {
      throw new Error("Error while loading Puppeteer page");
    }

    jest.spyOn(ReactGoogleMapsApi, "useJsApiLoader").mockReturnValue({
      isLoaded: true,
      loadError: undefined,
    });
  });

  test("Empty Input Error", async () => {
    const selector = "#search"
    try {
      page.click(selector);
    } catch(e) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(e).toBe(Error)
    }
    expect(1).toEqual(2);
  });
});
