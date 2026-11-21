import type { Child } from 'hono/jsx'
import { dock, floatingBar, focusRing, type Placement } from './dock'

export type BottomNavItem = {
  label: string
  href: string
  icon?: Child
  current?: boolean
  // The main action, drawn as a gold circle. Its label is kept for screen readers only.
  primary?: boolean
}

export type BottomNavProps = {
  items: BottomNavItem[]
  placement?: Placement
  class?: string
}

export function BottomNav(props: BottomNavProps) {
  const { items, placement = 'fixed' } = props

  return (
    <div class={dock(placement, props.class)}>
      <nav aria-label="Primary" class={`${floatingBar} gap-1 p-1.5`}>
        {items.map((item) =>
          item.primary ? (
            <a
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              class={`mx-1 flex size-12 items-center justify-center rounded-full bg-accent text-accent-ink no-underline hover:brightness-110 ${focusRing}`}
            >
              <span aria-hidden="true" class="flex size-6 items-center justify-center">
                {item.icon}
              </span>
              <span class="sr-only">{item.label}</span>
            </a>
          ) : (
            <a
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              class={`flex min-w-14 flex-col items-center gap-0.5 rounded-full px-3 py-1.5 font-sans text-[11px] font-medium no-underline ${focusRing} ${
                item.current ? 'bg-raised text-accent-text' : 'text-muted hover:text-ink'
              }`}
            >
              <span aria-hidden="true" class="flex size-6 items-center justify-center">
                {item.icon}
              </span>
              {item.label}
            </a>
          ),
        )}
      </nav>
    </div>
  )
}
