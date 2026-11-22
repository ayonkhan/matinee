import { Stars } from '../../src'
import { CodeBlock } from '../code-block'

export function StarsSection() {
  return (
    <>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Stars value={0} showValue />
        <Stars value={2.5} showValue />
        <Stars value={3.5} showValue />
        <Stars value={5} showValue />
      </div>
      <div class="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Stars value={4} size="sm" />
        <Stars value={4} size="md" />
        <Stars value={4} size="lg" />
      </div>
      <div class="flex flex-col gap-1">
        <Stars value={3.5} label="Rated 7 out of 10" />
        <p class="type-hint">A 7 out of 10 rating, shown as 3.5 of 5 stars.</p>
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Stars value={3.5} showValue />`}
      />
      <CodeBlock
        title="Own label"
        code={`<Stars value={3.5} label="Rated 7 out of 10" />`}
      />
    </>
  )
}
