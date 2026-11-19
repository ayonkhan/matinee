import { describe, expect, it } from 'vitest'
import { Card } from '../src/components/card'

const render = (node: unknown) => String(node)

describe('Card', () => {
  it('renders its children inside a div by default', () => {
    const html = render(<Card>Hello</Card>)

    expect(html).toContain('<div')
    expect(html).toContain('Hello')
  })

  it('can render as another element', () => {
    expect(render(<Card as="section">x</Card>)).toContain('<section')
    expect(render(<Card as="article">x</Card>)).toContain('<article')
  })

  it('shows a title as a heading', () => {
    const html = render(<Card title="Account">x</Card>)

    expect(html).toContain('<h3')
    expect(html).toContain('Account')
  })

  it('has no heading without a title', () => {
    expect(render(<Card>x</Card>)).not.toContain('<h3')
  })

  it('uses the card surface, border and radius', () => {
    const html = render(<Card>x</Card>)

    expect(html).toContain('bg-card')
    expect(html).toContain('border-line')
    expect(html).toContain('rounded-card')
  })

  it('changes padding', () => {
    // \b stops "gap-4" from counting as "p-4"
    expect(render(<Card>x</Card>)).toMatch(/\bp-4\b/)
    expect(render(<Card padding="lg">x</Card>)).toContain('sm:p-8')
    expect(render(<Card padding="none">x</Card>)).not.toMatch(/\bp-4\b/)
  })

  it('only adds a shadow when floating', () => {
    expect(render(<Card>x</Card>)).not.toContain('shadow-float')
    expect(render(<Card floating>x</Card>)).toContain('shadow-float')
  })

  it('adds extra classes', () => {
    expect(render(<Card class="max-w-sm">x</Card>)).toContain('max-w-sm')
  })

  it('escapes the title', () => {
    const html = render(<Card title={'<script>alert(1)</script>'}>x</Card>)

    expect(html).not.toContain('<script>')
  })
})
