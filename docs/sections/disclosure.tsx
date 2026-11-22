import { Disclosure } from '../../src'
import { CodeBlock } from '../code-block'

export function DisclosureSection() {
  return (
    <>
      <div class="flex max-w-xl flex-col gap-2">
        <Disclosure title="What is a design system?" class="rounded-tile border border-line bg-card" open>
          A shared set of colours, type and parts, so every page looks and behaves the same.
        </Disclosure>
        <Disclosure title="Does it need JavaScript?" class="rounded-tile border border-line bg-card">
          No. It opens and closes with plain HTML.
        </Disclosure>
        <Disclosure title="Components" meta={9} class="rounded-tile border border-line bg-card">
          A note on the right can show a count.
        </Disclosure>
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Disclosure title="Does it need JavaScript?">
  No. It opens and closes with plain HTML.
</Disclosure>`}
      />
      <CodeBlock
        title="Open, with a count"
        code={`<Disclosure title="Components" meta={9} open class="rounded-tile border border-line bg-card">
  ...
</Disclosure>`}
      />
    </>
  )
}
