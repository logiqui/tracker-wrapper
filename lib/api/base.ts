import puppeteer, { PuppeteerExtra } from 'puppeteer-extra'
import stealth from 'puppeteer-extra-plugin-stealth'

export abstract class BaseApi {
  protected puppeteerInstance: PuppeteerExtra

  constructor() {
    this.puppeteerInstance = puppeteer
    this.puppeteerInstance.use(stealth())
  }

  public async request(url: string) {
    const browser = await this.puppeteerInstance.launch()
    const page = await browser.newPage()

    const response = await page.goto(url)
    const body = await response.text()

    await browser.close()

    const data = JSON.parse(body)
    if (data['errors']) throw new Error(data['errors'][0]['message'])

    return data
  }
}
