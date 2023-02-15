import puppeteer from "puppeteer";
import * as ReactGoogleMapsApi from "@react-google-maps/api";
import { render } from "@testing-library/react";
import GoogleMapComponent from "../components/GoogleMap";

jest.useRealTimers();

let page: any;

const sleep = async (ms: number) => {
  await new Promise((res) => {
    setTimeout(res, ms);
  });
};

describe.only("Google Map:", () => {
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
});
