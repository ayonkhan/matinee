import { Checkbox } from './checkbox'
import { Fieldset } from './fieldset'

export type CheckboxGroupOption = {
  value: string
  label: string
  hint?: string
  checked?: boolean
  disabled?: boolean
}

export type CheckboxGroupProps = {
  id: string
  legend: string
  name: string
  options: CheckboxGroupOption[]
  hint?: string
  error?: string
  class?: string
}

// Several checkboxes under one question. All of them share a name, so the form sends every ticked value.
export function CheckboxGroup(props: CheckboxGroupProps) {
  const { id, legend, name, options, hint, error } = props

  return (
    <Fieldset id={id} legend={legend} hint={hint} error={error} class={props.class}>
      {options.map((option, index) => (
        <Checkbox
          id={`${id}-${index}`}
          name={name}
          value={option.value}
          label={option.label}
          hint={option.hint}
          checked={option.checked}
          disabled={option.disabled}
        />
      ))}
    </Fieldset>
  )
}
