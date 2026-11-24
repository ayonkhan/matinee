import { Fieldset } from './fieldset'
import { starPath } from './stars'

export type RatingInputProps = {
  id: string
  legend: string
  name: string
  // How many stars there are. The form sends a whole number from 1 to this.
  max?: number
  value?: number
  hint?: string
  error?: string
  required?: boolean
  disabled?: boolean
  class?: string
}

// Choose a rating by tapping a star. The stars are radio buttons, so it works without JavaScript.
export function RatingInput(props: RatingInputProps) {
  const { id, legend, name, max = 5, value, hint, error, required, disabled } = props

  // The highest star comes first in the markup and the row is flipped on screen. That lets the stars
  // after a chosen one in the markup, which sit on its left on screen, light up with it. The rating-star
  // class in the theme does the colouring.
  const numbers = Array.from({ length: max }, (_, i) => max - i)

  return (
    <Fieldset id={id} legend={legend} hint={hint} error={error} required={required} class={props.class}>
      <div class="flex w-fit flex-row-reverse">
        {numbers.map((n) => {
          const starId = `${id}-${n}`

          return (
            <>
              <input
                type="radio"
                id={starId}
                name={name}
                value={String(n)}
                checked={n === value}
                required={required}
                disabled={disabled}
                class="peer sr-only"
              />
              <label
                for={starId}
                class="rating-star flex size-11 cursor-pointer items-center justify-center rounded-control peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-text peer-disabled:cursor-not-allowed peer-disabled:opacity-60"
              >
                <span class="sr-only">{n === 1 ? '1 star' : `${n} stars`}</span>
                <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" class="size-7 fill-current">
                  <path d={starPath} />
                </svg>
              </label>
            </>
          )
        })}
      </div>
    </Fieldset>
  )
}
