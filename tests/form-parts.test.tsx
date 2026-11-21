import { describe, expect, it } from 'vitest'
import { controlClasses, defaultSize, describedBy, FieldMessage } from '../src/components/form-parts'

const render = (node: unknown) => String(node)

describe('describedBy', () => {
  it('points at the hint', () => {
    expect(describedBy('email', 'Used to sign in.')).toBe('email-hint')
  })

  it('points at the error before the hint', () => {
    expect(describedBy('email', 'Used to sign in.', 'Enter an email.')).toBe('email-error')
  })

  it('points at nothing without a message', () => {
    expect(describedBy('email')).toBeUndefined()
  })
})

describe('FieldMessage', () => {
  it('shows the hint with an id the control can point at', () => {
    const html = render(<FieldMessage id="email" hint="Used to sign in." />)

    expect(html).toContain('id="email-hint"')
    expect(html).toContain('type-hint')
    expect(html).toContain('Used to sign in.')
  })

  it('shows the error instead of the hint', () => {
    const html = render(<FieldMessage id="email" hint="Used to sign in." error="Enter an email." />)

    expect(html).toContain('id="email-error"')
    expect(html).toContain('text-danger-text')
    expect(html).toContain('Enter an email.')
    expect(html).not.toContain('Used to sign in.')
  })

  it('renders nothing without a message', () => {
    expect(render(<FieldMessage id="email" />)).toBe('')
  })

  it('escapes the message', () => {
    const html = render(<FieldMessage id="x" error={'<script>alert(1)</script>'} />)

    expect(html).not.toContain('<script>')
  })
})

describe('controlClasses', () => {
  it('has the base look and a normal border', () => {
    const classes = controlClasses({})

    expect(classes).toContain('rounded-control')
    expect(classes).toContain('border-line')
    expect(classes).not.toContain('border-danger-line')
  })

  it('turns the border red on error', () => {
    const classes = controlClasses({ error: true })

    expect(classes).toContain('border-danger-line')
    expect(classes).not.toContain('border-line ')
  })

  it('looks locked when readonly', () => {
    expect(controlClasses({ readonly: true })).toContain('bg-sunken')
  })

  it('dims when disabled', () => {
    expect(controlClasses({ disabled: true })).toContain('cursor-not-allowed')
  })

  it('adds nothing extra by default', () => {
    const classes = controlClasses({})

    expect(classes).not.toContain('bg-sunken')
    expect(classes).not.toContain('cursor-not-allowed')
  })

  it('uses the default size unless told otherwise', () => {
    expect(controlClasses({})).toContain(defaultSize)
  })

  it('can swap the size', () => {
    const classes = controlClasses({}, 'p-2 font-mono text-2xl')

    expect(classes).toContain('font-mono')
    expect(classes).toContain('text-2xl')
    expect(classes).not.toContain('font-sans')
    expect(classes).not.toContain('py-3')
  })
})
