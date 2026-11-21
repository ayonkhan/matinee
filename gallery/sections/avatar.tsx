import { Avatar } from '../../src'

// Sample picture drawn here, so the public gallery never shows a real person.
function samplePicture(from: string, to: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient></defs><rect width="100" height="100" fill="url(#g)"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const pictureBlue = samplePicture('#4c8ff0', '#1b1e4a')
const pictureRose = samplePicture('#f06c8a', '#3a1230')

export function AvatarSection() {
  return (
    <>
      <div class="flex flex-wrap items-center gap-6">
        <Avatar name="swift-raven-5065" size="sm" />
        <Avatar name="swift-raven-5065" />
        <Avatar name="swift-raven-5065" size="lg" />
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex flex-wrap items-center gap-6">
          <Avatar name="quiet-otter-1204" src={pictureBlue} size="sm" />
          <Avatar name="quiet-otter-1204" src={pictureBlue} />
          <Avatar name="maple-fox-3381" src={pictureRose} size="lg" />
        </div>
        <p class="type-hint">Without a picture it shows the first letters of the name.</p>
      </div>
      <div class="flex items-center gap-3">
        <Avatar name="quiet-otter-1204" src={pictureBlue} decorative />
        <span class="type-label">quiet-otter-1204</span>
      </div>
    </>
  )
}
