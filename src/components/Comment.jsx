export default function Comment({ comment }) {
const { username, timestamp, content } = comment
  // Calculate time difference for "timePosted"
  const postDate = new Date(timestamp);
  const now = new Date();
  const diffMs = now - postDate;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  let timePosted;

  if (diffHours < 1) {
    timePosted = "Just now";
  } else if (diffHours < 24) {
    timePosted = `${diffHours} hours ago`;
  } else {
    const diffDays = Math.floor(diffHours / 24);
    timePosted = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  }

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
