import { Unlock, Loader2 } from "lucide-react";

export function ClueRevealControl({
  globalCluesRevealed,
  totalClues,
  allRevealed,
  revealing,
  handleRevealNext,
  mysteryData,
}) {
  return (
    <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/30 backdrop-blur-sm border-2 border-purple-500/40 rounded-xl p-8 mb-6 shadow-xl shadow-purple-500/20">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3 justify-center">
        <Unlock className="w-8 h-8 text-purple-400" />
        Clue Reveal Control
      </h2>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-purple-200 font-semibold text-lg">
            Progress: {globalCluesRevealed} of {totalClues} clues revealed
          </span>
          <span className="text-purple-300 text-sm">
            {Math.round((globalCluesRevealed / totalClues) * 100)}%
          </span>
        </div>
        <div className="h-4 bg-purple-900/50 rounded-full overflow-hidden border border-purple-500/30">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500 relative overflow-hidden"
            style={{ width: `${(globalCluesRevealed / totalClues) * 100}%` }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ animation: "shimmer 2s infinite" }}
            />
          </div>
        </div>
      </div>

      {!allRevealed ? (
        <>
          <div className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-xl p-8 mb-6 shadow-lg">
            <div className="text-purple-300 text-sm font-bold mb-2 uppercase tracking-wide">
              Next Clue to Reveal:
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">
              #{globalCluesRevealed + 1}:{" "}
              {mysteryData.clues[globalCluesRevealed]?.title}
            </h3>
            <div className="bg-black/20 rounded-lg p-4 border border-white/10">
              <p className="text-purple-100 leading-relaxed">
                {mysteryData.clues[globalCluesRevealed]?.description}
              </p>
            </div>
          </div>

          <button
            onClick={handleRevealNext}
            disabled={revealing}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-5 rounded-xl text-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-[1.02]"
          >
            {revealing ? (
              <>
                <Loader2
                  className="w-6 h-6"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Revealing to all players...
              </>
            ) : (
              <>
                <Unlock className="w-6 h-6" />🎬 Reveal This Clue to All Players
              </>
            )}
          </button>
          <p className="text-center text-purple-400 text-sm mt-3">
            💡 Click when you're ready for players to see this clue
          </p>
        </>
      ) : (
        <div className="text-center py-8 bg-gradient-to-br from-green-900/30 to-emerald-900/20 border-2 border-green-500/40 rounded-xl shadow-xl">
          <div className="text-6xl mb-4">🎉</div>
          <p className="text-green-300 font-bold text-2xl mb-2">
            All Clues Revealed!
          </p>
          <p className="text-green-400 text-lg mb-4">
            Time to let the players vote on who they think did it.
          </p>
        </div>
      )}
    </div>
  );
}
