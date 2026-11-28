import { describe, expect, it } from 'vitest'
import { inlineErrorsScript } from '../src/components/inline-errors'

describe('inlineErrorsScript', () => {
  it('only touches forms that ask for it', () => {
    expect(inlineErrorsScript).toContain('form[data-inline-errors]')
  })

  it('takes the message from the control, or from the browser', () => {
    expect(inlineErrorsScript).toContain("getAttribute('data-error')")
    expect(inlineErrorsScript).toContain('validationMessage')
  })

  it('replaces the browser pop-up only for a control with an id', () => {
    expect(inlineErrorsScript).toContain('if (!input.id) return')
    expect(inlineErrorsScript).toContain('event.preventDefault()')
  })

  it('tells screen readers about the message and points the control at it', () => {
    expect(inlineErrorsScript).toContain("'role', 'alert'")
    expect(inlineErrorsScript).toContain("'aria-invalid', 'true'")
    expect(inlineErrorsScript).toContain("'aria-describedby', id")
  })

  it('puts the cursor in the first field with a problem', () => {
    expect(inlineErrorsScript).toContain('input.focus()')
  })

  it('clears the message when the person types, and restores what the control pointed at before', () => {
    expect(inlineErrorsScript).toContain("addEventListener('input'")
    expect(inlineErrorsScript).toContain('note.remove()')
    expect(inlineErrorsScript).toContain("removeAttribute('aria-invalid')")
    expect(inlineErrorsScript).toContain('data-described-by')
  })

  it('is plain code, with no markup in it', () => {
    expect(inlineErrorsScript).not.toContain('<')
  })
})
