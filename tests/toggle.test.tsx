import { describe, expect, it } from 'vitest'
import { Toggle } from '../src/components/toggle'

const render = (node: unknown) => String(node)
const has = (html: string, attribute: string) => new RegExp(`\\s${attribute}(=""|\\s|>)`).test(html)

describe('Toggle', () => {
  it('is a checkbox marked as a switch', () => {
    const html = render(<Toggle id="posters" label="Show posters" />)

    expect(html).toContain('type="checkbox"')
    expect(html).toContain('role="switch"')
  })

  it('connects the label to the switch', () => {
    const html = render(<Toggle id="posters" label="Show posters" />)

    expect(html).toContain('for="posters"')
    expect(html).toContain('id="posters"')
    expect(html).toContain('Show posters')
  })

  it('is off by default and can start on', () => {
    expect(has(render(<Toggle id="a" label="A" />), 'checked')).toBe(false)
    expect(has(render(<Toggle id="a" label="A" checked />), 'checked')).toBe(true)
  })

  it('sends a name and value with the form', () => {
    const html = render(<Toggle id="a" label="A" name="posters" value="yes" />)

    expect(html).toContain('name="posters"')
    expect(html).toContain('value="yes"')
  })

  it('shows a hint and links it to the switch', () => {
    const html = render(<Toggle id="a" label="A" hint="Shown above each film." />)

    expect(html).toContain('Shown above each film.')
    expect(html).toContain('id="a-hint"')
    expect(html).toContain('aria-describedby="a-hint"')
  })

  it('draws its track from the input state', () => {
    const html = render(<Toggle id="a" label="A" />)

    expect(html).toContain('sr-only')
    expect(html).toContain('peer-checked:bg-accent')
  })

  it('looks and acts disabled', () => {
    const html = render(<Toggle id="a" label="A" disabled />)

    expect(has(html, 'disabled')).toBe(true)
    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('cursor-pointer')
  })

  it('adds extra classes', () => {
    expect(render(<Toggle id="a" label="A" class="mt-2" />)).toContain('mt-2')
  })

  it('leaves out an empty class attribute', () => {
    expect(render(<Toggle id="a" label="A" />)).not.toContain('class=""')
  })

  it('escapes the label', () => {
    expect(render(<Toggle id="a" label={'<script>alert(1)</script>'} />)).not.toContain('<script>')
  })
})
