import { Pagination } from '../../src'
import { CodeBlock } from '../code-block'

const link = () => '#'

export function PaginationSection() {
  return (
    <>
      <div class="flex max-w-md flex-col gap-6">
        <Pagination page={1} pageCount={9} href={link} />
        <Pagination page={5} pageCount={9} href={link} />
        <Pagination page={9} pageCount={9} href={link} />
      </div>
      <p class="type-hint">
        Every page is a real link, so it works without JavaScript. The first and last pages switch off the button that
        has nowhere to go. With one page or none, nothing is drawn.
      </p>
      <CodeBlock
        title="Basic use"
        code={`<Pagination page={2} pageCount={9} href={(page) => '/items?page=' + page} />`}
      />
      <CodeBlock
        title="Own label"
        code={`<Pagination page={2} pageCount={9} href={(page) => '/items?page=' + page} label="Results pages" />`}
      />
    </>
  )
}
