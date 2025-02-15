"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Comment from "./Comment";
import { createClient } from "@/utils/supabase/client";



export default function PostDetail({ post }) {
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const subabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, subabaseAnonKey);
  const { title, username, timePosted, content, betPool } = post;

  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [commentCount, setCommentCount] = useState(post?.commentCount || 0);
  const [showBetOptions, setShowBetOptions] = useState(false);
  const [betType, setBetType] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white border border-accent-secondary/10 rounded-lg p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-text-primary">
            Loading post...
          </h1>
        </div>
      </div>
    );
  }

  const predefinedAmounts = [5, 10, 20, 50];

  const handleBetClick = (type) => {
    setBetType(type);
    setShowBetOptions(true);
  };

  const handleAmountSelect = (amount) => {
    // Handle bet placement logic here
    console.log(`Placing ${betType} bet of $${amount}`);
    setShowBetOptions(false);
    setBetType(null);
    setCustomAmount("");
  };

  const totalBets = betPool.believe + betPool.doubt;
  const believerPercentage =
    totalBets > 0 ? (betPool.believe / totalBets) * 100 : 50;
  const separatorColor =
    betPool.believe >= betPool.doubt ? "bg-green-500" : "bg-red-500";

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = "/login";
      return;
    }

    const newComment = {
      username: user.username,
      timePosted: "Just now",
      content: commentText,
      post_id: post.id,
      user_id: user.id,
      created_at: new Date().toISOString(),
    };

    try {
      const { data, error } = await supabase
        .from("comments")
        .insert(newComment)
        .select();

      if (error) throw error;

      // Update local state with new comment
      setComments((prevComments) => [newComment, ...prevComments]);
      setCommentText("");

      // Update comment count
      setCommentCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Post Content */}
      <div className="bg-white border border-accent-secondary/10 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-text-primary">{title}</h1>
        <p className="text-sm text-accent-secondary font-mono mt-2">
          Posted by @{username} • {timePosted}
        </p>
        <p className="mt-4 text-text-primary">{content}</p>

        {/* Betting Stats */}
        <div className="mt-6">
          <div className="relative w-full h-4 bg-red-200 rounded-full overflow-hidden">
            <div
              className={cn("h-full bg-green-400 transition-all duration-300")}
              style={{ width: `${believerPercentage}%` }}
            />
            <div
              className={cn(
                "absolute top-0 left-[50%] w-1 h-full transform -translate-x-1/2",
                separatorColor
              )}
            />
          </div>

          <div className="mt-1 flex justify-between text-sm">
            <span className="text-green-600">Believers</span>
            <span className="text-red-600">Doubters</span>
          </div>

          <div className="mt-1 flex justify-between text-xs font-mono">
            <span className="text-green-600">
              ${betPool.believe.toLocaleString()}
            </span>
            <span className="text-red-600">
              ${betPool.doubt.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Betting Section */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Place Your Bet</h3>
          <div className="flex gap-4">
            <div className="flex-1">
              <button
                onClick={() => handleBetClick("believe")}
                className="w-full py-3 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-mono"
              >
                Believe
              </button>
            </div>
            <div className="flex-1">
              <button
                onClick={() => handleBetClick("doubt")}
                className="w-full py-3 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-mono"
              >
                Doubt
              </button>
            </div>
          </div>
        </div>
        {/* Bet Amount Options */}
        {showBetOptions && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-4 gap-2">
              {predefinedAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={cn(
                    "py-2 px-4 rounded-lg font-mono transition",
                    betType === "believe"
                      ? "bg-green-100 hover:bg-green-200 text-green-700"
                      : "bg-red-100 hover:bg-red-200 text-red-700"
                  )}
                >
                  ${amount}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-accent-secondary/20 font-mono"
              />
              <button
                onClick={() => handleAmountSelect(customAmount)}
                className={cn(
                  "px-4 py-2 rounded-lg font-mono transition",
                  betType === "believe"
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                )}
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Comments Section */}
      <div className="mt-8 bg-white border border-accent-secondary/10 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">
          Comments ({commentCount})
        </h3>

        {/* New Comment Input */}
        <div className="mb-6">
          <textarea
            onChange={(e) => setCommentText(e.target.value)}
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
            <Comment key={index} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}
