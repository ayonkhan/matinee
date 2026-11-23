import { Button } from './button'

export type PaginationProps = {
  page: number
  pageCount: number
  // Builds the link for a page, for example (page) => '/items?page=' + page.
  href: (page: number) => string
  // The name a screen reader gives the group.
  label?: string
  class?: string
}

// Previous and next links with the page in between. Every page is a real link, so it works without JavaScript.
export function Pagination(props: PaginationProps) {
  const { pageCount, href, label = 'Pagination' } = props

  // With one page or none there is nothing to move between, so nothing is drawn.
  if (!(pageCount > 1)) return <></>

  // A page outside the range is brought back inside it.
  const page = Math.min(Math.max(Math.round(props.page) || 1, 1), pageCount)
  const first = page === 1
  const last = page === pageCount

  return (
    <nav
      aria-label={label}
      class={['flex items-center justify-between gap-3', props.class ?? ''].filter(Boolean).join(' ')}
    >
      <Button variant="secondary" href={first ? undefined : href(page - 1)} disabled={first}>
        Previous
      </Button>
      <p class="type-hint tabular-nums">{`Page ${page} of ${pageCount}`}</p>
      <Button variant="secondary" href={last ? undefined : href(page + 1)} disabled={last}>
        Next
      </Button>
    </nav>
  )
}
