import { describe, expect, it } from 'vitest'
import { Prose } from '../src/components/prose'

const render = (node: unknown) => String(node)

describe('Prose', () => {
  it('holds its text and elements', () => {
    const html = render(
      <Prose>
        <h2>Your data</h2>
        <p>We keep what you add.</p>
      </Prose>,
    )

    expect(html).toContain('<h2>Your data</h2>')
    expect(html).toContain('<p>We keep what you add.</p>')
  })

  it('is a div by default and can be an article or a section', () => {
    expect(render(<Prose>x</Prose>)).toContain('<div')
    expect(render(<Prose as="article">x</Prose>)).toContain('<article')
    expect(render(<Prose as="article">x</Prose>)).toContain('</article>')
    expect(render(<Prose as="section">x</Prose>)).toContain('<section')
  })

  it('styles the plain elements inside it', () => {
    // An ampersand in an attribute is written as &amp;, and the browser reads it back as &.
    const html = render(<Prose>x</Prose>).replace(/&amp;/g, '&')

    expect(html).toContain('[&_h2]:type-heading')
    expect(html).toContain('[&_a]:text-accent-text')
    expect(html).toContain('[&_ul]:list-disc')
    expect(html).toContain('[&_ol]:list-decimal')
  })

  it('keeps the lines a comfortable length to read', () => {
    expect(render(<Prose>x</Prose>)).toContain('max-w-2xl')
  })

  it('adds extra classes', () => {
    expect(render(<Prose class="mt-8">x</Prose>)).toContain('mt-8')
  })

  it('escapes text given as a string', () => {
    const html = render(<Prose>{'<script>alert(1)</script>'}</Prose>)

    expect(html).not.toContain('<script>')
  })
})
