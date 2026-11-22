import { describe, expect, it } from 'vitest'
import { CodeBlock, copyScript, highlight } from '../docs/code-block'

const render = (node: unknown) => String(node)

const code = '<Button href="/items/new" fullWidth>\n  Add item\n</Button>'

describe('CodeBlock', () => {
  it('shows the code in a pre element', () => {
    const html = render(<CodeBlock code={code} />)

    expect(html).toContain('<pre')
    expect(html).toContain('Add item')
  })

  it('writes the angle brackets as text, not as markup', () => {
    const html = render(<CodeBlock code={code} />)

    expect(html).toContain('&lt;')
    expect(html).not.toContain('<Button')
  })

  it('keeps the code exactly as written once the colours are removed', () => {
    const text = render(<CodeBlock code={code} />)
      .replace(/<[^>]+>/g, '')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')

    expect(text).toContain(code)
  })

  it('shows a title only when given one', () => {
    expect(render(<CodeBlock code={code} title="Basic use" />)).toContain('Basic use')
    expect(render(<CodeBlock code={code} />)).not.toContain('type-overline')
  })

  it('names the language, tsx unless told otherwise', () => {
    expect(render(<CodeBlock code="x" />)).toContain('>tsx<')
    expect(render(<CodeBlock code="pnpm add x" language="bash" />)).toContain('>bash<')
  })

  it('has a copy button that stays hidden until the script shows it', () => {
    const html = render(<CodeBlock code={code} />)

    expect(html).toContain('data-copy')
    expect(html).toMatch(/<button[^>]*\shidden/)
    expect(html).toContain('Copy')
  })

  it('can be reached and scrolled with the keyboard', () => {
    const html = render(<CodeBlock code={code} title="Basic use" />)

    expect(html).toContain('tabindex="0"')
    expect(html).toContain('role="region"')
    expect(html).toContain('aria-label="Basic use"')
    expect(html).toContain('overflow-x-auto')
  })

  it('gives the region a name without a title', () => {
    expect(render(<CodeBlock code={code} />)).toContain('aria-label="Code example"')
  })
})

describe('highlight', () => {
  it('makes component tags gold and attribute names muted', () => {
    const html = render(<>{highlight('<Button type="submit">Save</Button>')}</>)

    expect(html).toContain('<span class="text-accent-text">&lt;Button</span>')
    expect(html).toContain('<span class="text-muted">type</span>')
    expect(html).toContain('<span class="text-accent-text">&lt;/Button</span>')
  })

  it('leaves plain text plain', () => {
    const html = render(<>{highlight('Save')}</>)

    expect(html).toBe('Save')
  })
})

describe('copyScript', () => {
  it('shows the button and copies the text of the code next to it', () => {
    expect(copyScript).toContain('[data-copy]')
    expect(copyScript).toContain('button.hidden = false')
    expect(copyScript).toContain('navigator.clipboard.writeText')
  })
})
