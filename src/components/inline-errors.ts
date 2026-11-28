// Shows the message for a field that fails the browser's own checks (required, pattern, length) under the
// field, instead of the browser's pop-up. It looks for forms marked data-inline-errors.
// The message comes from the control's invalidMessage, or from the browser when there is none.
// The first field with a problem gets the cursor, and typing in a field clears its message.
// A control with no id keeps the browser's pop-up, and so does a page where the script did not run.
// Add it to the page once, in a script tag, however many forms there are.
export const inlineErrorsScript = `
document.querySelectorAll('form[data-inline-errors]').forEach(function (form) {
  var focused = false

  function show(input) {
    var id = input.id + '-invalid'
    var note = document.getElementById(id)

    if (!note) {
      note = document.createElement('p')
      note.id = id
      note.setAttribute('role', 'alert')
      note.className = 'font-sans text-sm text-danger-text'
      ;(input.closest('label') || input).insertAdjacentElement('afterend', note)
    }

    note.textContent = input.getAttribute('data-error') || input.validationMessage

    if (!input.hasAttribute('data-described-by')) {
      input.setAttribute('data-described-by', input.getAttribute('aria-describedby') || '')
    }

    input.setAttribute('aria-invalid', 'true')
    input.setAttribute('aria-describedby', id)
  }

  function clear(input) {
    var note = input.id ? document.getElementById(input.id + '-invalid') : null
    if (!note) return

    note.remove()
    input.removeAttribute('aria-invalid')

    var before = input.getAttribute('data-described-by')
    if (before) input.setAttribute('aria-describedby', before)
    else input.removeAttribute('aria-describedby')
    input.removeAttribute('data-described-by')
  }

  form.addEventListener('invalid', function (event) {
    var input = event.target
    if (!input.id) return

    event.preventDefault()
    show(input)

    if (!focused) {
      focused = true
      input.focus()
      setTimeout(function () { focused = false }, 0)
    }
  }, true)

  form.addEventListener('input', function (event) {
    clear(event.target)
  })
})
`
