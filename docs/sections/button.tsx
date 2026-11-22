import { Button } from '../../src'

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
    </>
  )
}
