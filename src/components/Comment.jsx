export default function Comment({ comment }) {
const { username, timePosted, content } = comment
  return (
    <div className="border-b border-accent-secondary/10 pb-4">
      <div className="flex justify-between items-center">
        <p className="text-sm font-mono text-accent-secondary">@{username}</p>
        <p className="text-xs text-accent-secondary">{timePosted}</p>
      </div>
      <p className="mt-2 text-text-primary">{content}</p>
    </div>
  )
}
