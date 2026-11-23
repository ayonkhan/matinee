import { CopyBlock, copyScript } from '../src'
import { highlight } from '../src/components/copy-block'

// Docs only. It is the kit's CopyBlock with the colouring on and a tsx label.
export { copyScript, highlight }

export function CodeBlock(props: { code: string; title?: string; language?: string }) {
  const { code, title, language = 'tsx' } = props

  return <CopyBlock code={code} title={title} language={language} label="Code example" highlight />
}
