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

  it('accepts date and time types', () => {
    expect(render(<Field id="a" label="A" type="date" />)).toContain('type="date"')
    expect(render(<Field id="a" label="A" type="time" />)).toContain('type="time"')
    expect(render(<Field id="a" label="A" type="datetime-local" />)).toContain('type="datetime-local"')
    expect(render(<Field id="a" label="A" type="month" />)).toContain('type="month"')
  })

  it('passes min, max and step to the input', () => {
    const html = render(<Field id="a" label="A" type="number" min={1} max={10} step={0.5} />)

    expect(html).toContain('min="1"')
    expect(html).toContain('max="10"')
    expect(html).toContain('step="0.5"')
  })

  it('passes the text attributes to the input', () => {
    const html = render(
      <Field
        id="u"
        label="Username"
        minlength={3}
        pattern="[a-z]+"
        autocomplete="username"
        inputmode="text"
        autocapitalize="none"
        spellcheck={false}
        autofocus
      />,
    )

    expect(html).toContain('minlength="3"')
    expect(html).toContain('pattern="[a-z]+"')
    expect(html).toContain('autocomplete="username"')
    expect(html).toContain('inputmode="text"')
    expect(html).toContain('autocapitalize="none"')
    expect(html).toContain('spellcheck="false"')
    expect(html).toMatch(/\sautofocus(=""|\s|>)/)
  })

  it('leaves the text attributes out unless they are given', () => {
    const html = render(<Field id="u" label="Username" />)

    const attributes = ['minlength', 'pattern', 'autocomplete', 'inputmode', 'autocapitalize', 'spellcheck', 'autofocus']

    for (const attribute of attributes) {
      expect(html).not.toContain(attribute)
    }
  })

  it('passes the text attributes to a multiline field too, except the keyboard and pattern', () => {
    const html = render(<Field id="b" label="Bio" multiline minlength={5} autocomplete="off" spellcheck={false} />)

    expect(html).toContain('<textarea')
    expect(html).toContain('minlength="5"')
    expect(html).toContain('autocomplete="off"')
    expect(html).toContain('spellcheck="false"')
  })

  it('carries the message to show when the browser checks fail', () => {
    expect(render(<Field id="a" label="A" invalidMessage="Enter an email address." />)).toContain(
      'data-error="Enter an email address."',
    )
    expect(render(<Field id="a" label="A" />)).not.toContain('data-error')
  })
})
