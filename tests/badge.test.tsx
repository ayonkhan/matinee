import { describe, expect, it } from 'vitest'
import { Badge } from '../src/components/badge'

const render = (node: unknown) => String(node)

describe('Badge', () => {
  it('renders its text in a span by default', () => {
    const html = render(<Badge>Design</Badge>)

    expect(html).toContain('<span')
    expect(html).toContain('Design')
    expect(html).not.toContain('<a')
  })

  it('renders a link when it has an href', () => {
    const html = render(<Badge href="/items?type=article">Articles</Badge>)

    expect(html).toContain('<a')
    expect(html).toContain('href="/items?type=article"')
  })

  it('uses the neutral tone by default', () => {
    expect(render(<Badge>x</Badge>)).toContain('bg-raised')
  })

  it('changes colours with tone', () => {
    expect(render(<Badge tone="accent">x</Badge>)).toContain('text-accent-text')
    expect(render(<Badge tone="danger">x</Badge>)).toContain('text-danger-text')
  })

  it('looks solid when selected', () => {
    const html = render(<Badge selected>x</Badge>)

    expect(html).toContain('bg-accent')
    expect(html).toContain('text-accent-ink')
    expect(html).not.toContain('bg-raised')
  })

  it('marks a selected link as current', () => {
    expect(render(<Badge href="/a" selected>x</Badge>)).toContain('aria-current="true"')
    expect(render(<Badge href="/a">x</Badge>)).not.toContain('aria-current')
  })

  it('only links get a pointer cursor', () => {
    expect(render(<Badge href="/a">x</Badge>)).toContain('cursor-pointer')
    expect(render(<Badge>x</Badge>)).not.toContain('cursor-pointer')
  })

  it('adds extra classes', () => {
    expect(render(<Badge class="ml-2">x</Badge>)).toContain('ml-2')
  })

  it('escapes its text', () => {
    expect(render(<Badge>{'<script>alert(1)</script>'}</Badge>)).not.toContain('<script>')
  })
})
