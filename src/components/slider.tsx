import { describedBy, FieldMessage } from './form-parts'

export type SliderProps = {
  id: string
  label: string
  name?: string
  min?: number
  max?: number
  step?: number
  value?: number
  // Words at each end of the track, such as "Quiet" and "Loud".
  minLabel?: string
  maxLabel?: string
  hint?: string
  error?: string
  disabled?: boolean
  class?: string
}

// Each browser draws a range input with its own parts, so the track and thumb are styled for both.
const range =
  'h-6 w-full appearance-none bg-transparent focus-visible:outline-none ' +
  '[&::-webkit-slider-runnable-track]:h-2 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-line-strong ' +
  '[&::-webkit-slider-thumb]:-mt-1.5 [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent ' +
  '[&::-moz-range-track]:h-2 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-line-strong ' +
  '[&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent ' +
  'focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-accent-text focus-visible:[&::-webkit-slider-thumb]:ring-offset-2 ' +
  'focus-visible:[&::-moz-range-thumb]:ring-2 focus-visible:[&::-moz-range-thumb]:ring-accent-text'

export function Slider(props: SliderProps) {
  const { id, label, min = 0, max = 100, step = 1, value, minLabel, maxLabel, hint, error, disabled } = props

  return (
    <div class={['flex flex-col gap-2', props.class ?? ''].filter(Boolean).join(' ')}>
      <label for={id} class="type-label">
        {label}
      </label>

      <input
        type="range"
        id={id}
        name={props.name}
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy(id, hint, error)}
        class={`${range} ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
      />

      {minLabel || maxLabel ? (
        <div class="flex justify-between font-sans text-xs text-muted">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      ) : null}

      <FieldMessage id={id} hint={hint} error={error} />
    </div>
  )
}
