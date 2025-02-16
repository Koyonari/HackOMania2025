"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Comment from "./Comment";
import { createClient } from "@/utils/supabase/client";

export default function PostDetail({ post }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // State for the authenticated user (fetched asynchronously)
  const [user, setUser] = useState(null);
  // Bets, comments and other UI state
  const [bets, setBets] = useState(post.bets || []);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post?.comments || []);
  const [commentCount, setCommentCount] = useState(
    post?.commentCount || (post?.comments ? post.comments.length : 0)
  );
  const [showBetOptions, setShowBetOptions] = useState(false);
  const [betType, setBetType] = useState(null); // "believe" or "doubt"
  const [customAmount, setCustomAmount] = useState("");

  // Fetch the authenticated user once the component mounts.
  useEffect(() => {
    async function fetchUser() {
      const { data: authData, error } = await supabase.auth.getUser();
      if (!error && authData.user) {
        setUser(authData.user);
      }
    }
    fetchUser();
  }, [supabase]);

  // Compute totals based on bets using the Bets table structure
  const believeTotal = bets.reduce(
    (sum, bet) => (bet.choice ? sum + bet.amount : sum),
    0
  );
  const doubtTotal = bets.reduce(
    (sum, bet) => (!bet.choice ? sum + bet.amount : sum),
    0
  );
  const totalBets = believeTotal + doubtTotal;
  const believerPercentage =
    totalBets > 0 ? (believeTotal / totalBets) * 100 : 50;
  const separatorColor =
    believeTotal >= doubtTotal ? "bg-green-500" : "bg-red-500";

  // Predefined bet amounts
  const predefinedAmounts = [5, 10, 20, 50];

  const handleBetClick = (type) => {
    setBetType(type);
    setShowBetOptions(true);
  };

  // Place a bet by inserting a row into the Bets table.
  const handleAmountSelect = async (amount) => {
    if (!betType) return;

    const { data: authData, error: userError } = await supabase.auth.getUser();
    if (userError || !authData.user) {
      window.location.href = "/login";
      return;
    }
    const choice = betType === "believe"; // true for believe, false for doubt
    const betAmount = Number(amount);
    try {
      const { error } = await supabase.from("bets").insert({
        user_id: authData.user.id,
        post_id: post.id,
        choice,
        amount: betAmount,
      });
      if (error) {
        console.error("Error placing bet:", error.message);
      } else {
        console.log(`Placed ${betType} bet of $${betAmount}`);
        // Update local bets state if needed
        setBets((prevBets) => [...prevBets, { choice, amount: betAmount }]);
      }
    } catch (err) {
      console.error(err);
    }
    setShowBetOptions(false);
    setBetType(null);
    setCustomAmount("");
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;

    const { data: authData, error: userError } = await supabase.auth.getUser();
    if (userError || !authData.user) {
      window.location.href = "/login";
      return;
    }

    const newComment = {
      user_id: authData.user.id,
      post_id: post.id,
      content: commentText,
      timestamp: new Date().toISOString(),
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
      setCommentCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Main Post Content */}
      <div className="bg-white border border-accent-secondary/10 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-text-primary">{post.title}</h1>
        <p className="text-sm text-accent-secondary font-mono mt-2">
          Posted by @{user ? user.user_metadata.full_name : post.username} •{" "}
          {post.timePosted}
        </p>
        <p className="mt-4 text-text-primary">{post.caption}</p>

        {/* Betting Stats */}
        <div className="mt-6">
          <div className="relative w-full h-4 bg-red-200 rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all duration-300", "bg-green-400")}
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
              ${believeTotal.toLocaleString()}
            </span>
            <span className="text-red-600">
              ${doubtTotal.toLocaleString()}
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
        <div className="mb-6">
          <textarea
            value={commentText}
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
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <Comment key={index} comment={comment}/>
          ))}
        </div>
      </div>
    </div>
  );
}
