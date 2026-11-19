import { describe, expect, it } from 'vitest'
import { Field } from '../src/components/field'

const render = (node: unknown) => String(node)

describe('Field', () => {
  it('connects the label to the input', () => {
    const html = render(<Field id="email" label="Email address" />)

    expect(html).toContain('<label')
    expect(html).toContain('for="email"')
    expect(html).toContain('id="email"')
    expect(html).toContain('Email address')
  })

  it('renders a text input by default and accepts another type', () => {
    expect(render(<Field id="a" label="A" />)).toContain('type="text"')
    expect(render(<Field id="a" label="A" type="email" />)).toContain('type="email"')
  })

  it('renders a textarea when multiline', () => {
    const html = render(<Field id="bio" label="Bio" multiline rows={4} value="Hello" />)

    expect(html).toContain('<textarea')
    expect(html).toContain('rows="4"')
    expect(html).toContain('Hello')
    expect(html).not.toContain('<input')
  })

  it('shows a hint and links it to the control', () => {
    const html = render(<Field id="email" label="Email" hint="Only you can see it." />)

    expect(html).toContain('Only you can see it.')
    expect(html).toContain('id="email-hint"')
    expect(html).toContain('aria-describedby="email-hint"')
  })

  it('shows an error instead of the hint and marks the control invalid', () => {
    const html = render(
      <Field id="site" label="Website" hint="Your site." error="Enter a full address." />,
    )

    expect(html).toContain('Enter a full address.')
    expect(html).not.toContain('Your site.')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toContain('aria-describedby="site-error"')
    expect(html).toContain('border-danger-line')
  })

  it('marks a required field', () => {
    const html = render(<Field id="email" label="Email" required />)

    expect(html).toContain('required')
    expect(html).toContain('*')
  })

  it('styles a read-only field as locked', () => {
    const html = render(<Field id="username" label="Username" readonly value="swift-raven-5065" />)

    expect(html).toContain('readonly')
    expect(html).toContain('bg-sunken')
  })

  it('dims a disabled field', () => {
    const html = render(<Field id="x" label="X" disabled />)

    expect(html).toContain('disabled')
    expect(html).toContain('cursor-not-allowed')
  })

  it('escapes what goes into the value', () => {
    const html = render(<Field id="x" label="X" value={'"><script>alert(1)</script>'} />)

    expect(html).not.toContain('<script>')
  })
})
