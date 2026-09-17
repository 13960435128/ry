import React, { useCallback } from 'react'
import ListeningItem, { type ListeningItemData } from './components/ListeningItem'
import { listening } from './data/listening'
import { useAudioPlayer } from './hooks/useAudioPlayer'

export default function App() {
  const { playingId, togglePlay } = useAudioPlayer()

  const handleToggle = useCallback(
    (item: ListeningItemData) => {
      togglePlay(item)
    },
    [togglePlay]
  )

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
              <ListeningItem
                key={it.id}
                item={it}
                isPlaying={playingId === it.id}
                onToggle={handleToggle}
              />
            ))}
          </ul>
        </section>
      </main>

      <footer className="footer">Built with Electron + Vite + React</footer>
    </div>
  )
}
