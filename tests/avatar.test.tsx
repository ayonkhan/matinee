import { describe, expect, it } from 'vitest'
import { Avatar, initials } from '../src/components/avatar'

const render = (node: unknown) => String(node)

describe('Avatar', () => {
  it('shows the picture with the name as its alt text', () => {
    const html = render(<Avatar name="swift-raven-5065" src="/a.jpg" />)

    expect(html).toContain('<img')
    expect(html).toContain('src="/a.jpg"')
    expect(html).toContain('alt="swift-raven-5065"')
  })

  it('reserves its size and loads lazily', () => {
    const html = render(<Avatar name="x" src="/a.jpg" />)

    expect(html).toContain('width="40"')
    expect(html).toContain('height="40"')
    expect(html).toContain('loading="lazy"')
  })

  it('shows initials on gold when there is no picture', () => {
    const html = render(<Avatar name="swift-raven-5065" />)

    expect(html).not.toContain('<img')
    expect(html).toContain('>SR<')
    expect(html).toContain('bg-accent')
    expect(html).toContain('text-accent-ink')
  })

  it('treats an empty src as no picture', () => {
    expect(render(<Avatar name="Maple Fox" src="" />)).toContain('>MF<')
  })

  it('names the initials for screen readers', () => {
    const html = render(<Avatar name="swift-raven-5065" />)

    expect(html).toContain('role="img"')
    expect(html).toContain('aria-label="swift-raven-5065"')
  })

  it('stays quiet when decorative', () => {
    const picture = render(<Avatar name="x" src="/a.jpg" decorative />)
    const letters = render(<Avatar name="x" decorative />)

    expect(picture).toContain('alt=""')
    expect(letters).toContain('aria-hidden="true"')
    expect(letters).not.toContain('role="img"')
    expect(letters).not.toContain('aria-label')
  })

  it('is round and keeps its shape in a flex row', () => {
    const html = render(<Avatar name="x" />)

    expect(html).toContain('rounded-full')
    expect(html).toContain('shrink-0')
  })

  it('changes size', () => {
    expect(render(<Avatar name="x" />)).toContain('size-10')
    expect(render(<Avatar name="x" size="sm" />)).toContain('size-8')
    expect(render(<Avatar name="x" size="lg" />)).toContain('size-16')
    expect(render(<Avatar name="x" src="/a.jpg" size="lg" />)).toContain('width="64"')
  })

  it('adds extra classes', () => {
    expect(render(<Avatar name="x" class="ring-2" />)).toContain('ring-2')
    expect(render(<Avatar name="x" src="/a.jpg" class="ring-2" />)).toContain('ring-2')
  })

  it('escapes the name', () => {
    const html = render(<Avatar name={'<script>alert(1)</script>'} src="/a.jpg" />)

    expect(html).not.toContain('<script>')
  })
})

describe('initials', () => {
  it('takes the first letter of the first two parts', () => {
    expect(initials('swift-raven-5065')).toBe('SR')
    expect(initials('Maple Fox')).toBe('MF')
    expect(initials('quiet_otter')).toBe('QO')
  })

  it('works with one part', () => {
    expect(initials('river')).toBe('R')
  })

  it('falls back to a question mark', () => {
    expect(initials('')).toBe('?')
    expect(initials(' - ')).toBe('?')
  })
})
