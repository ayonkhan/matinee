import { Badge } from '../../src'
import { CodeBlock } from '../code-block'

export function BadgeSection() {
  return (
    <>
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Drama</Badge>
        <Badge>1999</Badge>
        <Badge tone="accent">Movie</Badge>
        <Badge tone="accent">TV</Badge>
        <Badge tone="danger">Removed</Badge>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <Badge href="#" selected>All</Badge>
          <Badge href="#">Movies</Badge>
          <Badge href="#">TV</Badge>
          <Badge href="#">Watchlist</Badge>
        </div>
        <p class="type-hint">Badges that link can act as filters. The selected one is solid.</p>
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Badge tone="accent">Movie</Badge>`}
      />
      <CodeBlock
        title="As a filter"
        code={`<Badge href="/films?type=movie" selected>Movies</Badge>`}
      />
    </>
  )
}
