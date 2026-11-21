import { controlClasses, describedBy, FieldMessage } from './form-parts'

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

export function Field(props: FieldProps) {
  const { id, label, hint, error, type = 'text', value, multiline, rows = 3 } = props

  const aria = describedBy(id, hint, error)
  const classes = controlClasses({ error: Boolean(error), readonly: props.readonly, disabled: props.disabled })

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
          aria-describedby={aria}
          class={classes}
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
          aria-describedby={aria}
          class={classes}
        />
      )}

      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}
