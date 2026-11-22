import type { PropsWithChildren } from 'hono/jsx'

export type DisclosureProps = PropsWithChildren<{
  title: string
  // A small note on the right of the title, such as how many things are inside.
  meta?: string | number
  open?: boolean
  class?: string
}>

// A title that opens and closes a block of content. It is a plain details element, so it needs no JavaScript.
export function Disclosure(props: DisclosureProps) {
  const { title, meta, open, children } = props

  return (
    <details open={open} class={['group/disclosure', props.class ?? ''].filter(Boolean).join(' ')}>
      <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-control px-3 py-2 font-sans text-sm font-semibold text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text [&::-webkit-details-marker]:hidden">
        <span class="flex items-center gap-2">
          <span aria-hidden="true" class="inline-block text-muted transition-transform group-open/disclosure:rotate-90">
            ▸
          </span>
          {title}
        </span>

        {meta !== undefined ? <span class="text-xs font-normal text-muted">{meta}</span> : null}
      </summary>

      <div class="px-3 pt-1 pb-2 font-sans text-sm text-ink-soft">{children}</div>
    </details>
  )
}
