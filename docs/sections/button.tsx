import { Button } from '../../src'
import { CodeBlock } from '../code-block'

export function ButtonSection() {
  return (
    <>
      <div class="flex flex-wrap items-center gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="link">Link style</Button>
        <Button disabled>Disabled</Button>
        <Button href="#">As a link</Button>
      </div>
      <div class="max-w-sm">
        <Button fullWidth>Full width</Button>
      </div>
      <CodeBlock title="Basic use" code={'<Button type="submit">Save</Button>'} />
      <p class="type-hint">
        The link style is for a small action inside a form, such as sending a new code. It is still a button, so it can
        submit a form.
      </p>
      <CodeBlock
        title="Link style"
        code={'<Button variant="link" type="submit">\n  Send a new code\n</Button>'}
      />
      <CodeBlock
        title="As a link, full width"
        code={'<Button href="/items/new" fullWidth>\n  Add item\n</Button>'}
      />
    </>
  )
}
