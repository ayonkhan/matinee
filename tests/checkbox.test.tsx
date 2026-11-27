import { describe, expect, it } from 'vitest'
import { Checkbox } from '../src/components/checkbox'

const render = (node: unknown) => String(node)
const has = (html: string, attribute: string) => new RegExp(`\\s${attribute}(=""|\\s|>)`).test(html)

describe('Checkbox', () => {
  it('connects the label to a checkbox', () => {
    const html = render(<Checkbox id="remember" label="Remember me" />)

    expect(html).toContain('for="remember"')
    expect(html).toContain('id="remember"')
    expect(html).toContain('type="checkbox"')
    expect(html).toContain('Remember me')
  })

  it('keeps the real input in the page but hidden', () => {
    expect(render(<Checkbox id="a" label="A" />)).toContain('sr-only')
  })

  it('is unticked by default and can start ticked', () => {
    expect(has(render(<Checkbox id="a" label="A" />), 'checked')).toBe(false)
    expect(has(render(<Checkbox id="a" label="A" checked />), 'checked')).toBe(true)
  })

  it('sends a name and value with the form', () => {
    const html = render(<Checkbox id="a" label="A" name="topics" value="42" />)

    expect(html).toContain('name="topics"')
    expect(html).toContain('value="42"')
  })

  it('shows a hint and links it to the input', () => {
    const html = render(<Checkbox id="a" label="A" hint="Stays signed in." />)

    expect(html).toContain('Stays signed in.')
    expect(html).toContain('aria-describedby="a-hint"')
  })

  it('shows an error, marks the input invalid and reddens the box', () => {
    const html = render(<Checkbox id="a" label="A" hint="Hint" error="Tick this to continue." />)

    expect(html).toContain('Tick this to continue.')
    expect(html).not.toContain('Hint')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toContain('border-danger-line')
  })

  it('marks a required checkbox', () => {
    const html = render(<Checkbox id="a" label="A" required />)

    expect(has(html, 'required')).toBe(true)
    expect(html).toContain('*')
  })

  it('looks and acts disabled', () => {
    const html = render(<Checkbox id="a" label="A" disabled />)

    expect(has(html, 'disabled')).toBe(true)
    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('cursor-pointer')
  })

  it('has a row tall enough to tap', () => {
    expect(render(<Checkbox id="a" label="A" />)).toContain('min-h-11')
  })

  it('adds extra classes', () => {
    expect(render(<Checkbox id="a" label="A" class="mt-2" />)).toContain('mt-2')
  })

  it('escapes the label', () => {
    expect(render(<Checkbox id="a" label={'<script>alert(1)</script>'} />)).not.toContain('<script>')
  })

  it('takes markup with a link as the label', () => {
    const html = render(
      <Checkbox
        id="terms"
        label={
          <>
            I agree to the <a href="/terms">Terms</a>
          </>
        }
      />,
    )

    expect(html).toContain('I agree to the <a href="/terms">Terms</a>')
  })
})
