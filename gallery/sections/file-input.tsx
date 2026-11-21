import { FileInput } from '../../src'

export function FileInputSection() {
  return (
    <div class="grid gap-6 sm:grid-cols-2">
      <FileInput id="picture" label="Profile picture" name="picture" accept="image/*" hint="PNG or JPG, up to 2 MB." />
      <FileInput id="documents" label="Documents" multiple required hint="You can choose more than one." />
      <FileInput id="big-file" label="Attachment" error="That file is too big." />
      <FileInput id="locked-file" label="Locked" disabled />
    </div>
  )
}
