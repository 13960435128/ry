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
  onToggle: (item: ListeningItemData) => void
}

const ListeningItem = memo(function ListeningItem({ item, isPlaying, onToggle }: ListeningItemProps) {
  return (
    <li className="item">
      <div>
        <strong>{item.title}</strong>
        <p className="transcript">{item.transcript}</p>
      </div>
      <div>
        <button onClick={() => onToggle(item)} aria-label={isPlaying ? `停止播放 ${item.title}` : `播放 ${item.title}`}>
          {isPlaying ? '停止' : '播放'}
        </button>
      </div>
    </li>
  )
})

export default ListeningItem
