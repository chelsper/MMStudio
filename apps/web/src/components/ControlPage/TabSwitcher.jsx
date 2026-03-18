import { PlayCircle, Eye } from "lucide-react";

export function TabSwitcher({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-2 mb-8 bg-white/5 border border-white/10 rounded-xl p-1.5">
      <button
        onClick={() => onTabChange("control")}
        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
          activeTab === "control"
            ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg"
            : "text-purple-300 hover:bg-white/10"
        }`}
      >
        <PlayCircle className="w-4 h-4" />
        Control Panel
      </button>
      <button
        onClick={() => onTabChange("play")}
        className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
          activeTab === "play"
            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
            : "text-purple-300 hover:bg-white/10"
        }`}
      >
        <Eye className="w-4 h-4" />
        My Game View
      </button>
    </div>
  );
}
