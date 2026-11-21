import { describe, expect, it } from 'vitest'
import { BottomNav } from '../src/components/bottom-nav'

const render = (node: unknown) => String(node)

const items = [
  { label: 'Home', href: '/', current: true, icon: <svg data-icon="home" /> },
  { label: 'Browse', href: '/browse' },
  { label: 'New', href: '/new', primary: true, icon: <svg data-icon="plus" /> },
]

describe('BottomNav', () => {
  it('renders a labelled nav with a link for each item', () => {
    const html = render(<BottomNav items={items} />)

    expect(html).toContain('<nav')
    expect(html).toContain('aria-label="Primary"')
    expect(html).toContain('href="/browse"')
    expect(html).toContain('Browse')
  })

  it('marks the current page', () => {
    const html = render(<BottomNav items={items} />)

    expect(html.match(/aria-current="page"/g)).toHaveLength(1)
  })

  it('draws the primary item as a gold circle with a hidden label', () => {
    const html = render(<BottomNav items={items} />)

    expect(html).toContain('bg-accent')
    expect(html).toContain('<span class="sr-only">New</span>')
  })

  it('hides icons from screen readers', () => {
    const html = render(<BottomNav items={items} />)

    expect(html).toContain('data-icon="home"')
    expect(html).toContain('aria-hidden="true"')
  })

  it('floats at the bottom on phones by default', () => {
    const html = render(<BottomNav items={items} />)

    expect(html).toContain('fixed')
    expect(html).toContain('sm:hidden')
  })

  it('can sit inline for previews', () => {
    const html = render(<BottomNav items={items} placement="inline" />)

    expect(html).not.toContain('fixed')
    expect(html).not.toContain('sm:hidden')
  })

  it('adds extra classes', () => {
    expect(render(<BottomNav items={items} class="mb-2" />)).toContain('mb-2')
  })

  it('escapes labels', () => {
    const html = render(<BottomNav items={[{ label: '<script>alert(1)</script>', href: '/' }]} />)

    expect(html).not.toContain('<script>')
  })
})
