import { describe, expect, it } from 'vitest'
import { Disclosure } from '../src/components/disclosure'

const render = (node: unknown) => String(node)

describe('Disclosure', () => {
  it('is a details element with a summary', () => {
    const html = render(<Disclosure title="Shipping">Free over 50.</Disclosure>)

    expect(html).toContain('<details')
    expect(html).toContain('<summary')
    expect(html).toContain('Shipping')
  })

  it('keeps its content inside, after the summary', () => {
    const html = render(<Disclosure title="Shipping">Free over 50.</Disclosure>)

    expect(html.indexOf('Free over 50.')).toBeGreaterThan(html.indexOf('</summary>'))
    expect(html.indexOf('Free over 50.')).toBeLessThan(html.indexOf('</details>'))
  })

  it('starts closed', () => {
    expect(render(<Disclosure title="A">x</Disclosure>)).not.toMatch(/<details[^>]*\sopen/)
  })

  it('starts open when asked', () => {
    expect(render(<Disclosure title="A" open>x</Disclosure>)).toMatch(/<details[^>]*\sopen/)
  })

  it('hides the arrow from screen readers and turns it when open', () => {
    const html = render(<Disclosure title="A">x</Disclosure>)

    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('rotate-90')
  })

  it('shows a note on the right only when given one', () => {
    expect(render(<Disclosure title="A">x</Disclosure>)).not.toContain('text-xs')
    expect(render(<Disclosure title="A" meta={9}>x</Disclosure>)).toContain('>9<')
  })

  it('keeps a note of zero', () => {
    expect(render(<Disclosure title="A" meta={0}>x</Disclosure>)).toContain('>0<')
  })

  it('removes the browser marker and keeps a focus ring', () => {
    const html = render(<Disclosure title="A">x</Disclosure>)

    expect(html).toContain('details-marker')
    expect(html).toContain('focus-visible:outline-accent-text')
  })

  it('adds extra classes to the details element', () => {
    expect(render(<Disclosure title="A" class="border border-line">x</Disclosure>)).toMatch(/<details[^>]*border-line/)
  })

  it('escapes the title', () => {
    expect(render(<Disclosure title={'<script>alert(1)</script>'}>x</Disclosure>)).not.toContain('<script>')
  })
})
