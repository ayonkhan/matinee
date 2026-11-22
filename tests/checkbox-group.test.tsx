import { describe, expect, it } from 'vitest'
import { CheckboxGroup } from '../src/components/checkbox-group'

const render = (node: unknown) => String(node)
const count = (html: string, pattern: RegExp) => (html.match(pattern) ?? []).length

const options = [
  { value: 'design', label: 'Design', checked: true },
  { value: 'travel', label: 'Travel' },
  { value: 'cooking', label: 'Cooking', hint: 'New every week.' },
]

describe('CheckboxGroup', () => {
  it('puts the checkboxes in a fieldset with a legend', () => {
    const html = render(<CheckboxGroup id="topics" legend="Topics" name="topic" options={options} />)

    expect(html).toContain('<fieldset')
    expect(html).toContain('Topics')
    expect(count(html, /type="checkbox"/g)).toBe(3)
  })

  it('shares one name and gives each its own value and id', () => {
    const html = render(<CheckboxGroup id="topics" legend="Topics" name="topic" options={options} />)

    expect(count(html, /name="topic"/g)).toBe(3)
    expect(html).toContain('value="travel"')
    expect(html).toContain('id="topics-0"')
    expect(html).toContain('id="topics-2"')
  })

  it('ticks only the options marked checked', () => {
    const html = render(<CheckboxGroup id="topics" legend="Topics" name="topic" options={options} />)

    expect(count(html, /\schecked(=""|\s|>)/g)).toBe(1)
  })

  it('shows option hints', () => {
    expect(render(<CheckboxGroup id="g" legend="G" name="g" options={options} />)).toContain('New every week.')
  })

  it('shows a group error', () => {
    const html = render(<CheckboxGroup id="g" legend="G" name="g" options={options} error="Pick at least one." />)

    expect(html).toContain('Pick at least one.')
    expect(html).toContain('id="g-error"')
  })

  it('escapes option labels', () => {
    const html = render(
      <CheckboxGroup id="g" legend="G" name="g" options={[{ value: 'x', label: '<script>alert(1)</script>' }]} />,
    )

    expect(html).not.toContain('<script>')
  })
})
