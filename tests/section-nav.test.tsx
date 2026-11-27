import { describe, expect, it } from 'vitest'
import { SectionNav } from '../src/components/section-nav'

const render = (node: unknown) => String(node)

const links = [
  { label: 'What we collect', href: '#collect' },
  { label: 'Cookies', href: '#cookies' },
]

describe('SectionNav', () => {
  it('shows each link with its address', () => {
    const html = render(<SectionNav links={links} />)

    expect(html).toContain('href="#collect"')
    expect(html).toContain('What we collect')
    expect(html).toContain('href="#cookies"')
    expect(html).toContain('Cookies')
  })

  it('is called "On this page" unless given another title', () => {
    expect(render(<SectionNav links={links} />)).toContain('On this page')
    expect(render(<SectionNav links={links} title="Contents" />)).toContain('Contents')
  })

  it('is a named navigation for screen readers', () => {
    const html = render(<SectionNav links={links} />)

    expect(html).toContain('<nav')
    expect(html).toContain('aria-label="On this page"')
  })

  it('shows links to other pages under a line, only when given some', () => {
    const withMore = render(<SectionNav links={links} more={[{ label: 'Terms of Service', href: '/terms' }]} />)

    expect(withMore).toContain('border-t')
    expect(withMore).toContain('href="/terms"')
    expect(withMore).toContain('Terms of Service')
    expect(render(<SectionNav links={links} />)).not.toContain('border-t')
  })

  it('keeps every link at least 44px tall on a touch screen', () => {
    expect(render(<SectionNav links={links} />)).toContain('min-h-11')
  })

  it('adds extra classes', () => {
    expect(render(<SectionNav links={links} class="lg:w-52" />)).toContain('lg:w-52')
  })

  it('escapes labels and addresses', () => {
    const html = render(<SectionNav links={[{ label: '<b>hi</b>', href: '"><script>alert(1)</script>' }]} />)

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>hi</b>')
  })
})
