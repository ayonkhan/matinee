import { controlClasses, describedBy, FieldMessage } from './form-parts'

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectGroup = {
  label: string
  options: SelectOption[]
}

export type SelectProps = {
  id: string
  label: string
  name?: string
  options: Array<SelectOption | SelectGroup>
  value?: string
  placeholder?: string
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  class?: string
}

function SelectItem(props: { option: SelectOption; value?: string }) {
  const { option, value } = props

  return (
    <option value={option.value} selected={option.value === value} disabled={option.disabled}>
      {option.label}
    </option>
  )
}

// A native select, so phones show their own picker. That suits long lists such as time zones.
export function Select(props: SelectProps) {
  const { id, label, options, value, placeholder, hint, error, disabled } = props

  const classes = [
    controlClasses({ error: Boolean(error), disabled }),
    'appearance-none pr-10',
    disabled ? '' : 'cursor-pointer',
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

      <div class="relative">
        <select
          id={id}
          name={props.name}
          required={props.required}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={describedBy(id, hint, error)}
          class={classes}
        >
          {placeholder ? (
            <option value="" selected={!value}>
              {placeholder}
            </option>
          ) : null}
          {options.map((item) =>
            'options' in item ? (
              <optgroup label={item.label}>
                {item.options.map((option) => (
                  <SelectItem option={option} value={value} />
                ))}
              </optgroup>
            ) : (
              <SelectItem option={item} value={value} />
            ),
          )}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          class="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-muted"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}
