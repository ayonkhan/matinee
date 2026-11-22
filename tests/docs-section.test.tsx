import { describe, expect, it } from 'vitest'
import { Section } from '../docs/section'

const render = (node: unknown) => String(node)

describe('Section', () => {
  it('has the id the sidebar links to', () => {
    expect(render(<Section id="slider" title="Slider">x</Section>)).toContain('<section id="slider"')
  })

  it('links its title to itself, so the link can be copied and shared', () => {
    const html = render(<Section id="slider" title="Slider">x</Section>)

    expect(html).toMatch(/<h2[^>]*><a href="#slider"/)
    expect(html).toContain('Slider')
  })

  it('hides the hash mark from screen readers', () => {
    expect(render(<Section id="a" title="A">x</Section>)).toContain('aria-hidden="true"')
  })
})
