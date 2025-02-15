'use client'

import { cn } from '@/lib/utils'

export default function PostDetail({ post }) {
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white border border-accent-secondary/10 rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-text-primary">Loading post...</h1>
        </div>
      </div>
    )
  }

  const {
    title,
    username,
    timePosted,
    content,
    betPool,
    commentCount,
    comments = []
  } = post

  const totalBets = betPool.believe + betPool.doubt
  const believerPercentage = totalBets > 0 ? (betPool.believe / totalBets) * 100 : 50
  const separatorColor = betPool.believe >= betPool.doubt ? 'bg-green-500' : 'bg-red-500'

  const handleBelieveBet = () => {
    // Add bet handling logic
  }

  const handleDoubtBet = () => {
    // Add bet handling logic
  }

  const handleCommentSubmit = () => {
    // Add comment submission logic
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Post Content */}
      <div className="bg-white border border-accent-secondary/10 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
        <p className="text-sm text-accent-secondary font-mono mt-2">Posted by @{username} • {timePosted}</p>
        <p className="mt-4 text-text-primary">{content}</p>

        {/* Betting Stats */}
        <div className="mt-6">
          <div className="relative w-full h-4 bg-red-200 rounded-full overflow-hidden">
            <div 
              className={cn(
                "h-full bg-green-400 transition-all duration-300"
              )}
              style={{ width: `${believerPercentage}%` }}
            />
            <div className={cn(
              "absolute top-0 left-[50%] w-1 h-full transform -translate-x-1/2",
              separatorColor
            )} />
          </div>
          
          <div className="mt-1 flex justify-between text-sm">
            <span className="text-green-600">Believers</span>
            <span className="text-red-600">Doubters</span>
          </div>

          <div className="mt-1 flex justify-between text-xs font-mono">
            <span className="text-green-600">${betPool.believe.toLocaleString()}</span>
            <span className="text-red-600">${betPool.doubt.toLocaleString()}</span>
          </div>
        </div>

        {/* Betting Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Place Your Bet</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <button 
                onClick={handleBelieveBet}
                className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-mono"
              >
                Believe
              </button>
            </div>
            <div className="flex-1">
              <button 
                onClick={handleDoubtBet}
                className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-mono"
              >
                Doubt
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-8 bg-white border border-accent-secondary/10 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Comments ({commentCount})</h3>
        
        {/* New Comment Input */}
        <div className="mb-6">
          <textarea 
            className="w-full p-3 border border-accent-secondary/20 rounded-lg font-mono resize-none focus:outline-none focus:ring-2 focus:ring-accent-primary"
            placeholder="Add a comment..."
            rows="3"
          />
          <button 
            onClick={handleCommentSubmit}
            className="mt-2 px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-primary/90 transition"
          >
            Post Comment
          </button>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-accent-secondary/10 pb-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-mono text-accent-secondary">@{comment.username}</p>
                <p className="text-xs text-accent-secondary">{comment.timePosted}</p>
              </div>
              <p className="mt-2 text-text-primary">{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
  