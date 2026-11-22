import { Toggle } from '../../src'
import { CodeBlock } from '../code-block'

export function ToggleSection() {
  return (
    <>
      <div class="flex max-w-md flex-col divide-y divide-line">
        <Toggle id="images" name="images" label="Show images" hint="Shown above each item." checked />
        <Toggle id="updates" name="updates" label="Email updates" />
        <Toggle id="auto-dark" label="Dark by default" hint="Not available yet." disabled />
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Toggle id="images" name="images" label="Show images" hint="Shown above each item." checked />`}
      />
    </>
  )
}
