import { describe, expect, it } from 'vitest'
import { RatingInput } from '../src/components/rating-input'

const render = (node: unknown) => String(node)
const count = (html: string, pattern: RegExp) => (html.match(pattern) ?? []).length

describe('RatingInput', () => {
  it('puts the stars in a fieldset with a legend', () => {
    const html = render(<RatingInput id="r" legend="Your rating" name="rating" />)

    expect(html).toContain('<fieldset')
    expect(html).toContain('Your rating')
  })

  it('has five radio buttons by default, and as many as max says', () => {
    expect(count(render(<RatingInput id="r" legend="R" name="rating" />), /type="radio"/g)).toBe(5)
    expect(count(render(<RatingInput id="r" legend="R" name="rating" max={10} />), /type="radio"/g)).toBe(10)
  })

  it('shares one name and sends the number of the chosen star', () => {
    const html = render(<RatingInput id="r" legend="R" name="rating" />)

    expect(count(html, /name="rating"/g)).toBe(5)
    expect(html).toContain('value="1"')
    expect(html).toContain('value="5"')
  })

  it('gives each star its own id', () => {
    const html = render(<RatingInput id="r" legend="R" name="rating" />)

    expect(html).toContain('id="r-1"')
    expect(html).toContain('id="r-5"')
    expect(html).toContain('for="r-3"')
  })

  it('lists the highest star first, because the row is flipped on screen', () => {
    const html = render(<RatingInput id="r" legend="R" name="rating" />)

    expect(html.indexOf('id="r-5"')).toBeLessThan(html.indexOf('id="r-1"'))
  })

  it('ticks only the chosen star', () => {
    const html = render(<RatingInput id="r" legend="R" name="rating" value={4} />)

    expect(count(html, /\schecked(=""|\s|>)/g)).toBe(1)
    expect(html.indexOf('checked')).toBeGreaterThan(html.indexOf('id="r-4"'))
    expect(html.indexOf('checked')).toBeLessThan(html.indexOf('id="r-3"'))
  })

  it('ticks nothing without a value', () => {
    expect(count(render(<RatingInput id="r" legend="R" name="rating" />), /\schecked/g)).toBe(0)
  })

  it('names each star for screen readers', () => {
    const html = render(<RatingInput id="r" legend="R" name="rating" />)

    expect(html).toContain('1 star<')
    expect(html).toContain('3 stars')
  })

  it('hides the radio buttons and draws the stars with the theme class', () => {
    const html = render(<RatingInput id="r" legend="R" name="rating" />)

    expect(html).toContain('sr-only')
    expect(html).toContain('rating-star')
  })

  it('makes every star easy to tap', () => {
    expect(render(<RatingInput id="r" legend="R" name="rating" />)).toContain('size-11')
  })

  it('can be required, with the star next to the legend', () => {
    const html = render(<RatingInput id="r" legend="R" name="rating" required />)

    expect(count(html, /required/g)).toBe(5)
    expect(html).toContain('*')
  })

  it('can be disabled', () => {
    expect(count(render(<RatingInput id="r" legend="R" name="rating" disabled />), /disabled/g)).toBeGreaterThan(4)
  })

  it('shows a hint, or an error in its place', () => {
    expect(render(<RatingInput id="r" legend="R" name="rating" hint="Tap a star." />)).toContain('Tap a star.')

    const html = render(<RatingInput id="r" legend="R" name="rating" hint="Tap a star." error="Choose one." />)

    expect(html).toContain('Choose one.')
    expect(html).not.toContain('Tap a star.')
  })

  it('adds extra classes', () => {
    expect(render(<RatingInput id="r" legend="R" name="rating" class="mt-4" />)).toContain('mt-4')
  })
})
