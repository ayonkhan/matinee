import { describe, expect, it } from 'vitest'
import { Cover } from '../src/components/cover'

const render = (node: unknown) => String(node)

describe('Cover', () => {
  it('shows the image with descriptive alt text', () => {
    const html = render(<Cover title="Night Train" src="https://example.com/night-train.jpg" />)

    expect(html).toContain('<img')
    expect(html).toContain('src="https://example.com/night-train.jpg"')
    expect(html).toContain('alt="Cover of Night Train"')
  })

  it('loads lazily and reserves its size', () => {
    const html = render(<Cover title="Night Train" src="https://example.com/night-train.jpg" />)

    expect(html).toContain('loading="lazy"')
    expect(html).toContain('width="200"')
    expect(html).toContain('height="300"')
  })

  it('keeps a 2:3 shape', () => {
    expect(render(<Cover title="Night Train" src="x.jpg" />)).toContain('aspect-[2/3]')
  })

  it('shows a placeholder with the title when there is no cover', () => {
    const html = render(<Cover title="Night Train" />)

    expect(html).not.toContain('<img')
    expect(html).toContain('role="img"')
    expect(html).toContain('aria-label="No cover available for Night Train"')
    expect(html).toContain('>Night Train<')
  })

  it('treats an empty src as no cover', () => {
    expect(render(<Cover title="Night Train" src="" />)).not.toContain('<img')
  })

  it('changes width with size', () => {
    expect(render(<Cover title="x" src="x.jpg" />)).toContain('w-24')
    expect(render(<Cover title="x" src="x.jpg" size="sm" />)).toContain('w-12')
    expect(render(<Cover title="x" src="x.jpg" size="lg" />)).toContain('w-40')
    expect(render(<Cover title="x" src="x.jpg" size="fill" />)).toContain('w-full')
  })

  it('adds extra classes', () => {
    expect(render(<Cover title="x" class="shadow-float" />)).toContain('shadow-float')
  })

  it('escapes the title', () => {
    const html = render(<Cover title={'<script>alert(1)</script>'} />)

    expect(html).not.toContain('<script>')
  })
})
