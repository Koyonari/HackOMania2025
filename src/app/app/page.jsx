import Link from "next/link";
import { Button } from "@/components/ui/button";
import Post from "@/components/Post";
import { Navbar } from "@/components/Navigation";
import { Search } from "lucide-react";

export default function HomePage() {
  const users = [
    {
      title: "Quitting Drugs",
      username: "Simon Tan",
      timePosted: "2 hours ago",
      content:
        "Day 1 of my journey to quit drugs. Taking it one day at a time.",
      betPool: {
        believe: 1000,
        doubt: 1200,
      },
      commentCount: 15,
    },
    {
      title: "Quitting Smoking",
      username: "Alice Ong",
      timePosted: "5 hours ago",
      content:
        "Two weeks smoke-free! The community support has been incredible.",
      betPool: {
        believe: 1000,
        doubt: 1200,
      },
      commentCount: 32,
    },
    {
      title: "Quitting Drinking",
      username: "Mary Tay",
      timePosted: "1 day ago",
      content: "Starting my sobriety journey. Looking forward to the support.",
      betPool: {
        believe: 1000,
        doubt: 1200,
      },
      commentCount: 27,
    },
  ];

  return (
    <main className="min-h-screen mx-auto bg-bg-primary">
      <Navbar />

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
            {users.map((post, index) => (
              <Post key={index} user={post} />
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-80 space-y-4">
            {/* Create Post Button - Now at the top of sidebar */}
            <Button className="w-full bg-brand-primary hover:bg-brand-primary/90 py-6 text-lg">
              Create Post
            </Button>

            <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 text-brand-primary">
                Community Stats
              </h2>
              <div className="text-lg space-y-2 text-text-primary">
                <p>👥 1,200 Members</p>
                <p>🎯 491 Active Posts</p>
                <p>💰 $89,420 Total Bets</p>
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
