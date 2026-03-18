import { Skull } from "lucide-react";

export function VictimSection({ victim }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 mb-6">
      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
        <Skull className="w-5 h-5 text-red-400" /> The Victim
      </h3>
      <div className="space-y-2">
        <div>
          <span className="text-purple-300 font-semibold">Name: </span>
          <span className="text-white">{victim.name}</span>
        </div>
        <div>
          <span className="text-purple-300 font-semibold">Background: </span>
          <span className="text-purple-100">{victim.background}</span>
        </div>
      </div>
    </div>
  );
}
