export type StatProps = {
  label: string
  value: string | number
  hint?: string
  // Makes the whole tile a link, for example to the page the number comes from.
  href?: string
  class?: string
}

const tile = 'flex flex-col rounded-tile border border-line bg-card p-4 text-ink no-underline'

const linkClasses =
  'hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

// One number with a name, such as the films you have seen.
export function Stat(props: StatProps) {
  const { label, value, hint, href } = props

  const classes = [tile, href ? linkClasses : '', props.class ?? ''].filter(Boolean).join(' ')

  const content = (
    <dl class="flex flex-col gap-1">
      <dt class="type-overline">{label}</dt>
      <dd class="font-display text-3xl font-bold tabular-nums leading-none">{value}</dd>
      {hint ? <dd class="type-hint mt-1">{hint}</dd> : null}
    </dl>
  )

  if (href) {
    return (
      <a href={href} class={classes}>
        {content}
      </a>
    )
  }

  return <div class={classes}>{content}</div>
}
