import type { PropsWithChildren } from 'hono/jsx'

export type BadgeTone = 'neutral' | 'accent' | 'danger'

export type BadgeProps = PropsWithChildren<{
  tone?: BadgeTone
  href?: string
  selected?: boolean
  class?: string
}>

const base =
  'inline-flex items-center gap-1 rounded-badge border px-2.5 py-1 font-sans text-xs font-medium no-underline'

const tones: Record<BadgeTone, string> = {
  neutral: 'border-line bg-raised text-ink-soft',
  accent: 'border-accent-text/40 bg-accent/15 text-accent-text',
  danger: 'border-danger-line bg-danger/10 text-danger-text',
}

// A selected badge is solid, so it stands out from the rest of a filter row.
const selectedClasses = 'border-accent bg-accent text-accent-ink'

// Only links react to the pointer, a plain badge is just a label.
const linkClasses =
  'cursor-pointer hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

export function Badge(props: BadgeProps) {
  const { tone = 'neutral', href, selected, children } = props

  const classes = [
    base,
    selected ? selectedClasses : tones[tone],
    href ? linkClasses : '',
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a href={href} aria-current={selected ? 'true' : undefined} class={classes}>
        {children}
      </a>
    )
  }

  return <span class={classes}>{children}</span>
}
