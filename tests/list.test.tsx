import { describe, expect, it } from 'vitest'
import { List } from '../src/components/list'

const render = (node: unknown) => String(node)

describe('List', () => {
  it('is an unordered list', () => {
    expect(render(<List>x</List>)).toContain('<ul')
  })

  it('holds its rows', () => {
    expect(render(<List><li>One</li><li>Two</li></List>)).toContain('<li>One</li><li>Two</li>')
  })

  it('names the list for screen readers when given a label', () => {
    expect(render(<List label="Saved items">x</List>)).toContain('aria-label="Saved items"')
    expect(render(<List>x</List>)).not.toContain('aria-label')
  })

  it('puts a line between the rows', () => {
    expect(render(<List>x</List>)).toContain('divide-y')
  })

  it('adds extra classes', () => {
    expect(render(<List class="mt-4">x</List>)).toContain('mt-4')
  })
})
