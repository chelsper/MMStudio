import { X, Check, Copy } from "lucide-react";

export function ShareLinkModal({
  characterName,
  contact,
  url,
  copied,
  onClose,
  onCopy,
}) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-green-500/30 rounded-xl p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            <Check className="w-6 h-6 text-green-400" />
            Character Assigned!
          </h3>
          <button
            onClick={onClose}
            className="text-purple-300 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-purple-200 mb-2">
          <span className="text-white font-semibold">{characterName}</span> has
          been assigned to{" "}
          <span className="text-white font-semibold">{contact}</span>
        </p>

        <p className="text-purple-300 text-sm mb-6">
          Send them this link to access their character and clues:
        </p>

        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={url}
              className="flex-1 bg-transparent text-purple-200 text-sm focus:outline-none"
            />
            <button
              onClick={() => onCopy(url)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <a
            href={`mailto:${contact}?subject=You're invited to a mystery!&body=You've been assigned the character "${characterName}" in our mystery game! Click here to play: ${encodeURIComponent(url)}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all text-center text-sm"
          >
            📧 Send Email
          </a>
          <a
            href={`sms:${contact}?body=You've been assigned "${characterName}" in our mystery game! Play here: ${url}`}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg font-semibold transition-all text-center text-sm"
          >
            💬 Send Text
          </a>
        </div>
      </div>
    </div>
  );
}
