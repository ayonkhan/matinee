import type { Child } from 'hono/jsx'
import { Avatar } from './avatar'
import { Button } from './button'
import { type ContentWidth, widths } from './width'

export type TopBarLink = {
  label: string
  href: string
  current?: boolean
}

export type TopBarMenuItem = {
  label: string
  href: string
  // Sign out must be a POST, so it renders as a small form instead of a link.
  post?: boolean
}

export type TopBarProps = {
  // The name can be text or markup, for example a name with a coloured dot.
  brand: { name: Child; href: string }
  links?: TopBarLink[]
  // The main button. When nobody is signed in it shows on every screen. When someone is, only from sm up.
  action?: { label: string; href: string }
  // A quieter link next to the action, such as Sign in. Only shown when nobody is signed in.
  secondary?: { label: string; href: string }
  user?: {
    name: string
    avatarSrc?: string
    menu: TopBarMenuItem[]
    open?: boolean
  }
  // narrow is the default. Use wide when the page itself is wider.
  width?: ContentWidth
  class?: string
}

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

const menuItem = `block w-full cursor-pointer rounded-control px-3 py-2 text-left font-sans text-sm text-ink no-underline hover:bg-raised ${focus}`

export function TopBar(props: TopBarProps) {
  const { brand, links = [], action, secondary, user, width = 'narrow' } = props

  return (
    <header class={['border-b border-line bg-card', props.class ?? ''].filter(Boolean).join(' ')}>
      <div class={`mx-auto flex h-14 ${widths[width]} items-center gap-6 px-4`}>
        <a href={brand.href} class={`font-display text-lg font-bold text-ink no-underline ${focus}`}>
          {brand.name}
        </a>

        {links.length > 0 ? (
          <nav aria-label="Main" class="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <a
                href={link.href}
                aria-current={link.current ? 'page' : undefined}
                class={`rounded-control px-3 py-2 font-sans text-sm font-medium no-underline ${focus} ${
                  link.current ? 'bg-raised text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div class="ml-auto flex items-center gap-3">
          {secondary && !user ? (
            <a
              href={secondary.href}
              class={`inline-flex min-h-11 items-center rounded-control px-2 font-sans text-sm font-medium text-muted no-underline hover:text-ink ${focus}`}
            >
              {secondary.label}
            </a>
          ) : null}

          {action ? (
            <div class={user ? 'hidden sm:block' : undefined}>
              <Button href={action.href}>{action.label}</Button>
            </div>
          ) : null}

          {user ? (
            <details class="relative" open={user.open}>
              <summary
                aria-label="Account menu"
                class={`flex cursor-pointer list-none items-center rounded-full [&::-webkit-details-marker]:hidden ${focus}`}
              >
                <Avatar name={user.name} src={user.avatarSrc} decorative />
              </summary>

              <div class="absolute right-0 z-10 mt-2 w-56 rounded-card border border-line bg-card p-1 shadow-float">
                <p class="mb-1 border-b border-line px-3 py-2 font-sans text-sm font-semibold text-ink">{user.name}</p>
                {user.menu.map((item) =>
                  item.post ? (
                    <form method="post" action={item.href}>
                      <button type="submit" class={menuItem}>
                        {item.label}
                      </button>
                    </form>
                  ) : (
                    <a href={item.href} class={menuItem}>
                      {item.label}
                    </a>
                  ),
                )}
              </div>
            </details>
          ) : null}
        </div>
      </div>
    </header>
  )
}
