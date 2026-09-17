import React, { useEffect, useRef, useState } from 'react'
import { listening } from './data/listening'

export default function App() {
  const [playingId, setPlayingId] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const stopCurrentAudio = () => {
    const currentAudio = audioRef.current
    if (!currentAudio) return

    currentAudio.pause()
    currentAudio.currentTime = 0
    audioRef.current = null
  }

  useEffect(() => {
    return () => {
      stopCurrentAudio()
    }
  }, [])

  const togglePlay = (item: typeof listening[number]) => {
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

    const handleEnded = () => {
      if (audioRef.current === audio) {
        audioRef.current = null
      }
      setPlayingId((prev) => (prev === item.id ? null : prev))
    }

    const handleError = () => {
      if (audioRef.current === audio) {
        audioRef.current = null
      }
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
        audio.removeEventListener('ended', handleEnded)
        audio.removeEventListener('error', handleError)
        if (audioRef.current === audio) {
          audioRef.current = null
        }
        setPlayingId((prev) => (prev === item.id ? null : prev))
      })
  }

  return (
    <div className="app">
      <header className="header">
        <h1>日语学习软件 — 桌面版</h1>
        <p className="subtitle">最小可运行示例：听力 + 词汇入口</p>
      </header>

      <main>
        <section>
          <h2>听力示例</h2>
          <ul>
            {listening.map((it) => (
              <li key={it.id} className="item">
                <div>
                  <strong>{it.title}</strong>
                  <p className="transcript">{it.transcript}</p>
                </div>
                <div>
                  <button onClick={() => togglePlay(it)}>
                    {playingId === it.id ? '停止' : '播放'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">Built with Electron + Vite + React</footer>
    </div>
  )
}
