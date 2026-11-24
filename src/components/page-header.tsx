import { Button } from './button'

export type PageHeaderProps = {
  title: string
  description?: string
  // One main action, such as adding something. It drops under the title on a narrow screen.
  action?: { label: string; href: string }
  class?: string
}

// The top of a page: its title, a short line about it and one main action.
export function PageHeader(props: PageHeaderProps) {
  const { title, description, action } = props

  return (
    <header
      class={['flex flex-wrap items-end justify-between gap-x-4 gap-y-3', props.class ?? ''].filter(Boolean).join(' ')}
    >
      <div class="flex min-w-0 flex-col gap-1">
        <h1 class="type-display text-ink">{title}</h1>
        {description ? <p class="type-body text-ink-soft">{description}</p> : null}
      </div>

      {action ? (
        <div class="shrink-0">
          <Button href={action.href}>{action.label}</Button>
        </div>
      ) : null}
    </header>
  )
}
