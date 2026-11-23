import type { Child } from 'hono/jsx'

export type CopyBlockProps = {
  code: string
  title?: string
  // A small label on the left of the bar, such as the kind of text.
  language?: string
  // Long lines wrap instead of scrolling sideways.
  wrap?: boolean
  // Colours Matinee code: component tags in gold and attribute names in grey. Off by default, so ordinary
  // text stays plain.
  highlight?: boolean
  // The name a screen reader gives the text when there is no title.
  label?: string
  class?: string
}

// Gold for component tags and muted for attribute names. Everything else stays plain.
export function highlight(code: string): Child[] {
  const pattern = /(<\/?[A-Z][A-Za-z]*)|\b([a-z][\w-]*)(?==)/g
  const parts: Child[] = []
  let last = 0

  for (const match of code.matchAll(pattern)) {
    const start = match.index ?? 0

    if (start > last) parts.push(code.slice(last, start))

    parts.push(<span class={match[1] ? 'text-accent-text' : 'text-muted'}>{match[0]}</span>)
    last = start + match[0].length
  }

  if (last < code.length) parts.push(code.slice(last))

  return parts
}

// Shows the Copy button, which stays hidden without JavaScript, and copies the text next to it.
// Add it to the page once, in a script tag, however many blocks there are.
export const copyScript = `
document.querySelectorAll('[data-copy]').forEach(function (button) {
  button.hidden = false
  button.addEventListener('click', function () {
    var code = button.closest('[data-code]').querySelector('pre').innerText
    navigator.clipboard.writeText(code).then(function () {
      var label = button.textContent
      button.textContent = 'Copied'
      setTimeout(function () { button.textContent = label }, 1500)
    })
  })
})
`

// A box of text with a Copy button, for something people paste somewhere else.
export function CopyBlock(props: CopyBlockProps) {
  const { code, title, language, wrap, label } = props

  return (
    <div class={['flex flex-col gap-2', props.class ?? ''].filter(Boolean).join(' ')}>
      {title ? <p class="type-overline">{title}</p> : null}

      <div data-code class="overflow-hidden rounded-tile border border-line bg-sunken">
        <div class="flex items-center justify-between border-b border-line px-3 py-1.5">
          <span class="type-hint">{language ?? ''}</span>
          <button
            type="button"
            data-copy
            hidden
            class="cursor-pointer rounded-badge border border-line bg-card px-2.5 py-1 font-sans text-xs font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
          >
            Copy
          </button>
        </div>

        <pre
          tabindex={0}
          role="region"
          aria-label={title ?? label ?? 'Text to copy'}
          class={`type-code p-4 text-ink ${wrap ? 'break-words whitespace-pre-wrap' : 'overflow-x-auto'}`}
        >
          {props.highlight ? highlight(code) : code}
        </pre>
      </div>
    </div>
  )
}
