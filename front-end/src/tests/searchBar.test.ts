import puppeteer from "puppeteer";
import * as ReactGoogleMapsApi from "@react-google-maps/api";

jest.useRealTimers();

let page: any;

const sleep = async (ms: number) => {
  await new Promise((res) => {
    setTimeout(res, ms);
  });
};

describe.only("Search Bar", () => {
  beforeAll(async () => {
    const browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();

    await page.goto("http://localhost:3000");
  }, 3000);

  test("Loading map correctly", async () => {
    await sleep(1000);

    if (!page) {
      throw new Error("Error while loading Puppeteer page");
    }

    jest.spyOn(ReactGoogleMapsApi, "useJsApiLoader").mockReturnValue({
      isLoaded: true,
      loadError: undefined,
    });
  });

  test("Empty Input Error get null", async () => {
    await sleep(1000);
    try {
      let result = await page.click("#search");
      expect(result).toEqual(null);
    } finally {
      await browser.close();
    }
  }, 3000)
});
