import { useCallback, useEffect, useRef, useState } from 'react'
import type { ListeningItemData } from '../components/ListeningItem'

export function useAudioPlayer() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const stopCurrentAudio = useCallback(() => {
    const currentAudio = audioRef.current
    if (!currentAudio) return

    currentAudio.pause()
    currentAudio.currentTime = 0
    audioRef.current = null
  }, [])

  useEffect(() => {
    return () => {
      stopCurrentAudio()
    }
  }, [stopCurrentAudio])

  const togglePlay = useCallback(
    (item: ListeningItemData) => {
      const currentAudio = audioRef.current

      if (playingId === item.id && currentAudio) {
        stopCurrentAudio()
        setPlayingId(null)
        return
      }

      if (currentAudio) {
        currentAudio.pause()
        currentAudio.currentTime = 0
      }

      const audio = new Audio(item.audio)
      audioRef.current = audio

      const cleanup = () => {
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)

        if (audioRef.current === audio) {
          audioRef.current = null
        }
      }

      const handleEnded = () => {
        cleanup()
        setPlayingId((prev) => (prev === item.id ? null : prev))
      }

      const handleError = () => {
        cleanup()
        setPlayingId((prev) => (prev === item.id ? null : prev))
      }

      audio.addEventListener('ended', handleEnded)
      audio.addEventListener('error', handleError)

      audio
        .play()
        .then(() => {
          setPlayingId(item.id)
        })
        .catch(() => {
          cleanup()
          setPlayingId((prev) => (prev === item.id ? null : prev))
        })
    },
    [playingId, stopCurrentAudio]
  )

  return {
    playingId,
    togglePlay,
    stopCurrentAudio,
  }
}
