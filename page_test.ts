import { assertEquals } from 'https://deno.land/std@0.106.0/testing/asserts.ts'
import { load } from './page.ts'

Deno.test('h1 should be filled', async () => {
  const page = await load('<h1 class="title">Hi <em>:)</em></h1>')
  assertEquals(await page.select('h1').props.class, 'title')
  assertEquals(await page.select('h1').text, 'Hi :)')
  assertEquals(await page.select('h1').html, 'Hi <em>:)</em>')
  await page.close()
})
