import { Check, Lightbulb, Eye } from "lucide-react";

export function SetupProgress({ assignedCount, totalCount, readyToStart }) {
  const allAssigned = assignedCount === totalCount;

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">Setup Progress</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {/* Step 1 - Assign Characters */}
        <div
          className={`p-4 rounded-lg border-2 ${allAssigned ? "border-green-500/50 bg-green-500/10" : "border-purple-500/50 bg-purple-500/10"}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${allAssigned ? "bg-green-600 text-white" : "bg-purple-600 text-white"}`}
            >
              {allAssigned ? <Check className="w-5 h-5" /> : "1"}
            </div>
            <h3 className="text-white font-semibold text-sm">
              Assign Characters
            </h3>
          </div>
          <p className="text-purple-200 text-sm">
            {assignedCount}/{totalCount} assigned
          </p>
        </div>

        {/* Step 2 - Control Panel */}
        <div
          className={`p-4 rounded-lg border-2 ${readyToStart ? "border-purple-500/50 bg-purple-500/10" : "border-white/10 bg-white/5"}`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${readyToStart ? "bg-purple-600 text-white" : "bg-white/10 text-white/50"}`}
            >
              2
            </div>
            <h3
              className={`font-semibold text-sm ${readyToStart ? "text-white" : "text-white/50"}`}
            >
              Control Panel
            </h3>
          </div>
          <p
            className={`text-sm ${readyToStart ? "text-purple-200" : "text-white/40"}`}
          >
            {readyToStart ? "Ready to start!" : "Assign at least 1 player"}
          </p>
        </div>

        {/* Step 3 - Reveal Clues */}
        <div className="p-4 rounded-lg border-2 border-white/10 bg-white/5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-white/10 text-white/50">
              3
            </div>
            <h3 className="text-white/50 font-semibold text-sm">
              Reveal Clues
            </h3>
          </div>
          <p className="text-white/40 text-sm">Control the game live</p>
        </div>
      </div>

      {/* GM Tips */}
      <div className="mt-5 bg-gradient-to-r from-amber-900/20 to-orange-900/10 border border-amber-500/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="bg-amber-500/20 p-1.5 rounded-full flex-shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h4 className="text-amber-300 font-semibold text-sm mb-2">
              Quick Tips for Game Masters
            </h4>
            <ul className="space-y-1.5 text-sm text-amber-200/80">
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>
                  <strong className="text-amber-200">Playing too?</strong>{" "}
                  Assign one of the characters to yourself — use your own name
                  or email.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>
                  <strong className="text-amber-200">My Game View:</strong> Once
                  assigned, switch to the{" "}
                  <span className="inline-flex items-center gap-1">
                    <Eye className="w-3 h-3 inline" /> My Game View
                  </span>{" "}
                  tab in the Control Panel to see clues from your character's
                  perspective.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span>
                  <strong className="text-amber-200">Share links:</strong> Each
                  player gets a unique link — send it to them so they can follow
                  along on their phone during the game.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
