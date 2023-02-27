import puppeteer from "puppeteer";
import * as ReactGoogleMapsApi from "@react-google-maps/api";
import axios from "axios";

let page: any;
let browser: any;
describe.only("Google Map:", () => {
  afterEach(() => {
    jest.useRealTimers();
    axios.defaults.baseURL = process.env.REACT_APP_DUBMAP_SERVER;
  });

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
    });
    page = await browser.newPage();

    await page.goto("http://127.0.0.1:3000");
  }, 10000);

  afterAll(() => {
    browser.close();
  })

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
