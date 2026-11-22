import type { PropsWithChildren } from 'hono/jsx'

// The title links to its own section, so you can copy the link and share it.
export function Section(props: PropsWithChildren<{ id: string; title: string }>) {
  return (
    <section id={props.id} class="flex scroll-mt-20 flex-col gap-4 lg:scroll-mt-8">
      <h2 class="font-display text-2xl font-bold">
        <a href={`#${props.id}`} class="group inline-flex items-baseline gap-2 text-ink no-underline">
          {props.title}
          <span
            aria-hidden="true"
            class="text-lg font-normal text-muted [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
          >
            #
          </span>
        </a>
      </h2>
      {props.children}
    </section>
  )
}
