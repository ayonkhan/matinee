import { PageHeader } from '../../src'
import { CodeBlock } from '../code-block'

export function PageHeaderSection() {
  return (
    <>
      <div class="flex max-w-2xl flex-col gap-8">
        <PageHeader
          title="My items"
          description="Everything you have added."
          action={{ label: 'Add item', href: '#' }}
        />
        <PageHeader title="Settings" />
      </div>
      <p class="type-hint">
        The action sits beside the title and drops under it on a narrow screen. Each page should have one header, so
        it holds the one h1.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<PageHeader
  title="My items"
  description="Everything you have added."
  action={{ label: 'Add item', href: '/items/new' }}
/>`}
      />
      <CodeBlock title="Title only" code={`<PageHeader title="Settings" />`} />
    </>
  )
}
