import { Button } from '../../src'
import { CodeBlock } from '../code-block'

export function ButtonSection() {
  return (
    <>
      <div class="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button disabled>Disabled</Button>
        <Button href="#">As a link</Button>
      </div>
      <div class="max-w-sm">
        <Button fullWidth>Full width</Button>
      </div>
      <CodeBlock title="Basic use" code={'<Button type="submit">Save</Button>'} />
      <CodeBlock
        title="As a link, full width"
        code={'<Button href="/items/new" fullWidth>\n  Add item\n</Button>'}
      />
    </>
  )
}
