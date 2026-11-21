// Pieces shared by Field and the other form controls, so they all look and read the same.

const control =
  'block w-full rounded-control border bg-raised px-4 py-3 font-sans text-base text-ink placeholder:text-muted focus:border-accent-text focus:outline-none focus:ring-2 focus:ring-accent-text/30'

// Classes for the box of a text-like control.
export function controlClasses(state: { error?: boolean; readonly?: boolean; disabled?: boolean }) {
  return [
    control,
    state.error ? 'border-danger-line' : 'border-line',
    state.readonly ? 'bg-sunken text-muted' : '',
    state.disabled ? 'cursor-not-allowed opacity-60' : '',
  ]
    .filter(Boolean)
    .join(' ')
}

// The control points at the message under it, so screen readers read both together.
// An error comes first because it matters more than the hint.
export function describedBy(id: string, hint?: string, error?: string) {
  if (error) return `${id}-error`
  if (hint) return `${id}-hint`
  return undefined
}

// The hint under a control, or the error that replaces it.
export function FieldMessage(props: { id: string; hint?: string; error?: string }) {
  if (props.error) {
    return (
      <p id={`${props.id}-error`} class="text-sm text-danger-text">
        {props.error}
      </p>
    )
  }

  if (props.hint) {
    return (
      <p id={`${props.id}-hint`} class="type-hint">
        {props.hint}
      </p>
    )
  }

  return null
}
