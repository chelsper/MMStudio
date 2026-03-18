import { ChevronRight, Lock } from "lucide-react";
import { forwardRef } from "react";

export const CluesSection = forwardRef(function CluesSection(
  {
    cluesRevealed,
    totalClues,
    visibleClues,
    onClueClick,
    onSwitchToControl,
    votingOpen,
  },
  ref,
) {
  const hasMoreClues = cluesRevealed < totalClues;

  return (
    <div ref={ref} className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-2">🔍 Clues</h3>
      <p className="text-purple-300 text-sm mb-6">
        {cluesRevealed} of {totalClues} clues revealed
      </p>

      <div className="h-2 bg-purple-900/50 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${(cluesRevealed / totalClues) * 100}%` }}
        />
      </div>

      <div className="space-y-3 mb-6">
        {visibleClues.map((clue) => (
          <button
            key={clue.index}
            onClick={() => onClueClick(clue.index)}
            className="w-full backdrop-blur-sm border border-white/10 bg-white/5 rounded-xl p-5 hover:bg-white/10 transition-all text-left flex items-center gap-4"
          >
            <div className="text-white w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center font-bold flex-shrink-0">
              {clue.index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-semibold">{clue.title}</h4>
              <p className="text-purple-300 text-sm truncate">
                {clue.description}
              </p>
            </div>
            {clue.mySecret && (
              <div className="bg-amber-500/20 text-amber-300 px-2 py-1 rounded text-xs font-semibold flex-shrink-0">
                🤫 Secret
              </div>
            )}
            <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0" />
          </button>
        ))}
      </div>

      {hasMoreClues && (
        <div className="space-y-3 mb-6">
          {Array.from({ length: totalClues - cluesRevealed }, (_, i) => (
            <div
              key={cluesRevealed + i}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-5 flex items-center gap-4 opacity-40"
            >
              <div className="bg-purple-900 text-purple-500 w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                <Lock className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="text-purple-400 font-semibold">
                  Clue #{cluesRevealed + i + 1}
                </h4>
                <p className="text-purple-500 text-sm">
                  Switch to Control to reveal this clue
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {hasMoreClues && (
        <div className="text-center py-4 bg-purple-900/20 border border-purple-500/20 rounded-xl">
          <p className="text-purple-300 text-sm mb-2">More clues to reveal</p>
          <button
            onClick={onSwitchToControl}
            className="text-purple-200 underline hover:text-white text-sm transition-colors"
          >
            Go to Control Panel to reveal next clue →
          </button>
        </div>
      )}

      {!hasMoreClues && cluesRevealed > 0 && !votingOpen && (
        <div className="text-center py-6 bg-green-900/20 border border-green-500/30 rounded-xl">
          <div className="text-3xl mb-2">🎉</div>
          <p className="text-green-300 font-semibold text-lg">
            All clues revealed!
          </p>
          <p className="text-green-400/70 text-sm mt-1">
            Open voting from the Control Panel
          </p>
        </div>
      )}
    </div>
  );
});
