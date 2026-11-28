import { controlClasses, describedBy, FieldMessage } from './form-parts'

export type CodeInputProps = {
  id: string
  label: string
  name?: string
  length?: number
  value?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  // Puts the cursor in the field when the page loads. Use it on one field per page.
  autofocus?: boolean
  // The message inlineErrorsScript shows when the browser's checks fail. Without it the browser's own text is used.
  invalidMessage?: string
  class?: string
}

// Big, evenly spaced digits. indent balances the space the last digit leaves on its right.
const size = 'px-4 py-3 indent-[0.4em] text-center font-mono text-2xl tracking-[0.4em]'

// A verification code in one field. It stays text, not a number, so a leading zero is never lost.
export function CodeInput(props: CodeInputProps) {
  const { id, label, length = 6, value, hint, error, disabled } = props

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
        type="text"
        id={id}
        name={props.name}
        value={value}
        maxlength={length}
        inputmode="numeric"
        autocomplete="one-time-code"
        pattern="[0-9]*"
        autofocus={props.autofocus}
        data-error={props.invalidMessage}
        required={props.required}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        class={controlClasses({ error: Boolean(error), disabled }, size)}
      />

      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}
