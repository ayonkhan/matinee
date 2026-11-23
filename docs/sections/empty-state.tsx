import { EmptyState } from '../../src'
import { CodeBlock } from '../code-block'

const bookmarkIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-6">
    <path d="M6 3h12v18l-6-4-6 4z" />
  </svg>
)

export function EmptyStateSection() {
  return (
    <>
      <EmptyState title="Your saved list is empty" icon={bookmarkIcon} action={{ label: 'Add an item', href: '#' }}>
        Items you save will show up here.
      </EmptyState>
      <div class="grid gap-6 sm:grid-cols-2">
        <EmptyState title="No results">Try a different search.</EmptyState>
        <EmptyState title="Nothing here yet" />
      </div>
      <CodeBlock
        title="Basic use"
        code={`<EmptyState title="Your saved list is empty" action={{ label: 'Add an item', href: '/items/new' }}>
  Items you save will show up here.
</EmptyState>`}
      />
    </>
  )
}
