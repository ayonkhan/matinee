import { Stat } from '../../src'
import { CodeBlock } from '../code-block'

export function StatSection() {
  return (
    <>
      <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <Stat label="Films seen" value={128} />
        <Stat label="Average rating" value="3.8" hint="out of 5" />
        <Stat label="Top genre" value="Drama" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="grid max-w-xs grid-cols-1">
          <Stat label="Watchlist" value={24} hint="Films to see" href="#" />
        </div>
        <p class="type-hint">A tile with a link lights up on hover and takes you to where the number comes from.</p>
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Stat label="Films seen" value={128} />`}
      />
      <CodeBlock
        title="As a link"
        code={`<Stat label="Watchlist" value={24} hint="Films to see" href="/watchlist" />`}
      />
    </>
  )
}
