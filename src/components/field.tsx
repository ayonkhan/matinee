export type FieldProps = {
  id: string
  label: string
  name?: string
  hint?: string
  error?: string
  type?: 'text' | 'email' | 'url' | 'password' | 'search' | 'tel' | 'number'
  value?: string | number
  placeholder?: string
  maxlength?: number
  required?: boolean
  readonly?: boolean
  disabled?: boolean
  multiline?: boolean
  rows?: number
  class?: string
}

const control =
  'block w-full rounded-control border bg-raised px-4 py-3 font-sans text-base text-ink placeholder:text-muted focus:border-accent-text focus:outline-none focus:ring-2 focus:ring-accent-text/30'

export function Field(props: FieldProps) {
  const { id, label, hint, error, type = 'text', value, multiline, rows = 3 } = props

  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  // The control points at the message under it, so screen readers read both together.
  const describedBy = error ? errorId : hint ? hintId : undefined

  const controlClasses = [
    control,
    error ? 'border-danger-line' : 'border-line',
    props.readonly ? 'bg-sunken text-muted' : '',
    props.disabled ? 'cursor-not-allowed opacity-60' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div class={['flex flex-col gap-2', props.class ?? ''].filter(Boolean).join(' ')}>
      <label for={id} class="type-label">
        {label}
        {props.required ? (
          <span class="text-danger-text" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </label>

      {multiline ? (
        <textarea
          id={id}
          name={props.name}
          rows={rows}
          placeholder={props.placeholder}
          maxlength={props.maxlength}
          required={props.required}
          readonly={props.readonly}
          disabled={props.disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          class={controlClasses}
        >
          {value}
        </textarea>
      ) : (
        <input
          id={id}
          name={props.name}
          type={type}
          value={value}
          placeholder={props.placeholder}
          maxlength={props.maxlength}
          required={props.required}
          readonly={props.readonly}
          disabled={props.disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy}
          class={controlClasses}
        />
      )}

      {error ? (
        <p id={errorId} class="text-sm text-danger-text">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} class="type-hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
