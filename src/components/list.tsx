import type { PropsWithChildren } from 'hono/jsx'

export type ListProps = PropsWithChildren<{
  // The name a screen reader gives the list, for example "Saved items".
  label?: string
  class?: string
}>

// A card of rows with a line between them. Fill it with ListItem.
export function List(props: ListProps) {
  return (
    <ul
      aria-label={props.label}
      class={[
        'flex list-none flex-col divide-y divide-line overflow-hidden rounded-card border border-line bg-card',
        props.class ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {props.children}
    </ul>
  )
}
