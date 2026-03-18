import { X, Send, Loader2 } from "lucide-react";

export function AssignModal({
  characterName,
  contact,
  contactType,
  assignLoading,
  assignError,
  onClose,
  onContactChange,
  onContactTypeChange,
  onAssign,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-purple-500/30 rounded-xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Assign Character</h3>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-purple-200 mb-6">
          Assign{" "}
          <span className="text-white font-semibold">{characterName}</span> to a
          player
        </p>

        {assignError && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4 text-red-200 text-sm">
            {assignError}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => onContactTypeChange("email")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                contactType === "email"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-300"
              }`}
            >
              Email
            </button>
            <button
              onClick={() => onContactTypeChange("phone")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                contactType === "phone"
                  ? "bg-purple-600 text-white"
                  : "bg-white/10 text-purple-300"
              }`}
            >
              Phone
            </button>
          </div>

          <input
            type={contactType === "email" ? "email" : "tel"}
            placeholder={
              contactType === "email" ? "player@example.com" : "555-123-4567"
            }
            value={contact}
            onChange={(e) => onContactChange(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={onAssign}
            disabled={assignLoading || !contact.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {assignLoading ? (
              <>
                <Loader2
                  className="w-5 h-5"
                  style={{ animation: "spin 1s linear infinite" }}
                />
                Generating secrets...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Assign & Generate Link
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
