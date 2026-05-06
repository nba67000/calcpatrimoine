// src/lib/markdownParser.tsx
// Minimal markdown renderer: **bold**, [text](url), newlines, paragraphs.
// Used by ChatWidget to render assistant messages.

import React from 'react'

type InlineNode = string | React.ReactElement

export function parseInline(text: string): InlineNode[] {
  const regex = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)|\n/g
  const nodes: InlineNode[] = []
  let last = 0
  let key = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index))
    if (m[0] === '\n') {
      nodes.push(<br key={key++} />)
    } else if (m[0].startsWith('**')) {
      nodes.push(<strong key={key++}>{m[1]}</strong>)
    } else {
      nodes.push(
        <a key={key++} href={m[3]} target="_blank" rel="noopener noreferrer"
           className="text-primary-600 underline hover:text-primary-800">
          {m[2]}
        </a>
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return nodes
}

export function renderMarkdown(text: string): React.ReactNode {
  const paras = text.split(/\n\n+/)
  return paras.map((para, i) => (
    <p key={i} className={i < paras.length - 1 ? 'mb-2' : undefined}>
      {parseInline(para)}
    </p>
  ))
}
