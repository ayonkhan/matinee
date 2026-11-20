import { describe, expect, it } from 'vitest'
import { Poster } from '../src/components/poster'

const render = (node: unknown) => String(node)

describe('Poster', () => {
  it('shows the image with descriptive alt text', () => {
    const html = render(<Poster title="Heat" src="https://example.com/heat.jpg" />)

    expect(html).toContain('<img')
    expect(html).toContain('src="https://example.com/heat.jpg"')
    expect(html).toContain('alt="Poster of Heat"')
  })

  it('loads lazily and reserves its size', () => {
    const html = render(<Poster title="Heat" src="https://example.com/heat.jpg" />)

    expect(html).toContain('loading="lazy"')
    expect(html).toContain('width="200"')
    expect(html).toContain('height="300"')
  })

  it('keeps a 2:3 shape', () => {
    expect(render(<Poster title="Heat" src="x.jpg" />)).toContain('aspect-[2/3]')
  })

  it('shows a placeholder with the title when there is no poster', () => {
    const html = render(<Poster title="Heat" />)

    expect(html).not.toContain('<img')
    expect(html).toContain('role="img"')
    expect(html).toContain('aria-label="No poster available for Heat"')
    expect(html).toContain('>Heat<')
  })

  it('treats an empty src as no poster', () => {
    expect(render(<Poster title="Heat" src="" />)).not.toContain('<img')
  })

  it('changes width with size', () => {
    expect(render(<Poster title="x" src="x.jpg" />)).toContain('w-24')
    expect(render(<Poster title="x" src="x.jpg" size="sm" />)).toContain('w-12')
    expect(render(<Poster title="x" src="x.jpg" size="lg" />)).toContain('w-40')
    expect(render(<Poster title="x" src="x.jpg" size="fill" />)).toContain('w-full')
  })

  it('adds extra classes', () => {
    expect(render(<Poster title="x" class="shadow-float" />)).toContain('shadow-float')
  })

  it('escapes the title', () => {
    const html = render(<Poster title={'<script>alert(1)</script>'} />)

    expect(html).not.toContain('<script>')
  })
})
