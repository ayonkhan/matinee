import type { PropsWithChildren } from 'hono/jsx'

export type CardPadding = 'none' | 'md' | 'lg'

export type CardProps = PropsWithChildren<{
  title?: string
  as?: 'div' | 'section' | 'article'
  padding?: CardPadding
  floating?: boolean
  class?: string
}>

const paddings: Record<CardPadding, string> = {
  none: '',
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-8',
}

export function Card(props: CardProps) {
  const { title, as: Tag = 'div', padding = 'md', floating, children } = props

  const classes = [
    'flex flex-col gap-4 rounded-card border border-line bg-card text-ink',
    paddings[padding],
    floating ? 'shadow-float' : '',
    props.class ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Tag class={classes}>
      {title ? <h3 class="type-heading">{title}</h3> : null}
      {children}
    </Tag>
  )
}
