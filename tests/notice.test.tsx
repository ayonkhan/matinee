import { describe, expect, it } from 'vitest'
import { Notice } from '../src/components/notice'

const render = (node: unknown) => String(node)

describe('Notice', () => {
  it('renders its message', () => {
    expect(render(<Notice>Settings saved.</Notice>)).toContain('Settings saved.')
  })

  it('shows a title when given one', () => {
    const html = render(<Notice title="Saved">Your changes are live.</Notice>)

    expect(html).toContain('Saved')
    expect(html).toContain('font-semibold')
  })

  it('has no title element without one', () => {
    expect(render(<Notice>x</Notice>)).not.toContain('font-semibold')
  })

  it('is neutral by default and announces politely', () => {
    const html = render(<Notice>x</Notice>)

    expect(html).toContain('bg-sunken')
    expect(html).toContain('role="status"')
  })

  it('changes colours with tone', () => {
    expect(render(<Notice tone="accent">x</Notice>)).toContain('bg-accent/15')
    expect(render(<Notice tone="danger">x</Notice>)).toContain('bg-danger/10')
  })

  it('announces errors as alerts', () => {
    expect(render(<Notice tone="danger">x</Notice>)).toContain('role="alert"')
    expect(render(<Notice tone="accent">x</Notice>)).toContain('role="status"')
  })

  it('adds extra classes', () => {
    expect(render(<Notice class="mt-4">x</Notice>)).toContain('mt-4')
  })

  it('escapes the title and message', () => {
    const html = render(<Notice title={'<b>hi</b>'}>{'<script>alert(1)</script>'}</Notice>)

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<b>hi</b>')
  })
})
