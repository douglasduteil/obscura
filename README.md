# obscura

The Web Component Testing Framework in Deno.

```tsx
import { load } from "https://deno.land/x/obscura/mod.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test('h1 should be filled', async () => {
  const page = await load('<h1>Hi :)</h1>')
  assertEquals(page.select('h1').text, "Hi :)")
  page.close()
})

```

## Support React

```tsx
import React from "https://esm.sh/react"
import { render } from "https://deno.land/x/obscura/react.ts"
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

function App(props) {
  return <h1>{props.title}</h1>
}

Deno.test('"Hi :)" should be rendered', async () => {
  const page = await render(<App title="Hi :)" />)
  assertEquals(page.select('App').props.title, "Hi :)")
  assertEquals(page.select('App > h1').text, "Hi :)")
  page.close()
})

```






























