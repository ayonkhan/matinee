import type { Child, PropsWithChildren } from 'hono/jsx'
import { Button } from './button'

export type EmptyStateProps = PropsWithChildren<{
  title: string
  icon?: Child
  // One next step, such as adding the first item.
  action?: { label: string; href: string }
  class?: string
}>

// For a page or a list with nothing to show yet. It says why and what to do next.
export function EmptyState(props: EmptyStateProps) {
  const { title, icon, action, children } = props

  const classes = [
    'flex flex-col items-center gap-3 rounded-card border border-dashed border-line-strong px-6 py-10 text-center',
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div class={classes}>
      {icon ? (
        <span aria-hidden="true" class="flex size-12 items-center justify-center rounded-full bg-raised text-muted">
          {icon}
        </span>
      ) : null}

      <h3 class="type-heading">{title}</h3>

      {children ? <div class="type-body max-w-sm text-muted">{children}</div> : null}

      {action ? (
        <div class="mt-2">
          <Button href={action.href}>{action.label}</Button>
        </div>
      ) : null}
    </div>
  )
}
