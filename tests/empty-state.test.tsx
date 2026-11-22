import { describe, expect, it } from 'vitest'
import { EmptyState } from '../src/components/empty-state'

const render = (node: unknown) => String(node)

describe('EmptyState', () => {
  it('shows its title as a heading', () => {
    const html = render(<EmptyState title="Nothing here yet" />)

    expect(html).toContain('<h3')
    expect(html).toContain('Nothing here yet')
  })

  it('shows a message under the title', () => {
    const html = render(<EmptyState title="Empty">Films you add will show up here.</EmptyState>)

    expect(html).toContain('Films you add will show up here.')
    expect(html.indexOf('Empty')).toBeLessThan(html.indexOf('Films you add'))
  })

  it('has no message area without a message', () => {
    expect(render(<EmptyState title="Empty" />)).not.toContain('max-w-sm')
  })

  it('shows an icon and hides it from screen readers', () => {
    const html = render(<EmptyState title="Empty" icon={<svg data-icon="film" />} />)

    expect(html).toContain('data-icon="film"')
    expect(html).toContain('aria-hidden="true"')
  })

  it('has no icon circle without an icon', () => {
    const html = render(<EmptyState title="Empty" />)

    expect(html).not.toContain('aria-hidden')
    expect(html).not.toContain('rounded-full')
  })

  it('offers one next step as a link button', () => {
    const html = render(<EmptyState title="Empty" action={{ label: 'Add a film', href: '/films/new' }} />)

    expect(html).toContain('href="/films/new"')
    expect(html).toContain('Add a film')
    expect(html).toContain('bg-accent')
  })

  it('has no button without an action', () => {
    const html = render(<EmptyState title="Empty" />)

    expect(html).not.toContain('<a')
    expect(html).not.toContain('<button')
  })

  it('has a dashed outline and centred text', () => {
    const html = render(<EmptyState title="Empty" />)

    expect(html).toContain('border-dashed')
    expect(html).toContain('text-center')
  })

  it('adds extra classes', () => {
    expect(render(<EmptyState title="Empty" class="mt-6" />)).toContain('mt-6')
  })

  it('escapes the title and the action label', () => {
    const html = render(
      <EmptyState title={'<script>alert(1)</script>'} action={{ label: '<b>x</b>', href: '/a' }} />,
    )

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>x</b>')
  })
})
