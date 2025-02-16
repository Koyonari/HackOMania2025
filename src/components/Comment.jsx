export default function Comment({ comment }) {
const { name, timestamp, content } = comment
  return (
    <div className="border-b border-accent-secondary/10 pb-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-mono text-accent-secondary">@{name}</p>
        <p className="text-xs text-accent-secondary">{timestamp}</p>
      </div>
      <p className="mt-2 text-text-primary">{content}</p>
    </div>
  )
}
