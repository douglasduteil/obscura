import puppeteer, { Browser, Page as BrowserPage, ElementHandle } from 'https://deno.land/x/puppeteer@9.0.1/mod.ts'
import { Node } from './node.ts'

class Page {
  #browser: Browser
  #page: BrowserPage

  constructor(browser: Browser, page: BrowserPage) {
    this.#browser = browser
    this.#page = page
  }

  select(selector: string): Node {
    return new Node(this.#page, this.#page.$(selector))
  }

  selectAll(selector: string): Node {
    return new Node(this.#page, this.#page.$$(selector))
  }

  async close() {
    await this.#page.close()
    await this.#browser.close()
  }
}

export async function load(html: string): Promise<Page> {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(html)
  return new Page(browser, page)
}
