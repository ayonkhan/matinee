import { describe, expect, it } from 'vitest'
import { RadioGroup } from '../src/components/radio-group'

const render = (node: unknown) => String(node)
const count = (html: string, pattern: RegExp) => (html.match(pattern) ?? []).length

const options = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact', hint: 'Fits more on screen.' },
  { value: 'tiny', label: 'Tiny', disabled: true },
]

describe('RadioGroup', () => {
  it('puts the radios in a fieldset with a legend', () => {
    const html = render(<RadioGroup id="layout" legend="Layout" name="layout" options={options} />)

    expect(html).toContain('<fieldset')
    expect(html).toContain('Layout')
    expect(count(html, /type="radio"/g)).toBe(3)
  })

  it('shares one name and gives each its own value and id', () => {
    const html = render(<RadioGroup id="layout" legend="Layout" name="layout" options={options} />)

    expect(count(html, /name="layout"/g)).toBe(3)
    expect(html).toContain('value="compact"')
    expect(html).toContain('id="layout-0"')
    expect(html).toContain('for="layout-2"')
  })

  it('selects only the option matching the value', () => {
    const html = render(<RadioGroup id="l" legend="L" name="l" options={options} value="compact" />)

    expect(count(html, /\schecked(=""|\s|>)/g)).toBe(1)
    expect(html).toMatch(/value="compact"\s+checked/)
  })

  it('selects nothing without a value', () => {
    expect(count(render(<RadioGroup id="l" legend="L" name="l" options={options} />), /\schecked(=""|\s|>)/g)).toBe(0)
  })

  it('links an option hint to its radio', () => {
    const html = render(<RadioGroup id="l" legend="L" name="l" options={options} />)

    expect(html).toContain('Fits more on screen.')
    expect(html).toContain('aria-describedby="l-1-hint"')
    expect(html).toContain('id="l-1-hint"')
  })

  it('disables single options', () => {
    const html = render(<RadioGroup id="l" legend="L" name="l" options={options} />)

    expect(count(html, /\sdisabled(=""|\s|>)/g)).toBe(1)
    expect(html).toContain('cursor-not-allowed')
  })

  it('marks a required group', () => {
    const html = render(<RadioGroup id="l" legend="L" name="l" options={options} required />)

    expect(count(html, /\srequired(=""|\s|>)/g)).toBe(3)
    expect(html).toContain('*')
  })

  it('shows a group hint and error', () => {
    expect(render(<RadioGroup id="l" legend="L" name="l" options={options} hint="Pick one." />)).toContain('Pick one.')

    const html = render(<RadioGroup id="l" legend="L" name="l" options={options} error="Choose a layout." />)

    expect(html).toContain('Choose a layout.')
    expect(html).toContain('id="l-error"')
  })

  it('escapes option labels', () => {
    const html = render(
      <RadioGroup id="l" legend="L" name="l" options={[{ value: 'x', label: '<script>alert(1)</script>' }]} />,
    )

    expect(html).not.toContain('<script>')
  })
})
