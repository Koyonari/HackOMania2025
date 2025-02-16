"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Post from "@/components/Post";
import { Navbar } from "@/components/Navigation";
import { Search } from "lucide-react";
import { redirect } from 'next/navigation';
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default function HomePage() {
  const [stats, setStats] = useState({
    userCount: 0,
    postCount: 0,
    betTotal: 0,
  });

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      // Query the total number of users (members)
      const { count: userCount, error: userError } = await supabase
        .from("users")
        .select("*", { count: "exact", head: true });
      if (userError) {
        console.error("Error fetching user count:", userError);
      }
      // Query the total number of posts (active challenges)
      const { count: postCount, error: postError } = await supabase
        .from("posts")
        .select("*", { count: "exact", head: true });
      if (postError) {
        console.error("Error fetching post count:", postError);
      }

      // Query all bets and sum their bet_amount field
      const { data: betsData, error: betsError } = await supabase
        .from("bets")
        .select("amount");
      let betTotal = 0;
      if (betsError) {
        console.error("Error fetching bets:", betsError);
      } else if (betsData) {
        // Sum up the bet_amounts (assuming bet_amount is numeric)
        betTotal = betsData.reduce((sum, row) => sum + row.amount, 0);
      }

      setStats({
        userCount: userCount || 0,
        postCount: postCount || 0,
        betTotal: betTotal || 0,
      });

      // Query posts with associated user data, bets, and comments
      const { data: postsWithDetails, error } = await supabase
      .from("posts")
      .select(`
        *,
        users:user_id (name),
        bets (
          choice,
          amount
        ),
        comments (id)
      `);

      if (error) {
      console.error("Error fetching posts:", error);
      return;
      }

      // Transform the data into the desired format
      const formattedPosts = postsWithDetails.map(post => {
      // Calculate bet pools
      const betPool = {
        believe: 0,
        doubt: 0
      };

      post.bets.forEach(bet => {
        if (bet.choice === true) {
          betPool.believe += bet.amount;
        } else {
          betPool.doubt += bet.amount;
        }
      });

      // Calculate time difference for "timePosted"
      const postDate = new Date(post.reveal_datetime);
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

      setPosts(prevPosts => [
        ...prevPosts, 
        { 
          id: post.id,
          title: post.title, 
          username: post.users.name, 
          timePosted: timePosted, 
          content: post.caption, 
          betPool: betPool, 
          commentCount: post.comments.length 
        }
      ]);
      console.log(posts)
      });
    }
    fetchStats();
  }, []);

  // const users = [
  //   {
  //     title: "Quitting Drugs",
  //     username: "Simon Tan",
  //     timePosted: "2 hours ago",
  //     content:
  //       "Day 1 of my journey to quit drugs. Taking it one day at a time.",
  //     betPool: {
  //       believe: 1000,
  //       doubt: 1200,
  //     },
  //     commentCount: 15,
  //   },
  //   {
  //     title: "Quitting Smoking",
  //     username: "Alice Ong",
  //     timePosted: "5 hours ago",
  //     content:
  //       "Two weeks smoke-free! The community support has been incredible.",
  //     betPool: {
  //       believe: 1000,
  //       doubt: 1200,
  //     },
  //     commentCount: 32,
  //   },
  //   {
  //     title: "Quitting Drinking",
  //     username: "Mary Tay",
  //     timePosted: "1 day ago",
  //     content: "Starting my sobriety journey. Looking forward to the support.",
  //     betPool: {
  //       believe: 1000,
  //       doubt: 1200,
  //     },
  //     commentCount: 27,
  //   },
  // ];

  return (
    <main className="min-h-screen mx-auto bg-bg-primary">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header section with search */}
        <div className="pt-24 pb-4">
          <div className="relative w-full max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-accent-secondary" />
            </div>
            <input
              type="search"
              placeholder="Search for posts"
              className="pl-10 pr-4 py-2 bg-white border h-[6vh] border-accent-secondary/20 rounded-full w-full text-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-6 pb-4">
          {/* Posts Feed */}
          <div className="flex-grow space-y-4">
            {posts.map((post, index) => (
              <Post key={index} user={post} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-4">
            {/* Create Post Button - Now at the top of sidebar */}
            <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 py-6 text-lg font-bold" onClick={() => redirect('/app/post')}>
              Create Post
            </Button>

            <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-brand-primary">
                Community Stats
              </h2>
              <div className="text-lg space-y-2 text-text-primary">
                <p>👥 {stats.userCount.toLocaleString()} Members</p>
                <p>🎯 {stats.postCount.toLocaleString()} Active Posts</p>
                <p>💰 ${stats.betTotal.toLocaleString()} Total Bets</p>
              </div>
            </div>

            <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-brand-primary">
                Top Categories
              </h2>
              <div className="text-lg space-y-2">
                <Link
                  href="#"
                  className="block text-accent-secondary hover:text-accent-primary transition"
                >
                  🚬 Smoking
                </Link>
                <Link
                  href="#"
                  className="block text-accent-secondary hover:text-accent-primary transition"
                >
                  🍺 Alcohol
                </Link>
                <Link
                  href="#"
                  className="block text-accent-secondary hover:text-accent-primary transition"
                >
                  💊 Drugs
                </Link>
                <Link
                  href="#"
                  className="block text-accent-secondary hover:text-accent-primary transition"
                >
                  📱 Social Media
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
