import type { Child } from 'hono/jsx'

// Docs only. It is not part of the kit, so nobody who installs Matinee gets it.

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

// Shows the Copy button, which stays hidden without JavaScript, and copies the code next to it.
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

export function CodeBlock(props: { code: string; title?: string }) {
  const { code, title } = props

  return (
    <div class="flex flex-col gap-2">
      {title ? <p class="type-overline">{title}</p> : null}

      <div data-code class="overflow-hidden rounded-tile border border-line bg-sunken">
        <div class="flex items-center justify-between border-b border-line px-3 py-1.5">
          <span class="type-hint">tsx</span>
          <button
            type="button"
            data-copy
            hidden
            class="cursor-pointer rounded-badge border border-line bg-card px-2.5 py-1 font-sans text-xs font-medium text-ink hover:bg-raised focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
          >
            Copy
          </button>
        </div>

        <pre tabindex={0} role="region" aria-label={title ?? 'Code example'} class="type-code overflow-x-auto p-4 text-ink">
          {highlight(code)}
        </pre>
      </div>
    </div>
  )
}
