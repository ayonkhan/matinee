import { describe, expect, it } from 'vitest'
import { Stat } from '../src/components/stat'

const render = (node: unknown) => String(node)

describe('Stat', () => {
  it('shows the label and the value', () => {
    const html = render(<Stat label="Items added" value={128} />)

    expect(html).toContain('Items added')
    expect(html).toContain('128')
  })

  it('reads as a term and its value', () => {
    const html = render(<Stat label="Items added" value={128} />)

    expect(html).toContain('<dl')
    expect(html).toContain('<dt')
    expect(html).toContain('<dd')
  })

  it('puts the label before the value', () => {
    const html = render(<Stat label="Items added" value={128} />)

    expect(html.indexOf('Items added')).toBeLessThan(html.indexOf('128'))
  })

  it('accepts text as a value', () => {
    expect(render(<Stat label="Top topic" value="Design" />)).toContain('Design')
  })

  it('keeps a zero', () => {
    expect(render(<Stat label="Saved" value={0} />)).toContain('>0<')
  })

  it('lines numbers up with equal width digits', () => {
    expect(render(<Stat label="x" value={1} />)).toContain('tabular-nums')
  })

  it('shows a hint only when given one', () => {
    expect(render(<Stat label="x" value={1} />)).not.toContain('type-hint')
    expect(render(<Stat label="Average" value="3.8" hint="out of 5" />)).toContain('out of 5')
  })

  it('is a plain tile by default', () => {
    const html = render(<Stat label="x" value={1} />)

    expect(html).toContain('<div')
    expect(html).not.toContain('<a')
    expect(html).toContain('rounded-tile')
    expect(html).toContain('bg-card')
    expect(html).not.toContain('hover:')
  })

  it('becomes a link with an href', () => {
    const html = render(<Stat label="Saved" value={24} href="/saved" />)

    expect(html).toContain('<a')
    expect(html).toContain('href="/saved"')
    expect(html).toContain('hover:bg-raised')
  })

  it('adds extra classes', () => {
    expect(render(<Stat label="x" value={1} class="mt-2" />)).toContain('mt-2')
    expect(render(<Stat label="x" value={1} href="/a" class="mt-2" />)).toContain('mt-2')
  })

  it('escapes the label, value and hint', () => {
    const html = render(<Stat label={'<b>a</b>'} value={'<script>alert(1)</script>'} hint={'<i>c</i>'} />)

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>a</b>')
    expect(html).not.toContain('<i>c</i>')
  })
})
