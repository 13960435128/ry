import React, { memo } from 'react'

export type ListeningItemData = {
  id: number
  title: string
  audio: string
  transcript: string
}

type ListeningItemProps = {
  item: ListeningItemData
  isPlaying: boolean
  isLoading: boolean
  hasError: boolean
  onToggle: (item: ListeningItemData) => void
}

const ListeningItem = memo(function ListeningItem({
  item,
  isPlaying,
  isLoading,
  hasError,
  onToggle,
}: ListeningItemProps) {
  const label = isLoading ? '正在加载' : hasError ? '播放失败' : isPlaying ? '停止' : '播放'

  return (
    <li className="item">
      <div>
        <strong>{item.title}</strong>
        <p className="transcript">{item.transcript}</p>
        {hasError ? <p className="status error">音频加载失败，请稍后重试</p> : null}
      </div>
      <div>
        <button
          className={`item-button ${isPlaying ? 'playing' : ''} ${isLoading ? 'loading' : ''} ${hasError ? 'error' : ''}`}
          onClick={() => onToggle(item)}
          disabled={isLoading}
          aria-label={isPlaying ? `停止播放 ${item.title}` : `播放 ${item.title}`}
        >
          {label}
        </button>
      </div>
    </li>
  )
})

export default ListeningItem
