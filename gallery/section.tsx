import type { PropsWithChildren } from 'hono/jsx'

export function Section(props: PropsWithChildren<{ id: string; title: string }>) {
  return (
    <section id={props.id} class="flex scroll-mt-20 flex-col gap-4 lg:scroll-mt-8">
      <h2 class="font-display text-2xl font-bold">{props.title}</h2>
      {props.children}
    </section>
  )
}
