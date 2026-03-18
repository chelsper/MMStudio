import { Users, Check, Clock } from "lucide-react";

export function PlayerStatus({ assignments, globalCluesRevealed, mysteryId }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-purple-400" />
        Player Status ({assignments.length} active players)
      </h2>

      {assignments.length === 0 ? (
        <div className="text-center py-12 bg-yellow-900/20 border border-yellow-500/30 rounded-xl">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-yellow-300 font-semibold text-lg mb-2">
            No players assigned yet
          </p>
          <p className="text-yellow-400 text-sm mb-4">
            Go to Mystery Details to assign characters to players
          </p>
          <a
            href={`/mystery/${mysteryId}`}
            className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all"
          >
            Assign Characters
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {assignments.map((assignment) => {
            const viewedAll = assignment.clues_revealed >= globalCluesRevealed;
            return (
              <div
                key={assignment.id}
                className={`p-5 rounded-lg border-2 transition-all ${
                  viewedAll
                    ? "border-green-500/50 bg-green-500/10"
                    : "border-yellow-500/50 bg-yellow-500/10"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {assignment.character_name}
                    </h3>
                    <p className="text-purple-300 text-sm">
                      {assignment.contact}
                    </p>
                  </div>
                  {viewedAll ? (
                    <span className="bg-green-600/30 text-green-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Up to date
                    </span>
                  ) : (
                    <span className="bg-yellow-600/30 text-yellow-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Behind
                    </span>
                  )}
                </div>
                <div className="text-sm text-purple-200">
                  Viewed {assignment.clues_revealed} of {globalCluesRevealed}{" "}
                  revealed clues
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
