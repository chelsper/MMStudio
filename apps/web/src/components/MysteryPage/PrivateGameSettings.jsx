import { Loader2, Sparkles } from "lucide-react";

export function PrivateGameSettings({
  config,
  assignments,
  onToggleBonusCharacter,
  updatingBonusCharacter,
}) {
  if (!config?.supportsOptionalCharacter) {
    return null;
  }

  const locked = assignments.length > 0;
  const includeBonusCharacter = Boolean(config.includeBonusCharacter);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            Private Game Settings
          </h2>
          <p className="text-purple-300 text-sm mt-2">
            This module supports a bonus 11th player. Choose the mode before
            assigning any characters.
          </p>
        </div>
        <span className="bg-fuchsia-500/20 text-fuchsia-200 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
          Hidden / Invite-only
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <button
          onClick={() => onToggleBonusCharacter(false)}
          disabled={locked || updatingBonusCharacter || !includeBonusCharacter}
          className={`rounded-xl border-2 p-4 text-left transition-all ${
            !includeBonusCharacter
              ? "border-fuchsia-500/60 bg-fuchsia-500/10"
              : "border-white/10 bg-white/5 hover:border-white/20"
          } disabled:opacity-60`}
        >
          <div className="text-white font-semibold">Standard Mode</div>
          <div className="text-purple-300 text-sm mt-1">
            10 players, no bonus character
          </div>
        </button>

        <button
          onClick={() => onToggleBonusCharacter(true)}
          disabled={locked || updatingBonusCharacter || includeBonusCharacter}
          className={`rounded-xl border-2 p-4 text-left transition-all ${
            includeBonusCharacter
              ? "border-indigo-500/60 bg-indigo-500/10"
              : "border-white/10 bg-white/5 hover:border-white/20"
          } disabled:opacity-60`}
        >
          <div className="text-white font-semibold">Bonus Mode</div>
          <div className="text-purple-300 text-sm mt-1">
            11 players, includes Rei Sato
          </div>
        </button>
      </div>

      <div className="mt-4 text-sm">
        {updatingBonusCharacter ? (
          <div className="text-purple-200 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Updating roster...
          </div>
        ) : locked ? (
          <p className="text-amber-300">
            Bonus mode is locked once players are assigned.
          </p>
        ) : (
          <p className="text-purple-300">
            Current mode:{" "}
            <span className="text-white font-semibold">
              {includeBonusCharacter ? "11-player bonus mode" : "10-player standard mode"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

