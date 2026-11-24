import type { Child } from 'hono/jsx'

export type ListItemProps = {
  title: string
  // A smaller line under the title.
  description?: string
  // Makes the whole row a link. Use it for rows that open something.
  href?: string
  // Something on the left, such as an Avatar.
  leading?: Child
  // Something on the right, such as a Badge or a Button. A link row shows an arrow when this is empty.
  trailing?: Child
  class?: string
}

const row = 'flex min-h-14 items-center gap-3 px-4 py-3'

const linkClasses =
  'text-ink no-underline hover:bg-raised focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent-text'

function Arrow() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      class="size-5 shrink-0 text-muted"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  )
}

// One row of a List. A row with a link cannot hold a button, so give a row either href or a trailing action.
export function ListItem(props: ListItemProps) {
  const { title, description, href, leading, trailing } = props

  const content = (
    <>
      {leading ? <div class="shrink-0">{leading}</div> : null}

      <div class="flex min-w-0 flex-1 flex-col">
        <span class="type-label break-words text-ink">{title}</span>
        {description ? <span class="type-hint break-words">{description}</span> : null}
      </div>

      {trailing ? <div class="shrink-0">{trailing}</div> : href ? <Arrow /> : null}
    </>
  )

  return (
    <li class={props.class}>
      {href ? (
        <a href={href} class={`${row} ${linkClasses}`}>
          {content}
        </a>
      ) : (
        <div class={row}>{content}</div>
      )}
    </li>
  )
}
