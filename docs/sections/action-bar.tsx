import { ActionBar } from '../../src'
import { CodeBlock } from '../code-block'

export function ActionBarSection() {
  return (
    <>
      <div class="max-w-sm rounded-card border border-line bg-page py-6">
        <ActionBar placement="inline" cancelHref="#" />
      </div>
      <p class="type-hint">It takes the place of the bottom navigation on pages with a form.</p>
      <CodeBlock
        title="Basic use"
        code={`<ActionBar formId="settings" cancelHref="/settings" />`}
      />
      <CodeBlock
        title="Own label"
        code={`<ActionBar label="Save changes" />`}
      />
    </>
  )
}
