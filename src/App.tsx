import React, { useState } from 'react'
import { listening } from './data/listening'

export default function App() {
  const [playingId, setPlayingId] = useState<number | null>(null)

  const togglePlay = (item: typeof listening[number]) => {
    if (playingId === item.id) {
      // stop by creating a blank audio (simple approach)
      setPlayingId(null)
      return
    }
    const audio = new Audio(item.audio)
    audio.play()
    setPlayingId(item.id)
    // stop playing state after the audio ends
    audio.addEventListener('ended', () => setPlayingId(null))
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
