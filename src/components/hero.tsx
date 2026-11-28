import type { Child, PropsWithChildren } from 'hono/jsx'
import { Button } from './button'
import { type ContentWidth, widths } from './width'

export type HeroProps = PropsWithChildren<{
  // The big headline. It is the heading of the page.
  title: string
  // The main action and a quieter second one, both links.
  action?: { label: string; href: string }
  secondaryAction?: { label: string; href: string }
  // A small line under the buttons, such as "Free to try. No card needed."
  note?: Child
  // Fills the whole hero behind the text, such as a grid of pictures. It is hidden from screen readers.
  background?: Child
  width?: ContentWidth
  class?: string
}>

// The top of a landing page: a big headline, a few lines of text and one or two buttons.
// With a background, a soft fade keeps the text easy to read on top of it.
// It has no space around it, so the page decides, for example class="mt-8".
export function Hero(props: HeroProps) {
  const { title, action, secondaryAction, note, background, width = 'narrow', children } = props

  return (
    <section class={['relative isolate overflow-hidden', props.class ?? ''].filter(Boolean).join(' ')}>
      {background ? (
        <div aria-hidden="true" class="absolute inset-0 -z-10 overflow-hidden">
          {background}
          <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--color-page)_0%,color-mix(in_oklab,var(--color-page)_55%,transparent)_100%)]"></div>
        </div>
      ) : null}

      <div class={`mx-auto ${widths[width]} px-4 py-20 text-center sm:px-10 sm:py-28`}>
        <h1 class="mx-auto max-w-5xl text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-7xl">
          {title}
        </h1>

        {children ? (
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">{children}</p>
        ) : null}

        {action || secondaryAction ? (
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            {action ? <Button href={action.href}>{action.label}</Button> : null}
            {secondaryAction ? (
              <Button variant="secondary" href={secondaryAction.href}>
                {secondaryAction.label}
              </Button>
            ) : null}
          </div>
        ) : null}

        {note ? <div class="type-hint mt-6 flex items-center justify-center gap-2">{note}</div> : null}
      </div>
    </section>
  )
}
