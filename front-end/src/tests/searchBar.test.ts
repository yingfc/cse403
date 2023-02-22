import puppeteer from "puppeteer";
import * as ReactGoogleMapsApi from "@react-google-maps/api";
import axios from "axios";

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
    axios.defaults.baseURL = process.env.REACT_APP_DUBMAP_SERVER;
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
    const selector = "#search";
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (e) {
      throw new Error("unexpected error appeared");
    }
    let para = await page.$("[id='error_msg']");
    let text = await (await para.getProperty("textContent")).jsonValue();
    expect(text).toEqual("");
  });
});
