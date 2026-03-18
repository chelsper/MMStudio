import { useState } from "react";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";

export function SolutionSection({ mysteryData, showSolution, onToggle }) {
  const [warningDismissed, setWarningDismissed] = useState(false);

  const handleConfirmReveal = () => {
    setWarningDismissed(true);
    onToggle();
  };

  // Find the killer from the story data
  const killer = mysteryData.characters.find((c) => c.isMurderer);

  return (
    <div className="bg-gradient-to-br from-red-900/20 to-purple-900/20 backdrop-blur-sm border-2 border-red-500/30 rounded-xl p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Eye className="w-6 h-6 text-red-400" />
          The Solution
        </h2>
        {showSolution ? (
          <button
            onClick={onToggle}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <EyeOff className="w-5 h-5" />
            Hide
          </button>
        ) : warningDismissed ? (
          <button
            onClick={onToggle}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
          >
            <Eye className="w-5 h-5" />
            Reveal
          </button>
        ) : null}
      </div>

      {showSolution ? (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-red-300 mb-2">
              The Killer
            </h3>
            <p className="text-white">
              {killer
                ? `${killer.name} — ${killer.role}`
                : "Could not determine from story data"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-300 mb-2">Motive</h3>
            <p className="text-purple-100">{mysteryData.murdererMotive}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-300 mb-2">
              How It Happened
            </h3>
            <p className="text-purple-100 whitespace-pre-line">
              {mysteryData.solution}
            </p>
          </div>
        </div>
      ) : !warningDismissed ? (
        <div className="space-y-4">
          <div className="bg-amber-900/30 border-2 border-amber-500/40 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-amber-300 mb-2">
                  ⚠️ Spoiler Warning
                </h3>
                <p className="text-amber-100 leading-relaxed mb-3">
                  The solution reveals <strong>who the killer is</strong> and
                  how the mystery is solved. If you're planning to play along as
                  a participant, <strong>do not reveal this section</strong> —
                  it will spoil the game for you!
                </p>
                <p className="text-amber-200/70 text-sm">
                  Only view this if you're the Game Master and need to know the
                  answer, or if the game is already over.
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={handleConfirmReveal}
            className="w-full bg-red-600/80 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-5 h-5" />I understand — Reveal the Solution
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-purple-300 text-lg">
            Click "Reveal" to see the solution
          </p>
        </div>
      )}
    </div>
  );
}
