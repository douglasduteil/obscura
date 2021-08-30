import puppeteer, { Browser, Page as BrowserPage, ElementHandle } from 'https://deno.land/x/puppeteer@9.0.1/mod.ts'

export class Node {
  #page: BrowserPage
  #el: Promise<ElementHandle | null | ElementHandle[]>
  #propsProxyObject: Record<string, Promise<any>>

  constructor(page: BrowserPage, el: Promise<ElementHandle | null | ElementHandle[]>) {
    this.#page = page
    this.#el = el
    this.#propsProxyObject = new Proxy({}, {
      get(target: any, key: string | symbol): Promise<any> {
        if (typeof key === 'string') {
          return new Promise<any>(async (resolve) => {
            const e = await el
            if (e === null) {
              resolve(null)
              return
            }
            if (Array.isArray(e)) {
              resolve(null)
              return
            }
            resolve(await page.evaluate((el, key) => el.getAttribute(key), e, key))
          })
        }
        return Promise.resolve(null)
      }
    })
  }

  get props(): Record<string, Promise<any>> {
    return this.#propsProxyObject
  }

  get text(): Promise<string> {
    return this.#getText()
  }

  get html(): Promise<string> {
    return this.#getHtml()
  }

  async #getText(): Promise<string> {
    const el = await this.#el
    if (el === null) {
      return ''
    }
    if (Array.isArray(el)) {
      return ''
    }
    return await this.#page.evaluate(el => el.textContent, el)
  }

  async #getHtml(): Promise<string> {
    const el = await this.#el
    if (el === null) {
      return ''
    }
    if (Array.isArray(el)) {
      return ''
    }
    return await this.#page.evaluate(el => el.innerHTML, el)
  }
}
