import { useState } from "react";
import { Crosshair, Shuffle, Check, Loader2 } from "lucide-react";

export function KillerAssignment({
  mysteryId,
  assignments,
  currentKiller,
  killerMode,
  onKillerSet,
}) {
  const [killerLoading, setKillerLoading] = useState(false);
  const [killerError, setKillerError] = useState(null);

  const handleSetKiller = async (assignmentId, randomize) => {
    setKillerLoading(true);
    setKillerError(null);
    try {
      const response = await fetch(`/api/mysteries/${mysteryId}/set-killer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          randomize ? { randomize: true } : { assignmentId },
        ),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to set killer");
      }

      if (onKillerSet) onKillerSet();
    } catch (err) {
      console.error("Error setting killer:", err);
      setKillerError(err.message);
    } finally {
      setKillerLoading(false);
    }
  };

  const killerAssigned = !!currentKiller;

  return (
    <div
      className={`backdrop-blur-sm rounded-xl p-8 mb-6 ${killerAssigned ? "bg-green-900/20 border-2 border-green-500/30" : "bg-gradient-to-br from-red-900/30 to-orange-900/20 border-2 border-red-500/40"}`}
    >
      <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
        <Crosshair
          className={`w-6 h-6 ${killerAssigned ? "text-green-400" : "text-red-400"}`}
        />
        🔪 Killer Assignment
        <span className="text-sm font-normal text-purple-300 ml-2">
          (Mode: {killerMode})
        </span>
      </h2>
      <p className="text-purple-300 text-sm mb-6">
        {killerMode === "Randomize"
          ? "Hit randomize to let fate decide who the killer is, or pick someone yourself."
          : "Choose which player will be the killer."}
      </p>

      {killerError && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-200 text-sm">
          {killerError}
        </div>
      )}

      {assignments.length === 0 ? (
        <div className="text-center py-8 bg-white/5 rounded-xl border border-white/10">
          <p className="text-purple-300">
            Assign characters to players first, then come back to pick the
            killer.
          </p>
        </div>
      ) : (
        <>
          {currentKiller && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-5 mb-6 flex items-center justify-between">
              <div>
                <div className="text-green-400 text-sm font-semibold mb-1">
                  CURRENT KILLER
                </div>
                <div className="text-white text-xl font-bold">
                  {currentKiller.character_name}
                </div>
                <div className="text-green-300 text-sm">
                  {currentKiller.contact}
                </div>
              </div>
              <div className="text-4xl">🔪</div>
            </div>
          )}

          <button
            onClick={() => handleSetKiller(null, true)}
            disabled={killerLoading}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-4 rounded-xl text-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 mb-4 shadow-lg shadow-red-500/30"
          >
            {killerLoading ? (
              <>
                <Loader2
                  className="w-5 h-5"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Assigning...
              </>
            ) : (
              <>
                <Shuffle className="w-5 h-5" />🎲 Randomize Killer
              </>
            )}
          </button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-slate-900 text-purple-300">
                or pick a player
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            {assignments.map((assignment) => {
              const isCurrentKiller = currentKiller?.id === assignment.id;
              return (
                <button
                  key={assignment.id}
                  onClick={() => handleSetKiller(assignment.id, false)}
                  disabled={killerLoading || isCurrentKiller}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    isCurrentKiller
                      ? "border-green-500/50 bg-green-500/10 cursor-default"
                      : "border-white/10 bg-white/5 hover:border-red-500/50 hover:bg-red-500/10 cursor-pointer"
                  } disabled:opacity-60`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-semibold">
                        {assignment.character_name}
                      </h4>
                      <p className="text-purple-300 text-sm">
                        {assignment.contact}
                      </p>
                    </div>
                    {isCurrentKiller ? (
                      <span className="text-green-400 text-sm font-semibold flex items-center gap-1">
                        <Check className="w-4 h-4" />
                        Killer
                      </span>
                    ) : (
                      <span className="text-purple-400 text-xs">Select</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
