import { describe, expect, it } from 'vitest'
import { PageHeader } from '../src/components/page-header'

const render = (node: unknown) => String(node)

describe('PageHeader', () => {
  it('is a header with the title as the h1', () => {
    const html = render(<PageHeader title="My items" />)

    expect(html).toContain('<header')
    expect(html).toContain('<h1')
    expect(html).toContain('My items')
  })

  it('shows a description only when given one', () => {
    expect(render(<PageHeader title="x" description="Everything you have added." />)).toContain(
      'Everything you have added.',
    )
    expect(render(<PageHeader title="x" />)).not.toContain('type-body')
  })

  it('puts the title before the description', () => {
    const html = render(<PageHeader title="My items" description="Everything you have added." />)

    expect(html.indexOf('My items')).toBeLessThan(html.indexOf('Everything you have added.'))
  })

  it('shows the action as a link', () => {
    const html = render(<PageHeader title="x" action={{ label: 'Add item', href: '/items/new' }} />)

    expect(html).toContain('href="/items/new"')
    expect(html).toContain('Add item')
  })

  it('has no action without one', () => {
    expect(render(<PageHeader title="x" />)).not.toContain('<a ')
  })

  it('lets the action drop under the title on a narrow screen', () => {
    expect(render(<PageHeader title="x" />)).toContain('flex-wrap')
  })

  it('adds extra classes', () => {
    expect(render(<PageHeader title="x" class="mt-4" />)).toContain('mt-4')
  })

  it('escapes the title and description', () => {
    const html = render(<PageHeader title={'<b>x</b>'} description={'<script>alert(1)</script>'} />)

    expect(html).not.toContain('<b>x</b>')
    expect(html).not.toContain('<script>')
  })
})
