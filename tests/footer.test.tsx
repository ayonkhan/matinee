import { describe, expect, it } from 'vitest'
import { Footer } from '../src/components/footer'

const render = (node: unknown) => String(node)

const links = [
  { label: 'About', href: '/about' },
  { label: 'Privacy', href: '/privacy' },
]

describe('Footer', () => {
  it('is a footer element', () => {
    expect(render(<Footer>Note</Footer>)).toContain('<footer')
  })

  it('shows the note', () => {
    expect(render(<Footer>© 2026 Example</Footer>)).toContain('© 2026 Example')
  })

  it('shows each link with its address', () => {
    const html = render(<Footer links={links} />)

    expect(html).toContain('href="/about"')
    expect(html).toContain('About')
    expect(html).toContain('href="/privacy"')
    expect(html).toContain('Privacy')
  })

  it('keeps the links in order', () => {
    const html = render(<Footer links={links} />)

    expect(html.indexOf('About')).toBeLessThan(html.indexOf('Privacy'))
  })

  it('names the link group for screen readers', () => {
    expect(render(<Footer links={links} />)).toContain('aria-label="Footer"')
  })

  it('has no link group without links', () => {
    expect(render(<Footer>Note</Footer>)).not.toContain('<nav')
    expect(render(<Footer links={[]}>Note</Footer>)).not.toContain('<nav')
  })

  it('has no note without one', () => {
    expect(render(<Footer links={links} />)).not.toContain('text-muted">')
  })

  it('makes each link easy to tap', () => {
    expect(render(<Footer links={links} />)).toContain('min-h-11')
  })

  it('adds extra classes', () => {
    expect(render(<Footer class="mt-8">Note</Footer>)).toContain('mt-8')
  })

  it('escapes the note and the link labels', () => {
    const html = render(<Footer links={[{ label: '<b>x</b>', href: '/x' }]}>{'<script>alert(1)</script>'}</Footer>)

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>x</b>')
  })

  it('is as wide as the narrow page by default and can match a wider one', () => {
    expect(render(<Footer>Note</Footer>)).toContain('max-w-5xl')
    expect(render(<Footer width="wide">Note</Footer>)).toContain('max-w-6xl')
    expect(render(<Footer width="wide">Note</Footer>)).not.toContain('max-w-5xl')
  })
})
