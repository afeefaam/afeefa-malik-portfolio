import { useEffect, useState } from 'react'

interface UseTypewriterOptions {
  phrases: string[]
  /** When false, skips all timers and returns the first phrase fully typed. */
  enabled?: boolean
  typingSpeedMs?: number
  deletingSpeedMs?: number
  /** How long to hold a fully-typed phrase before deleting it. */
  pauseMs?: number
}

/** Types, holds, and deletes each phrase in turn, looping forever. */
export function useTypewriter({
  phrases,
  enabled = true,
  typingSpeedMs = 55,
  deletingSpeedMs = 30,
  pauseMs = 1700,
}: UseTypewriterOptions): string {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charCount, setCharCount] = useState(enabled ? 0 : phrases[0].length)
  const [phase, setPhase] = useState<'typing' | 'deleting'>('typing')

  useEffect(() => {
    if (!enabled) return

    const currentPhrase = phrases[phraseIndex % phrases.length]

    if (phase === 'typing') {
      if (charCount < currentPhrase.length) {
        const timeout = setTimeout(() => setCharCount((c) => c + 1), typingSpeedMs)
        return () => clearTimeout(timeout)
      }
      const timeout = setTimeout(() => setPhase('deleting'), pauseMs)
      return () => clearTimeout(timeout)
    }

    // phase === 'deleting'
    if (charCount > 0) {
      const timeout = setTimeout(() => setCharCount((c) => c - 1), deletingSpeedMs)
      return () => clearTimeout(timeout)
    }
    setPhase('typing')
    setPhraseIndex((i) => (i + 1) % phrases.length)
  }, [enabled, phase, charCount, phraseIndex, phrases, typingSpeedMs, deletingSpeedMs, pauseMs])

  return enabled ? phrases[phraseIndex % phrases.length].slice(0, charCount) : phrases[0]
}
