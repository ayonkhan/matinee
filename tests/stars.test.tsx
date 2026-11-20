import { describe, expect, it } from 'vitest'
import { roundToHalf, Stars } from '../src/components/stars'

const render = (node: unknown) => String(node)
const count = (html: string) => (html.match(/data-fill=/g) ?? []).length

describe('Stars', () => {
  it('shows five stars by default', () => {
    expect(count(render(<Stars value={3} />))).toBe(5)
  })

  it('can show a different number of stars', () => {
    expect(count(render(<Stars value={7} max={10} />))).toBe(10)
  })

  it('fills whole stars, a half star and empty stars', () => {
    const html = render(<Stars value={2.5} />)

    expect(html.match(/data-fill="100"/g)).toHaveLength(2)
    expect(html.match(/data-fill="50"/g)).toHaveLength(1)
    expect(html.match(/data-fill="0"/g)).toHaveLength(2)
    expect(html).toContain('width:50%')
  })

  it('describes the rating for screen readers', () => {
    const html = render(<Stars value={3.5} />)

    expect(html).toContain('role="img"')
    expect(html).toContain('aria-label="Rated 3.5 out of 5"')
  })

  it('accepts a custom label', () => {
    expect(render(<Stars value={3.5} label="Rated 7 out of 10" />)).toContain('aria-label="Rated 7 out of 10"')
  })

  it('shows the number when asked', () => {
    expect(render(<Stars value={4} showValue />)).toContain('>4<')
    expect(render(<Stars value={4} />)).not.toContain('>4<')
  })

  it('keeps values inside the range', () => {
    expect(count(render(<Stars value={9} />))).toBe(5)
    expect(render(<Stars value={9} />)).not.toContain('data-fill="0"')
    expect(render(<Stars value={-2} />)).not.toContain('data-fill="100"')
  })

  it('changes star size', () => {
    expect(render(<Stars value={1} />)).toContain('size-5')
    expect(render(<Stars value={1} size="sm" />)).toContain('size-4')
    expect(render(<Stars value={1} size="lg" />)).toContain('size-6')
  })

  it('adds extra classes', () => {
    expect(render(<Stars value={1} class="mt-2" />)).toContain('mt-2')
  })
})

describe('roundToHalf', () => {
  it('rounds to the nearest half', () => {
    expect(roundToHalf(3.7, 5)).toBe(3.5)
    expect(roundToHalf(3.8, 5)).toBe(4)
    expect(roundToHalf(3.2, 5)).toBe(3)
  })

  it('clamps to 0 and max', () => {
    expect(roundToHalf(-1, 5)).toBe(0)
    expect(roundToHalf(8, 5)).toBe(5)
  })
})
