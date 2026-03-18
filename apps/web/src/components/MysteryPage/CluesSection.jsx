import { Lightbulb } from "lucide-react";
import { CollapsibleSection } from "./CollapsibleSection";

export function CluesSection({ clues, showSolution, expanded, onToggle }) {
  return (
    <CollapsibleSection
      title="Clues (Game Master View)"
      icon={<Lightbulb className="w-6 h-6" />}
      expanded={expanded}
      onToggle={onToggle}
    >
      <div className="grid md:grid-cols-2 gap-4">
        {clues.map((clue, index) => (
          <div
            key={index}
            className="bg-white/5 p-6 rounded-lg border border-white/10"
          >
            <div className="text-purple-400 text-xs font-semibold mb-1">
              Clue #{index + 1}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{clue.title}</h3>
            <p className="text-purple-100 mb-3">{clue.description}</p>
            {showSolution && (
              <div className="pt-3 border-t border-white/10">
                <span className="text-purple-300 font-semibold text-sm">
                  Significance:{" "}
                </span>
                <span className="text-purple-200 text-sm">
                  {clue.significance}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </CollapsibleSection>
  );
}
