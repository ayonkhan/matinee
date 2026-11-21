import { describedBy, FieldMessage } from './form-parts'

export type FileInputProps = {
  id: string
  label: string
  name?: string
  accept?: string
  multiple?: boolean
  required?: boolean
  disabled?: boolean
  hint?: string
  error?: string
  class?: string
}

// The browser's own "Choose file" button is restyled to match Button.
const box =
  'block w-full rounded-control border bg-raised p-2 font-sans text-sm text-ink ' +
  'file:mr-4 file:rounded-badge file:border-0 file:bg-accent file:px-3 file:py-1.5 file:font-sans file:text-sm file:font-semibold file:text-accent-ink ' +
  'focus:border-accent-text focus:outline-none focus:ring-2 focus:ring-accent-text/30'

export function FileInput(props: FileInputProps) {
  const { id, label, hint, error, disabled } = props

  const classes = [
    box,
    error ? 'border-danger-line' : 'border-line',
    disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer file:cursor-pointer hover:file:brightness-110',
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

      <input
        type="file"
        id={id}
        name={props.name}
        accept={props.accept}
        multiple={props.multiple}
        required={props.required}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        class={classes}
      />

      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}
