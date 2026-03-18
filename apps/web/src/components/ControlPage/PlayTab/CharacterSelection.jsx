import { ChevronRight } from "lucide-react";

export function CharacterSelection({ assignments, handleSelectGmCharacter }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
      <div className="text-center mb-6">
        <div className="text-4xl mb-3">🎭</div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Which character are you playing?
        </h2>
        <p className="text-purple-300">
          Select your assigned character to see your personal game view.
        </p>
      </div>

      <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/10 border border-amber-500/30 rounded-lg p-4 mb-6">
        <p className="text-amber-200/90 text-sm text-center">
          💡{" "}
          <strong className="text-amber-200">
            Want to play and run the game?
          </strong>{" "}
          Assign a character to yourself on the Mystery Details page, then
          select it here. You can switch between this view and the Control Panel
          using the tabs above.
        </p>
      </div>

      {assignments.length === 0 ? (
        <div className="text-center py-8 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
          <p className="text-yellow-300 font-semibold">
            No characters have been assigned yet. Go to Mystery Details to
            assign characters first.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {assignments.map((a) => (
            <button
              key={a.id}
              onClick={() => handleSelectGmCharacter(a.token)}
              className="w-full text-left p-5 rounded-xl border-2 border-white/10 bg-white/5 hover:bg-white/10 hover:border-purple-500/50 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-white font-bold text-lg">
                  {a.character_name}
                </span>
                <span className="text-purple-400 text-sm ml-2">
                  ({a.contact})
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
