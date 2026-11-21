import { describe, expect, it } from 'vitest'
import { SegmentedControl } from '../src/components/segmented-control'

const render = (node: unknown) => String(node)

const options = [
  { label: 'List', href: '?view=list', selected: true },
  { label: 'Grid', href: '?view=grid' },
]

describe('SegmentedControl', () => {
  it('renders a nav named by its label', () => {
    const html = render(<SegmentedControl label="View" options={options} />)

    expect(html).toContain('<nav')
    expect(html).toContain('aria-label="View"')
  })

  it('renders each option as a link', () => {
    const html = render(<SegmentedControl label="View" options={options} />)

    expect(html).toContain('href="?view=list"')
    expect(html).toContain('href="?view=grid"')
    expect(html).toContain('List')
    expect(html).toContain('Grid')
  })

  it('marks only the selected option as current', () => {
    const html = render(<SegmentedControl label="View" options={options} />)

    expect(html.match(/aria-current="true"/g)).toHaveLength(1)
  })

  it('makes the selected option stand out', () => {
    const html = render(<SegmentedControl label="View" options={options} />)

    expect(html).toContain('bg-raised')
    expect(html).toContain('font-semibold')
    expect(html).toContain('text-muted')
  })

  it('shows an icon and hides it from screen readers', () => {
    const html = render(
      <SegmentedControl label="View" options={[{ label: 'List', href: '#', icon: <svg data-icon="list" /> }]} />,
    )

    expect(html).toContain('data-icon="list"')
    expect(html).toContain('aria-hidden="true"')
  })

  it('has no icon wrapper without an icon', () => {
    expect(render(<SegmentedControl label="View" options={options} />)).not.toContain('aria-hidden')
  })

  it('shares the width between options when fullWidth', () => {
    const html = render(<SegmentedControl label="View" options={options} fullWidth />)

    expect(html).toContain('w-full')
    expect(html).toContain('flex-1')
  })

  it('stays as wide as its content by default', () => {
    const html = render(<SegmentedControl label="View" options={options} />)

    expect(html).toContain('inline-flex')
    expect(html).not.toContain('flex-1')
  })

  it('adds extra classes', () => {
    expect(render(<SegmentedControl label="View" options={options} class="mt-2" />)).toContain('mt-2')
  })

  it('escapes labels', () => {
    const html = render(
      <SegmentedControl label="View" options={[{ label: '<script>alert(1)</script>', href: '#' }]} />,
    )

    expect(html).not.toContain('<script>')
  })
})
