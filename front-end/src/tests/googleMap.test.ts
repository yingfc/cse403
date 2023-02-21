import puppeteer from "puppeteer";
import * as ReactGoogleMapsApi from "@react-google-maps/api";

let page: any;

describe.only("Google Map:", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  beforeAll(async () => {
    const browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();

    await page.goto("http://localhost:3000");
  }, 10000);

  it("Loading map correctly", async () => {
    jest.setTimeout(10000);

    if (!page) {
      throw new Error("Error while loading Puppeteer page");
    }

    jest.spyOn(ReactGoogleMapsApi, "useJsApiLoader").mockReturnValue({
      isLoaded: true,
      loadError: undefined,
    });
  }, 10000);
});
