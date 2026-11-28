import { describe, expect, it } from 'vitest'
import { ActionBar, actionBarScript } from '../src/components/action-bar'

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

    const html = render(<ActionBar cancelHref="/items" />)

    expect(html).toContain('href="/items"')
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

  it('shows a message on the left only when given one', () => {
    expect(render(<ActionBar />)).not.toContain('type-label')

    const html = render(<ActionBar message="Unsaved changes" />)

    expect(html).toContain('Unsaved changes')
    expect(html).toContain('justify-between')
  })

  it('can also show on wider screens', () => {
    expect(render(<ActionBar desktop />)).not.toContain('sm:hidden')
    expect(render(<ActionBar desktop />)).toContain('fixed')
  })

  it('escapes the message', () => {
    const html = render(<ActionBar message={'<b>x</b>'} />)

    expect(html).not.toContain('<b>x</b>')
  })

  it('asks to be revealed by its form only when it has a form to watch', () => {
    expect(render(<ActionBar formId="settings" revealOnChange />)).toContain('data-reveal-form="settings"')
    expect(render(<ActionBar revealOnChange />)).not.toContain('data-reveal-form')
    expect(render(<ActionBar formId="settings" />)).not.toContain('data-reveal-form')
  })

  it('lets the hidden attribute win over its display class', () => {
    expect(render(<ActionBar formId="settings" revealOnChange />)).toContain('[&amp;[hidden]]:hidden')
  })

  it('is not hidden in the markup, so it still works without JavaScript', () => {
    expect(render(<ActionBar formId="settings" revealOnChange />)).not.toMatch(/<div[^>]*\shidden[\s>=]/)
  })
})

describe('actionBarScript', () => {
  it('only touches bars that ask for it', () => {
    expect(actionBarScript).toContain('[data-reveal-form]')
  })

  it('hides the bar at the start', () => {
    expect(actionBarScript).toContain('bar.hidden = true')
  })

  it('shows the bar only while the form differs from how it started', () => {
    expect(actionBarScript).toContain('var start = snapshot()')
    expect(actionBarScript).toContain('bar.hidden = snapshot() === start')
    expect(actionBarScript).toContain('new FormData(form)')
  })

  it('checks again on every edit and when the form is reset', () => {
    expect(actionBarScript).toContain("addEventListener('input'")
    expect(actionBarScript).toContain("addEventListener('change'")
    expect(actionBarScript).toContain("addEventListener('reset'")
  })

  it('leaves the bar alone when its form cannot be found', () => {
    expect(actionBarScript).toContain('if (!form) return')
  })

  it('is plain code, with no markup in it', () => {
    expect(actionBarScript).not.toContain('<')
  })
})
