
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Post({ user }) {
  
  const { id, title, username, timePosted, content, betPool, commentCount } = user;

  const totalBets = betPool.believe + betPool.doubt;
  const believerPercentage = (betPool.believe / totalBets) * 100;

  // Hover animation variants
  const hoverVariants = {
    initial: {
      scale: 1,
      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      y: 0,
    },
    hover: {
      scale: 1.01,
      boxShadow: "0 8px 16px -4px rgb(0 0 0 / 0.1)",
      y: -1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <Link href={`/app/posts/${id}`}>
    <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm cursor-pointer">

    <motion.div
      className="bg-white border border-accent-secondary/10 rounded-lg p-4 hover:border-2 hover:border-brand-primary transition-all duration-300"
      initial="initial"
      whileHover="hover"
      variants={hoverVariants}
    >

      <div className="flex gap-4">
        <div className="flex-grow px-2">
          <h2 className="text-3xl font-semibold text-text-primary">{title}</h2>
          <p className="text-lg py-1 text-accent-secondary">
            Posted by @{username} • {timePosted}
          </p>
          <p className="text-xl mt-2 text-text-primary">{content}</p>
          <p>Community total bet pool: ${totalBets}</p>

          <div className="my-4 w-full h-4 bg-red-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${believerPercentage}%` }}
            />
          </div>

          <div className="mt-1 flex justify-between text-md font-bold">
            <span className="text-green-600">Believers</span>
            <span className="text-red-600">Doubters</span>
          </div>

          <div className="mt-1 flex justify-between text-md font-bold">
            <span className="text-green-600">
              ${betPool.believe.toLocaleString()}
            </span>
            <span className="text-red-600">
              ${betPool.doubt.toLocaleString()}
            </span>
          </div>

          <div className="mt-4 flex gap-4 text-sm text-accent-secondary">
            <button className="hover:text-accent-primary transition">
              💬 {commentCount} Comments
            </button>
            <button className="hover:text-accent-primary transition">
              📤 Share
            </button>
          </div>
        </div>
      </div>

    </div>
    </Link> 

    </motion.div>

  );
}
