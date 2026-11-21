import { dock, floatingBar, focusRing, type Placement } from './dock'

export type ActionBarProps = {
  label?: string
  formId?: string
  cancelHref?: string
  cancelLabel?: string
  disabled?: boolean
  placement?: Placement
  class?: string
}

// Takes the place of the BottomNav on pages with a form.
export function ActionBar(props: ActionBarProps) {
  const { label = 'Save', formId, cancelHref, cancelLabel = 'Cancel', disabled, placement = 'fixed' } = props

  return (
    <div class={dock(placement, props.class)}>
      <div class={`${floatingBar} gap-2 p-2`}>
        {cancelHref ? (
          <a
            href={cancelHref}
            class={`flex min-h-11 items-center rounded-full px-5 font-sans text-base font-medium text-ink no-underline hover:bg-raised ${focusRing}`}
          >
            {cancelLabel}
          </a>
        ) : null}
        <button
          type="submit"
          form={formId}
          disabled={disabled}
          class={`min-h-11 rounded-full bg-accent px-8 font-sans text-base font-semibold text-accent-ink ${focusRing} ${
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:brightness-110'
          }`}
        >
          {label}
        </button>
      </div>
    </div>
  )
}
