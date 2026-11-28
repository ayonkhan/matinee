import { describe, expect, it } from 'vitest'
import { CodeInput } from '../src/components/code-input'

const render = (node: unknown) => String(node)
const has = (html: string, attribute: string) => new RegExp(`\\s${attribute}(=""|\\s|>)`).test(html)

describe('CodeInput', () => {
  it('connects the label to a text input', () => {
    const html = render(<CodeInput id="code" label="Verification code" />)

    expect(html).toContain('for="code"')
    expect(html).toContain('id="code"')
    expect(html).toContain('type="text"')
    expect(html).toContain('Verification code')
  })

  it('shows a number keyboard on phones and lets the phone fill the code in', () => {
    const html = render(<CodeInput id="a" label="A" />)

    expect(html).toContain('inputmode="numeric"')
    expect(html).toContain('autocomplete="one-time-code"')
    expect(html).toContain('pattern="[0-9]*"')
  })

  it('takes six characters by default and another length when asked', () => {
    expect(render(<CodeInput id="a" label="A" />)).toContain('maxlength="6"')
    expect(render(<CodeInput id="a" label="A" length={4} />)).toContain('maxlength="4"')
  })

  it('starts with a value and sends a name', () => {
    const html = render(<CodeInput id="a" label="A" name="code" value="123" />)

    expect(html).toContain('value="123"')
    expect(html).toContain('name="code"')
  })

  it('draws big spaced digits and not the normal text size', () => {
    const html = render(<CodeInput id="a" label="A" />)

    expect(html).toContain('font-mono')
    expect(html).toContain('text-2xl')
    expect(html).toContain('tracking-[0.4em]')
    expect(html).not.toContain('text-base')
    expect(html).not.toContain('font-sans')
  })

  it('shows a hint and links it to the input', () => {
    const html = render(<CodeInput id="a" label="A" hint="Check your email." />)

    expect(html).toContain('Check your email.')
    expect(html).toContain('aria-describedby="a-hint"')
  })

  it('shows an error instead of the hint, marks the input invalid and reddens the border', () => {
    const html = render(<CodeInput id="a" label="A" hint="Check your email." error="That code is wrong." />)

    expect(html).toContain('That code is wrong.')
    expect(html).not.toContain('Check your email.')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toContain('border-danger-line')
  })

  it('marks a required input', () => {
    const html = render(<CodeInput id="a" label="A" required />)

    expect(has(html, 'required')).toBe(true)
    expect(html).toContain('*')
  })

  it('looks and acts disabled', () => {
    const html = render(<CodeInput id="a" label="A" disabled />)

    expect(has(html, 'disabled')).toBe(true)
    expect(html).toContain('cursor-not-allowed')
  })

  it('adds extra classes', () => {
    expect(render(<CodeInput id="a" label="A" class="max-w-xs" />)).toContain('max-w-xs')
  })

  it('escapes the label and value', () => {
    const html = render(<CodeInput id="a" label={'<script>alert(1)</script>'} value={'"><script>alert(2)</script>'} />)

    expect(html).not.toContain('<script>')
  })

  it('can put the cursor in the field', () => {
    expect(has(render(<CodeInput id="a" label="Code" autofocus />), 'autofocus')).toBe(true)
    expect(has(render(<CodeInput id="a" label="Code" />), 'autofocus')).toBe(false)
  })

  it('carries the message to show when the browser checks fail', () => {
    expect(render(<CodeInput id="a" label="Code" invalidMessage="Enter the 6 digit code." />)).toContain(
      'data-error="Enter the 6 digit code."',
    )
    expect(render(<CodeInput id="a" label="Code" />)).not.toContain('data-error')
  })

  it('can accept a pasted code with spaces or dashes', () => {
    const html = render(<CodeInput id="a" label="Code" allowSeparators />)

    expect(html).toContain('maxlength="10"')
    expect(html).toContain('pattern="[0-9 \\-]*"')
    expect(render(<CodeInput id="a" label="Code" length={4} allowSeparators />)).toContain('maxlength="8"')
  })

  it('accepts digits only unless separators are allowed', () => {
    const html = render(<CodeInput id="a" label="Code" />)

    expect(html).toContain('maxlength="6"')
    expect(html).toContain('pattern="[0-9]*"')
  })
})
