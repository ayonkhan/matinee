import { describe, expect, it } from 'vitest'
import { Fieldset } from '../src/components/fieldset'

const render = (node: unknown) => String(node)

describe('Fieldset', () => {
  it('groups its children under a legend', () => {
    const html = render(
      <Fieldset id="prefs" legend="Preferences">
        <p>Inside</p>
      </Fieldset>,
    )

    expect(html).toContain('<fieldset')
    expect(html).toContain('<legend')
    expect(html).toContain('Preferences')
    expect(html).toContain('<p>Inside</p>')
  })

  it('shows a hint and points the group at it', () => {
    const html = render(<Fieldset id="prefs" legend="Preferences" hint="Pick any." />)

    expect(html).toContain('Pick any.')
    expect(html).toContain('id="prefs-hint"')
    expect(html).toContain('aria-describedby="prefs-hint"')
  })

  it('shows an error instead of the hint', () => {
    const html = render(<Fieldset id="prefs" legend="Preferences" hint="Pick any." error="Pick one." />)

    expect(html).toContain('Pick one.')
    expect(html).not.toContain('Pick any.')
    expect(html).toContain('aria-describedby="prefs-error"')
  })

  it('has no message area without a hint or error', () => {
    const html = render(<Fieldset id="prefs" legend="Preferences" />)

    expect(html).not.toContain('aria-describedby')
    expect(html).not.toContain('mt-1')
  })

  it('marks a required group', () => {
    expect(render(<Fieldset id="a" legend="A" required />)).toContain('*')
    expect(render(<Fieldset id="a" legend="A" />)).not.toContain('*')
  })

  it('adds extra classes', () => {
    expect(render(<Fieldset id="a" legend="A" class="mt-4" />)).toContain('mt-4')
  })

  it('escapes the legend', () => {
    expect(render(<Fieldset id="a" legend={'<script>alert(1)</script>'} />)).not.toContain('<script>')
  })
})
