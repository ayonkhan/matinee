import type { PropsWithChildren } from 'hono/jsx'
import { describedBy, FieldMessage } from './form-parts'

export type FieldsetProps = PropsWithChildren<{
  id: string
  legend: string
  hint?: string
  error?: string
  required?: boolean
  class?: string
}>

// A group of related controls with one heading, such as the options of a radio group.
export function Fieldset(props: FieldsetProps) {
  const { id, legend, hint, error, children } = props

  return (
    <fieldset aria-describedby={describedBy(id, hint, error)} class={['min-w-0', props.class ?? ''].filter(Boolean).join(' ')}>
      <legend class="type-label mb-1 p-0">
        {legend}
        {props.required ? (
          <span class="text-danger-text" aria-hidden="true">
            {' '}
            *
          </span>
        ) : null}
      </legend>

      <div class="flex flex-col">{children}</div>

      {hint || error ? (
        <div class="mt-1">
          <FieldMessage id={id} hint={hint} error={error} />
        </div>
      ) : null}
    </fieldset>
  )
}
