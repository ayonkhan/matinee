import type { PropsWithChildren } from 'hono/jsx'
import { Button } from './button'

export type ErrorPageProps = PropsWithChildren<{
  // The big word or number at the top, such as "404" or "Oops".
  code: string
  title: string
  // One way out, such as a link back to the home page.
  action?: { label: string; href: string }
  class?: string
}>

// A whole page that says something went wrong or is missing: a page not found, a server error, no access.
// It has no space above or below, so the page decides, for example class="py-16".
export function ErrorPage(props: ErrorPageProps) {
  const { code, title, action, children } = props

  return (
    <section
      class={['mx-auto flex max-w-xl flex-col items-center text-center', props.class ?? ''].filter(Boolean).join(' ')}
    >
      <p class="font-display text-6xl font-bold text-accent-text">{code}</p>
      <h1 class="type-display mt-4 text-ink">{title}</h1>

      {children ? <div class="type-body mt-3 text-muted">{children}</div> : null}

      {action ? (
        <div class="mt-8">
          <Button href={action.href}>{action.label}</Button>
        </div>
      ) : null}
    </section>
  )
}
