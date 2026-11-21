import { Poster } from '../../src'

// Sample artwork drawn here, so the public gallery never shows a real studio poster.
function sampleArt(from: string, to: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 300"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="200" height="300" fill="url(#g)"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const artGold = sampleArt('#f0b44c', '#7a3d0c')
const artBlue = sampleArt('#4c8ff0', '#1b1e4a')
const artRose = sampleArt('#f06c8a', '#3a1230')

export function PosterSection() {
  return (
    <>
      <div class="flex flex-wrap items-end gap-6">
        <Poster title="Small" src={artGold} size="sm" />
        <Poster title="Medium" src={artBlue} size="md" />
        <Poster title="Large" src={artRose} size="lg" />
        <Poster title="A film with no poster found" size="lg" />
      </div>
      <div class="grid max-w-md grid-cols-4 gap-3">
        <Poster title="One" src={artGold} size="fill" />
        <Poster title="Two" src={artBlue} size="fill" />
        <Poster title="Three" size="fill" />
        <Poster title="Four" src={artRose} size="fill" />
      </div>
    </>
  )
}
