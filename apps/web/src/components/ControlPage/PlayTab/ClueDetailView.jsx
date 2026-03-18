import { Eye, PlayCircle } from "lucide-react";

export function ClueDetailView({
  clue,
  visibleClues,
  onBack,
  onSwitchToControl,
}) {
  const previousSecrets = visibleClues
    .filter((c) => c.index < clue.index && c.mySecret)
    .map((c) => ({
      clueNumber: c.index + 1,
      title: c.title,
      secret: c.mySecret,
    }));

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="text-purple-300 hover:text-purple-200 flex items-center gap-2 transition-colors"
        >
          ← Back to clues
        </button>
        <button
          onClick={onSwitchToControl}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 hover:from-green-700 hover:to-emerald-700"
        >
          <PlayCircle className="w-4 h-4" />
          Switch to Control
        </button>
      </div>

      <div className="text-center mb-8">
        <div className="text-purple-400 font-semibold text-sm mb-2">
          CLUE #{clue.index + 1}
        </div>
        <h1 className="text-3xl font-bold text-white font-crimson-text">
          {clue.title}
        </h1>
      </div>

      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 mb-6">
        <h3 className="text-lg font-semibold text-purple-300 mb-3">
          📋 Evidence Found
        </h3>
        <p className="text-white text-lg leading-relaxed">{clue.description}</p>
      </div>

      {clue.mySecret && (
        <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/20 backdrop-blur-sm border-2 border-amber-500/40 rounded-xl p-8 mb-6">
          <h3 className="text-lg font-semibold text-amber-300 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5" />🤫 Only You Know This
          </h3>
          <p className="text-amber-100 text-lg leading-relaxed italic">
            "{clue.mySecret}"
          </p>
        </div>
      )}

      {previousSecrets.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 backdrop-blur-sm border border-indigo-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-indigo-300 mb-4 flex items-center gap-2">
            🧩 What You Know So Far
          </h3>
          <div className="space-y-3">
            {previousSecrets.map((prev) => (
              <div
                key={prev.clueNumber}
                className="bg-indigo-900/30 border border-indigo-500/20 rounded-lg p-4"
              >
                <div className="text-indigo-400 text-xs font-semibold mb-1">
                  From Clue #{prev.clueNumber}: {prev.title}
                </div>
                <p className="text-indigo-100 text-sm italic">
                  "{prev.secret}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
