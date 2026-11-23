import { describe, expect, it } from 'vitest'
import { CopyBlock, copyScript, highlight } from '../src/components/copy-block'

const render = (node: unknown) => String(node)

describe('CopyBlock', () => {
  it('shows the text in a pre element', () => {
    const html = render(<CopyBlock code="Hello there" />)

    expect(html).toContain('<pre')
    expect(html).toContain('Hello there')
  })

  it('keeps line breaks in the text', () => {
    expect(render(<CopyBlock code={'one\ntwo'} />)).toContain('one\ntwo')
  })

  it('writes angle brackets as text, not as markup', () => {
    const html = render(<CopyBlock code={'<script>alert(1)</script>'} />)

    expect(html).not.toContain('<script>')
    expect(html).toContain('&lt;script&gt;')
  })

  it('shows a title only when given one', () => {
    expect(render(<CopyBlock code="x" title="Invite message" />)).toContain('Invite message')
    expect(render(<CopyBlock code="x" />)).not.toContain('type-overline')
  })

  it('names the text for screen readers with the title, or a plain name without one', () => {
    expect(render(<CopyBlock code="x" title="Invite message" />)).toContain('aria-label="Invite message"')
    expect(render(<CopyBlock code="x" />)).toContain('aria-label="Text to copy"')
  })

  it('lets the keyboard reach the text, so it can be selected and scrolled', () => {
    expect(render(<CopyBlock code="x" />)).toContain('tabindex="0"')
  })

  it('has a Copy button that stays hidden until the script shows it', () => {
    const html = render(<CopyBlock code="x" />)

    expect(html).toContain('data-copy')
    expect(html).toContain('hidden')
    expect(html).toContain('Copy')
  })

  it('marks the box so the script can find its text', () => {
    expect(render(<CopyBlock code="x" />)).toContain('data-code')
  })

  it('shows a small label on the left when given one', () => {
    expect(render(<CopyBlock code="x" language="Text" />)).toContain('Text')
  })

  it('scrolls sideways by default and wraps when asked', () => {
    expect(render(<CopyBlock code="x" />)).toContain('overflow-x-auto')
    expect(render(<CopyBlock code="x" wrap />)).toContain('whitespace-pre-wrap')
    expect(render(<CopyBlock code="x" wrap />)).not.toContain('overflow-x-auto')
  })

  it('uses the label as the name when there is no title', () => {
    expect(render(<CopyBlock code="x" label="Code example" />)).toContain('aria-label="Code example"')
    expect(render(<CopyBlock code="x" title="Invite" label="Code example" />)).toContain('aria-label="Invite"')
  })

  it('colours component tags and attribute names when asked', () => {
    const html = render(<CopyBlock code={'<Button type="submit">Save</Button>'} highlight />)

    expect(html).toContain('<span class="text-accent-text">&lt;Button</span>')
    expect(html).toContain('<span class="text-muted">type</span>')
  })

  it('leaves the text plain by default', () => {
    const html = render(<CopyBlock code={'<Button type="submit">Save</Button>'} />)

    expect(html).not.toContain('text-accent-text')
    expect(html).not.toContain('text-muted">type')
    expect(html).toContain('&lt;Button type=')
  })

  it('leaves ordinary text as it is either way', () => {
    expect(render(<CopyBlock code="Hello there" />)).toContain('Hello there')
    expect(render(<CopyBlock code="Hello there" highlight />)).toContain('Hello there')
    expect(render(<CopyBlock code="Hello there" highlight={false} />)).toContain('Hello there')
  })

  it('adds extra classes', () => {
    expect(render(<CopyBlock code="x" class="mt-4" />)).toContain('mt-4')
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
    expect(render(<>{highlight('Save')}</>)).toBe('Save')
  })

  it('leaves html tags and plain words alone', () => {
    const html = render(<>{highlight('<div class="a">hello</div>')}</>)

    expect(html).toContain('<span class="text-muted">class</span>')
    expect(html).not.toContain('text-accent-text')
  })
})

describe('copyScript', () => {
  it('shows the button, copies the text and says it did', () => {
    expect(copyScript).toContain('[data-copy]')
    expect(copyScript).toContain('button.hidden = false')
    expect(copyScript).toContain('navigator.clipboard.writeText')
    expect(copyScript).toContain('Copied')
  })
})
