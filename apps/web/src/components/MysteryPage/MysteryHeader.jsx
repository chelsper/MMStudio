import { Users } from "lucide-react";

export function MysteryHeader({
  mystery,
  assignedCount,
  totalCount,
  allAssigned,
}) {
  const mysteryData = mystery.data.mystery;

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 font-crimson-text">
            {mysteryData.title}
          </h1>
          <div className="flex items-center gap-4 text-purple-300 flex-wrap">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {mystery.config.playerCount} players
            </span>
            <span>•</span>
            <span>{mystery.config.setting}</span>
            <span>•</span>
            <span>{mystery.config.tone}</span>
            <span>•</span>
            <span
              className={
                allAssigned ? "text-green-400 font-semibold" : "text-yellow-400"
              }
            >
              {assignedCount}/{totalCount} assigned
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
