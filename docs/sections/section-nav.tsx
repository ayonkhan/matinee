import { SectionNav } from '../../src'
import { CodeBlock } from '../code-block'

export function SectionNavSection() {
  return (
    <>
      <div class="flex max-w-xs flex-col gap-8">
        <SectionNav
          links={[
            { label: 'What we collect', href: '#' },
            { label: 'What others can see', href: '#' },
            { label: 'Cookies', href: '#' },
          ]}
        />
        <SectionNav
          title="Contents"
          links={[
            { label: 'Overview', href: '#' },
            { label: 'Details', href: '#' },
          ]}
          more={[{ label: 'Terms of Service', href: '#' }]}
        />
      </div>
      <p class="type-hint">
        Every link is a real link to a part of the same page, so it works without JavaScript. Give each part an id
        that matches its link. The links under the line go to other pages. The page decides the width and where the
        list sits, so on a wide screen it can stand beside the text.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<SectionNav
  links={[
    { label: 'What we collect', href: '#collect' },
    { label: 'Cookies', href: '#cookies' },
  ]}
/>`}
      />
      <CodeBlock
        title="With a link to another page"
        code={`<SectionNav
  links={[{ label: 'Cookies', href: '#cookies' }]}
  more={[{ label: 'Terms of Service', href: '/terms' }]}
  class="lg:w-52 lg:shrink-0"
/>`}
      />
    </>
  )
}
