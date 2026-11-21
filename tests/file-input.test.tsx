import { describe, expect, it } from 'vitest'
import { FileInput } from '../src/components/file-input'

const render = (node: unknown) => String(node)
const has = (html: string, attribute: string) => new RegExp(`\\s${attribute}(=""|\\s|>)`).test(html)

describe('FileInput', () => {
  it('connects the label to a file input', () => {
    const html = render(<FileInput id="avatar" label="Profile picture" />)

    expect(html).toContain('for="avatar"')
    expect(html).toContain('id="avatar"')
    expect(html).toContain('type="file"')
    expect(html).toContain('Profile picture')
  })

  it('limits the kind of file', () => {
    expect(render(<FileInput id="a" label="A" accept="image/*" />)).toContain('accept="image/*"')
  })

  it('allows several files when asked', () => {
    expect(has(render(<FileInput id="a" label="A" multiple />), 'multiple')).toBe(true)
    expect(has(render(<FileInput id="a" label="A" />), 'multiple')).toBe(false)
  })

  it('sends a name with the form', () => {
    expect(render(<FileInput id="a" label="A" name="avatar" />)).toContain('name="avatar"')
  })

  it('restyles the browser button to match Button', () => {
    const html = render(<FileInput id="a" label="A" />)

    expect(html).toContain('file:bg-accent')
    expect(html).toContain('file:text-accent-ink')
  })

  it('shows a hint and links it to the input', () => {
    const html = render(<FileInput id="a" label="A" hint="PNG or JPG." />)

    expect(html).toContain('PNG or JPG.')
    expect(html).toContain('aria-describedby="a-hint"')
  })

  it('shows an error instead of the hint, marks the input invalid and reddens the border', () => {
    const html = render(<FileInput id="a" label="A" hint="PNG or JPG." error="File is too big." />)

    expect(html).toContain('File is too big.')
    expect(html).not.toContain('PNG or JPG.')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toContain('border-danger-line')
  })

  it('marks a required input', () => {
    const html = render(<FileInput id="a" label="A" required />)

    expect(has(html, 'required')).toBe(true)
    expect(html).toContain('*')
  })

  it('looks and acts disabled', () => {
    const html = render(<FileInput id="a" label="A" disabled />)

    expect(has(html, 'disabled')).toBe(true)
    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('cursor-pointer')
  })

  it('adds extra classes', () => {
    expect(render(<FileInput id="a" label="A" class="max-w-sm" />)).toContain('max-w-sm')
  })

  it('escapes the label', () => {
    expect(render(<FileInput id="a" label={'<script>alert(1)</script>'} />)).not.toContain('<script>')
  })
})
