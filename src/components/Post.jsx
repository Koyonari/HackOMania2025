export default function Post({ user }) {
    const {
      title,
      username,
      timePosted,
      content,
      betPool,
      commentCount
    } = user
  
    return (
      <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm">
        <div className="flex gap-4">
          <div className="flex flex-col items-center font-mono">
    
          </div>
          
          <div className="flex-grow">
            <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
            <p className="text-sm text-accent-secondary font-mono">Posted by @{username} • {timePosted}</p>
            <p className="mt-2 text-text-primary">{content} Community bet pool: ${betPool}</p>
            <div className="mt-4 flex gap-4 text-sm text-accent-secondary">
              <button className="hover:text-accent-primary transition">💬 {commentCount} Comments</button>
              <button className="hover:text-accent-primary transition">🎲 Place Bet</button>
              <button className="hover:text-accent-primary transition">📤 Share</button>
            </div>
          </div>
        </div>
      </div>
    )
  }