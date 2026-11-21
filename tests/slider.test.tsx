import { describe, expect, it } from 'vitest'
import { Slider } from '../src/components/slider'

const render = (node: unknown) => String(node)
const has = (html: string, attribute: string) => new RegExp(`\\s${attribute}(=""|\\s|>)`).test(html)

describe('Slider', () => {
  it('connects the label to a range input', () => {
    const html = render(<Slider id="volume" label="Volume" />)

    expect(html).toContain('for="volume"')
    expect(html).toContain('id="volume"')
    expect(html).toContain('type="range"')
    expect(html).toContain('Volume')
  })

  it('runs from 0 to 100 in steps of 1 by default', () => {
    const html = render(<Slider id="a" label="A" />)

    expect(html).toContain('min="0"')
    expect(html).toContain('max="100"')
    expect(html).toContain('step="1"')
  })

  it('takes its own range, step and starting value', () => {
    const html = render(<Slider id="a" label="A" min={10} max={50} step={5} value={25} />)

    expect(html).toContain('min="10"')
    expect(html).toContain('max="50"')
    expect(html).toContain('step="5"')
    expect(html).toContain('value="25"')
  })

  it('sends a name with the form', () => {
    expect(render(<Slider id="a" label="A" name="volume" />)).toContain('name="volume"')
  })

  it('shows words at each end only when given', () => {
    expect(render(<Slider id="a" label="A" />)).not.toContain('text-xs')

    const html = render(<Slider id="a" label="A" minLabel="Quiet" maxLabel="Loud" />)

    expect(html).toContain('Quiet')
    expect(html).toContain('Loud')
  })

  it('shows a hint and links it to the slider', () => {
    const html = render(<Slider id="a" label="A" hint="Drag to change." />)

    expect(html).toContain('Drag to change.')
    expect(html).toContain('aria-describedby="a-hint"')
  })

  it('shows an error instead of the hint and marks the slider invalid', () => {
    const html = render(<Slider id="a" label="A" hint="Drag to change." error="Too loud." />)

    expect(html).toContain('Too loud.')
    expect(html).not.toContain('Drag to change.')
    expect(html).toContain('aria-invalid="true"')
  })

  it('styles the track and thumb for each browser', () => {
    const html = render(<Slider id="a" label="A" />)

    // Hono writes "&" as "&amp;" in attributes. The browser reads it back as "&".
    expect(html).toContain('appearance-none')
    expect(html).toContain('::-webkit-slider-thumb]:bg-accent')
    expect(html).toContain('::-moz-range-thumb]:bg-accent')
  })

  it('looks and acts disabled', () => {
    const html = render(<Slider id="a" label="A" disabled />)

    expect(has(html, 'disabled')).toBe(true)
    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('cursor-pointer')
  })

  it('adds extra classes', () => {
    expect(render(<Slider id="a" label="A" class="max-w-sm" />)).toContain('max-w-sm')
  })

  it('escapes the label and end words', () => {
    const html = render(<Slider id="a" label={'<script>alert(1)</script>'} minLabel={'<b>x</b>'} />)

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>x</b>')
  })
})
