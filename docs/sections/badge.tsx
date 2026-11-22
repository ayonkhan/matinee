import { Badge } from '../../src'
import { CodeBlock } from '../code-block'

export function BadgeSection() {
  return (
    <>
      <div class="flex flex-wrap items-center gap-2">
        <Badge>Design</Badge>
        <Badge>2024</Badge>
        <Badge tone="accent">Article</Badge>
        <Badge tone="accent">Video</Badge>
        <Badge tone="danger">Removed</Badge>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <Badge href="#" selected>All</Badge>
          <Badge href="#">Articles</Badge>
          <Badge href="#">Videos</Badge>
          <Badge href="#">Saved</Badge>
        </div>
        <p class="type-hint">Badges that link can act as filters. The selected one is solid.</p>
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Badge tone="accent">Article</Badge>`}
      />
      <CodeBlock
        title="As a filter"
        code={`<Badge href="/items?type=article" selected>Articles</Badge>`}
      />
    </>
  )
}
