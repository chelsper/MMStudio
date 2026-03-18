import { ArrowLeft, PlayCircle, Settings } from "lucide-react";

export function GMNavigationBar({ mysteryId }) {
  return (
    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/30 backdrop-blur-sm border border-purple-500/40 rounded-xl p-4 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
          GM MODE
        </div>
        <div className="text-white font-semibold">Game Master Dashboard</div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center">
        <a
          href="/library"
          className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Library
        </a>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Mystery Details
        </button>
        <a
          href={`/mystery/${mysteryId}/control`}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
        >
          <PlayCircle className="w-4 h-4" />
          Control Panel
        </a>
      </div>
    </div>
  );
}
