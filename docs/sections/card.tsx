import { Card } from '../../src'
import { CodeBlock } from '../code-block'

export function CardSection() {
  return (
    <>
      <div class="grid gap-6 sm:grid-cols-3">
        <Card title="Default">
          <p class="type-body">The standard surface for a block of content.</p>
        </Card>
        <Card title="Floating" floating>
          <p class="type-body">A shadow lifts it above the page. Use it for menus and popovers.</p>
        </Card>
        <Card title="Large padding" padding="lg">
          <p class="type-body">More room for forms and settings sections.</p>
        </Card>
      </div>
      <Card padding="none" class="max-w-sm overflow-hidden">
        <div class="h-24 bg-raised" />
        <div class="p-4">
          <p class="type-body">No padding, so an image or banner can reach the edges.</p>
        </div>
      </Card>
      <CodeBlock
        title="Basic use"
        code={`<Card title="Account" padding="lg">
  <p>Settings go here.</p>
</Card>`}
      />
      <CodeBlock
        title="As a section, floating"
        code={`<Card as="section" floating>
  <p>A menu or popover.</p>
</Card>`}
      />
    </>
  )
}
