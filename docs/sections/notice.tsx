import { Notice } from '../../src'
import { CodeBlock } from '../code-block'

export function NoticeSection() {
  return (
    <>
      <div class="flex max-w-xl flex-col gap-3">
        <Notice>Your list is private until you share it.</Notice>
        <Notice tone="accent" title="Saved">
          Your changes are live.
        </Notice>
        <Notice tone="danger" title="Could not save">
          Check the highlighted fields and try again.
        </Notice>
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Notice tone="accent" title="Saved">Your changes are live.</Notice>`}
      />
      <CodeBlock
        title="An error"
        code={`<Notice tone="danger" title="Could not save">Check the highlighted fields and try again.</Notice>`}
      />
    </>
  )
}
