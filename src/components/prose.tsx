import type { PropsWithChildren } from 'hono/jsx'

export type ProseProps = PropsWithChildren<{
  as?: 'div' | 'article' | 'section'
  class?: string
}>

// Styles for plain headings, paragraphs, lists and links, so long text needs no classes of its own.
const styles = [
  'flex max-w-2xl flex-col gap-4 font-sans text-base leading-relaxed text-ink-soft',
  '[&_h1]:type-display [&_h1]:text-ink',
  '[&_h2]:type-heading [&_h2]:mt-4 [&_h2]:text-ink',
  '[&_h3]:type-label [&_h3]:mt-2 [&_h3]:text-ink',
  '[&_a]:text-accent-text [&_a]:underline',
  '[&_strong]:font-semibold [&_strong]:text-ink',
  '[&_ul]:list-disc [&_ul]:pl-6',
  '[&_ol]:list-decimal [&_ol]:pl-6',
  '[&_li]:mt-1',
  '[&_blockquote]:border-l-2 [&_blockquote]:border-line-strong [&_blockquote]:pl-4',
  '[&_code]:type-code [&_code]:text-ink',
  '[&_hr]:border-line',
].join(' ')

// A wrapper for long text such as terms, a privacy policy or an article.
export function Prose(props: ProseProps) {
  const { as: Tag = 'div', children } = props

  return <Tag class={[styles, props.class ?? ''].filter(Boolean).join(' ')}>{children}</Tag>
}
