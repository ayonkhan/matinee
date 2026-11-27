import { controlClasses, describedBy, FieldMessage } from './form-parts'

export type FieldProps = {
  id: string
  label: string
  name?: string
  hint?: string
  error?: string
  type?:
    | 'text'
    | 'email'
    | 'url'
    | 'password'
    | 'search'
    | 'tel'
    | 'number'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
  value?: string | number
  placeholder?: string
  minlength?: number
  maxlength?: number
  // A pattern the value must match, such as an email address check. Text-like fields only.
  pattern?: string
  // What the browser may fill in, such as "email", "username" or "one-time-code".
  autocomplete?: string
  // Puts the cursor in the field when the page loads. Use it on one field per page.
  autofocus?: boolean
  // Which keyboard a phone shows, such as "numeric".
  inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search'
  // "none" stops a phone from capitalising the first letter, which suits usernames.
  autocapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  // false turns off the red squiggles under words, which suits usernames and codes.
  spellcheck?: boolean
  min?: string | number
  max?: string | number
  step?: string | number
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
          minlength={props.minlength}
          maxlength={props.maxlength}
          autocomplete={props.autocomplete}
          autofocus={props.autofocus}
          autocapitalize={props.autocapitalize}
          spellcheck={props.spellcheck}
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
          minlength={props.minlength}
          maxlength={props.maxlength}
          pattern={props.pattern}
          autocomplete={props.autocomplete}
          autofocus={props.autofocus}
          inputmode={props.inputmode}
          autocapitalize={props.autocapitalize}
          spellcheck={props.spellcheck}
          min={props.min}
          max={props.max}
          step={props.step}
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
