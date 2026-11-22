import { Cover } from '../../src'
import { CodeBlock } from '../code-block'

// Sample artwork drawn here, so the public docs never shows a real cover.
function sampleArt(from: string, to: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="200" height="300" fill="url(#g)"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const artGold = sampleArt('#f0b44c', '#7a3d0c')
const artBlue = sampleArt('#4c8ff0', '#1b1e4a')
const artRose = sampleArt('#f06c8a', '#3a1230')

export function CoverSection() {
  return (
    <>
      <div class="flex flex-wrap items-end gap-6">
        <Cover title="Small" src={artGold} size="sm" />
        <Cover title="Medium" src={artBlue} size="md" />
        <Cover title="Large" src={artRose} size="lg" />
        <Cover title="An item with no cover found" size="lg" />
      </div>
      <div class="grid max-w-md grid-cols-4 gap-3">
        <Cover title="One" src={artGold} size="fill" />
        <Cover title="Two" src={artBlue} size="fill" />
        <Cover title="Three" size="fill" />
        <Cover title="Four" src={artRose} size="fill" />
      </div>
      <CodeBlock
        title="Basic use"
        code={`<Cover title="Night Train" src="https://example.com/night-train.jpg" size="lg" />`}
      />
      <CodeBlock
        title="No cover, filling a grid cell"
        code={`<Cover title="Night Train" size="fill" />`}
      />
    </>
  )
}
