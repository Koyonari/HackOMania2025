import PostDetail from '@/components/PostDetail'

export default async function PostPage() {
  // Example data - replace with your actual data fetching
  const post = {
    title: "30 Days No Smoking Challenge",
    username: "QuitterWinner",
    timePosted: "2h ago",
    content: "Day 15 update: Still going strong! Random check scheduled for tomorrow.",
    betPool: {
      believe: 2500,
      doubt: 1800
    },
    commentCount: 24,
    comments: [
      {
        username: "SupporterOne",
        timePosted: "1h ago",
        content: "Keep it up! The odds are in your favor!"
      },
      {
        username: "BetMaster",
        timePosted: "30m ago",
        content: "Just increased my belief bet. You got this!"
      }
    ]
  }

  return <PostDetail post={post} />
}
  