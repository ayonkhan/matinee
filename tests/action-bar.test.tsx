import { describe, expect, it } from 'vitest'
import { ActionBar } from '../src/components/action-bar'

const render = (node: unknown) => String(node)

describe('ActionBar', () => {
  it('has a submit button labelled Save by default', () => {
    const html = render(<ActionBar />)

    expect(html).toContain('type="submit"')
    expect(html).toContain('Save')
  })

  it('uses a custom label', () => {
    expect(render(<ActionBar label="Save changes" />)).toContain('Save changes')
  })

  it('submits a form elsewhere on the page', () => {
    expect(render(<ActionBar formId="settings" />)).toContain('form="settings"')
  })

  it('shows a cancel link only when given one', () => {
    expect(render(<ActionBar />)).not.toContain('Cancel')

    const html = render(<ActionBar cancelHref="/films" />)

    expect(html).toContain('href="/films"')
    expect(html).toContain('Cancel')
  })

  it('dims the button when disabled', () => {
    const html = render(<ActionBar disabled />)

    expect(html).toContain('disabled')
    expect(html).toContain('cursor-not-allowed')
    expect(html).not.toContain('cursor-pointer')
  })

  it('floats on phones by default and can sit inline', () => {
    expect(render(<ActionBar />)).toContain('sm:hidden')
    expect(render(<ActionBar placement="inline" />)).not.toContain('sm:hidden')
  })
})
