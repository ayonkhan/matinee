import { describe, expect, it } from 'vitest'
import { Select } from '../src/components/select'

const render = (node: unknown) => String(node)
const has = (html: string, attribute: string) => new RegExp(`\\s${attribute}(=""|\\s|>)`).test(html)

const options = [
  { value: 'utc', label: 'UTC' },
  { value: 'est', label: 'Eastern' },
  { value: 'cst', label: 'Central', disabled: true },
]

describe('Select', () => {
  it('connects the label to a select', () => {
    const html = render(<Select id="zone" label="Time zone" options={options} />)

    expect(html).toContain('for="zone"')
    expect(html).toContain('<select')
    expect(html).toContain('id="zone"')
    expect(html).toContain('Time zone')
  })

  it('renders each option with its value and label', () => {
    const html = render(<Select id="zone" label="Zone" options={options} />)

    expect(html).toContain('<option value="utc">UTC</option>')
    expect(html).toContain('<option value="est">Eastern</option>')
  })

  it('selects the option matching the value', () => {
    const html = render(<Select id="zone" label="Zone" options={options} value="est" />)

    expect(html).toMatch(/<option value="est" selected/)
    expect(html).not.toMatch(/<option value="utc" selected/)
  })

  it('shows a placeholder that is selected when there is no value', () => {
    const html = render(<Select id="zone" label="Zone" options={options} placeholder="Choose a zone" />)

    expect(html).toMatch(/<option value="" selected/)
    expect(html).toContain('Choose a zone')
  })

  it('does not select the placeholder when there is a value', () => {
    const html = render(<Select id="zone" label="Zone" options={options} value="utc" placeholder="Choose" />)

    expect(html).not.toMatch(/<option value="" selected/)
  })

  it('groups options', () => {
    const html = render(
      <Select
        id="zone"
        label="Zone"
        options={[
          { label: 'America', options: [{ value: 'regina', label: 'Regina' }] },
          { label: 'Europe', options: [{ value: 'paris', label: 'Paris' }] },
        ]}
      />,
    )

    expect(html).toContain('<optgroup label="America">')
    expect(html).toContain('<optgroup label="Europe">')
    expect(html).toContain('Regina')
  })

  it('disables single options', () => {
    expect(render(<Select id="z" label="Z" options={options} />)).toMatch(/<option value="cst" disabled/)
  })

  it('shows a hint and links it to the select', () => {
    const html = render(<Select id="z" label="Z" options={options} hint="Used for dates." />)

    expect(html).toContain('Used for dates.')
    expect(html).toContain('aria-describedby="z-hint"')
  })

  it('shows an error instead of the hint and marks the select invalid', () => {
    const html = render(<Select id="z" label="Z" options={options} hint="Used for dates." error="Choose a zone." />)

    expect(html).toContain('Choose a zone.')
    expect(html).not.toContain('Used for dates.')
    expect(html).toContain('aria-invalid="true"')
    expect(html).toContain('border-danger-line')
  })

  it('marks a required select', () => {
    const html = render(<Select id="z" label="Z" options={options} required />)

    expect(has(html, 'required')).toBe(true)
    expect(html).toContain('*')
  })

  it('looks and acts disabled', () => {
    const html = render(<Select id="z" label="Z" options={options} disabled />)

    expect(has(html, 'disabled')).toBe(true)
    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('cursor-pointer')
  })

  it('has a chevron hidden from screen readers', () => {
    const html = render(<Select id="z" label="Z" options={options} />)

    expect(html).toContain('<svg')
    expect(html).toContain('aria-hidden="true"')
  })

  it('escapes labels', () => {
    const html = render(
      <Select id="z" label={'<script>alert(1)</script>'} options={[{ value: 'x', label: '<script>alert(2)</script>' }]} />,
    )

    expect(html).not.toContain('<script>')
  })
})
