import { Vote, Loader2 } from "lucide-react";

export function VotingControl({
  votingOpen,
  voteCounts,
  votesList,
  totalVotes,
  togglingVoting,
  handleToggleVoting,
  mysteryData,
}) {
  const voteTargets = mysteryData.accusationTargets || mysteryData.characters;

  return (
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl p-8 mb-6 shadow-xl">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 justify-center">
        🗳️ Voting Control
      </h2>

      {!votingOpen ? (
        <div className="text-center">
          <p className="text-amber-200 text-lg mb-6">
            When you're ready, open voting so players can choose who they think
            the killer is.
          </p>
          <button
            onClick={() => handleToggleVoting(true)}
            disabled={togglingVoting}
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-3 mx-auto shadow-xl hover:scale-[1.02]"
          >
            {togglingVoting ? (
              <Loader2
                className="w-6 h-6"
                style={{ animation: "spin 1s linear infinite" }}
              />
            ) : (
              <Vote className="w-6 h-6" />
            )}
            Open Voting
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="bg-green-500 w-3 h-3 rounded-full"
                style={{ animation: "pulse-dot 2s infinite" }}
              />
              <span className="text-green-300 font-bold text-lg">
                Voting is LIVE
              </span>
            </div>
            <button
              onClick={() => handleToggleVoting(false)}
              disabled={togglingVoting}
              className="bg-red-600/30 hover:bg-red-600/50 text-red-300 px-4 py-2 rounded-lg text-sm font-semibold transition-all border border-red-500/30 disabled:opacity-50"
            >
              Close Voting
            </button>
          </div>

          <div className="text-purple-200 mb-4 font-semibold">
            {totalVotes} vote{totalVotes !== 1 ? "s" : ""} cast so far
          </div>

          <div className="space-y-3">
            {voteTargets.map((char) => {
              const count = voteCounts[char.name] || 0;
              const maxVotes = Math.max(...Object.values(voteCounts), 1);
              const pct =
                totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              const isMurderer = char.isMurderer;
              const voters = votesList
                .filter((v) => v.voted_for === char.name)
                .map((v) => v.voter_name || "Unknown");

              return (
                <div
                  key={char.name}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">
                        {char.name}
                      </span>
                      <span className="text-purple-400 text-xs">
                        • {char.role}
                      </span>
                      {isMurderer && (
                        <span className="bg-red-500/30 text-red-300 text-xs px-2 py-0.5 rounded-full font-bold">
                          🔪 Killer
                        </span>
                      )}
                    </div>
                    <span className="text-purple-200 font-bold">
                      {count} vote{count !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="h-3 bg-purple-900/50 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        isMurderer
                          ? "bg-gradient-to-r from-red-500 to-red-400"
                          : "bg-gradient-to-r from-purple-500 to-pink-500"
                      }`}
                      style={{
                        width: `${maxVotes > 0 ? (count / maxVotes) * 100 : 0}%`,
                      }}
                    />
                  </div>
                  {voters.length > 0 && (
                    <div className="text-purple-400 text-xs mt-2">
                      Voted by: {voters.join(", ")}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
