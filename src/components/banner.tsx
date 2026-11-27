import type { PropsWithChildren } from 'hono/jsx'
import type { Placement } from './dock'

export type BannerEdge = 'bottom' | 'top'

export type BannerProps = PropsWithChildren<{
  // Tells banners apart. A visitor who dismisses one is remembered under this name.
  id: string
  // The name a screen reader gives the banner.
  label?: string
  // The text on the dismiss button.
  action?: string
  // "fixed" sticks to an edge of the screen. "inline" stays in the page, for previews and the docs.
  placement?: Placement
  // Which edge a fixed banner sticks to. A cookie notice usually goes at the bottom, an announcement at the top.
  edge?: BannerEdge
  // Remember a dismissal in the browser. Turn it off for a banner that should come back on every visit.
  remember?: boolean
  class?: string
}>

// Shows each banner unless its visitor already dismissed it, and hides it when its button is pressed.
// A banner starts hidden, so one that was dismissed never flashes on a later visit.
// The choice stays in localStorage, in the browser, and is never sent to a server.
// Add it to the page once, in a script tag, however many banners there are.
export const bannerScript = `
document.querySelectorAll('[data-banner]').forEach(function (banner) {
  var key = 'matinee.banner.' + banner.getAttribute('data-banner')
  var remember = banner.getAttribute('data-remember') !== 'false'

  try { if (remember && localStorage.getItem(key)) return } catch (e) {}

  banner.hidden = false

  banner.querySelector('[data-banner-close]').addEventListener('click', function () {
    banner.hidden = true
    try { if (remember) localStorage.setItem(key, '1') } catch (e) {}
  })
})
`

const edges: Record<BannerEdge, string> = {
  bottom: 'fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card',
  top: 'fixed inset-x-0 top-0 z-30 border-b border-line bg-card',
}

const inline = 'rounded-card border border-line bg-card'

// A short message with a button that dismisses it, such as a cookie notice.
export function Banner(props: BannerProps) {
  const {
    id,
    label = 'Notice',
    action = 'Got it',
    placement = 'fixed',
    edge = 'bottom',
    remember = true,
    children,
  } = props

  return (
    <div
      data-banner={id}
      data-remember={remember ? 'true' : 'false'}
      hidden
      role="region"
      aria-label={label}
      class={[placement === 'fixed' ? edges[edge] : inline, props.class ?? ''].filter(Boolean).join(' ')}
    >
      <div class="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-4 py-4">
        <div class="min-w-60 flex-1 font-sans text-sm leading-relaxed text-muted">{children}</div>

        <button
          type="button"
          data-banner-close
          class="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-control bg-accent px-5 py-3 font-sans text-base font-semibold text-accent-ink hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
        >
          {action}
        </button>
      </div>
    </div>
  )
}
