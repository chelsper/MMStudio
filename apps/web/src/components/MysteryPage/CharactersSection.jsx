import {
  Users,
  Check,
  UserPlus,
  Link as LinkIcon,
  UserMinus,
} from "lucide-react";
import { ChevronIcon } from "./ChevronIcon";

export function CharactersSection({
  characters,
  assignments,
  showSolution,
  expanded,
  onToggle,
  onAssignClick,
  onViewLink,
  onUnassign,
  unassignLoading,
}) {
  const assignedNames = assignments.map((a) => a.character_name);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl mb-6 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex justify-between items-center hover:bg-white/5 transition-all"
      >
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="text-purple-400">
            <Users className="w-6 h-6" />
          </span>
          Characters – Click to Assign
        </h2>
        <ChevronIcon expanded={expanded} />
      </button>

      {expanded && (
        <div className="p-6 pt-0">
          <p className="text-purple-300 mb-4 text-sm">
            Click a character to assign them to a player. They'll get a unique
            link to play!{" "}
            <span className="text-amber-300">
              Playing too? Assign one to yourself!
            </span>
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {characters.map((character, index) => {
              const isAssigned = assignedNames.includes(character.name);
              const assignment = assignments.find(
                (a) => a.character_name === character.name,
              );

              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 transition-all ${
                    isAssigned
                      ? "border-green-500/50 bg-green-500/10"
                      : "border-white/10 bg-white/5 hover:border-purple-500/50 hover:bg-purple-500/10 cursor-pointer"
                  }`}
                  onClick={() => {
                    if (!isAssigned) {
                      onAssignClick(character.name);
                    }
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {character.name}
                    </h3>
                    {isAssigned ? (
                      <span className="bg-green-600/30 text-green-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <Check className="w-3 h-3" />
                        {assignment?.contact}
                      </span>
                    ) : (
                      <span className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-xs flex items-center gap-1">
                        <UserPlus className="w-3 h-3" />
                        Assign
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm">
                    <div>
                      <span className="text-purple-300 font-semibold">
                        Role:{" "}
                      </span>
                      <span className="text-purple-100">{character.role}</span>
                    </div>
                    <div>
                      <span className="text-purple-300 font-semibold">
                        Personality:{" "}
                      </span>
                      <span className="text-purple-100">
                        {character.personality}
                      </span>
                    </div>
                  </div>

                  {isAssigned && assignment && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewLink(character.name, assignment);
                        }}
                        className="text-purple-300 hover:text-purple-200 text-sm flex items-center gap-1"
                      >
                        <LinkIcon className="w-4 h-4" />
                        View share link
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onUnassign) {
                            onUnassign(character.name);
                          }
                        }}
                        disabled={unassignLoading}
                        className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1 disabled:opacity-50"
                      >
                        <UserMinus className="w-4 h-4" />
                        Re-assign
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
