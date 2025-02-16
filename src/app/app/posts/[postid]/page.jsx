import { createClient } from "@/utils/supabase/server";
import PostDetail from '@/components/PostDetail'

export default async function PostPage({ params }) {
  const { postid } = await params;
  const supabase = await createClient();
  // Fetch post data
  const { data: post, error: postError } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postid)
    .single();
  // Fetch comments for this post
  let { data: comments, error: commentsError } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postid);
  if (commentsError){console.error("Error fetching comments:", commentsError)}
  let enrichedComments = [];
  if (comments && comments.length > 0) {
    // Collect unique user IDs from the comments
    const userIds = Array.from(new Set(comments.map((comment) => comment.user_id)));
    
    // Fetch user details (only id and name) for these user IDs
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, name")
      .in("id", userIds);

    if (usersError) {
      console.error("Error fetching users:", usersError);
    }

    // Merge the user name into each comment
    enrichedComments = comments.map((comment) => {
      const user = users?.find((u) => u.id === comment.user_id);
      return {
        ...comment,
        username: user ? user.name : "Unknown",
      };
    });
  }

  comments = enrichedComments;
  const { data: bets, error: betsError } = await supabase
    .from('bets')
    .select('*')
    .eq('post_id', postid);
  const postData = {
    post,
    comments,
    bets
  };
  // In your PostPage server component
  
  return (
    <div className="container mx-auto px-4 py-8">
      <PostDetail post={postData} />
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
