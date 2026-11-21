import type { Child } from 'hono/jsx'

export type SegmentedControlOption = {
  label: string
  href: string
  icon?: Child
  selected?: boolean
}

export type SegmentedControlProps = {
  // The name a screen reader gives the group, for example "View" or "Theme".
  label: string
  options: SegmentedControlOption[]
  fullWidth?: boolean
  class?: string
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

// Each option is a link, so it works on a server-rendered page with no JavaScript.
export function SegmentedControl(props: SegmentedControlProps) {
  const { label, options, fullWidth } = props

  const classes = [
    'gap-1 rounded-control border border-line bg-sunken p-1 font-sans text-sm',
    fullWidth ? 'flex w-full' : 'inline-flex',
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <nav aria-label={label} class={classes}>
      {options.map((option) => (
        <a
          href={option.href}
          aria-current={option.selected ? 'true' : undefined}
          class={`inline-flex min-h-10 items-center justify-center gap-1.5 rounded-badge px-4 no-underline ${focus} ${
            fullWidth ? 'flex-1' : ''
          } ${option.selected ? 'bg-raised font-semibold text-ink' : 'text-muted hover:text-ink'}`}
        >
          {option.icon ? (
            <span aria-hidden="true" class="flex size-5 items-center justify-center">
              {option.icon}
            </span>
          ) : null}
          {option.label}
        </a>
      ))}
    </nav>
  )
}
