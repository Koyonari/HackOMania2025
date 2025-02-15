export default function Post({ user }) {
  const { title, username, timePosted, content, betPool, commentCount } = user;

  // Calculate percentages for the heat bar
  const totalBets = betPool.believe + betPool.doubt;
  const believerPercentage = (betPool.believe / totalBets) * 100;
  const separatorColor =
    betPool.believe >= betPool.doubt ? "bg-green-500" : "bg-red-500";

  return (
    <div className="bg-white border border-accent-secondary/10 rounded-lg p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="flex-grow px-2">
          <h2 className="text-3xl font-semibold text-text-primary">{title}</h2>
          <p className="text-lg py-1 text-accent-secondary">
            Posted by @{username} • {timePosted}
          </p>
          <p className="text-xl mt-2 text-text-primary">{content}</p>
          <p>Community total bet pool: ${totalBets}</p>
          {/* Heat Bar */}

          <div className="my-4 w-full h-4 bg-red-400 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-600 transition-all duration-300"
              style={{ width: `${believerPercentage}%` }}
            />
          </div>

          {/* Legend */}
          <div className="mt-1 flex justify-between text-md">
            <span className="text-green-600">Believers</span>
            <span className="text-red-600">Doubters</span>
          </div>

          {/* Bet Totals */}
          <div className="mt-1 flex justify-between text-md">
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
              🎲 Place Bet
            </button>
            <button className="hover:text-accent-primary transition">
              📤 Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
