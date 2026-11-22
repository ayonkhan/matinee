import { EmptyState } from '../../src'
import { CodeBlock } from '../code-block'

const filmIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
  </svg>
)

export function EmptyStateSection() {
  return (
    <>
      <EmptyState title="Your watchlist is empty" icon={filmIcon} action={{ label: 'Add a film', href: '#' }}>
        Films you want to see will show up here.
      </EmptyState>
      <div class="grid gap-6 sm:grid-cols-2">
        <EmptyState title="No results">Try a different search.</EmptyState>
        <EmptyState title="Nothing here yet" />
      </div>
      <CodeBlock
        title="Basic use"
        code={`<EmptyState title="Your watchlist is empty" action={{ label: 'Add a film', href: '/films/new' }}>
  Films you want to see will show up here.
</EmptyState>`}
      />
    </>
  )
}
