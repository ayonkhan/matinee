export type ToggleProps = {
  id: string
  label: string
  name?: string
  value?: string
  checked?: boolean
  disabled?: boolean
  hint?: string
  class?: string
}

// A checkbox underneath, so it is sent with the form like any other field and needs no JavaScript.
const track =
  'relative h-7 w-12 shrink-0 rounded-full border border-line-strong bg-sunken after:absolute after:left-[3px] after:top-[3px] after:size-5 after:rounded-full after:bg-muted motion-safe:after:transition-transform peer-checked:border-accent peer-checked:bg-accent peer-checked:after:translate-x-5 peer-checked:after:bg-accent-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent-text peer-disabled:opacity-60'

export function Toggle(props: ToggleProps) {
  const { id, label, hint, disabled } = props

  return (
    <div class={props.class}>
      <label for={id} class={`flex min-h-11 items-center justify-between gap-4 py-2 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
        <input
          type="checkbox"
          role="switch"
          id={id}
          name={props.name}
          value={props.value}
          checked={props.checked}
          disabled={disabled}
          aria-describedby={hint ? `${id}-hint` : undefined}
          class="peer sr-only"
        />
        <span class="flex flex-col gap-0.5 peer-disabled:opacity-60">
          <span class="font-sans text-base text-ink">{label}</span>
          {hint ? (
            <span id={`${id}-hint`} class="type-hint">
              {hint}
            </span>
          ) : null}
        </span>
        <span aria-hidden="true" class={track} />
      </label>
    </div>
  )
}
