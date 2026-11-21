import { describe, expect, it } from 'vitest'
import { CheckboxGroup } from '../src/components/checkbox-group'

const render = (node: unknown) => String(node)
const count = (html: string, pattern: RegExp) => (html.match(pattern) ?? []).length

const options = [
  { value: 'drama', label: 'Drama', checked: true },
  { value: 'comedy', label: 'Comedy' },
  { value: 'thriller', label: 'Thriller', hint: 'Edge of your seat.' },
]

describe('CheckboxGroup', () => {
  it('puts the checkboxes in a fieldset with a legend', () => {
    const html = render(<CheckboxGroup id="genres" legend="Genres" name="genre" options={options} />)

    expect(html).toContain('<fieldset')
    expect(html).toContain('Genres')
    expect(count(html, /type="checkbox"/g)).toBe(3)
  })

  it('shares one name and gives each its own value and id', () => {
    const html = render(<CheckboxGroup id="genres" legend="Genres" name="genre" options={options} />)

    expect(count(html, /name="genre"/g)).toBe(3)
    expect(html).toContain('value="comedy"')
    expect(html).toContain('id="genres-0"')
    expect(html).toContain('id="genres-2"')
  })

  it('ticks only the options marked checked', () => {
    const html = render(<CheckboxGroup id="genres" legend="Genres" name="genre" options={options} />)

    expect(count(html, /\schecked(=""|\s|>)/g)).toBe(1)
  })

  it('shows option hints', () => {
    expect(render(<CheckboxGroup id="g" legend="G" name="g" options={options} />)).toContain('Edge of your seat.')
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
