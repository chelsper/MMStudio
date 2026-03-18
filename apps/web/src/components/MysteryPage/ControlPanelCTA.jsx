import { PlayCircle, Eye } from "lucide-react";

export function ControlPanelCTA({ mysteryId, allAssigned }) {
  return (
    <a
      href={`/mystery/${mysteryId}/control`}
      className="block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl p-6 mb-8 transition-all shadow-lg shadow-green-500/30 group"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
            <PlayCircle className="w-7 h-7" />
            {allAssigned ? "Ready to Start!" : "Start Game"}
          </h3>
          <p className="text-green-100">
            Go to the Control Panel to reveal clues and manage your game live
          </p>
          <p className="text-green-200/70 text-sm mt-1 flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            Playing too? Use the "My Game View" tab to see your character's
            perspective
          </p>
        </div>
        <div className="text-4xl group-hover:translate-x-2 transition-transform">
          →
        </div>
      </div>
    </a>
  );
}
