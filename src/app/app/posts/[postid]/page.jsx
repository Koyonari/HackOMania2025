import { createClient } from "@/utils/supabase/server";
import PostDetails from '@/components/PostDetails'

export default async function PostPage({ params }) {
  const { postId } = params;
  const supabase = await createClient();

  // Fetch post data
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

  // Fetch comments for this post
  const { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId);

  // Fetch betting data
  const { data: bets, error: betsError } = await supabase
    .from('bets')
    .select('*')
    .eq('post_id', postId);

  const postData = {
    ...post,
    comments,
    bets
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PostDetails post={postData} />
    </div>
  );
}
  /* const post = {
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
      },
      {
        username: "Sigmaballs",
        timePosted: "60m ago",
        content: "Just increased my belief bet. You got this!"  
      },
      {
        username: "Icecreameater",
        timePosted: "90m ago",
        content: "Just increased my belief bet. You got this!"  
      }
    ]
  }

  return <PostDetail post={post} /> */
