import { useCallback, useEffect, useRef, useState } from 'react'
import type { ListeningItemData } from '../components/ListeningItem'

export function useAudioPlayer() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [loadingId, setLoadingId] = useState<number | null>(null)
  const [errorId, setErrorId] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const preloadCache = useRef<Map<string, HTMLAudioElement>>(new Map())

  const stopCurrentAudio = useCallback(() => {
    const currentAudio = audioRef.current
    if (!currentAudio) return

    currentAudio.pause()
    currentAudio.currentTime = 0
    audioRef.current = null
  }, [])

  const preloadAudio = useCallback((src: string) => {
    if (preloadCache.current.has(src)) return preloadCache.current.get(src)!

    const audio = new Audio(src)
    audio.preload = 'auto'
    audio.load()
    preloadCache.current.set(src, audio)
    return audio
  }, [])

  useEffect(() => {
    return () => {
      stopCurrentAudio()
      preloadCache.current.forEach((audio) => {
        audio.pause()
        audio.src = ''
      })
      preloadCache.current.clear()
    }
  }, [stopCurrentAudio])

  const togglePlay = useCallback(
    (item: ListeningItemData) => {
      const currentAudio = audioRef.current

      if (playingId === item.id && currentAudio) {
        stopCurrentAudio()
        setPlayingId(null)
        setLoadingId(null)
        setErrorId(null)
        return
      }

      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }

      const cachedAudio = preloadCache.current.get(item.audio) ?? preloadAudio(item.audio)
      const audio = cachedAudio.cloneNode() as HTMLAudioElement
      audioRef.current = audio
      setLoadingId(item.id)
      setErrorId(null)

      const cleanup = () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)

        if (audioRef.current === audio) {
          audioRef.current = null
        }
      }

      const handleEnded = () => {
        cleanup()
        setLoadingId((prev) => (prev === item.id ? null : prev))
        setPlayingId((prev) => (prev === item.id ? null : prev))
      }

      const handleError = () => {
        cleanup()
        setLoadingId((prev) => (prev === item.id ? null : prev))
        setErrorId(item.id)
        setPlayingId((prev) => (prev === item.id ? null : prev))
      }

      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)

      audio
        .play()
        .then(() => {
          setLoadingId((prev) => (prev === item.id ? null : prev))
          setPlayingId(item.id)
        })
        .catch(() => {
          cleanup()
          setLoadingId((prev) => (prev === item.id ? null : prev))
          setErrorId(item.id)
          setPlayingId((prev) => (prev === item.id ? null : prev))
        })
    },
    [playingId, preloadAudio, stopCurrentAudio]
  )

  return {
    playingId,
    loadingId,
    errorId,
    togglePlay,
    stopCurrentAudio,
    preloadAudio,
  }
}
