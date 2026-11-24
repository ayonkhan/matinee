import { describe, expect, it } from 'vitest'
import { ListItem } from '../src/components/list-item'

const render = (node: unknown) => String(node)

describe('ListItem', () => {
  it('is a list item with its title', () => {
    const html = render(<ListItem title="Design notes" />)

    expect(html).toContain('<li')
    expect(html).toContain('Design notes')
  })

  it('shows a description only when given one', () => {
    expect(render(<ListItem title="x" description="Added 3 days ago" />)).toContain('Added 3 days ago')
    expect(render(<ListItem title="x" />)).not.toContain('type-hint')
  })

  it('puts the title before the description', () => {
    const html = render(<ListItem title="Design notes" description="Added 3 days ago" />)

    expect(html.indexOf('Design notes')).toBeLessThan(html.indexOf('Added 3 days ago'))
  })

  it('is a link when it has an address', () => {
    const html = render(<ListItem title="x" href="/items/1" />)

    expect(html).toContain('<a href="/items/1"')
  })

  it('is not a link without an address', () => {
    expect(render(<ListItem title="x" />)).not.toContain('<a ')
  })

  it('shows an arrow on a link row', () => {
    expect(render(<ListItem title="x" href="/items/1" />)).toContain('<svg')
    expect(render(<ListItem title="x" />)).not.toContain('<svg')
  })

  it('shows the trailing part instead of the arrow', () => {
    const html = render(<ListItem title="x" href="/items/1" trailing={<span>New</span>} />)

    expect(html).toContain('<span>New</span>')
    expect(html).not.toContain('<svg')
  })

  it('shows the leading part before the title', () => {
    const html = render(<ListItem title="Design notes" leading={<span>Lead</span>} />)

    expect(html.indexOf('Lead')).toBeLessThan(html.indexOf('Design notes'))
  })

  it('wraps long titles instead of cutting them off', () => {
    expect(render(<ListItem title="x" />)).toContain('break-words')
  })

  it('keeps each row at least tall enough to tap', () => {
    expect(render(<ListItem title="x" />)).toContain('min-h-14')
  })

  it('adds extra classes to the item', () => {
    expect(render(<ListItem title="x" class="mt-2" />)).toContain('mt-2')
  })

  it('escapes the title and description', () => {
    const html = render(<ListItem title={'<b>x</b>'} description={'<script>alert(1)</script>'} />)

    expect(html).not.toContain('<b>x</b>')
    expect(html).not.toContain('<script>')
  })
})
