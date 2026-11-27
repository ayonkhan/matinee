import type { PropsWithChildren } from 'hono/jsx'
import { type ContentWidth, widths } from './width'

export type FooterLink = {
  label: string
  href: string
}

export type FooterProps = PropsWithChildren<{
  links?: FooterLink[]
  // narrow is the default. Use wide when the page itself is wider.
  width?: ContentWidth
  class?: string
}>

const focus = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text'

// The end of a page: a short note, such as a copyright line, and a few links.
export function Footer(props: FooterProps) {
  const { links = [], width = 'narrow', children } = props

  return (
    <footer class={['border-t border-line bg-card', props.class ?? ''].filter(Boolean).join(' ')}>
      <div
        class={`mx-auto flex ${widths[width]} flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-6`}
      >
        {children ? <div class="font-sans text-sm text-muted">{children}</div> : null}

        {links.length > 0 ? (
          <nav aria-label="Footer" class="flex flex-wrap gap-x-5">
            {links.map((link) => (
              <a
                href={link.href}
                class={`inline-flex min-h-11 items-center font-sans text-sm text-muted no-underline hover:text-ink ${focus}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </footer>
  )
}
