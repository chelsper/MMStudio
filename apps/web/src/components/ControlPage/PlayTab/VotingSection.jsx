import { Check } from "lucide-react";

export function VotingSection({
  allCharacters,
  currentCharacterName,
  gmSelectedVote,
  myVote,
  gmSubmittingVote,
  handleGmVote,
}) {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl p-8">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🗳️</div>
          <h3 className="text-2xl font-bold text-white mb-2">Cast Your Vote</h3>
          <p className="text-amber-200">
            Who do you think committed the murder?
          </p>
        </div>

        <div className="space-y-2">
          {allCharacters
            .filter((c) => c.name !== currentCharacterName)
            .map((c) => {
              const currentVote = gmSelectedVote || myVote;
              const isSelected = currentVote === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => handleGmVote(c.name)}
                  disabled={gmSubmittingVote}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                    isSelected
                      ? "border-amber-400 bg-amber-500/20"
                      : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                  } disabled:opacity-50`}
                >
                  <div>
                    <span className="text-white font-semibold">{c.name}</span>
                    <span className="text-purple-400 text-sm ml-2">
                      • {c.role}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="flex items-center gap-2 text-amber-300 text-sm font-semibold">
                      <Check className="w-4 h-4" /> Your vote
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
