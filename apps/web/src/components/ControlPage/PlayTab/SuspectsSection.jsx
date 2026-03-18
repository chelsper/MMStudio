import { Users } from "lucide-react";

export function SuspectsSection({ allCharacters, currentCharacterName }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <Users className="w-5 h-5 text-purple-400" /> The Suspects
      </h3>
      <div className="flex flex-wrap gap-2">
        {allCharacters.map((c, i) => {
          const isYou = c.name === currentCharacterName;
          return (
            <span
              key={i}
              className={`px-3 py-2 rounded-lg text-sm ${
                isYou
                  ? "bg-purple-600/30 text-purple-200 border border-purple-500/50 font-semibold"
                  : "bg-white/5 text-purple-300 border border-white/10"
              }`}
            >
              {c.name} {isYou ? "(You)" : ""}{" "}
              <span className="text-purple-400 text-xs">• {c.role}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
