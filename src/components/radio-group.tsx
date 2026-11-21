import { Fieldset } from './fieldset'

export type RadioOption = {
  value: string
  label: string
  hint?: string
  disabled?: boolean
}

export type RadioGroupProps = {
  id: string
  legend: string
  name: string
  options: RadioOption[]
  value?: string
  hint?: string
  error?: string
  required?: boolean
  class?: string
}

const dot =
  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-line-strong bg-raised peer-checked:border-accent peer-checked:bg-accent peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-text peer-disabled:opacity-60 [&_span]:opacity-0 peer-checked:[&_span]:opacity-100'

// Pick one from a few options. All the radios share a name, so the form sends the chosen value.
export function RadioGroup(props: RadioGroupProps) {
  const { id, legend, name, options, value, hint, error, required } = props

  return (
    <Fieldset id={id} legend={legend} hint={hint} error={error} required={required} class={props.class}>
      {options.map((option, index) => {
        const optionId = `${id}-${index}`

        return (
          <label for={optionId} class={`flex min-h-11 items-start gap-3 py-2 ${option.disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
            <input
              type="radio"
              id={optionId}
              name={name}
              value={option.value}
              checked={option.value === value}
              required={required}
              disabled={option.disabled}
              aria-describedby={option.hint ? `${optionId}-hint` : undefined}
              class="peer sr-only"
            />
            <span aria-hidden="true" class={dot}>
              <span class="size-2 rounded-full bg-accent-ink" />
            </span>
            <span class="flex flex-col gap-0.5 peer-disabled:opacity-60">
              <span class="font-sans text-base text-ink">{option.label}</span>
              {option.hint ? (
                <span id={`${optionId}-hint`} class="type-hint">
                  {option.hint}
                </span>
              ) : null}
            </span>
          </label>
        )
      })}
    </Fieldset>
  )
}
