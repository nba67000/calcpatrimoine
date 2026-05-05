'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { formatContexteChat, type ContexteChat } from '@/lib/chatContext'

// ---------------------------------------------------------------------------
// Minimal markdown renderer: **bold**, [text](url), newlines
// ---------------------------------------------------------------------------

type InlineNode = string | React.ReactElement

function parseInline(text: string): InlineNode[] {
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

function renderMarkdown(text: string): React.ReactNode {
  const paras = text.split(/\n\n+/)
  return paras.map((para, i) => (
    <p key={i} className={i < paras.length - 1 ? 'mb-2' : undefined}>
      {parseInline(para)}
    </p>
  ))
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type ChatMessage = { role: 'user' | 'assistant'; content: string }

interface Props {
  contexte: ContexteChat
}

// ---------------------------------------------------------------------------
// SVG icons
// ---------------------------------------------------------------------------

function ChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ChatWidget({ contexte }: Props) {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [streamingText, setStreamingText] = useState('')
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [depleted, setDepleted] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 50)
      return () => clearTimeout(t)
    }
  }, [open])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || isStreaming) return

    const updated: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setInput('')
    setError(null)
    setIsStreaming(true)
    setStreamingText('')

    try {
      const contexteTexte = formatContexteChat(contexte)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated,
          contexteTexte,
          slugCalculateur: contexte.calculateur,
        }),
      })

      // Quota épuisé côté serveur
      if (res.status === 402) {
        setDepleted(true)
        return
      }

      if (!res.ok || !res.body) {
        throw new Error(`Erreur ${res.status}`)
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let accumulated = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        // Sentinel quota épuisé en cours de stream
        if (chunk.includes('\x00QUOTA_DEPLETED')) {
          accumulated += chunk.replace('\x00QUOTA_DEPLETED', '')
          setStreamingText(accumulated)
          setDepleted(true)
          break
        }
        accumulated += chunk
        setStreamingText(accumulated)
      }

      if (accumulated) {
        setMessages(prev => [...prev, { role: 'assistant', content: accumulated }])
      }
      setStreamingText('')
    } catch {
      setError('Une erreur est survenue. Vérifiez votre connexion et réessayez.')
    } finally {
      setIsStreaming(false)
    }
  }, [input, isStreaming, messages, contexte])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`
  }

  const hasContent = messages.length > 0 || streamingText.length > 0

  return (
    <>
      {/* Panel */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[72vh] flex flex-col bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden">

          {/* En-tête */}
          <div className="flex items-center justify-between px-4 py-3 bg-primary-800 text-white shrink-0">
            <div>
              <p className="font-semibold text-sm">Assistant CalcPatrimoine</p>
              <p className="text-xs text-primary-300">Questions sur les résultats affichés</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-300 hover:text-white transition-colors w-7 h-7 flex items-center justify-center rounded"
              aria-label="Fermer"
            >
              &#x2715;
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {!hasContent && (
              <p className="text-xs text-neutral-400 text-center italic py-6">
                Posez une question sur les résultats du calculateur.
              </p>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[88%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-primary-700 text-white rounded-br-sm'
                    : 'bg-neutral-100 text-neutral-800 rounded-bl-sm'
                }`}>
                  {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {/* Indicateur de chargement */}
            {isStreaming && !streamingText && (
              <div className="flex justify-start">
                <div className="bg-neutral-100 rounded-xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {/* Réponse en cours de streaming */}
            {streamingText && (
              <div className="flex justify-start">
                <div className="max-w-[88%] bg-neutral-100 text-neutral-800 rounded-xl rounded-bl-sm px-3 py-2 text-sm leading-relaxed">
                  {renderMarkdown(streamingText)}
                  <span className="inline-block w-0.5 h-3.5 bg-primary-600 ml-0.5 align-text-bottom animate-pulse" />
                </div>
              </div>
            )}

            {error && (
              <div className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Zone de saisie ou message quota épuisé */}
          {depleted ? (
            <div className="border-t border-amber-200 bg-amber-50 px-4 py-3 shrink-0">
              <p className="text-xs text-amber-800 text-center leading-relaxed">
                L&apos;assistant est temporairement indisponible.
                <br />
                Les calculateurs restent entièrement accessibles.
              </p>
            </div>
          ) : (
            <>
              <div className="border-t border-neutral-200 px-3 py-2.5 flex gap-2 items-end shrink-0">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Votre question... (Entrée pour envoyer)"
                  rows={1}
                  disabled={isStreaming}
                  className="flex-1 resize-none text-sm border border-neutral-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 disabled:bg-neutral-50 disabled:text-neutral-400 leading-relaxed"
                  style={{ minHeight: '38px', maxHeight: '120px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isStreaming}
                  className="bg-primary-700 text-white rounded-lg p-2.5 hover:bg-primary-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  aria-label="Envoyer"
                >
                  <SendIcon />
                </button>
              </div>
              <p className="text-center text-[10px] text-neutral-400 pb-2 px-4">
                Informations indicatives — pas de conseil personnalisé
              </p>
            </>
          )}
        </div>
      )}

      {/* Bouton flottant */}
      <button
        onClick={() => setOpen(o => !o)}
        className={`fixed bottom-5 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-full shadow-lg px-4 py-2.5 font-medium text-sm transition-all ${
          open
            ? 'bg-neutral-700 text-white hover:bg-neutral-800'
            : 'bg-primary-700 text-white hover:bg-primary-800'
        }`}
        aria-label={open ? "Fermer l'assistant" : "Ouvrir l'assistant"}
      >
        <ChatIcon />
        <span className="hidden sm:inline">{open ? 'Fermer' : 'Question ?'}</span>
      </button>
    </>
  )
}
