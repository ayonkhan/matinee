import { describedBy, FieldMessage } from './form-parts'

export type CheckboxProps = {
  id: string
  label: string
  name?: string
  value?: string
  checked?: boolean
  required?: boolean
  disabled?: boolean
  hint?: string
  error?: string
  class?: string
}

// The real input stays in the page, hidden but focusable. The square beside it is drawn from its state.
const box =
  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-badge border bg-raised text-accent-ink peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-text peer-disabled:opacity-60 [&_svg]:opacity-0 peer-checked:[&_svg]:opacity-100'

export function Checkbox(props: CheckboxProps) {
  const { id, label, hint, error, disabled } = props

  return (
    <div class={['flex flex-col', props.class ?? ''].filter(Boolean).join(' ')}>
      <label for={id} class={`flex min-h-11 items-start gap-3 py-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <input
          type="checkbox"
          id={id}
          name={props.name}
          value={props.value}
          checked={props.checked}
          required={props.required}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(id, hint, error)}
          class="peer sr-only"
        />
        <span aria-hidden="true" class={`${box} ${error ? 'border-danger-line' : 'border-line-strong'}`}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="size-3.5">
            <path d="M3 8.5l3.2 3.2L13 4.8" />
          </svg>
        </span>
        <span class="font-sans text-base text-ink peer-disabled:opacity-60">
          {label}
          {props.required ? (
            <span class="text-danger-text" aria-hidden="true">
              {' '}
              *
            </span>
          ) : null}
        </span>
      </label>

      {hint || error ? (
        <div class="pb-2 pl-8">
          <FieldMessage id={id} hint={hint} error={error} />
        </div>
      ) : null}
    </div>
  )
}
